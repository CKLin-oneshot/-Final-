const mysql = require('mysql2');

const config = {
    host: 'localhost',
    user: 'root',
    password: 'oitmis',
    database: 'shopping'
};

const connection = mysql.createConnection(config);

console.log('正在連接數據庫...');

connection.connect((error) => {
    if (error) {
        console.error('❌ 數據庫連接失敗:', error.message);
        console.log('\n請檢查：');
        console.log('1. MySQL 服務是否已啟動');
        console.log('2. 用戶名和密碼是否正確');
        console.log('3. 數據庫 "shopping" 是否已創建');
        console.log('4. 執行了 init.sql 和 insert_sample_data.sql 腳本');
        process.exit(1);
    }

    console.log('✅ 數據庫連接成功！');

    // 測試產品數據
    const query = 'SELECT id, name, current_price, original_price FROM products LIMIT 3';

    connection.query(query, (error, results, fields) => {
        if (error) {
            console.error('❌ 查詢失敗:', error.message);
            process.exit(1);
        }

        console.log('\n📦 產品數據查詢結果:');
        console.log('='.repeat(60));

        results.forEach((product, index) => {
            console.log(`\n${index + 1}. ${product.name}`);
            console.log(`   當前價格: $${product.current_price}`);
            if (product.original_price) {
                console.log(`   原價: $${product.original_price}`);
            }
        });

        console.log('\n' + '='.repeat(60));
        console.log('✅ 數據庫測試完成！');

        connection.end();
    });
});
