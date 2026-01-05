-- 创建购物网站数据库
-- 如果数据库已存在，先删除
DROP DATABASE IF EXISTS shopping;

-- 创建数据库
CREATE DATABASE shopping CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE shopping;

-- 创建产品表
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL COMMENT '产品名称',
    current_price DECIMAL(10, 2) NOT NULL COMMENT '当前价格',
    original_price DECIMAL(10, 2) DEFAULT NULL COMMENT '原价',
    discount_text VARCHAR(10) DEFAULT NULL COMMENT '折扣文字（如：6折）',
    image_url VARCHAR(500) NOT NULL COMMENT '产品图片URL',
    description TEXT COMMENT '产品描述',
    rating DECIMAL(2, 1) DEFAULT 4.9 COMMENT '评分',
    comment_count INT DEFAULT 0 COMMENT '评论数',
    sold_count INT DEFAULT 0 COMMENT '已售数量',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) COMMENT '产品表';

-- 创建订单表（基础结构）
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_number VARCHAR(50) UNIQUE NOT NULL COMMENT '订单号',
    customer_name VARCHAR(100) NOT NULL COMMENT '客户姓名',
    customer_phone VARCHAR(20) NOT NULL COMMENT '客户电话',
    customer_email VARCHAR(100) COMMENT '客户邮箱',
    delivery_method VARCHAR(50) NOT NULL COMMENT '配送方式',
    delivery_address TEXT COMMENT '配送地址',
    total_amount DECIMAL(10, 2) NOT NULL COMMENT '订单总金额',
    status ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending' COMMENT '订单状态',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) COMMENT '订单表';

-- 创建订单详情表
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL COMMENT '订单ID',
    product_id INT NOT NULL COMMENT '产品ID',
    product_name VARCHAR(255) NOT NULL COMMENT '产品名称（快照）',
    product_price DECIMAL(10, 2) NOT NULL COMMENT '购买时价格',
    quantity INT NOT NULL COMMENT '购买数量',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
) COMMENT '订单详情表';

-- 显示创建结果
SHOW TABLES;
