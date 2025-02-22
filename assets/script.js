let i = 0;

$(document).ready(function () {
    $.ajax({
        url: '../includes/get_cart_count.php', // Укажите правильный URL для вашего PHP-скрипта
        method: 'GET',
        dataType: 'json',
        success: function (data) {$('#cart-count').text(data.count);}
    })

    // Добавляем обработчик события прокрутки
    $(window).on('scroll', checkScroll);
    scrollEventAttached = true;

    // Загрузка товаров
    // $.ajax({
    //     url: '../includes/get_products.php',
    //     method: 'GET',
    //     dataType: 'json',
    //     data: {
    //         sort: 'name',
    //         order: 'asc'
    //     },
    //     success: function (data) {
    //         $('#product-list').empty(); // Очищаем предыдущие товары
    //         data.forEach(function (product) {
    //             $('#product-list').append(`
    //                 <div class="product card mb-4" style="width: 18rem;">
    //                 <img src="${product.image}" class="card-img-top" alt="${product.name}">
    //                 <div class="card-body">
    //                     <h5 class="card-title">${product.name}</h5>
    //                     <p class="card-text">${product.description}</p>
    //                     <p class="price">Цена: <strong>${product.price}₴</strong></p>
    //                     <button class="btn btn-primary add-to-cart" data-id="${product.id}">В корзину</button>
    //                 </div>
    //             </div>
    //             `);
    //         });
    //     },
    //     error: function (xhr, status, error) {
    //         console.error('Ошибка при загрузке товаров:', error);
    //     }
    // });

    if (i === 0){
        loadProducts();
        i++;
    }

    console.log('products loaded')
    

    // Поиск товаров
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
                console.log(data); // Логируем данные для отладки
                $('#product-list').empty(); // Очищаем предыдущие товары
                try {
                    if (!data.length){
                        console.log('Продукты закончились');
                        $(window).off('scroll', checkScroll); // Удаляем обработчик скролла
                        return;
                    }
                    data.forEach(function (product) {
                        $('#product-list').append(`
                            <div class="product card mb-4" style="width: 18rem;">
                            <img src="${product.image}" class="card-img-top" alt="${product.name}">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${product.description}</p>
                                <p class="price">Цена: <strong>${product.price}₴</strong></p>
                                <button class="btn btn-primary add-to-cart" data-id="${product.id}">В корзину</button>
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

    // Добавление товара в корзину
    $(document).on('click', '.add-to-cart', function() {
        $.ajax({
            url: '../includes/add_to_cart.php', // путь к вашему PHP скрипту
            method: 'POST',
            dataType: 'json',
            data: { product_id: $(this).data('id') },
            success: function(response) {
                if (response.success) {
                    updateCartCount(); // функция для обновления количества товаров в корзине
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
        currentPage = 1; // Сбросить на первую страницу
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

    // Куки
    $('#cookie-accept').on('click', function () {
        $('#cookie-popup').hide();
        localStorage.setItem('cookiesAccepted', 'true');
    });

    // Проверка куки
    if (!localStorage.getItem('cookiesAccepted')) {
        $('#cookie-popup').show();
    }

    // Инициализация
    loadCategories();
});
