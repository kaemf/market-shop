<?php
session_start();

// Очищаем корзину
if (isset($_SESSION['cart'])) {
    unset($_SESSION['cart']);
}

// Возвращаем успешный ответ в формате JSON
echo json_encode(['success' => true]);
?>
