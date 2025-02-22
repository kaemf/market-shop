<?php
include 'db.php';

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
$offset = ($page - 1) * $limit;

// Разрешённые колонки для сортировки
$allowedSortColumns = ['name', 'price', 'id'];
$sort = isset($_GET['sort']) && in_array($_GET['sort'], $allowedSortColumns) ? $_GET['sort'] : 'name';

// Направление сортировки (ASC или DESC)
$order = isset($_GET['order']) && in_array($_GET['order'], ['asc', 'desc']) ? $_GET['order'] : 'asc';

// 1️⃣ Загружаем ВСЮ базу
$stmt = $pdo->query("SELECT * FROM products");
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

// 2️⃣ Фильтрация по названию
$query = isset($_GET['query']) ? trim($_GET['query']) : '';
if (!empty($query)) {
    $products = array_filter($products, function ($product) use ($query) {
        return stripos($product['name'], $query) !== false;
    });
}

// 3️⃣ Сортировка
usort($products, function ($a, $b) use ($sort, $order) {
    return ($order === 'asc') ? strnatcasecmp($a[$sort], $b[$sort]) : strnatcasecmp($b[$sort], $a[$sort]);
});

// 4️⃣ Пагинация (отрезаем нужный кусок)
$totalProducts = count($products);
$paginatedProducts = array_slice($products, $offset, $limit);

// 6️⃣ Отправляем JSON-ответ
$response = [
    'total' => $totalProducts,
    'page' => $page,
    'limit' => $limit,
    'products' => array_values($paginatedProducts)
];

echo json_encode($paginatedProducts);
?>