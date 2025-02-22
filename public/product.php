<?php
include '../includes/db.php';

if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    die("Ошибка: неверный ID товара.");
}

$productId = (int)$_GET['id'];
$stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
$stmt->execute([$productId]);
$product = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$product) {
    die("Товар не найден.");
}

$pageTitle = $product['name'];
include '../templates/header.php';
?>
<body>

<style>
    .product-container {
        display: flex;
        margin-bottom: 20px;
        justify-content: center;
        gap: 50px;
        align-items: center;
    }

    .product-image {
        max-width: 100%;
        overflow: hidden;
    }

    .product-image img {
        width: 100%;
        height: auto;
    }

    .product-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        padding: 10px;
    }

    .product-info > .container-main-info h1 {
        font-size: 32px;
        margin: 0;
    }

    .product-info > .container-main-info p {
        font-size: 20px;
        margin: 10px 0;
    }

    .container-main-info{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .price{
        font-size: 20px;
    }
</style>

<div class="product-container d-flex">
    <div class="product-image" style="flex: 0 0 400px;">
        <img src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEyL3JtNjA3LTNkYmQtc2NlbmUwNC1hLW1vY2t1cF8zLmpwZw.jpg" alt="<?= htmlspecialchars($product['name']) ?>" class="img-fluid">
    </div>
    <div class="product-info">
        <div class="container-main-info">
            <h1><?= htmlspecialchars($product['name']) ?></h1>
            <p><?= htmlspecialchars($product['description']) ?></p>
        </div>
        <div class="price-with-button">
            <p class="price">Цена: <strong><?= htmlspecialchars($product['price']) ?>₴</strong></p>
            <button class="btn btn-primary add-to-cart" data-id="<?= $productId ?>" style="padding: 10px 30px">В корзину</button>
        </div>
    </div>
</div>

</body>
<?php include '../templates/footer.php'; ?>

</html>