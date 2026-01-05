// 購物車管理

// 購物車數據
// {
//   products: [
//     {
//       id: 1,
//       name: '產品名',
//       current_price: 100,
//       original_price: 120,
//       image_url: '...',
//       quantity: 2
//     }
//   ],
//   totalItems: 2,
//   totalPrice: 200
// }

const CART_KEY = 'shopping_cart';

class CartManager {
    // 獲取購物車數據
    static getCart() {
        const cart = localStorage.getItem(CART_KEY);
        if (!cart) {
            return { products: [], totalItems: 0, totalPrice: 0 };
        }
        return JSON.parse(cart);
    }

    // 保存購物車數據
    static saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    // 添加商品到購物車
    static addProduct(product, quantity = 1) {
        const cart = this.getCart();

        // 檢查商品是否已存在於購物車
        const existingProductIndex = cart.products.findIndex(p => p.id === product.id);

        if (existingProductIndex !== -1) {
            // 如果已存在，增加數量
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            // 如果不存在，添加新產品
            cart.products.push({
                id: product.id,
                name: product.name,
                current_price: product.current_price,
                original_price: product.original_price,
                discount_text: product.discount_text,
                image_url: product.image_url,
                quantity: quantity
            });
        }

        // 重新計算總數
        this.updateCartStats(cart);
        this.saveCart(cart);
        return cart;
    }

    // 從購物車删除商品
    static removeProduct(productId) {
        const cart = this.getCart();
        cart.products = cart.products.filter(p => p.id !== productId);
        this.updateCartStats(cart);
        this.saveCart(cart);
        return cart;
    }

    // 更新商品數量
    static updateQuantity(productId, quantity) {
        const cart = this.getCart();
        const product = cart.products.find(p => p.id === productId);

        if (product) {
            if (quantity <= 0) {
                // 如果數量小於等於0，則移除商品
                cart.products = cart.products.filter(p => p.id !== productId);
            } else {
                product.quantity = quantity;
            }
            this.updateCartStats(cart);
            this.saveCart(cart);
        }
        return cart;
    }

    // 清空購物車
    static clearCart() {
        const emptyCart = { products: [], totalItems: 0, totalPrice: 0 };
        this.saveCart(emptyCart);
        return emptyCart;
    }

    // 更新購物車統計數據
    static updateCartStats(cart) {
        let totalItems = 0;
        let totalPrice = 0;

        cart.products.forEach(product => {
            totalItems += product.quantity;
            totalPrice += product.current_price * product.quantity;
        });

        cart.totalItems = totalItems;
        cart.totalPrice = totalPrice;
    }

    // 更新購物車徽章顯示
    static updateCartBadge() {
        const cart = this.getCart();
        const cartBadges = document.querySelectorAll('.cart-num');

        cartBadges.forEach(badge => {
            badge.textContent = cart.totalItems;
        });
    }

    // 顯示添加成功訊息
    static showAddSuccessMessage(element) {
        const successDiv = element.closest('.product-text').querySelector('.add-success');
        if (successDiv) {
            successDiv.classList.remove('hidden-element');
            setTimeout(() => {
                successDiv.classList.add('hidden-element');
            }, 1500);
        }
    }
}

// 導出供其他腳本使用
window.CartManager = CartManager;
