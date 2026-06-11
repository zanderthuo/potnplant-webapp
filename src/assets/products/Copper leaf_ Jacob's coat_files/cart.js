$(function () {
    'use strict';

    var OptionManager = (function () {
        var objToReturn = {};
        
        var _options = null;
        var DEFAULT_OPTIONS = {
            currencySymbol: 'KSh',
            classCartIcon: 'cart-item-counter',
            classCartBadge: 'item-counter-badge',
            classCartIconHover: '',
            classProductQuantity: 'product-quantity',
            classProductRemove: 'remove-product',
            classCheckoutCart: 'checkout',
            classGoToCheckout: 'checkout-btn',
            classViewCart: 'view-cart',
            affixCartIcon: true,
            showCheckoutModal: true,
            decimals: 0,
            thousandSeparator: ',',
            decimalPoint: '.',
            cartItems: null,
            site_url: null,
            clickOnAddToCart: function ($addTocart) {
                
            },
            afterAddOnCart: function (products, totalPrice, totalQuantity) {
                
            },
            clickOnCartIcon: function ($cartIcon, products, totalPrice, totalQuantity) {
                
            },
            checkoutCart: function (products, totalPrice, totalQuantity) {
                return false;
            },
            getDiscountPrice: function (products, totalPrice, totalQuantity) {
                return null;
            },
            addShippingFees: function ($shipping_fees) {
                
            }
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

    var ProductManager = (function () {
        var objToReturn = {};

        /* PRIVATE */

        localStorage.products = localStorage.products ? localStorage.products : "";
        var getIndexOfProduct = function (id) {
            var productIndex = -1;
            var products = getAllProducts();
            $.each(products, function (index, value) {
                if (value.id == id) {
                    productIndex = index;
                    return;
                }
            });
            return productIndex;
        };
        var setAllProducts = function (products) {
            localStorage.products = JSON.stringify(products);
        };
        var addProduct = function (id, name, availability, price, exclusive_price, vat_amount, quantity, image, vat, currency, url) {
            var products = getAllProducts();
            products.push({
                id: id,
                name: name,
                availability: availability,
                price: price,
                exclusive_price: exclusive_price,
                vat_amount: vat_amount,
                quantity: quantity,
                image: image,
                vat: vat,
                currency: currency,
                url: url
            });
            setAllProducts(products);
        };
        
        /* PUBLIC */

        var getAllProducts = function () {
            try {
                var products = JSON.parse(localStorage.products);
                return products;
            } catch (e) {
                return [];
            }
        };
        var updateProduct = function (id, quantity) {
            var productIndex = getIndexOfProduct(id);
            if (productIndex < 0) {
                return false;
            }
            var products = getAllProducts();
            if (typeof quantity === 'undefined') {
                products[productIndex].quantity = products[productIndex].quantity * 1 + 1;
            }
            else {
                var difference = quantity - products[productIndex].quantity;
                if (difference == 0) {
                    products[productIndex].quantity = products[productIndex].quantity * 1 + parseInt(difference) + 1;
                }
                else {
                    if (difference < -1) {
                        products[productIndex].quantity = products[productIndex].quantity * 1 + 1;
                    }
                    else {
                        products[productIndex].quantity = products[productIndex].quantity * 1 + parseInt(difference);
                    }
                }
            }
            setAllProducts(products);
            return true;
        };
        var setProduct = function (id, name, availability, price, exclusive_price, vat_amount, quantity, image, vat, currency, url) {
            if (typeof id === "undefined") {
                console.error('id is required');
                return false;
            }
            if (typeof name === "undefined") {
                console.error('name is required');
                return false;
            }
            if (typeof image === "undefined") {
                console.error('image is required');
                return false;
            }
            if (!$.isNumeric(price)) {
                console.error('price is not a number');
                return false;
            }
            exclusive_price = typeof exclusive_price === "undefined" ? "" : exclusive_price;
            vat_amount = typeof vat_amount === "undefined" ? "" : vat_amount;
            if (!$.isNumeric(quantity)) {
                console.error('quantity is not a number');
                return false;
            }
            availability = typeof availability === "undefined" ? 1 : availability;
            vat = typeof vat === "undefined" ? "" : vat;
            currency = typeof currency === "undefined" ? "KSh" : currency;
            url = typeof url === "undefined" ? "" : url;

            if (!updateProduct(id, quantity)) {                
                addProduct(id, name, availability, price, exclusive_price, vat_amount, quantity, image, vat, currency, url);
            }
        };
        var clearProduct = function () {
            setAllProducts([]);
        };
        var removeProduct = function (id) {
            var products = getAllProducts();
            products = $.grep(products, function (value, index) {
                return value.id != id;
            });
            setAllProducts(products);
        };
        var getTotalQuantity = function () {
            var total = 0;
            var products = getAllProducts();
            $.each(products, function (index, value) {
                total += value.quantity * 1;
            });
            return total;
        };
        var getTotalPrice = function () {
            var products = getAllProducts();
            var total = 0.0;
            $.each(products, function (index, value) {
                total += parseInt(value.quantity) * parseFloat(value.price);
            });
            return total;
        };
        var getTotalExclusivePrice = function () {
            var products = getAllProducts();
            var total = 0.0;
            $.each(products, function (index, value) {
                total += parseInt(value.quantity) * parseFloat(value.exclusive_price);
            });
            return total;
        };
        var getTotalTaxes = function () {
            var products = getAllProducts();
            var taxes = 0;
            $.each(products, function (index, value) {
                if (parseInt(value.vat) == 1) {
                    taxes += Math.round(value.quantity * value.vat_amount);   
                }
            });
            return taxes;
        };
        var getProduct = function (id) {
            var productIndex = getIndexOfProduct(id);
            if (productIndex < 0) {
                return false;
            }
            var products = getAllProducts();
            return products[productIndex];
        };

        objToReturn.getAllProducts = getAllProducts;
        objToReturn.updateProduct = updateProduct;
        objToReturn.setProduct = setProduct;
        objToReturn.clearProduct = clearProduct;
        objToReturn.removeProduct = removeProduct;
        objToReturn.getTotalQuantity = getTotalQuantity;
        objToReturn.getTotalPrice = getTotalPrice;
        objToReturn.getTotalExclusivePrice = getTotalExclusivePrice;
        objToReturn.getTotalTaxes = getTotalTaxes;
        objToReturn.getProduct = getProduct;
        return objToReturn;
    }());

    var loadCartEvent = function (targetSelector) {
        var options = OptionManager.getOptions();
        var $cartIcon = $("." + options.classCartIcon);
        var $cartBadge = $("." + options.classCartBadge);
        var classProductQuantity = options.classProductQuantity;
        var classProductRemove = options.classProductRemove;
        var classCheckoutCart = options.classCheckoutCart;
        var classGoToCheckout = options.classGoToCheckout;

        var idCartModal = 'cart-modal';
        var idCartTable = 'modal-cart-table';
        var classSubTotal = 'total-amount';
        var idEmptyCartMessage = 'empty-cart-message';
        var idDiscountPrice = 'cart-discount-price';
        var classProductTotal = 'product-total';
        var classAffixMyCartIcon = 'cart-icon-affix';
        var classTaxesTotal = 'total-taxes';
        var classGrandTotal = 'grand-total';
        var classCartArea = 'cart-area';

        if (options.cartItems && options.cartItems.constructor === Array) {
            ProductManager.clearProduct();
            $.each(options.cartItems, function () {
                ProductManager.setProduct(this.id, this.name, this.availability, this.price, this.exclusive_price, this.vat_amount, this.quantity, this.image, this.vat, this.currency, this.url);
            });            
        }

        $cartBadge.text(ProductManager.getTotalQuantity());

        if (!$('#' + idCartModal).length) {
            $('body').append(
                '<div class="modal fade" id="' + idCartModal + '" tabindex="-1">' +
                    '<div class="modal-dialog modal-lg cart-modal">' +
                        '<div class="modal-content">' +
                            '<div class="modal-header">' +
                                '<h5 class="modal-title"><span class="bi bi-cart3"></span> Shopping Cart</h5>' +
                                '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>' +
                            '</div>' +
                            '<div class="modal-body">' +
                                '<table class="table m-b-0 cart-table table-display" style="width: 100%" id="' + idCartTable + '">'+
                                    '<thead>'+
                                        '<tr>'+
                                            '<th class="photo-col"></th>'+
                                            '<th class="item-col">Item</th>'+
                                            '<th class="quantity-col">Quantity</th>'+
                                            '<th class="total-col">Total</th>'+
                                        '</tr>'+
                                    '</thead>'+
                                '</table>' +
                            '</div>' +
                            '<div class="modal-footer">' +
                                '<button type="button" class="btn btn-theme-outline btn-br-sm btn-sm" data-dismiss="modal">Close</button>' +
                                '<button type="button" class="btn btn-theme btn-br-sm btn-sm proceed-to-checkout ' + classGoToCheckout + '">Checkout</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            );
        }

        $('#modal-cart-table').DataTable({
            "processing": true,
            paging: false,
            searching: false,
            ordering: false,
            responsive: true,
            language: {
                sEmptyTable: "Your cart is empty"
            },
            'info': false,
            'createdRow': function (row, data, dataIndex, cells) {
                if (typeof $(row).find('input[name="quantity"]').attr('data-id') !== 'undefined') {
                    var id = $(row).find('input[name="quantity"]').attr('data-id'),
                        price = $(row).find('input[name="quantity"]').attr('data-price');
                    $(row).attr({
                        'data-id': id,
                        'data-price': price
                    });
                    $(cells[3]).addClass('product-total').attr('data-id', id);
                    $(cells[0]).addClass('photo');
                    $(cells[1]).addClass('item-name');
                }
            },
            "drawCallback": function (settings) {
                $.fn.dataTable.tables({
                    visible: true, 
                    api: true
                }).columns.adjust();
            }
        });

        var drawTable = function () {
            $('#modal-cart-table').DataTable().clear();
            var products = ProductManager.getAllProducts();
            $.each(products, function () {
                var total = this.quantity * this.price;
                $('#modal-cart-table').DataTable().row.add([
                    '<div class="img-wrapper po-relative">' +
                        '<a href="' + this.url + '"><img src="'+this.image+'?'+new Date().getTime()+'" alt="'+this.name+'" class="img-fluid cart-product-image"/></a>' +
                        '<a href="javascript:void(0);" class="' + classProductRemove + '"><i class="bi bi-x-circle"></i></a>' +
                    '</div>',
                    this.name + '<br>@' + options.currencySymbol +' '+ MathHelper.getRoundedNumber(this.price),
                    '<div class="quantity-area">'+
                        '<button type="button" class="reduce items"><i class="bi bi-dash"></i></button>' +
                        '<input type="text" name="quantity" value="' + this.quantity + '" min="1" class="quantity-selector '+classProductQuantity+'" data-id="'+this.id+'" data-price="'+this.price+'">'+
                        '<button type="button" class="increase items"><i class="bi bi-plus"></i></button>' +
                    '</div>',
                    MathHelper.getRoundedNumber(total)
                ]);
            });
            $('#modal-cart-table').DataTable().row.add([
                '',
                '',
                '<div class="text-right"><strong>Subtotal</strong></div>',
                '<strong class="' + classSubTotal + '">' +options.currencySymbol + MathHelper.getRoundedNumber(ProductManager.getTotalExclusivePrice())+ '</strong>'
            ]);
            $('#modal-cart-table').DataTable().row.add([
                '',
                '',
                '<div class="text-right"><strong>VAT</strong></div>',
                '<strong class="' + classTaxesTotal + '">' +options.currencySymbol + MathHelper.getRoundedNumber(ProductManager.getTotalTaxes())+ '</strong>'
            ]);
            $('#modal-cart-table').DataTable().row.add([
                '',
                '',
                '<div class="text-right"><strong>Total</strong></div>',
                '<strong class="' + classGrandTotal + '">' +options.currencySymbol + MathHelper.getRoundedNumber(ProductManager.getTotalPrice())+ '</strong>'
            ]);
            $('#modal-cart-table').DataTable().draw();

            showSubTotal();
            showGrandTotal();
            showDiscountPrice();
        };

        var showModal = function () {
            drawTable();
            $("#" + idCartModal).modal('show');
        };

        var updateCart = function () {
            $.each($("." + classProductQuantity), function () {
                var id = $(this).closest("tr").data("id");
                ProductManager.updateProduct(id, $(this).val());
            });
        };
        var showSubTotal = function () {
            $("." + classSubTotal).text(options.currencySymbol + ' ' + MathHelper.getRoundedNumber(ProductManager.getTotalExclusivePrice()));
        };
        var showGrandTotal = function () {
            $("." + classGrandTotal).text(options.currencySymbol + ' ' + MathHelper.getRoundedNumber(ProductManager.getTotalPrice()));
        };
        var showDiscountPrice = function () {
            $("#" + idDiscountPrice).text(options.currencySymbol + MathHelper.getRoundedNumber(options.getDiscountPrice(ProductManager.getAllProducts(), ProductManager.getTotalPrice(), ProductManager.getTotalQuantity())));
        };
        var showItemCount = function () {
            var items_ = '';
            if (ProductManager.getTotalQuantity() == 1) {
                items_ = ' ('+ ProductManager.getTotalQuantity() +' item)';
            }
            else {
                items_ = ' ('+ ProductManager.getTotalQuantity() +' items)';
            }
            $('.' + classCartArea).find('.item-count').text(items_);
        };

        var showTotalTaxes = function () {
            $("." + classTaxesTotal).text(options.currencySymbol + ' '+ MathHelper.getRoundedNumber(ProductManager.getTotalTaxes()));
        };

        var drawDataTable = function () {
            $.each(products, function () {
                var total = this.quantity * this.price;
                $('#cart-page-table').DataTable().row.add([
                    '<div class="img-wrapper">' +
                        '<a href="' + this.url + '"><img src="'+this.image+'?'+new Date().getTime()+'" alt="'+this.name+'" class="img-fluid cart-product-image"/></a>' +
                        '<a href="javascript:void(0);" class="' + classProductRemove + '"><i class="bi bi-x-circle"></i></a>' +
                    '</div>',
                    '<a href="' + this.url + '">' + this.name + '</a><br>@' + options.currencySymbol +' '+ MathHelper.getRoundedNumber(this.price),
                    '<div class="quantity-area">'+
                        '<button type="button" class="reduce items"><i class="bi bi-dash"></i></button>' +
                        '<input type="text" name="quantity" value="' + this.quantity + '" min="1" class="quantity-selector ' + classProductQuantity + '" data-id="'+this.id+'" data-price="'+this.price+'">'+
                        '<button type="button" class="increase items"><i class="bi bi-plus"></i></button>' +
                    '</div>',
                    MathHelper.getRoundedNumber(total)
                ]);
            });
            $('#cart-page-table').DataTable().row.add([
                '',
                '',
                '<div class="text-right"><strong>Total</strong></div>',
                '<strong class="' + classGrandTotal + '">' +options.currencySymbol + MathHelper.getRoundedNumber(ProductManager.getTotalPrice())+ '</strong>',
                ''
            ]);
            $('#cart-page-table').DataTable().draw();
        };

        var drawHeaderCart = function () {
            var products = ProductManager.getAllProducts();
            $('.cart-contents ul').find('li').remove();
            $('.cart-contents').find('.alert').remove();
            if (products.length > 0) {
                $.each(products, function () {
                    var item = $('#header-product-item').clone().removeAttr('id').removeClass('hide');
                    $(item).attr('data-id', this.id);
                    $(item).find('img').attr({
                        'src': this.image,
                        'alt': this.name
                    }).end().find('.product-name').find('a').text(this.name).end();
                    $(item).find('.product-name, .product-image').find('a').attr({
                        'href': this.url
                    });
                    $(item).find('.quantity').text(this.quantity).end()
                    .find('.unit-price').text(MathHelper.getRoundedNumber(this.price)).end()
                    .find('.remove-from-cart').addClass(options.classProductRemove);
                    $('.cart-contents ul').append(item); 
                });
                $('.header-cart-total, .header-cart-buttons').show(500);
                $('.cart-contents').find('.alert').remove();
                showSubTotal();
                showTotalTaxes();
                showGrandTotal();
            }
            else {
                $('.header-cart-total, .header-cart-buttons').hide(500);
                $('.cart-contents').append('<p>No products in the cart.</p>');
            }
        };

        var updateDataQuantity = function () {
            if ($('body').find('.addProductToCart, .product-quantity')) {
                var id = $('.addProductToCart').attr('data-id');
                var products = ProductManager.getAllProducts();
                $.each(products, function () {
                    if (id == this.id) {
                        $('.addProductToCart[data-id="'+id+'"]').attr('data-quantity', this.quantity);
                        $('.product-quantity[data-id="'+id+'"]').val(this.quantity);
                    }
                });   
            }
        };

        if ($('body').find('.' + classCartArea)) {
            showItemCount();
            if (ProductManager.getTotalQuantity() > 0) {
                $('.empty-cart-alert').addClass('hide');
                $('.cart-table-area').removeClass('hide');
                var products = ProductManager.getAllProducts();
                drawDataTable();
            }
            else {
                $('.empty-cart-alert').removeClass('hide');
                $('.cart-table-area').addClass('hide');
            }
        }

        if ($('body').find('.cart-contents')) {            
            drawHeaderCart();
        }

        if ($('body').find('.checkout-form')) {
            for (var i = 0; i < $('.checkout-form').length; i++) {
                var form = $('.checkout-form').eq(i);
                if (ProductManager.getTotalQuantity() > 0) {
                    var controller = $(form).find('[name="city_name"]');
                    var products = ProductManager.getAllProducts();
                    $(form).find('[name="currency_code"]').val(options.currencySymbol);
                    $.each(products, function (k, v) {
                        var product_input = '<input name="item_id[]" type="hidden" value="'+v.id+'">',
                            quantity_input = '<input name="quantity[]" type="hidden" value="'+v.quantity+'">',
                            price_input = '<input name="unit_price[]" type="hidden" value="'+v.price+'" data-item-id="' + v.id + '">',
                            name_input = '<input name="item[]" type="hidden" value="'+v.name+'">',
                            vat_input = '<input name="vat[]" type="hidden" value="'+v.vat+'">';
                        $(name_input).insertAfter(controller);
                        $(price_input).insertAfter(controller); 
                        $(quantity_input).insertAfter(controller);
                        $(product_input).insertAfter(controller);
                        $(vat_input).insertAfter(controller);
                    });
                }   
            }
        }

        if ($('body').find('.order-details')) {
            if (ProductManager.getTotalQuantity() > 0) {
                var products = ProductManager.getAllProducts();
                
                $.each(products, function (k, v) {
                    var row = $('#order-item-template').clone().removeAttr('id').removeClass('d-none');
                    $(row).find('img').attr({
                        'src': v.image,
                        'alt': v.name
                    });
                    $(row).find('.order-item-title').text(v.name);
                    $(row).find('.order-item-price').text(v.currency+' '+MathHelper.getRoundedNumber(v.price * v.quantity)).attr('data-item-id', v.id);
                    $(row).find('.item-counter').text(v.quantity);
                    $('.order-details').append(row);
                });
                var row = $('#order-item-template').clone().removeAttr('id').removeClass('d-none').addClass('m-b-0');
                $(row).prepend('<div class="col-12"><hr></div>');
                $(row).find('img').remove();
                $(row).find('.order-item-title').replaceWith('<p class="order-item-title m-b-0 text-right font-medium">Subtotal: </p>');
                $(row).find('.order-item-price').addClass('font-medium invoice-sub-total').text(options.currencySymbol+' '+MathHelper.getRoundedNumber(ProductManager.getTotalExclusivePrice()));
                $(row).find('.item-counter').remove();
                $('.order-details').append(row);
                if (ProductManager.getTotalTaxes() > 0) {
                    var row = $('#order-item-template').clone().removeAttr('id').removeClass('d-none').addClass('m-b-0');
                    $(row).find('img').remove();
                    $(row).find('.order-item-title').replaceWith('<p class="order-item-title m-b-0 text-right font-medium">VAT: </p>');
                    $(row).find('.order-item-price').addClass('font-medium invoice-total-tax').text(options.currencySymbol+' '+MathHelper.getRoundedNumber(ProductManager.getTotalTaxes()));
                    $(row).find('.item-counter').remove();
                    $('.order-details').append(row);
                }

                if (ProductManager.getTotalPrice() > 0) {
                    var row = $('#order-item-template').clone().removeAttr('id').removeClass('d-none').addClass('m-b-0');
                    $(row).prepend('<div class="col-12"><hr></div>');
                    $(row).find('img').remove();
                    $(row).find('.order-item-title').replaceWith('<p class="order-item-title m-b-0 text-right font-bold">Total:</p>');
                    $(row).find('.order-item-price').addClass('font-bold font-18 cart-total invoice-total').text(options.currencySymbol+' '+MathHelper.getRoundedNumber(ProductManager.getTotalPrice()));
                    $(row).find('.item-counter').remove();
                    $('.order-details').append(row);
                }
            }      
        }

        if ($('body').find('.product-options')) {
            updateDataQuantity();
        } 

        /* EVENT */

        if (options.affixCartIcon) {
            var cartIconBottom = $cartIcon.offset().top * 1 + $cartIcon.css("height").match(/\d+/) * 1;
            var cartIconPosition = $cartIcon.css('position');
            $(window).scroll(function () {
                $(window).scrollTop() >= cartIconBottom ? $cartIcon.addClass(classAffixMyCartIcon) : $cartIcon.removeClass(classAffixMyCartIcon);
            });
        }

        $cartIcon.click(function () {
            options.showCheckoutModal ? showModal() : options.clickOnCartIcon($cartIcon, ProductManager.getAllProducts(), ProductManager.getTotalPrice(), ProductManager.getTotalQuantity());
        });

        $(document).on("input", "." + classProductQuantity, function () {
            var price = $(this).closest("tr").data("price");
            var id = $(this).closest("tr").data("id");
            var quantity = $(this).val();
        
            $('body').find('.' + classProductTotal + '[data-id="'+id+'"]').text(options.currencySymbol + MathHelper.getRoundedNumber(price * quantity));
            $('body').find('.' + classProductQuantity + '[data-id="'+id+'"]').val($(this).val());
            $('body').find('.addProductToCart[data-id="'+id+'"]').attr('data-quantity', quantity);
            ProductManager.updateProduct(id, quantity);
            $("." + classTaxesTotal).text(options.currencySymbol + MathHelper.getRoundedNumber(ProductManager.getTotalTaxes()));
        
            $cartBadge.text(ProductManager.getTotalQuantity());
            
            showItemCount();
            showSubTotal();
            showGrandTotal();
            showDiscountPrice();
            drawHeaderCart();
        });
      
        $(document).on('keypress', "." + classProductQuantity, function (evt) {
            if (evt.keyCode == 38 || evt.keyCode == 40) {
                return;
            }
            evt.preventDefault();
        });
      
        $(document).on('click', "." + classProductRemove, function () {
            var parent = null;
            if ($(this).closest('tr').length > 0) {
                parent = $(this).closest('tr');
            }
            if ($(this).closest('li').length > 0) {
                parent = $(this).closest('li');
            }
            var id = $(parent).attr('data-id');
            ProductManager.removeProduct(id);
            $cartBadge.text(ProductManager.getTotalQuantity());
            showItemCount();
            drawHeaderCart();
            showSubTotal();
            showGrandTotal();
            showDiscountPrice();
            $('#cart-page-table').DataTable().row($('#cart-page-table').find('tr[data-id="'+id+'"]')).remove().draw();
            $('#modal-cart-table').DataTable().row($('#modal-cart-table').find('tr[data-id="'+id+'"]')).remove().draw();
        });
      
        $(document).on('click', "." + classCheckoutCart, function () {
            var products = ProductManager.getAllProducts();
            if (!products.length) {
                $("#" + idEmptyCartMessage).fadeTo('fast', 0.5).fadeTo('fast', 1.0);
                return;
            }
            updateCart();
            var isCheckedOut = options.checkoutCart(ProductManager.getAllProducts(), ProductManager.getTotalPrice(), ProductManager.getTotalQuantity());
            if (isCheckedOut !== false) {
                ProductManager.clearProduct();
                $cartBadge.text(ProductManager.getTotalQuantity());
                $("#" + idCartModal).modal("hide");
            }
        });

        $(document).on('click', '.' + classGoToCheckout, function (e) {
            var options = OptionManager.getOptions();
            e.preventDefault();
            window.location.replace(options.site_url +'checkout');
        });

        $('#checkout-form').formValidation({

        }).on('success.form.fv', function(e) {
            e.preventDefault();
            var formObj = $(this);
            var formURL = formObj.attr("action");
            if(window.FormData !== undefined){
                var formData = new FormData(this);
                $.ajax({
                    beforeSend: function(){
                        $(".preloader").fadeIn();
                    },
                    complete: function(){
                        $(".preloader").fadeOut();
                    },
                    type: 'POST',
                    url: formURL,
                    data: formData,
                    dataType: 'json',
                    contentType: false,
                    cache: false,
                    processData: false,
                    success: function(data, textStatus, jqXHR){                        
                        setTimeout(function(){
                            bootbox.alert({
                                title: data.title,
                                message: data.message,
                                buttons: {
                                    ok: {
                                        label: 'Ok',
                                        className: 'btn-sm btn-theme'
                                    }
                                }
                            });
                        }, 250);
                        if(parseInt(data.status) == 1){
                            $(formObj).formValidation('resetForm'); 
                            $(formObj).each(function(){
                                this.reset();
                            });
                            $('.order-area').hide('slow');
                            $('.thank-you').show('slow');
                            $("html,body").animate({
                                scrollTop: 0
                            }, 700);
                            var isCheckedOut = options.checkoutCart(ProductManager.getAllProducts(), ProductManager.getTotalPrice(), ProductManager.getTotalQuantity());
                            if (isCheckedOut !== false) {
                                ProductManager.clearProduct();
                                $cartBadge.text(ProductManager.getTotalQuantity());
                                $('.order-details').find('.row').remove();
                                drawHeaderCart();
                            }
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        bootbox.alert({
                            title: '<span class="text-danger"><span class="bi bi-exclamation-triangle-fill"></span> Error!</span>',
                            message: JSON.parse(jqXHR.responseText).message,
                            buttons: {
                                ok: {
                                    label: 'Ok',
                                    className: 'btn-sm btn-theme'
                                }
                            }
                        });
                    }
                });
            }
        });
      
        $(document).on('click', '.addToCart', function () {
            var id = $(this).attr('data-id'),
                name = $(this).attr('data-name'),
                availability = $(this).attr('data-availability'),
                price = $(this).attr('data-price'),
                exclusive_price = $(this).attr('data-exclusive_price'),
                vat_amount = $(this).attr('data-vat_amount'),
                quantity = $(this).attr('data-quantity'),
                image = $(this).attr('data-image'),
                vat = $(this).attr('data-vat'),
                currency = $(this).attr('data-currency'),
                url = $(this).attr('data-url');

            if (availability == 1) {
                options.clickOnAddToCart($(this));        
                ProductManager.setProduct(id, name, availability, price, exclusive_price, vat_amount, quantity, image, vat, currency, url);
                $cartBadge.text(ProductManager.getTotalQuantity());
                drawHeaderCart();
                updateDataQuantity();            
                options.afterAddOnCart(ProductManager.getAllProducts(), ProductManager.getTotalPrice(), ProductManager.getTotalQuantity());
            }
            else {
                bootbox.alert({
                    title: '<i class="fa fa-info"></i> Notice',
                    message: 'Product is out of stock.',
                    buttons: {
                        ok: {
                            label: 'Ok',
                            className: 'btn-sm btn-theme'
                        }
                    }
                });
            }
        });

        $(document).on('change', 'select[name="city"]', function () {
            var shipping_fees = $('.checkout-form').find('[name="shipping_fees"]').val();
            $('.shipping-fees').text(options.currencySymbol +' '+ MathHelper.getRoundedNumber(shipping_fees));
            var total = parseFloat(shipping_fees) + ProductManager.getTotalPrice();
            $('.cart-total').text(options.currencySymbol +' '+ MathHelper.getRoundedNumber(total));
        });

        $(document).on('change', 'input[name="include_shipping"]', function () {
            if ($('input[name="include_shipping"]').is(':checked')) {
                var shipping_fees = $('.checkout-form').find('[name="shipping_fees"]').val();
                $('.shipping-fees').text(MathHelper.getRoundedNumber(shipping_fees));
                var total = parseFloat(shipping_fees) + ProductManager.getTotalPrice();
                $('.cart-total').text(options.currencySymbol +' '+ MathHelper.getRoundedNumber(total));
            } 
            else {
                var shipping_fees = 0;
                $('.shipping-fees').text(MathHelper.getRoundedNumber(shipping_fees));
                var total = parseFloat(shipping_fees) + ProductManager.getTotalPrice();
                $('.cart-total').text(options.currencySymbol +' '+ MathHelper.getRoundedNumber(total));
            }
        });
        
        $(document).on('click', '.reduce', function () {
            var input = $(this).closest('.quantity-area').find('input[name="quantity"]');
            var quantity = $(input).val(),
                id = $(input).attr('data-id');
            if (quantity > 1) {
                quantity--;
                if (!isNaN(quantity)) {
                    $(input).val(quantity);
                    $('.addToCart[data-id="'+id+'"]').attr('data-quantity', quantity);
                    ProductManager.updateProduct(id, quantity);
                    $("." + classTaxesTotal).text(options.currencySymbol + MathHelper.getRoundedNumber(ProductManager.getTotalTaxes()));
                
                    $cartBadge.text(ProductManager.getTotalQuantity());
                    var product =  ProductManager.getProduct(id);
                    if (product) {
                        $('body').find('.' + classProductTotal + '[data-id="'+id+'"]').text(options.currencySymbol + MathHelper.getRoundedNumber(product.price * product.quantity));
                        $('body').find('input[name="quantity"][data-id="'+id+'"]').val(product.quantity);   
                    }
                    
                    showItemCount();
                    showSubTotal();
                    showGrandTotal();
                    showDiscountPrice();
                    drawHeaderCart();
                }
            }
        });

        $(document).on('click', '.increase', function () {
            var input = $(this).closest('.quantity-area').find('input[name="quantity"]');
            var quantity = $(input).val(),
                id = $(input).attr('data-id');
            quantity++;
            if (!isNaN(quantity)) {
                $(input).val(quantity);
                $('.addToCart[data-id="'+id+'"]').attr('data-quantity', quantity);
                ProductManager.updateProduct(id, quantity);
                $("." + classTaxesTotal).text(options.currencySymbol + MathHelper.getRoundedNumber(ProductManager.getTotalTaxes()));
            
                $cartBadge.text(ProductManager.getTotalQuantity());
                var product =  ProductManager.getProduct(id);
                if (product) {
                    $('body').find('.' + classProductTotal + '[data-id="'+id+'"]').text(MathHelper.getRoundedNumber(product.price * product.quantity));
                    $('body').find('input[name="quantity"][data-id="'+id+'"]').val(product.quantity);   
                }
                
                showItemCount();
                showSubTotal();
                showGrandTotal();
                showDiscountPrice();
                drawHeaderCart();
            }
        });
    };

    $.fn.Cart = function (userOptions) {
        OptionManager.loadOptions(userOptions);
        loadCartEvent(this.selector);
        return this;
    };

    $.fn.getCartItems = function () {
        return ProductManager.getAllProducts();
    };

    $.fn.emptyCart = function () {
        OptionManager.loadOptions();
        ProductManager.clearProduct();
        var options = OptionManager.getOptions();
        var $cartBadge = $("." + options.classCartBadge);
        $cartBadge.text(ProductManager.getTotalQuantity());
        $('.order-details').find('.row').remove();  
        $('#modal-cart-table').DataTable().destroy();   
        $('.addToCart').Cart();
    };
});