$(document).ready(function() {
    initValidator();
    initScrollUp();
    initSlider();
    initRating();
    initEvents();

    //Header change background-color on page scroll
    $(window).on("scroll", function() {
        if($(window).scrollTop() > 50) {
            $(".header").addClass("scrolled");
            $(".Menu__link").addClass("scroll");
        } else {
            $(".header").removeClass("scrolled");
            $(".Menu__link").removeClass("scroll");
        }
    });

    //Prevent map scrolling on hover
    $('.map-container').click(function() {
        $(this).find('iframe').addClass('clicked');
    }).mouseleave(function() {
        $(this).find('iframe').removeClass('clicked');
    });
});

function initValidator() {
    //form validation plugin
    $("form[name='contact-form']").validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            subject: {
                required: true,
                minlength: 5
            },
            message: {
                required: true
            },
            number: {
                required: true
            },
            date: {
                required: true
            }
        },
        messages: {
            name: {
                required: "Please enter your name",
                minlength: "Your name is too short"
            },
            email: {
                required: "Please enter your email",
                email: "Please enter your valid email"
            },
            subject: {
                required: "Please provide a subject",
                minlength: "Your subject must be at least 10 characters long"
            },
            message: {
                required: "Please provide your message"
            }
        },
        submitHandler: function(form) {
            form.submit();
        }
    });
}

function initSlider() {
    $('.bxslider').bxSlider({
        nextSelector: '#slider-next',
        prevSelector: '#slider-prev',
        pagerCustom: '#bx-pager',
        controls: true,
        pager: true,
        nextText: '<img src="/Images/slide/interface-arrow_right.svg" height="30" width="30"/>',
        prevText: '<img src="/Images/slide/interface-arrow_left.svg" height="30" width="30"/>'
    });
}

//jRating plugin
function initRating() {
    $("#jRate").jRate({
        startColor: "white",
        endColor: "white",
        shape: 'STAR',
        horizontal: false,
        strokeWidth: '20px',
        strokeColor: 'white',
        backgroundColor: 'transparent',
        width: 30,
        height: 30,
        shapeGap: '10px',
        precision: 0.5,
        rating: 4
    });
}

function initScrollUp() {
    $.scrollUp({
        scrollImg: true
    });
}

function initEvents() {
    $('#callback').change(function() {
        if($(this).prop('checked')) {
            $('#callback-type').slideDown();
        } else {
            $('#callback-type').slideUp();
        }
    });

    $('#inlineRadio2').change(function() {
        if($(this).prop('checked')) {
            $('#request-data').slideDown();
        } else {
            $('#request-data').slideUp();
        }
    });

    $('#inlineRadio1').change(function() {
        if($('#inlineRadio1').prop('checked')) {
            $('#request-data').slideUp();
        }
    });
}