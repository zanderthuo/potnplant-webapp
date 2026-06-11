var slider = function() {
    if (!$('.slick-container').hasClass('slick-initialized') && !$('.slick-nav').hasClass('slick-initialized')) {
        $('.slick-container').slick({
            slidesToShow: 1, 
            slidesToScroll: 1, 
            nextArrow: '<div class="slick-next"><i class="fa fa-angle-right"></i></div>', 
            prevArrow: '<div class="slick-prev"><i class="fa fa-angle-left"></i></div>', 
            fade: true, 
            accessibility: false, 
            verticalSwiping: false, 
            arrows: false, 
            asNavFor: '.slick-nav'
        });

        $('.slick-nav').slick({
            infinite: true, 
            slidesToShow: 5, 
            slidesToScroll: 1, 
            asNavFor: '.slick-container', 
            verticalSwiping: false, 
            dots: false, 
            accessibility: false, 
            focusOnSelect: true,
            nextArrow: '<div class="slick-next"><i class="fa fa-angle-right"></i></div>', 
            prevArrow: '<div class="slick-prev"><i class="fa fa-angle-left"></i></div>', 
            responsive: [{
                breakpoint: 1200, 
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1
                }
            }, 
            {
                breakpoint: 1024, 
                settings: {
                    slidesToShow: 5, 
                    slidesToScroll: 1
                }
            }, 
            {
                breakpoint: 768, 
                settings: {
                    slidesToShow: 4, 
                    slidesToScroll: 1, 
                    dots: false
                }
            }, 
            {
                breakpoint: 321, 
                settings: {
                    slidesToShow: 3, 
                    slidesToScroll: 2, 
                    dots: false
                }
            }]
        });
    }
};

$(window).on('load', function () {
    slider();

    if ($(window).width() >= 992) {
        var zoomOptions = {
            cursor: "crosshair",
            galleryActiveClass: 'active',
            imageCrossfade: false,
            scrollZoom: false,

            onImageSwapComplete: function() {
                $(".zoomWrapper div").hide();
            },
            loadingIcon: window.loading_url
        };
        $(".slick-container .slick-current img").elevateZoom(zoomOptions);

        $(".slick-container ").on("beforeChange", function(event, slick, currentSlide, nextSlide) {
            $.removeData(currentSlide, "elevateZoom");
            $(".zoomContainer").remove();
        });
        $(".slick-container ").on("afterChange", function (event, slick, currentSlide) {
            $(".slick-container .slick-current img").elevateZoom(zoomOptions);
        });
    }
});


var timer;
var winW = $(window).width();

$(window).on('resize.refreshSlick', function() {
    clearTimeout(timer);
    timer = setTimeout(function() {
        var curW = $(window).width();
        if (curW >= 768 && winW < 768) {
            $('.slick-container').slick('unslick');
            $('.slick-nav').slick('unslick');
            $('.slick-nav').find('.slick-list').removeAttr('style');
            $('.slick-nav').find('.slick-track').removeAttr('style');
            $('.slick-nav').find('.slick-slide').removeAttr('style');
            $('.slick-nav').find('button.slick-arrow').remove();

            slider();
        }
        winW = curW;
    }, 500);
}); 