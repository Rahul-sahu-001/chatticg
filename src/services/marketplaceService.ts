import { CartItem, Product } from '../types';
import { PRODUCTS } from '../data/products';

export interface OrderReceipt {
  orderId: string;
  items: CartItem[];
  totalINR: number;
  artisanShareINR: number;
  date: string;
  shippingAddress: string;
  paymentMode: string;
  status: 'Confirmed' | 'Dispatched' | 'Delivered';
}

export const marketplaceService = {
  getProducts(): Product[] {
    return PRODUCTS;
  },

  getProductById(id: string): Product | undefined {
    return PRODUCTS.find(p => p.id === id);
  },

  getCart(): CartItem[] {
    try {
      const stored = localStorage.getItem('dharohar_cart');
      if (stored) return JSON.parse(stored);
    } catch {}
    return [
      { product: PRODUCTS[0], quantity: 1 } // Pre-loaded with Bastar Dokra Deer for demo
    ];
  },

  saveCart(cart: CartItem[]) {
    try {
      localStorage.setItem('dharohar_cart', JSON.stringify(cart));
    } catch {}
  },

  addToCart(product: Product, quantity = 1): CartItem[] {
    const cart = this.getCart();
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }
    this.saveCart(cart);
    return cart;
  },

  removeFromCart(productId: string): CartItem[] {
    const cart = this.getCart().filter(item => item.product.id !== productId);
    this.saveCart(cart);
    return cart;
  },

  clearCart() {
    this.saveCart([]);
  },

  createMockOrder(items: CartItem[], address: string): OrderReceipt {
    const totalINR = items.reduce((sum, item) => sum + item.product.priceINR * item.quantity, 0);
    const artisanShareINR = Math.round(totalINR * 0.85); // 85% goes to artisans

    const receipt: OrderReceipt = {
      orderId: 'ORD-CG-' + Math.floor(100000 + Math.random() * 900000),
      items,
      totalINR,
      artisanShareINR,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      shippingAddress: address || 'Civil Lines, Raipur, Chhattisgarh',
      paymentMode: 'DEMO UPI / Instant Heritage Pay',
      status: 'Confirmed'
    };

    this.clearCart();
    return receipt;
  }
};
