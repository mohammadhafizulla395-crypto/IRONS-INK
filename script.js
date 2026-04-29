// =========================================
//    INK & IRON - MASTER SCRIPT
//    ========================================= 
// //

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. NAVBAR TOGGLE (FIXED) ---
    const menu = document.getElementById('menu');
    const hamburger = document.getElementById('hamburger');

    if (hamburger && menu) {
        hamburger.addEventListener('click', () => {
            menu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.menu-links a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // --- 2. ARTIST PAGE LOGIC ---
    const artistGrid = document.getElementById('artistGrid');
    if (artistGrid) {
        const artists = [
            { name: "Victor Vile", spec: "Realism & Blackwork", img: "KaiShadow.jpeg", bio: "Master of contrast and hyper-realistic portraits. Victor brings a photographic quality to skin." },
            { name: "Sarah Ink", spec: "Botanical & Fine Line", img: "RubyChen.jpeg", bio: "Specializing in delicate botanical pieces. Her work is ethereal and precise." },
            { name: "Marcus Thorne", spec: "Japanese Traditional", img: "MarcusBlack.jpeg", bio: "Bold lines and vibrant color. Marcus respects the ancient traditions of Irezumi." },
            { name: "Elena Grey", spec: "Geometric", img: "name.jpg", bio: "Mathematical perfection. Elena creates sacred geometry that aligns with the body." }
        ];

        // Render Grid
        artists.forEach((a, i) => {
            artistGrid.innerHTML += `
                <div class="artist-card" onclick="openModal(${i})">
                    <img src="${a.img}" alt="${a.name}">
                    <div class="artist-overlay">
                        <span class="artist-spec">${a.spec}</span>
                        <h3 class="artist-name">${a.name}</h3>
                        <div class="btn-view">View Profile</div>
                    </div>
                </div>
            `;
        });

        // Modal Logic
        window.openModal = (index) => {
            const a = artists[index];
            document.getElementById('mImg').src = a.img;
            document.getElementById('mName').innerText = a.name;
            document.getElementById('mSpec').innerText = a.spec;
            document.getElementById('mBio').innerText = a.bio;
            document.getElementById('modalOverlay').style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        window.closeModal = () => {
            document.getElementById('modalOverlay').style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Close modal on overlay click
        document.getElementById('modalOverlay').addEventListener('click', (e) => {
            if (e.target.id === 'modalOverlay') closeModal();
        });
    }

    // --- 3. GALLERY FILTER ---
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid) {
        const works = [
            { title: "Gojo Satoru", category: "japanese", img: "gojo.jpg" },
            { title: "Nezuko", category: "realism", img: "img01tattoo.jpg" },
            { title: "Luffy", category: "blackwork", img: "onepice.jpg" },
            { title: "Samurai Spirit", category: "japanese", img: "tattoo01.webp" },
            { title: "Women Portrait", category: "realism", img: "tattoo02.jpg" },
            { title: "Women Art", category: "blackwork", img: "tattoo03.jpg" },
        ];

        works.forEach(w => {
            galleryGrid.innerHTML += `
                <div class="gallery-item" data-category="${w.category}">
                    <img src="${w.img}" alt="${w.title}">
                    <div class="gallery-info">
                        <h4>${w.title}</h4>
                        <span>${w.category}</span>
                    </div>
                </div>
            `;
        });

        const btns = document.querySelectorAll('.filter-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                document.querySelectorAll('.gallery-item').forEach(item => {
                    item.style.display = (filter === 'all' || item.dataset.category === filter) ? 'block' : 'none';
                });
            });
        });
    }

    // --- 4. BOOKING LOGIC ---
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        loadBookings(); // Load data immediately

        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('b_name').value;
            const email = document.getElementById('b_email').value;
            const artist = document.getElementById('b_artist').value;
            
            // Save to LocalStorage
            const data = { name, email, artist, status: 'Pending' };
            const bookings = JSON.parse(localStorage.getItem('ink_bookings')) || [];
            bookings.push(data);
            localStorage.setItem('ink_bookings', JSON.stringify(bookings));
            
            alert('Booking Request Sent! Check the Admin table below.');
            bookingForm.reset();
            loadBookings(); // Refresh table
        });
    }

    // --- 5. CONTACT LOGIC ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Message Sent Successfully!');
            contactForm.reset();
        });
    }
});

// Function to load bookings (Global scope for access)
function loadBookings() {
    const tbody = document.querySelector('#adminTable tbody');
    if (!tbody) return;
    
    const bookings = JSON.parse(localStorage.getItem('ink_bookings')) || [];
    tbody.innerHTML = '';
    
    if (bookings.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="color:#555; text-align:center;">No bookings yet</td></tr>';
    } else {
        bookings.forEach(b => {
            tbody.innerHTML += `<tr><td>${b.name}</td><td>${b.artist}</td><td style="color:var(--accent-gold)">${b.status}</td></tr>`;
        });
    }
}