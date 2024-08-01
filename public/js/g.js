
function adjustIframeSize() {
    const iframes = document.querySelectorAll('.responsive-iframe');
    iframes.forEach(iframe => {
        if (window.innerWidth < 750) {
            const newWidth = window.innerWidth - 80;
            const aspectRatio = 560 / 315; // Aspect ratio based on original dimensions
            iframe.style.width = `${newWidth}px`;
            iframe.style.height = `${newWidth / aspectRatio}px`;
        } else {
            iframe.style.width = '560px';
            iframe.style.height = '315px';
        }
    });
}

window.addEventListener('resize', adjustIframeSize);
window.addEventListener('load', adjustIframeSize);