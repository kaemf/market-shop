<div id="cookie-popup" style="display: none;">
    <p>Этот сайт использует куки. <button id="cookie-accept">Принять</button></p>
</div>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Фильтр товаров</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <div class="mt-4 d-flex justify-content-around w-100">
        <div class="row" style="width: 90%;">
            <div class="col-md-3">
                <h5 class="category-title">Категории</h5>
                <aside id="category-list" class="p-3 bg-white shadow rounded"></aside>
            </div>
            <div class="col-md-9">
                <div class="d-flex gap-2 mb-3">
                    <input type="text" id="search" class="form-control" placeholder="Поиск товаров...">
                    <select id="sort" class="form-select">
                        <option value="name_asc">Название (A-Z)</option>
                        <option value="name_desc">Название (Z-A)</option>
                        <option value="price_asc">Цена (дешевле)</option>
                        <option value="price_desc">Цена (дороже)</option>
                        <option value="date_asc">Дата (новые)</option>
                        <option value="date_desc">Дата (старые)</option>
                    </select>
                </div>
                <div id="product-list"></div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

<main>
    <div id="product-list"></div>
</main>