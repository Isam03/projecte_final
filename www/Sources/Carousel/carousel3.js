
var multipleCardCarousel = document.querySelector(
    "#carrousel3"
);
if (window.matchMedia("(min-width: 768px)").matches) {
    var carousel = new bootstrap.Carousel(multipleCardCarousel, {
        interval: false,
    });
    var carouselWidth = $(".c-i-1")[0].scrollWidth;
    var cardWidth = $(".c-it-1").width();
    var scrollPosition3 = 0;
    $("#carrousel3 c-c-n").on("click", function () {
        if (scrollPosition3 < carouselWidth - cardWidth * 4) {
            scrollPosition3 += cardWidth;
            $("#carrousel3 .c-i-1").animate(
                { scrollLeft: scrollPosition3 },
                600
            );
        }
    });
    $("#carrousel3 c-c-p").on("click", function () {
        if (scrollPosition3 > 0) {
            scrollPosition3 -= cardWidth;
            $("#carrousel3 c-i").animate(
                { scrollLeft: scrollPosition3 },
                600
            );
        }
    });
} else {
    $(multipleCardCarousel).addClass("slide");
}