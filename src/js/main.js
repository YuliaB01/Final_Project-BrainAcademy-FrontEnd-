$(document).ready(function() {
    initStarRating();
    initValidator();
    initDataTable();
    initScrollUp();
    initSlider();
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
                required: true,
                minlength: 10
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
            },
            number: {
                required: "Please, enter your valid phone number",
                minlength: "Your phone number is to short"
            },
            date: {
                required: "Please, choose convenient date and time for call"
            }
        },
        submitHandler: function(form) {
            $.post("/", $('form[name="contact-form"]').serialize()).always(function (data) {
                toastr.success("Thank you!Your message was successfully send!");
            });
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

function initDataTable() {
    $('#menu-table').DataTable({
        ajax: {
            url: '/data.json',
            dataSrc: ''
        },
        columns: [
            { data: 'dish' },
            { data: 'ingredients' },
            { data: 'weight' },
            { data: 'price' }
        ]
    });
}

function initStarRating() {
    var __slice = [].slice;

    (function($, window) {
        var Starrr;

        Starrr = (function() {
            Starrr.prototype.defaults = {
                rating: void 0,
                numStars: 5,
                change: function(e, value) {}
            };

            function Starrr($el, options) {
                var i, _, _ref,
                    _this = this;

                this.options = $.extend({}, this.defaults, options);
                this.$el = $el;
                _ref = this.defaults;
                for (i in _ref) {
                    _ = _ref[i];
                    if (this.$el.data(i) != null) {
                        this.options[i] = this.$el.data(i);
                    }
                }
                this.createStars();
                this.syncRating();
                this.$el.on('mouseover.starrr', 'i', function(e) {
                    return _this.syncRating(_this.$el.find('i').index(e.currentTarget) + 1);
                });
                this.$el.on('mouseout.starrr', function() {
                    return _this.syncRating();
                });
                this.$el.on('click.starrr', 'i', function(e) {
                    return _this.setRating(_this.$el.find('i').index(e.currentTarget) + 1);
                });
                this.$el.on('starrr:change', this.options.change);
            }

            Starrr.prototype.createStars = function() {
                var _i, _ref, _results;

                _results = [];
                for (_i = 1, _ref = this.options.numStars; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--) {
                    _results.push(this.$el.append("<i class='fa fa-star-o'></i>"));
                }
                return _results;
            };

            Starrr.prototype.setRating = function(rating) {
                if (this.options.rating === rating) {
                    rating = void 0;
                }
                this.options.rating = rating;
                this.syncRating();
                return this.$el.trigger('starrr:change', rating);
            };

            Starrr.prototype.syncRating = function(rating) {
                var i, _i, _j, _ref;

                rating || (rating = this.options.rating);
                if (rating) {
                    for (i = _i = 0, _ref = rating - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
                        this.$el.find('i').eq(i).removeClass('fa-star-o').addClass('fa-star');
                    }
                }
                if (rating && rating < 5) {
                    for (i = _j = rating; rating <= 4 ? _j <= 4 : _j >= 4; i = rating <= 4 ? ++_j : --_j) {
                        this.$el.find('i').eq(i).removeClass('fa-star').addClass('fa-star-o');
                    }
                }
                if (!rating) {
                    return this.$el.find('i').removeClass('fa-star').addClass('fa-star-o');
                }
            };

            return Starrr;

        })();
        return $.fn.extend({
            starrr: function() {
                var args, option;

                option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
                return this.each(function() {
                    var data;

                    data = $(this).data('star-rating');
                    if (!data) {
                        $(this).data('star-rating', (data = new Starrr($(this), option)));
                    }
                    if (typeof option === 'string') {
                        return data[option].apply(data, args);
                    }
                });
            }
        });
    })(window.jQuery, window);

    $(function() {
        return $(".starrr").starrr();
    });

    var slideIds = [
            "#stars",
            "#stars1",
            "#stars2"
        ];

    for (var i = 0; i < slideIds.length; i++) {
        console.log($(slideIds[i]));
        $(slideIds[i]).on('starrr:change', function (e, value) {
            $('#count').html(value);
        });
    }
}