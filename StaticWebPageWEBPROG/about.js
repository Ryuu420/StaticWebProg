console.log("about.js is loaded");

document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const navButtons = document.querySelectorAll('.slider_nav a');

    function highlightButton(index) {
        navButtons.forEach((button, i) => {
            if (i === index){
                button.classList.add('active');
            }
            else {
                button.classList.remove('active');
            }
        });
    }

    function handlerSlideChange(){
        const currentIndex = Math.round(slider.scrollLeft / slider.clientWidth);
        highlightButton(currentIndex);
    }

    slider.addEventListener('scroll', handlerSlideChange);

    handlerSlideChange();
});