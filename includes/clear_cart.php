<?php
session_start();

if (isset($_SESSION['cart'])) {
    unset($_SESSION['cart']);
}

echo json_encode(['success' => true]);
?>
