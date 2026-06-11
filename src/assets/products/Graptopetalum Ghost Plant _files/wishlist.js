$(function () {
    'use strict';
    var OptionManager = (function () {
        var objToReturn = {};
        var _options = null;
        var DEFAULT_OPTIONS = {
            currencySymbol: 'KSh',
            classWislistCounter: 'wishlist-counter',
            classProductRemove: 'remove-wishlist-item',
            decimals: 2,
            thousandSeparator: ',',
            decimalPoint: '.',
            DIR: window.location.hostname + ':' + window.location.port
        };

        var loadOptions = function (customOptions) {
            _options = $.extend({}, DEFAULT_OPTIONS);
            if (typeof customOptions === 'object') {
                $.extend(_options, customOptions);
            }
        };

        var getOptions = function () {
            return _options;
        };

        objToReturn.loadOptions = loadOptions;
        objToReturn.getOptions = getOptions;
        return objToReturn;
    }());

    var MathHelper = (function () {
        var objToReturn = {};
        var getRoundedNumber = function (number) {
            if (isNaN(number)) {
                throw new Error('Parameter is not a number');
            }
            number = number * 1;
            var options = OptionManager.getOptions();
            var result = function (number) {
                number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
                var n = !isFinite(+number) ? 0 : +number,
                    prec = !isFinite(+options.decimals) ? 0 : Math.abs(options.decimals),
                    sep = (typeof options.thousandSeparator === 'undefined') ? ',' : options.thousandSeparator,
                    dec = (typeof options.decimalPoint === 'undefined') ? '.' : options.decimalPoint,
                    s = '',
                    toFixedFix = function (n, prec) {
                        var k = Math.pow(10, prec);
                        return '' + Math.round(n * k) / k;
                    };
                
                // Fix for IE parseFloat(0.55).toFixed(0) = 0;

                s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
                if (s[0].length > 3) {
                    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
                }
                if ((s[1] || '').length < prec) {
                    s[1] = s[1] || '';
                    s[1] += new Array(prec - s[1].length + 1).join('0');
                }
                return s.join(dec);
            };
            return result(number);
        };
        objToReturn.getRoundedNumber = getRoundedNumber;
        return objToReturn;
    }());

    var loadWishlistEvent = function () {
        var options = OptionManager.getOptions();
        var counter = $('.' + options.classWislistCounter);
        
        var drawHeaderWishList = function () {
            checkLogin();
        };

        var checkLogin = function () {
            $.ajax({
                type: 'POST',
                url: options.DIR + 'config/confirm-login.php',
                data: 'stamp='+ new Date().getTime(),
                dataType: 'JSON',
                success: function (response) {
                    if (response.status) {
                        getList(drawList, response.details.id);
                    }
                    else {
                        $('.wishlist-contents').append('<div class="alert alert-info">Kindly sign up or login to see your wishlist.</div>');
                    }
                }
            }); 
        };

        var getList = function (drawList, customer) {
            $.ajax({
                type: 'POST',
                url: options.DIR + 'app/forms.php',
                data: {
                    object: 'Wishlist',
                    action: 'get_customer_list',
                    customer: customer,
                    time: new Date().getTime()
                },
                dataType: 'JSON',
                success: drawList
            });
        };

        var drawList = function (products) {
            $('.wishlist-contents ul').find('li').remove();
            $('.wishlist-contents').find('.alert').remove();
            $(counter).text(products.length);
            if (products.length > 0) {
                $.each(products, function () {
                    var item = $('#header-wishlist-item').clone().removeAttr('id').removeClass('hide');
                    $(item).attr('data-id', this.id);
                    $(item).find('img').attr({
                        'src': options.DIR + this.imgThumbnail,
                        'alt': this.pageTitle
                    }).end().find('.product-name').find('a').text(this.pageTitle).end();
                    $(item).find('.product-name, .product-image').find('a').attr({
                        'href': this.url
                    });
                    $(item).find('.unit-price').text(options.currencySymbol + ' '+ MathHelper.getRoundedNumber(this.new_price)).end();
                    if (this.old_price) {
                        $(item).find('.old-price').text(MathHelper.getRoundedNumber(this.old_price)).end();   
                    }
                    $(item).find('.remove-from-cart').addClass(options.classProductRemove);
                    $('.wishlist-contents ul').append(item);  
                });
                $('.wishlist-contents ul').find('li:last-child').css({
                    'border-bottom': 'none'
                }); 
                $('.wishlist-contents').find('.alert').remove();
            }
            else {
                $('.wishlist-contents').append('<div class="alert alert-info">You have no items in the wishlist at the moment.</div>');
            }
        };

        if ($('body').find('.wishlist-contents')) {
            drawHeaderWishList();
        }

        $(document).on('click', '.addToWishlist', function (e) {
            e.preventDefault();
            var product = $(this).attr('data-id');
            $.ajax({
                type: 'POST',
                url: options.DIR + 'config/confirm-login.php',
                data: 'stamp='+ new Date().getTime(),
                dataType: 'JSON',
                success: function (response) {
                    if (!response.status) {
                        $('#login-modal').modal('show');
                    }
                    else {							
                        addToWishlist(product, response.details.id);
                    }
                }
            }); 
        });
    
        var addToWishlist = function (product, customer) {
            $.ajax({
                beforeSend: function(){
                    $(".preloader").fadeIn();
                },
                complete: function(){
                    $(".preloader").fadeOut();
                },
                type: 'POST',
                url: options.DIR + 'app/forms.php',
                data: {
                    product: product,
                    customer: customer,
                    object: 'Wishlist',
                    action: 'create',
                    time: new Date().getTime()
                },
                dataType: 'JSON',
                success: function (response) {
                    drawHeaderWishList();
                    bootbox.alert({
                        title: response.title,
                        message: response.message,
                        buttons: {
                            ok: {
                                label: 'Ok',
                                className: 'btn-sm btn-primary'
                            }
                        }
                    });
                }
            });
        };

        $(document).on('click', '.' + options.classProductRemove, function () {
            var li = $(this).closest('li'),
                id = $(li).data('id');
            $.ajax({
                beforeSend: function(){
                    $(".preloader").fadeIn();
                },
                complete: function(){
                    $(".preloader").fadeOut();
                },
                type: 'POST',
                url: options.DIR + 'app/forms.php',
                data: {
                    id: id,
                    object: 'Wishlist',
                    action: 'delete',
                    time: new Date().getTime()
                },
                dataType: 'JSON',
                success: function (response) {
                    drawHeaderWishList();
                    bootbox.alert({
                        title: response.title,
                        message: response.message,
                        buttons: {
                            ok: {
                                label: 'Ok',
                                className: 'btn-sm btn-primary'
                            }
                        }
                    });
                }
            });
        });
    };

    $.fn.Wishlist = function (userOptions) {
        OptionManager.loadOptions(userOptions);
        loadWishlistEvent();
        return this;
    };
});