const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// 中間件
app.use(cors()); // 允许跨域请求
app.use(express.json()); // 解析 JSON 请求體

// 设置 CSP 頭以允许 DevTools 和本地資源
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'; connect-src 'self' http://localhost:3000; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:;");
    next();
});

app.use(express.static(path.join(__dirname))); // 靜態文件服务（可以直接訪問 HTML、CSS、JS 文件）

// 特殊處理 home.html 以確保 CSP 頭
app.get('/home.html', (req, res) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'; connect-src 'self' http://localhost:3000; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:;");
    res.sendFile(path.join(__dirname, 'home.html'));
});

// Chrome DevTools 支持檢查
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
    res.json({
        "webSocketDebuggerUrl": "ws://localhost:3000/devtools/page/1"
    });
});

// MySQL 連接配置
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'oitmis',
    database: 'shopping'
};

// 創建數據庫連接池
const pool = mysql.createPool(dbConfig);

// 獲取所有產品
app.get('/api/products', (req, res) => {
    const query = 'SELECT * FROM products ORDER BY id';

    pool.query(query, (error, results) => {
        if (error) {
            console.error('查詢產品失敗:', error);
            res.status(500).json({ error: '數據庫產品失敗' });
            return;
        }

        res.json({
            success: true,
            count: results.length,
            data: results
        });
    });
});

// 根据 ID 獲取單个產品
app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const query = 'SELECT * FROM products WHERE id = ?';

    pool.query(query, [productId], (error, results) => {
        if (error) {
            console.error('查詢產品失敗:', error);
            res.status(500).json({ error: '數據庫查詢失敗' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: '产品不存在' });
            return;
        }

        res.json({
            success: true,
            data: results[0]
        });
    });
});

// 搜索產品
app.get('/api/search', (req, res) => {
    const searchTerm = req.query.q || '';
    const query = `
        SELECT * FROM products
        WHERE name LIKE ?
        ORDER BY id
    `;

    const searchPattern = `%${searchTerm}%`;

    pool.query(query, [searchPattern], (error, results) => {
        if (error) {
            console.error('搜索產品失敗:', error);
            res.status(500).json({ error: '數據查詢失敗' });
            return;
        }

        res.json({
            success: true,
            count: results.length,
            data: results
        });
    });
});

// 創建訂單
app.post('/api/orders', (req, res) => {
    const { customer_name, customer_phone, cart } = req.body;

    if (!customer_name || !customer_phone || !cart || !cart.products || cart.products.length === 0) {
        res.status(400).json({ error: '缺少必要信息' });
        return;
    }

    // 生成订单号（時間戳 + 隨機數）
    const orderNumber = 'ORD' + Date.now() + Math.floor(Math.random() * 1000);
    const totalAmount = cart.totalPrice;

    // 插入訂單表
    const orderQuery = `
        INSERT INTO orders (order_number, customer_name, customer_phone, delivery_method, total_amount, status)
        VALUES (?, ?, ?, ?, ?, 'pending')
    `;

    pool.query(orderQuery, [orderNumber, customer_name, customer_phone, '自行取貨', totalAmount], (error, orderResult) => {
        if (error) {
            console.error('創建訂單失敗:', error);
            res.status(500).json({ error: '創建訂單失敗' });
            return;
        }

        const orderId = orderResult.insertId;

        // 插入訂單詳情
        const itemPromises = cart.products.map(product => {
            return new Promise((resolve, reject) => {
                const itemQuery = `
                    INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity)
                    VALUES (?, ?, ?, ?, ?)
                `;
                pool.query(itemQuery, [
                    orderId,
                    product.id,
                    product.name,
                    product.current_price,
                    product.quantity
                ], (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                }); ㄕ
            });
        });

        // 等待所有訂單詳情插入完成
        Promise.all(itemPromises)
            .then(() => {
                res.json({
                    success: true,
                    order_id: orderId,
                    order_number: orderNumber,
                    message: '訂單創建成功'
                });
            })
            .catch((error) => {
                console.error('創建訂單詳情失敗:', error);
                res.status(500).json({ error: '創建訂單詳情失敗' });
            });
    });
});

// 獲取訂單列表
app.get('/api/orders', (req, res) => {
    const query = `
        SELECT id, order_number, customer_name, total_amount, status, created_at
        FROM orders
        ORDER BY created_at DESC
    `;

    pool.query(query, (error, results) => {
        if (error) {
            console.error('獲取訂單列表失敗:', error);
            res.status(500).json({ error: '數據庫查詢失敗' });
            return;
        }

        res.json({
            success: true,
            count: results.length,
            data: results
        });
    });
});

// 獲取訂單詳情
app.get('/api/orders/:id', (req, res) => {
    const orderId = req.params.id;

    // 獲取訂單基本訊息
    const orderQuery = `
        SELECT * FROM orders WHERE id = ?
    `;

    pool.query(orderQuery, [orderId], (error, orderResults) => {
        if (error) {
            console.error('獲取訂單失敗:', error);
            res.status(500).json({ error: '數據庫查詢失敗' });
            return;
        }

        if (orderResults.length === 0) {
            res.status(404).json({ error: '訂單不存在' });
            return;
        }

        const order = orderResults[0];

        // 獲取訂單詳情
        const itemsQuery = `
            SELECT * FROM order_items WHERE order_id = ?
        `;

        pool.query(itemsQuery, [orderId], (error, itemsResults) => {
            if (error) {
                console.error('獲取訂單詳情失敗:', error);
                res.status(500).json({ error: '數據庫查詢失敗' });
                return;
            }

            res.json({
                success: true,
                data: {
                    order: order,
                    items: itemsResults
                }
            });
        });
    });
});

// 啟動瀏覽器
app.listen(PORT, () => {
    console.log(`\n========================================`);
    console.log(`🚀 瀏覽器啟動成功！`);
    console.log(`========================================`);
    console.log(`📍 瀏覽器地址: http://localhost:${PORT}`);
    console.log(`🌐 靜態文件訪問: http://localhost:${PORT}/home.html`);
    console.log(`🔌 API 端点:`);
    console.log(`   - GET /api/products          (獲取所有產品)`);
    console.log(`   - GET /api/products/:id      (獲取單個產品)`);
    console.log(`   - GET /api/search?q=關鍵字    (搜索產品)`);
    console.log(`========================================\n`);
});

// 錯誤處理
process.on('uncaughtException', (err) => {
    console.error('未捕獲的異常:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('未處理的 Promise 拒絕:', reason);
});
