$(document).ready(function () {
    $.ajax({
        url: '../includes/get_cart_count.php', // Укажите правильный URL для вашего PHP-скрипта
        method: 'GET',
        dataType: 'json',
        success: function (data) {$('#cart-count').text(data.count);}
    })

    // Добавляем обработчик события прокрутки
    $(window).on('scroll', checkScroll);

    // Загрузка товаров
    $.ajax({
        url: '../includes/get_products.php',
        method: 'GET',
        dataType: 'json',
        data: {
            sort: 'name',
            order: 'asc'
        },
        success: function (data) {
            $('#product-list').empty(); // Очищаем предыдущие товары
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
        },
        error: function (xhr, status, error) {
            console.error('Ошибка при загрузке товаров:', error);
        }
    });
    

    // Поиск товаров
    $('#search').on('input', function () {
        const query = $(this).val();
        $.ajax({
            url: '../includes/search_products.php',
            method: 'GET',
            data: { query: query },
            success: function (data) {
                console.log(data); // Логируем данные для отладки
                $('#product-list').empty(); // Очищаем предыдущие товары
                try {
                    // Пробуем разобрать JSON
                    if (typeof data === 'string') {
                        data = JSON.parse(data);
                    }
            
                    if (Array.isArray(data)) {
                        data.forEach(function (product) {
                            $('#product-list').append(`
                                <div class="product">
                                    <img src="${product.image}" alt="${product.name}">
                                    <h3>${product.name}</h3>
                                    <p>${product.description}</p>
                                    <p>Цена: ${product.price}₴</p>
                                    <button class="add-to-cart" data-id="${product.id}">В корзину</button>
                                </div>
                            `);
                        });
                    } else {
                        console.error('Ошибка: ответ не является массивом:', data);
                    }
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
        $('#product-list').empty(); // Очистить предыдущие продукты
        loadProducts(isLoading, currentPage, productsPerPage, $(this).val(), $('#order').val());
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
