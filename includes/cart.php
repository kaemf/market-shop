<?php
session_start();
$servername = "localhost"; // ваш сервер
$username = "root"; // ваш пользователь
$password = ""; // ваш пароль
$dbname = "shop"; // ваша база данных

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$cart = isset($_SESSION['cart']) ? $_SESSION['cart'] : [];
$totalPrice = 0;

include '../templates/header.php';
echo '<div class="container mt-5">';
echo '<h2 class="mb-4">Корзина</h2>';

if (empty($cart)) {
    echo '<div class="alert alert-info">Ваша корзина пуста.</div>';
} else {
    echo '<table class="table table-bordered">';
    echo '<thead class="thead-light">';
    echo '<tr>';
    echo '<th scope="col">Товар</th>';
    echo '<th scope="col">Цена</th>';
    echo '<th scope="col">Действие</th>';
    echo '</tr>';
    echo '</thead>';
    echo '<tbody>';

    foreach ($cart as $productId) {
        $query = "SELECT * FROM products WHERE id = $productId";
        $result = $conn->query($query);
        $product = $result->fetch_assoc();
        if ($product) {
            $totalPrice += $product['price'];
            echo '<tr>';
            echo '<td>';
            echo "<div class=\"d-flex align-items-center\">";
            echo "<img src=\"{$product['image']}\" class=\"img-thumbnail me-3\" style=\"width: 100px; height: auto;\" alt=\"{$product['name']}\">";
            echo "<span>{$product['name']}</span>";
            echo '</div>';
            echo '</td>';
            echo "<td>{$product['price']} грн</td>";
            echo "<td><button class=\"btn btn-danger\" onclick='removeFromCart($productId)'>Убрать</button></td>";
            echo '</tr>';
        }
    }

    echo '</tbody>';
    echo '</table>';
    echo "<h4>Общая сумма: <strong>$totalPrice грн</strong></h4>";
    echo "<button class=\"btn btn-warning mt-3\" onclick='clearCart()'>Очистить корзину</button>";
}
echo '</div>'; // Закрытие контейнера
include '../templates/footer.php';
$conn->close();
?>
