let slideIndex = 0;
showSlides();

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n - 1);
}

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    // Display text for the current slide after a delay
    let textElements = document.querySelectorAll('.text');
    textElements.forEach((element, index) => {
        if (index === slideIndex - 1) {
            setTimeout(() => {
                element.classList.add('loaded');
            }, 1000); // Adjust the delay time as needed
        } else {
            element.classList.remove('loaded');
        }
    });

    setTimeout(showSlides, 10000); // Change image every 5 seconds
}
