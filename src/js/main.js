$(window).on("scroll", function() {
    if($(window).scrollTop() > 50) {
        $(".header").addClass("scrolled");
        $(".Menu__link").addClass("scroll");
    } else {
        $(".header").removeClass("scrolled");
        $(".Menu__link").removeClass("scroll");
    }
});
