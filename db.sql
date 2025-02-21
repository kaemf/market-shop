-- Создание базы данных
CREATE DATABASE shop;

-- Использование базы данных
USE shop;

-- Создание таблицы categories
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Создание таблицы products
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Заполнение таблицы categories
INSERT INTO categories (name) VALUES
('Электроника'),
('Одежда'),
('Книги'),
('Игрушки'),
('Спорт');

-- Заполнение таблицы products
INSERT INTO products (name, description, price, image, category_id) VALUES
('Смартфон', 'Современный смартфон с отличными характеристиками.', 599.99, 'images/smartphone.jpg', 1),
('Легкая куртка', 'Куртка для весеннего и осеннего времени.', 49.99, 'images/jacket.jpg', 2),
('Книга "Война и мир"', 'Роман Льва Толстого о жизни в России.', 19.99, 'images/war_and_peace.jpg', 3),
('Конструктор LEGO', 'Конструктор для детей от 5 лет.', 29.99, 'images/lego.jpg', 4),
('Футбольный мяч', 'Качественный мяч для игры в футбол.', 29.99, 'images/football.jpg', 5);
