<?php
session_start();

$productId = isset($_POST['product_id']) ? (int)$_POST['product_id'] : null;

if ($productId) {
    if (!isset($_SESSION['cart'])) {
        $_SESSION['cart'] = [];
    }
    $_SESSION['cart'][] = $productId;
    echo json_encode(['success' => true, 'count' => count($_SESSION['cart'])]);
} else {
    echo json_encode(['success' => false]);
}
?>
