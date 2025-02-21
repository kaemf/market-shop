function loadProducts(sort, order) {
    if (isLoading) return; // Если уже идет загрузка, выходим
    isLoading = true;

    $.ajax({
        url: '../includes/get_products.php', // Укажите правильный URL вашего API
        method: 'GET',
        dataType: 'json',
        data: {
            page: currentPage,
            limit: productsPerPage,
            sort: sort ?? 'name',
            order: order ?? 'asc'
        },
        success: function(products) {
            if (products.length === 0) {
                // Если продуктов нет, не нужно больше загружать
                $(window).off('scroll', checkScroll); // Удаляем обработчик скролла
                return;
            }
            products.forEach(function (product) {
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

            currentPage++; // Переходим к следующей странице
        },
        error: function(xhr, status, error) {
            console.error('Ошибка при загрузке продуктов:', error);
            alert('Произошла ошибка при загрузке продуктов: ' + error.message);
        },
        complete: function() {
            isLoading = false; // Сбрасываем флаг после загрузки
        }
    });
}

// Загрузка категорий
function loadCategories() {
    $.ajax({
        url: '../includes/get_categories.php', // Укажите правильный URL для вашего PHP-скрипта
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $('#category-list').empty(); // Очищаем предыдущие категории
            try {
                if (Array.isArray(data)) {
                    data.forEach(function (category) {
                        $('#category-list').append(`
                            <div class="category">
                                <h3>${category.name}</h3>
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
        error: function (xhr, status, error) {
            console.error('Ошибка при загрузке категорий:', error);
        }
    });
}

function checkScroll(sort, order) {
    const windowHeight = $(window).height(); // Высота окна
    const documentHeight = $(document).height(); // Высота документа
    const scrollY = $(window).scrollTop(); // Положение прокрутки по Y

    // Если пользователь прокрутил почти до конца страницы
    if (scrollY + windowHeight >= documentHeight - 100) {
        loadProducts(sort, order); // Загружаем продукты
    }
}

function updateCartCount() {
    // Получите количество товаров из сессии на сервере
    $.ajax({
        url: '../includes/get_cart_count.php', // путь к вашему PHP скрипту для получения количества товаров в корзине
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.count !== undefined) {
                // Обновите элемент с количеством товаров в корзине
                $('#cart-count').text(response.count); // Предполагаем, что у вас есть элемент с ID cart-count
            }
        },
        error: function(xhr, status, error) {
            console.error('Ошибка при получении количества товаров в корзине:', error);
        }
    });
}

function clearCart() {
    // Отправляем AJAX-запрос для очистки корзины на сервере
    $.ajax({
        url: '../includes/clear_cart.php', // Укажите путь к вашему PHP-скрипту для очистки корзины
        method: 'POST',
        success: function(response) {
            // Проверка успешности операции
            if (response.success) {
                // Обновляем страницу, чтобы показать пустую корзину
                location.reload();
            } else {
                alert('Ошибка при очистке корзины. Попробуйте еще раз.');
            }
        },
        error: function(xhr, status, error) {
            console.error('Ошибка при очистке корзины:', error);
            alert('Произошла ошибка. Попробуйте еще раз.');
        }
    });
}