let firstTimeRender = 0

$(document).ready(function () {
    $.ajax({
        url: '../includes/get_cart_count.php',
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.count !== undefined) {
                $('.cart-count').text(response.count);
            }
        },
        error: function(xhr, status, error) {
            console.error('Ошибка при получении количества товаров в корзине:', error);
        }
    });
    
    window.onpageshow = function(event) {
        if (event.persisted) {
            updateCartCount();
        }
    };
    updateCartCount();

    $(window).on('scroll', checkScroll);

    if (firstTimeRender === 0){
        loadProducts();
        firstTimeRender++;
    }

    $('#search').on('input', function () {
        currentPage = 1;
        query = $(this).val();
        $.ajax({
            url: '../includes/search_products.php',
            method: 'GET',
            dataType: 'json',
            data: { 
                query: query,
                sort: sort,
                page: currentPage,
                limit: productsPerPage,
                order: order
            },
            success: function (data) {
                $('#product-list').empty();
                try {
                    if (!data.length){
                        $(window).off('scroll', checkScroll);
                        return;
                    }
                    data.forEach(function (product) {
                        $('#product-list').append(`
                            <div class="product card mb-4" style="width: 18rem;">
                            <img src="${imgPath}" class="card-img-top" alt="${product.name}">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${product.description}</p>
                                <p class="price">Цена: <strong>${product.price}₴</strong></p>
                                <div class="d-flex gap-2">
                                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">В корзину</button>
                                    <a href="product.php?id=${product.id}" class="btn btn-outline-secondary">Подробнее</a>
                                </div>
                            </div>
                        </div>
                        `);
                    });
                    currentPage++;
                } catch (e) {
                    console.error('Ошибка при разборе JSON:', e);
                }
            },
            
        });
    });

    $(document).on('click', '.add-to-cart', function() {
        $.ajax({
            url: '../includes/add_to_cart.php',
            method: 'POST',
            dataType: 'json',
            data: { product_id: $(this).data('id') },
            success: function(response) {
                if (response.success) {
                    updateCartCount();
                } else {
                    alert('Ошибка: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Ошибка при добавлении товара в корзину:', error);
                alert('Произошла ошибка. Попробуйте еще раз.');
            }
        });
    });
    
    $('#sort').on('change', function () {
        currentPage = 1;
        $('#product-list').empty();
        const selectedSort = $(this).val().split('_');
        sort = selectedSort[0]; 
        order = selectedSort[1];
        isLoading = false;
        $(window).off('scroll', checkScroll); 
        $(window).on('scroll', checkScroll);
        scrollEventAttached = true;
        loadProducts();
    });

    $('.remove-from-cart').on('click', function () {
        let button = $(this);
        let productId = button.data('id');
        let productPrice = button.data('price');
    
        $.ajax({
            url: '../includes/remove_from_cart.php',
            method: 'POST',
            dataType: 'json',
            data: { product_id: productId },
            success: function(response) {
                if (response.status === 'success') {
                    if (response.quantity_in_cart === 0) {
                        button.closest('tr').remove();
                    }
                    else button.closest('tr').find('.count-of-product').text(`x${response.quantity_in_cart}`);
    
                    if (response.cart_empty) {
                        $('.alert').show();
                        $('.table').hide();
                        $('.total-price-container').hide();
                        $('.full-clear-cart').hide();
                    }
                    
                    updateCartTotal(productPrice);

                    updateCartCount();
                } else {
                    alert('Ошибка: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Ошибка при удалении товара из корзины:', error);
                alert('Произошла ошибка. Попробуйте еще раз.');
            }
        });
    });
    
    
    $('.full-clear-cart').on('click', function () {
        $.ajax({
            url: '../includes/clear_cart.php',
            method: 'POST',
            dataType: 'json',
            success: function(response) {
                $('.alert').show();
                $('.table').hide();
                $('.total-price-container').hide();
                $('.full-clear-cart').hide();
                
                updateCartTotal(0, true);

                updateCartCount();
            },
            error: function(xhr, status, error) {
                console.error('Ошибка при удалении товара из корзины:', error);
                alert('Произошла ошибка. Попробуйте еще раз.');
            }
        });
    });

    $(document).on('click', '.category', function () {
        let categoryId = $(this).data('id');

        if (selectedCategory === categoryId) {
            selectedCategory = '';
            $(this).removeClass('seted');
            $('.category').removeClass('seted');
        } else {
            selectedCategory = categoryId;
            $('.category').removeClass('seted');
            $(this).addClass('seted');
        }

        $(window).off('scroll', checkScroll);
        $(window).on('scroll', checkScroll);

        currentPage = 1;
        $('#product-list').empty();

        loadProducts();
    });

    $('#cookie-accept').on('click', function () {
        $('#cookie-popup').hide();
        localStorage.setItem('cookiesAccepted', 'true');
    });

    if (!localStorage.getItem('cookiesAccepted')) {
        $('#cookie-popup').show();
    }

    loadCategories();
});
