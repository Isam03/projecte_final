var multipleCardCarousel = document.querySelector(
    "#carrousel"
);
if (window.matchMedia("(min-width: 768px)").matches) {
    var carousel = new bootstrap.Carousel(multipleCardCarousel, {
        interval: false,
    });
    var carouselWidth = $(".c-i-1")[0].scrollWidth;
    var cardWidth = $(".c-it-1").width();
    var scrollPosition = 0;
    $("#carrousel c-c-n").on("click", function () {
        console.log("HOLAASFAF");
        if (scrollPosition < carouselWidth - cardWidth * 4) {
            scrollPosition += cardWidth;
            $("#carrousel c-i-1").animate(
                { scrollLeft: scrollPosition },
                600
            );
        }
    });
    $("#carrousel c-c-p").on("click", function () {
        if (scrollPosition > 0) {
            scrollPosition -= cardWidth;
            $("#carrousel c-i").animate(
                { scrollLeft: scrollPosition },
                600
            );
        }
    });
} else {
    $(multipleCardCarousel).addClass("slide");
}