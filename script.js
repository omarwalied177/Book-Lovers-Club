document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeToggle = document.getElementById('theme-toggle');
    const authBtn = document.getElementById('auth-btn');
    const authModal = document.getElementById('auth-modal');
    const closeModal = document.querySelector('.close-modal');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const booksContainer = document.getElementById('books-container');
    const reviewsContainer = document.getElementById('reviews-container');
    const eventsContainer = document.getElementById('events-container');
    const reviewForm = document.getElementById('review-form');
    const ratingStars = document.querySelectorAll('.rating-stars i');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    const testimonials = document.querySelectorAll('.testimonial');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const newsletterForm = document.getElementById('newsletter-form');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Theme Toggle
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', toggleTheme);

    // Auth Modal
    function openModal() {
        authModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModalFunc() {
        authModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    authBtn.addEventListener('click', openModal);
    closeModal.addEventListener('click', closeModalFunc);
    window.addEventListener('click', (e) => {
        if (e.target === authModal) closeModalFunc();
    });

    // Tab Switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const tabName = btn.getAttribute('data-tab');
            authForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${tabName}-form`) {
                    form.classList.add('active');
                }
            });
        });
    });

    // Form Submissions
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Simulate login
        simulateAuth('login', email, password);
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const genre = document.getElementById('register-genre').value;
        
        // Simulate registration
        simulateAuth('register', email, password, name, genre);
    });

    function simulateAuth(type, email, password, name = '', genre = '') {
        // In a real app, this would be an API call
        setTimeout(() => {
            if (type === 'login') {
                alert(`Welcome back! You're now logged in as ${email}`);
            } else {
                alert(`Welcome ${name}! Your account has been created. Enjoy your ${genre} books!`);
            }
            
            authBtn.textContent = 'My Account';
            closeModalFunc();
            
            // Save to localStorage
            localStorage.setItem('user', JSON.stringify({
                name,
                email,
                genre,
                loggedIn: true
            }));
        }, 1000);
    }

    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.loggedIn) {
        authBtn.textContent = 'My Account';
    }

    // Book Data
    const books = [
        {
            id: 1,
            title: "The Silent Patient",
            author: "Alex Michaelides",
            genre: "thriller",
            rating: 4.5,
            cover: "assets/book1.jpg",
            badge: "Bestseller"
        },
        {
            id: 2,
            title: "Project Hail Mary",
            author: "Andy Weir",
            genre: "sci-fi",
            rating: 4.8,
            cover: "assets/book2.jpg",
            badge: "New Release"
        },
        {
            id: 3,
            title: "Educated",
            author: "Tara Westover",
            genre: "memoir",
            rating: 4.7,
            cover: "assets/book3.jpg",
            badge: "Editors' Choice"
        },
        {
            id: 4,
            title: "Dune",
            author: "Frank Herbert",
            genre: "sci-fi",
            rating: 4.6,
            cover: "assets/book4.jpg"
        },
        {
            id: 5,
            title: "The Midnight Library",
            author: "Matt Haig",
            genre: "fiction",
            rating: 4.2,
            cover: "assets/book5.jpg"
        },
        {
            id: 6,
            title: "Sapiens",
            author: "Yuval Noah Harari",
            genre: "non-fiction",
            rating: 4.4,
            cover: "assets/book6.jpg",
            badge: "Must Read"
        }
    ];

    // Display Books
    function displayBooks(filter = 'all') {
        booksContainer.innerHTML = '';
        
        const filteredBooks = filter === 'all' 
            ? books 
            : books.filter(book => book.genre === filter);
        
        filteredBooks.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            bookCard.innerHTML = `
                <div class="book-cover" style="background-image: url('${book.cover}')">
                    ${book.badge ? `<span class="book-badge">${book.badge}</span>` : ''}
                </div>
                <div class="book-info">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">${book.author}</p>
                    <div class="book-meta">
                        <span class="book-genre">${book.genre}</span>
                        <span class="book-rating">
                            <i class="fas fa-star"></i>
                            ${book.rating}
                        </span>
                    </div>
                </div>
            `;
            booksContainer.appendChild(bookCard);
        });
    }

    // Filter Books
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            displayBooks(btn.getAttribute('data-filter'));
        });
    });

    // Initial book display
    displayBooks();

    // Reviews Data
    const reviews = [
        {
            id: 1,
            book: "The Silent Patient",
            author: "Alex Michaelides",
            rating: 5,
            text: "An absolutely mind-blowing psychological thriller. The twist at the end left me speechless for days. Highly recommend to anyone who enjoys complex characters and unexpected endings.",
            user: {
                name: "Emily R.",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                date: "2 days ago"
            }
        },
        {
            id: 2,
            book: "Project Hail Mary",
            author: "Andy Weir",
            rating: 4,
            text: "As a fan of The Martian, I had high expectations and this book didn't disappoint. The science is fascinating but accessible, and the story is both funny and touching. Rocky might be my new favorite alien character in fiction!",
            user: {
                name: "Michael T.",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                date: "1 week ago"
            }
        }
    ];

    // Display Reviews
    function displayReviews() {
        reviewsContainer.innerHTML = '';
        
        reviews.forEach(review => {
            const reviewCard = document.createElement('div');
            reviewCard.className = 'review-card';
            reviewCard.innerHTML = `
                <div class="review-header">
                    <div>
                        <h4 class="review-book">${review.book}</h4>
                        <p class="review-author">${review.author}</p>
                    </div>
                    <div class="review-rating">
                        ${'<i class="fas fa-star"></i>'.repeat(review.rating)}
                        ${'<i class="far fa-star"></i>'.repeat(5 - review.rating)}
                    </div>
                </div>
                <p class="review-text">${review.text}</p>
                <div class="review-user">
                    <img src="${review.user.avatar}" alt="${review.user.name}">
                    <div class="review-user-info">
                        <h4>${review.user.name}</h4>
                        <p>${review.user.date}</p>
                    </div>
                </div>
            `;
            reviewsContainer.appendChild(reviewCard);
        });
    }

    // Initial reviews display
    displayReviews();

    // Rating Stars
    ratingStars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            document.getElementById('review-rating').value = rating;
            
            ratingStars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('active');
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('active');
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
    });

    // Submit Review
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const book = document.getElementById('review-book').value;
        const author = document.getElementById('review-author').value;
        const rating = document.getElementById('review-rating').value;
        const text = document.getElementById('review-text').value;
        
        if (rating === '0') {
            alert('Please select a rating');
            return;
        }
        
        // In a real app, this would be saved to a database
        const newReview = {
            id: reviews.length + 1,
            book,
            author,
            rating: parseInt(rating),
            text,
            user: {
                name: user ? user.name : 'Anonymous',
                avatar: user ? `https://randomuser.me/api/portraits/${user.gender === 'male' ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg` : 'https://randomuser.me/api/portraits/lego/1.jpg',
                date: 'Just now'
            }
        };
        
        reviews.unshift(newReview);
        displayReviews();
        reviewForm.reset();
        
        // Reset stars
        ratingStars.forEach(star => {
            star.classList.remove('fas', 'active');
            star.classList.add('far');
        });
        document.getElementById('review-rating').value = '0';
        
        alert('Thank you for your review!');
    });

    // Events Data
    const events = [
        {
            id: 1,
            date: "June 15, 2023",
            title: "Monthly Book Swap",
            description: "Bring books you've read and swap them for new ones. Refresh your library and meet fellow book lovers!",
            time: "2:00 PM - 4:00 PM",
            location: "Central Library"
        },
        {
            id: 2,
            date: "June 22, 2023",
            title: "Author Q&A with Sarah J. Maas",
            description: "Join us for an exclusive Q&A session with bestselling author Sarah J. Maas about her latest Crescent City novel.",
            time: "6:00 PM - 7:30 PM",
            location: "Online Event"
        },
        {
            id: 3,
            date: "July 1, 2023",
            title: "Summer Reading Challenge Kickoff",
            description: "Start our annual summer reading challenge with prizes for most books read and best reviews submitted.",
            time: "All Day",
            location: "All Locations"
        }
    ];

    // Display Events
    function displayEvents() {
        eventsContainer.innerHTML = '';
        
        events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.innerHTML = `
                <div class="event-date">${event.date}</div>
                <h3 class="event-title">${event.title}</h3>
                <p class="event-desc">${event.description}</p>
                <div class="event-meta">
                    <span><i class="fas fa-clock"></i> ${event.time}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
                </div>
            `;
            eventsContainer.appendChild(eventCard);
        });
    }

    // Initial events display
    displayEvents();

    // Testimonials Carousel
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[index].classList.add('active');
    }

    testimonialPrev.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });

    testimonialNext.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });

    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Newsletter Subscription
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        alert(`Thank you for subscribing with ${email}! You'll receive our next newsletter soon.`);
        newsletterForm.reset();
    });

    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });

    // Add some floating animation to books in hero section
const bookElements = document.querySelectorAll('.book');
// Then update the animation code to use bookElements:
bookElements.forEach((book, index) => {
    book.style.animationDelay = `${index * 0.2}s`;
    book.classList.add('floating');
})
});