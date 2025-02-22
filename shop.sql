-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 22, 2025 at 10:25 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Электроника'),
(2, 'Одежда'),
(3, 'Книги'),
(4, 'Игрушки'),
(5, 'Спорт');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) NOT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`, `category_id`) VALUES
(1, 'Смартфон', 'Современный смартфон с отличными характеристиками.', 599.99, 'images/smartphone.jpg', 1),
(2, 'Легкая куртка', 'Куртка для весеннего и осеннего времени.', 49.99, 'images/jacket.jpg', 2),
(3, 'Книга \"Война и мир\"', 'Роман Льва Толстого о жизни в России.', 19.99, 'images/war_and_peace.jpg', 3),
(4, 'Конструктор LEGO', 'Конструктор для детей от 5 лет.', 29.99, 'images/lego.jpg', 4),
(5, 'Футбольный мяч', 'Качественный мяч для игры в футбол.', 29.99, 'images/football.jpg', 5),
(6, 'Ноутбук', 'Мощный ноутбук для работы и учебы.', 999.99, 'images/laptop.jpg', 1),
(7, 'Платье', 'Стильное платье для вечеринок.', 59.99, 'images/dress.jpg', 2),
(8, 'Игровая приставка', 'Консоль для игр с множеством игр в комплекте.', 299.99, 'images/gaming_console.jpg', 4),
(9, 'Смарт-часы', 'Умные часы с функциями отслеживания активности.', 199.99, 'images/smartwatch.jpg', 1),
(10, 'Кроссовки', 'Удобные кроссовки для активного отдыха.', 79.99, 'images/sneakers.jpg', 5),
(11, 'Планшет', 'Легкий и мощный планшет для работы и развлечений.', 349.99, 'images/tablet.jpg', 1),
(12, 'Набор для рисования', 'Полный набор для художников.', 39.99, 'images/art_set.jpg', 4),
(13, 'Кофемашина', 'Автоматическая кофемашина для приготовления кофе.', 499.99, 'images/coffee_machine.jpg', 1),
(14, 'Книга \"1984\"', 'Роман Джорджа Оруэлла о тоталитарном обществе.', 14.99, 'images/1984.jpg', 3),
(15, 'Наушники', 'Беспроводные наушники с хорошим звуком.', 89.99, 'images/headphones.jpg', 1),
(16, 'Флешка', 'USB флеш-накопитель на 64 ГБ.', 19.99, 'images/flash_drive.jpg', 1),
(17, 'Миксер', 'Электрический миксер для выпечки.', 49.99, 'images/mixer.jpg', 1),
(18, 'Рюкзак', 'Удобный рюкзак для путешествий.', 39.99, 'images/backpack.jpg', 2),
(19, 'Книга \"Мастер и Маргарита\"', 'Роман Михаила Булгакова о добре и зле.', 19.99, 'images/master_and_margarita.jpg', 3),
(20, 'Игрушечный автомобиль', 'Радиоуправляемый игрушечный автомобиль.', 29.99, 'images/toy_car.jpg', 4),
(21, 'Спортивная сумка', 'Сумка для тренировок и спортзала.', 29.99, 'images/sport_bag.jpg', 5),
(22, 'Книга \"Собачье сердце\"', 'Роман Михаила Булгакова о собаке, ставшей человеком.', 14.99, 'images/dog_heart.jpg', 3),
(23, 'Тетрадь', 'Линейная тетрадь на 80 листов.', 2.99, 'images/notebook.jpg', 3),
(24, 'Холодильник', 'Энергосберегающий холодильник с морозильной камерой.', 799.99, 'images/refrigerator.jpg', 1),
(25, 'Микроволновая печь', 'Микроволновая печь с грилем.', 299.99, 'images/microwave.jpg', 1),
(26, 'Портативный зарядник', 'Портативное зарядное устройство на 10000 мАч.', 29.99, 'images/portable_charger.jpg', 1),
(27, 'Книга \"Тихий Дон\"', 'Роман Михаила Шолохова о жизни донских казаков.', 19.99, 'images/quiet_don.jpg', 3),
(28, 'Настольная игра', 'Настольная игра для всей семьи.', 39.99, 'images/board_game.jpg', 4),
(29, 'Сковорода', 'Антипригарная сковорода диаметром 28 см.', 24.99, 'images/frying_pan.jpg', 1),
(30, 'Солнечный зарядник', 'Зарядное устройство от солнечной энергии.', 49.99, 'images/solar_charger.jpg', 1),
(31, 'Мягкая игрушка', 'Мягкая игрушка для детей.', 19.99, 'images/plush_toy.jpg', 4),
(34, 'Клавиатура', 'Игровая клавиатура с подсветкой.', 89.99, 'images/keyboard.jpg', 1),
(35, 'Смартфон', 'Смартфон с улучшенной камерой.', 699.99, 'images/new_smartphone.jpg', 1),
(36, 'Куртка', 'Зимняя куртка для холодного времени года.', 99.99, 'images/winter_jacket.jpg', 2),
(37, 'Роман \"Анна Каренина\"', 'Роман Льва Толстого о любви и судьбе.', 24.99, 'images/anna_karenina.jpg', 3),
(38, 'Настольный теннис', 'Комплект для игры в настольный теннис.', 49.99, 'images/table_tennis.jpg', 5),
(39, 'Набор для вышивания', 'Комплект для рукоделия.', 34.99, 'images/embroidery_set.jpg', 4),
(40, 'Шлем для велосипедиста', 'Защитный шлем для велоспорта.', 39.99, 'images/bike_helmet.jpg', 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=580;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
