-- 插入示例产品数据
USE shopping;

-- 清空现有数据（如果需要重新插入）
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM products;

-- 插入产品数据
INSERT INTO products (name, current_price, original_price, discount_text, image_url, description, rating, comment_count, sold_count) VALUES
(
    'Turtle Beach Stealth 500 無線多平台電競耳機',
    2640.00,
    4400.00,
    '6折',
    'images/product_images/product_image1.jpg',
    '<strong>Turtle Beach Stealth 500 無線多平台電競耳機</strong><br><br>詳情：<br>商品名稱：Turtle Beach® Stealth™ 500 無線遊戲耳機 型號：TBS-5101-05<br>內容物：Turtle Beach® Stealth 500 無線遊戲耳機、USB無線發射器、0.7m / 2.3ft 充電線（USB-A 至 USB-C）、快速使用手冊 保固：12+3個月（寄回判定人為損壞除外) 貨源：原廠公司貨 原廠授權：合法授權代理 智選家<br><br>技術規格:<br>藍牙版本：5.2 驅動單體尺寸：40mm 驅動單體種類：Dynamic (動圈) 響應頻率：20-20kHz 是否支援App：O 麥克風數量：1 耳機續航力：40小時 耳機電池容量：500mAh 單耳機重量：233g (±5g) 耳機尺寸：21.49X18X9cm(包裝)、19.5x17.3x9cm(耳機) 支援手機：藍牙 支援XBOX：無線接收器 支援PS：無線接收器 支援NS：無線接收器',
    4.9,
    87,
    200
),
(
    'MSI 微星微星平台r7八核',
    91499.00,
    NULL,
    NULL,
    'images/product_images/product_image2.jpg',
    '高效能 R7 八核心電競桌機，頂級顯卡配置，滿足所有高要求遊戲需求。配備最新 Ryzen 7 處理器，32GB DDR4 記憶體，RTX 4080 顯卡，1TB NVMe SSD，專為遊戲愛好者打造的頂級性能組合。',
    4.8,
    45,
    156
),
(
    'Switch2 NS2 主機 台灣公司貨原廠保固 - 含 瑪利歐賽車世界 實體片',
    12000.00,
    15000.00,
    '8折',
    'images/product_images/product_image3.jpg',
    '次世代遊戲主機，台灣公司貨原廠保固。內含瑪利歐賽車世界實體片，全家同樂首選！<br><br>主機特色：<br>- 7吋OLED螢幕<br>- 64GB內建儲存容量<br>- 續航力提升至4.5-9小時<br>- 有線LAN連接端子<br>- 音質提升的揚聲器',
    4.9,
    234,
    892
),
(
    '白色美背復古三門二抽二格衣櫃 衣櫥 臥室收納 大容量置物',
    2599.00,
    4180.00,
    '6.2折',
    'images/product_images/product_image4.jpg',
    '簡約美背設計，三門二抽二格大容量收納空間，適合各種臥室風格。<br><br>產品特色：<br>- 優質板材製造，耐用不易變形<br>- 滑軌抽屜，開關順暢<br>- 隱藏式把手設計，簡潔美觀<br>- 可放置大型衣物、被褥<br>- 組裝簡單，附詳細說明書',
    4.6,
    123,
    567
),
(
    'FUJIFILM 富士 FUJINON XF 56mm F1.2 R WR 公司貨 新款預購中',
    31200.00,
    NULL,
    NULL,
    'images/product_images/product_image5.jpg',
    '富士XF系列頂級人像鏡頭，f/1.2大光圈設計，營造夢幻散景效果。全新天氣密封設計，適合各種拍攝環境。<br><br>鏡頭規格：<br>- 焦距：56mm (等效85mm)<br>- 最大光圈：f/1.2<br>- 最小光圈：f/16<br>- 鏡片構成：8群11枚<br>- 光圈葉片：7片<br>- 濾鏡口徑：62mm',
    4.9,
    67,
    234
),
(
    '一體式杯蓋不銹鋼真空保溫保冷杯(SM-GA60)600ml 旋蓋式',
    1088.00,
    1190.00,
    '9.1折',
    'images/product_images/product_image6.jpg',
    '雙層不銹鋼真空結構，6小時保溫保冷效果佳。一體式杯蓋設計，攜帶方便不漏水。<br><br>產品特色：<br>- 600ml大容量<br>- 304不銹鋼材質<br>- 雙層真空保溫<br>- 一體式杯蓋<br>- 防滑杯底<br>- 清洗簡單',
    4.7,
    89,
    445
),
(
    '雙開門電動超跑',
    9999.00,
    NULL,
    NULL,
    'images/product_images/product_image7.jpg',
    '1:18比例合金車模，電動開門功能，精緻內裝，收藏展示兩相宜。',
    4.5,
    23,
    78
),
(
    'NB 復古運動鞋_中性_白銀',
    2384.00,
    2980.00,
    '8折',
    'images/product_images/product_image8.jpg',
    'New Balance經典復古鞋型，透氣網布鞋面，舒適緩震中底，適合日常穿搭。<br><br>特色：<br>- 經典574系列<br>- 透氣網布鞋面<br>- ENY中底緩震<br>- 橡膠大底耐磨<br>- 男女皆可穿著<br>- 多色可選',
    4.6,
    178,
    1234
),
(
    '3色短襪 男短襪 男生襪子 運動襪 撞色 輕薄透氣 棉襪 女生襪 彈性襪 吸汗',
    6.00,
    50.00,
    '1.2折',
    'images/product_images/product_image9.jpg',
    '三色組合裝，純棉材質，輕薄透氣，吸汗不臭腳。男女皆可穿著，多種撞色可選。<br><br>特色：<br>- 100%純棉材質<br>- 轻薄透气面料<br>- 吸汗快乾<br>- 彈性襪口不勒腳<br>- 三色組合裝<br>- 男女適用',
    4.3,
    345,
    5678
),
(
    'PGM Switch Pro S205 手把 無線藍牙手把',
    374.00,
    485.00,
    '7.7折',
    'images/product_images/product_image10.jpg',
    '無線藍牙Switch手把，支援HD震動、陀螺儀、六軸感應，並具備NFC感應功能。<br><br>功能特色：<br>- 無線藍牙連接<br>- HD震動反饋<br>- 內建陀螺儀<br>- 六軸感應<br>- NFC感應<br>- 20小時續航<br>- 快速充電',
    4.4,
    156,
    789
);

-- 显示插入结果
SELECT 'Products inserted successfully!' AS message;
SELECT COUNT(*) AS total_products FROM products;
