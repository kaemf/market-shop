<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['product_id'])) {
    $product_id = intval($_POST['product_id']);

    if (in_array($product_id, $_SESSION['cart'])) {
        $key = array_search($product_id, $_SESSION['cart']);

        if ($key !== false) {
            array_splice($_SESSION['cart'], $key, 1);

            $cart_empty = empty($_SESSION['cart']);

            $quantity_in_cart = count(array_keys($_SESSION['cart'], $product_id));

            echo json_encode([
                "status" => "success",
                "message" => "Товар удалён из корзины",
                "cart_empty" => $cart_empty,
                "quantity_in_cart" => $quantity_in_cart
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => "Товар не найден в корзине"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Товар не найден в корзине"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Некорректный запрос"]);
}
?>