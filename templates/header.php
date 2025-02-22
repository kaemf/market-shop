<?php
    $pageTitle = isset($pageTitle) ? $pageTitle : "Магазин"; 
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../assets/style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <title><?= htmlspecialchars($pageTitle) ?></title>
</head>
<body>
<header class="header bg-dark text-white d-flex justify-content-between align-items-center p-3">
    <div class="d-flex justify-content-between align-items-center w-100 px-5">
        <h1 class="m-0" onclick="window.location.href = '../public/index.php'" style="cursor: pointer">Магазин</h1>
        <div class="cart">
            <a href="../includes/cart.php" class="btn btn-outline-light position-relative">
                Корзина
                <span id="cart-count" class="badge bg-danger position-absolute top-0 start-100 translate-middle">0</span>
            </a>
        </div>
    </div>
</header>



