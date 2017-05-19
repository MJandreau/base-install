
// fade #scroll-to-top button in on scroll
window.addEventListener("load", function(){
    scrollTo = function(element, to, duration) {

    if (duration < 0) return;

    var difference = to - element.scrollTop,
        perTick = difference / duration * 10;

        setTimeout(function() {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop === to) return;
            scrollTo(element, to, duration - 10);
        }, 10);
    };

    var scrollTopButton = document.getElementById("scroll-to-top");

    document.addEventListener('scroll', function() {
        if (document.body.scrollTop > 100) {
            scrollTopButton.classList.add("scrolled");
        } else {
            scrollTopButton.classList.remove("scrolled");
        }
    });

    scrollTopButton.addEventListener('click', function() {
        scrollTo(document.body, document.body.offsetTop, 400);
    });
});
