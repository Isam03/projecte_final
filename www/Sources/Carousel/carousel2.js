var multipleCardCarousel = document.querySelector(
    "#carrousel2"
);
if (window.matchMedia("(min-width: 768px)").matches) {
    var carousel = new bootstrap.Carousel(multipleCardCarousel, {
        interval: false,
    });
    var carouselWidth = $(".c-i-1")[0].scrollWidth;
    var cardWidth = $(".c-it-1").width();
    var scrollPosition2 = 0;
    $("#carrousel2 c-c-n").on("click", function () {
        console.log("HOLAASFAF");
        if (scrollPosition2 < carouselWidth - cardWidth * 4) {
            scrollPosition2 += cardWidth;
            $("#carrousel2 .c-i-1").animate(
                { scrollLeft: scrollPosition2 },
                600
            );
        }
    });
    $("#carrousel2 c-c-p").on("click", function () {
        if (scrollPosition2 > 0) {
            scrollPosition2 -= cardWidth;
            $("#carrousel2 c-i").animate(
                { scrollLeft: scrollPosition2 },
                600
            );
        }
    });
} else {
    $(multipleCardCarousel).addClass("slide");
}