<?php
$host = 'localhost';
$dbname = 'shop';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Получаем запрос поиска
    $query = isset($_GET['query']) ? $_GET['query'] : '';

    // Подготавливаем SQL-запрос
    $stmt = $pdo->prepare("SELECT * FROM products WHERE name LIKE :query OR description LIKE :query");
    $stmt->execute(['query' => "%$query%"]);

    // Получаем результаты
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Возвращаем результаты в формате JSON
    echo json_encode($products);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
