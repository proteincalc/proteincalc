// 1. Mobile Menu Logic
function toggleMenu() {
    alert("Menu clicked! (You can add mobile menu logic here)");
    // Ideally, you would toggle a class on a dropdown element
}

// 2. Slideshow Logic
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Add active class to current slide
    if (slides.length > 0) {
        slides[index].classList.add('active');
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Start slideshow if slides exist
if (slides.length > 0) {
    setInterval(nextSlide, 5000); // Change every 5 seconds
}