<?php
$id = $_GET['id'];
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Товар</title>
    <link rel="stylesheet" href="css/styles.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="js/scripts.js" defer></script>
</head>
<body>
    <header>
        <h1>Товар</h1>
        <div id="cart-icon">
            Корзина (<span id="cart-count">0</span>)
        </div>
    </header>

    <div id="product-detail"></div>

    <script>
        $(document).ready(function() {
            $.ajax({
                url: 'get_product.php',
                method: 'GET',
                data: { id: '<?php echo $id; ?>' },
                success: function(data) {
                    $('#product-detail').html(data);
                }
            });
        });
    </script>
</body>
</html>
