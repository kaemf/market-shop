<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "shop";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$cart = isset($_SESSION['cart']) ? $_SESSION['cart'] : [];
$totalPrice = 0;

$productCounts = array_count_values($cart);

include '../templates/header.php';
echo '<div class="container mt-5">';
echo '<h2 class="mb-4">Корзина</h2>';

if (empty($cart)) {
    echo '<div class="alert alert-info">Ваша корзина пуста.</div>';
} else {
    echo '<div class="alert alert-info" style="display: none;">Ваша корзина пуста.</div>';
    echo '<table class="table table-bordered">';
    echo '<thead class="thead-light">';
    echo '<tr>';
    echo '<th scope="col">Товар</th>';
    echo '<th scope="col">Цена</th>';
    echo '<th scope="col">Количество</th>';
    echo '<th scope="col">Действие</th>';
    echo '</tr>';
    echo '</thead>';
    echo '<tbody>';

    foreach ($productCounts as $productId => $count) {
        $query = "SELECT * FROM products WHERE id = $productId";
        $result = $conn->query($query);
        $product = $result->fetch_assoc();
        if ($product) {
            $totalPrice += $product['price'] * $count;
            echo '<tr>';
            echo '<td>';
            echo "<div class=\"d-flex align-items-center\">";
            echo "<img src=\"https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEyL3JtNjA3LTNkYmQtc2NlbmUwNC1hLW1vY2t1cF8zLmpwZw.jpg\" class=\"img-thumbnail me-3\" style=\"width: 100px; height: auto;\" alt=\"{$product['name']}\">";
            echo "<span>{$product['name']}</span>";
            echo '</div>';
            echo '</td>';
            echo "<td>{$product['price']} грн</td>";
            echo "<td class=\"count-of-product\">x{$count}</td>";
            echo "<td><button class=\"btn btn-danger remove-from-cart\" data-id=\"{$product['id']}\" data-price=\"{$product['price']}\">Убрать</button></td>";
            echo '</tr>';
        }
    }

    echo '</tbody>';
    echo '</table>';
    echo "<h4 class=\"total-price-container\">Общая сумма: <strong class=\"cart-total\">$totalPrice грн</strong></h4>";
    echo "<button class=\"btn btn-warning mt-3 full-clear-cart\">Очистить корзину</button>";
}
echo '</div>';
include '../templates/footer.php';
$conn->close();
?>
