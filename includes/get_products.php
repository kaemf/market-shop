<?php
include 'db.php';

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
$offset = ($page - 1) * $limit;

$allowedSortColumns = ['name', 'price', 'id'];
$sort = isset($_GET['sort']) && in_array($_GET['sort'], $allowedSortColumns) ? $_GET['sort'] : 'name';

$order = isset($_GET['order']) && in_array($_GET['order'], ['asc', 'desc']) ? $_GET['order'] : 'asc';

$category_id = isset($_GET['category_id']) ? (int)$_GET['category_id'] : null;

if ($category_id) {
    $stmt = $pdo->prepare("SELECT * FROM products WHERE category_id = ?");
    $stmt->execute([$category_id]);
} else {
    $stmt = $pdo->query("SELECT * FROM products");
}

$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

$query = isset($_GET['query']) ? trim($_GET['query']) : '';
if (!empty($query)) {
    $products = array_filter($products, function ($product) use ($query) {
        return stripos($product['name'], $query) !== false;
    });
}

usort($products, function ($a, $b) use ($sort, $order) {
    return ($order === 'asc') ? strnatcasecmp($a[$sort], $b[$sort]) : strnatcasecmp($b[$sort], $a[$sort]);
});

$totalProducts = count($products);
$paginatedProducts = array_slice($products, $offset, $limit);

$response = [
    'total' => $totalProducts,
    'page' => $page,
    'limit' => $limit,
    'products' => array_values($paginatedProducts)
];

echo json_encode($paginatedProducts);
?>
