
var multipleCardCarousel = document.querySelector(
    "#carrousel3"
);
if (window.matchMedia("(min-width: 768px)").matches) {
    var carousel = new bootstrap.Carousel(multipleCardCarousel, {
        interval: false,
    });
    var carouselWidth = $("#carousel-inner3")[0].scrollWidth;
    var cardWidth = $("#carousel-item3").width();
    var scrollPosition3 = 0;
    $("#carrousel3 #carousel-control-next").on("click", function () {
        if (scrollPosition3 < carouselWidth - cardWidth * 4) {
            scrollPosition3 += cardWidth;
            $("#carrousel3 #carousel-inner3").animate(
                { scrollLeft: scrollPosition3 },
                600
            );
        }
    });
    $("#carrousel3 #carousel-control-prev").on("click", function () {
        if (scrollPosition3 > 0) {
            scrollPosition3 -= cardWidth;
            $("#carrousel3 #carousel-inner3").animate(
                { scrollLeft: scrollPosition3 },
                600
            );
        }
    });
} else {
    $(multipleCardCarousel).addClass("slide");
}