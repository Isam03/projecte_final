var multipleCardCarousel = document.querySelector(
    "#carrousel2"
);
if (window.matchMedia("(min-width: 768px)").matches) {
    var carousel = new bootstrap.Carousel(multipleCardCarousel, {
        interval: false,
    });
    var carouselWidth = $("#carousel-inner2")[0].scrollWidth;
    var cardWidth = $("#carousel-item2").width();
    var scrollPosition2 = 0;
    $("#carrousel2 #carousel-control-next").on("click", function () {
        console.log("HOLAASFAF");
        if (scrollPosition2 < carouselWidth - cardWidth * 4) {
            scrollPosition2 += cardWidth;
            $("#carrousel2 #carousel-inner2").animate(
                { scrollLeft: scrollPosition2 },
                600
            );
        }
    });
    $("#carrousel2 #carousel-control-prev").on("click", function () {
        if (scrollPosition2 > 0) {
            scrollPosition2 -= cardWidth;
            $("#carrousel2 #carousel-inner2").animate(
                { scrollLeft: scrollPosition2 },
                600
            );
        }
    });
} else {
    $(multipleCardCarousel).addClass("slide");
}