function loadProducts() {
    if (isLoading) return;
    isLoading = true;

    $.ajax({
        url: '../includes/get_products.php',
        method: 'GET',
        dataType: 'json',
        data: {
            page: currentPage,
            limit: productsPerPage,
            sort: sort,
            order: order,
            query: query ? query : '',
            category_id: selectedCategory ? selectedCategory : ''
        },
        success: function(products) {
            if (currentPage ===1 ){
                $('#product-list').empty();
            }
            console.log(`sort: ${sort}, order: ${order}, query: ${query}, page: ${currentPage}, limit: ${productsPerPage}, products: ${products.length}`);
            if (!products.length) {
                $(window).off('scroll', checkScroll);
                return;
            }
            products.forEach(function (product) {
                $('#product-list').append(`
                    <div class="product card mb-4" style="width: 18rem;">
                    <img src="${imgPath}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <div class="info-in-card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                        </div>
                        <div class="price-and-buttons">
                            <p class="price">Цена: <strong>${product.price}₴</strong></p>
                            <div class="d-flex gap-2">
                                <button class="btn btn-primary add-to-cart" data-id="${product.id}">В корзину</button>
                                <a href="product.php?id=${product.id}" class="btn btn-outline-secondary">Подробнее</a>
                            </div>
                        </div>
                    </div>
                </div>
                `);
            });

            currentPage++;
        },
        error: function(xhr, status, error) {
            console.error('Ошибка при загрузке продуктов:', error);
        },
        complete: function() {
            isLoading = false;
        }
    });
    
}

function loadCategories() {
    $.ajax({
        url: '../includes/get_categories.php',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $('#category-list').empty();
            try {
                if (Array.isArray(data)) {
                    data.forEach(function (category) {
                        $('#category-list').append(`
                            <div class="category" data-id="${category.id}">${category.name}</div>
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
    const windowHeight = $(window).height();
    const documentHeight = $(document).height();
    const scrollY = $(window).scrollTop();

    if (scrollY + windowHeight >= documentHeight - 100) {
        loadProducts(sort, order);
    }
}

function updateCartCount() {
    $.ajax({
        url: '../includes/get_cart_count.php',
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.count !== undefined) {
                $('#cart-count').text(response.count);
            }
        },
        error: function(xhr, status, error) {
            console.error('Ошибка при получении количества товаров в корзине:', error);
        }
    });
}

function updateCartTotal(total, clear) {
    const before = parseFloat($('.cart-total').text());
    const newTotal = clear ? 0 : before - total;
    $('.cart-total').text(`${newTotal.toFixed(2)} грн.`);
}
