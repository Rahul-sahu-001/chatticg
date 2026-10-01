import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { marketplaceService } from '../../services/marketplaceService';
import { ARProductModal } from './ARProductModal';
import {
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Eye,
  Check,
  Star,
  Layers,
  ArrowRight,
  Filter,
  CheckCircle,
  X,
  CreditCard
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const MarketplaceSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [arProduct, setArProduct] = useState<Product | null>(null);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [cartCount, setCartCount] = useState(() => marketplaceService.getCart().length);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const categories = [
    'all',
    'Tribal Art',
    'Handicrafts',
    'Textiles',
    'Decor',
    'Local Food'
  ];

  const filtered = selectedCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.craftCategory === selectedCategory);

  const handleAddToCart = (product: Product) => {
    const updated = marketplaceService.addToCart(product);
    setCartCount(updated.length);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleBuyNow = (product: Product) => {
    marketplaceService.addToCart(product);
    setCheckoutModalOpen(true);
  };

  const handleConfirmOrder = () => {
    const cart = marketplaceService.getCart();
    marketplaceService.createMockOrder(cart, 'Civil Lines, Raipur, Chhattisgarh');
    setCartCount(0);
    setCheckoutSuccess(true);
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setCheckoutSuccess(false);
      setCheckoutModalOpen(false);
    }, 2800);
  };

  return (
    <section id='marketplace' className='py-20 bg-[#07131D] text-[#EEF3F0] relative overflow-hidden'>
      {/* Background radial ambient */}
      <div className='absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#E5A93C]/10 rounded-full blur-[140px] pointer-events-none' />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Header */}
        <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12'>
          <div className='max-w-2xl'>
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5A93C]/20 border border-[#E5A93C]/40 text-[#F3BA54] font-mono text-xs uppercase tracking-widest mb-3'>
              <ShoppingBag className='w-3.5 h-3.5' />
              <span>Indigenous Artisan Marketplace</span>
            </div>
            <h2 className='font-serif text-3xl sm:text-5xl font-light text-white tracking-tight'>
              Authentic Dokra, Kosa Silk & Tribal Masterpieces
            </h2>
            <p className='text-sm sm:text-base text-gray-400 font-light mt-3 leading-relaxed'>
              Direct fair-trade creations crafted by National Award-winning lineages in Bastar, Kondagaon, and Champa. Inspect every item in interactive 3D WebAR before ordering.
            </p>
          </div>

          {/* Cart Status Button */}
          <button
            onClick={() => setCheckoutModalOpen(true)}
            className='px-5 py-2.5 rounded-full glass-panel hover:bg-white/10 text-white text-xs font-mono font-bold border border-white/20 transition-all flex items-center gap-2 self-start cursor-pointer'
          >
            <ShoppingBag className='w-4 h-4 text-[#E5A93C]' />
            <span>Bag ({cartCount})</span>
          </button>
        </div>

        {/* Categories Bar */}
        <div className='flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar'>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer flex-shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#E5A93C] text-[#07131D] font-bold shadow-md shadow-[#E5A93C]/20'
                  : 'glass-panel text-gray-300 hover:text-white border border-white/10'
              }`}
            >
              {cat === 'all' ? 'All Masterpieces' : cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filtered.map(product => (
            <div
              key={product.id}
              className='glass-panel rounded-3xl border border-white/10 hover:border-[#E5A93C]/40 overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group'
            >
              {/* Product Image & Top Overlays */}
              <div className='relative h-64 overflow-hidden'>
                <img
                  src={product.image}
                  alt={product.name}
                  className='w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-[#07131D] via-transparent to-black/30' />

                {/* Top left category badge */}
                <div className='absolute top-3.5 left-3.5 flex items-center gap-2'>
                  <span className='px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-white border border-white/15'>
                    {product.craftCategory}
                  </span>
                  {product.verifiedArtisan && (
                    <span className='px-2 py-0.5 rounded-full bg-emerald-500/80 text-white font-mono text-[9px] font-bold'>
                      VERIFIED ARTISAN
                    </span>
                  )}
                </div>

                {/* Top right AR Preview button */}
                <button
                  onClick={() => setArProduct(product)}
                  className='absolute top-3.5 right-3.5 p-2 rounded-xl bg-black/70 hover:bg-[#E5A93C] text-white hover:text-[#07131D] border border-white/20 transition-all flex items-center gap-1.5 text-xs font-mono font-bold cursor-pointer shadow-md'
                  title='Interactive 3D / AR Preview'
                >
                  <Sparkles className='w-3.5 h-3.5 text-[#E5A93C] group-hover:text-[#07131D]' />
                  <span>3D / AR</span>
                </button>

                {/* Price display */}
                <div className='absolute bottom-3 left-4 right-4 flex items-center justify-between'>
                  <div className='bg-black/70 backdrop-blur-md px-3 py-1 rounded-xl border border-white/15 font-mono text-lg font-bold text-white'>
                    ₹{product.priceINR.toLocaleString()}
                    {product.originalPriceINR && (
                      <span className='text-xs line-through text-gray-400 ml-2'>
                        ₹{product.originalPriceINR.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <span className='text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/30'>
                    {product.impactContribution}% to Artisan
                  </span>
                </div>
              </div>

              {/* Product Body */}
              <div className='p-6 flex-1 flex flex-col justify-between space-y-4'>
                <div>
                  <h3 className='font-serif text-xl font-bold text-white group-hover:text-[#F3BA54] transition-colors leading-snug'>
                    {product.name}
                  </h3>
                  <p className='text-xs text-gray-300 font-light mt-1.5 line-clamp-2 leading-relaxed'>
                    {product.originStory}
                  </p>
                </div>

                {/* Artisan signature */}
                <div className='p-3 rounded-2xl bg-white/5 border border-white/5 text-xs'>
                  <div className='text-gray-400 text-[10px] font-mono uppercase'>Master Craftsman</div>
                  <div className='font-semibold text-white mt-0.5'>{product.artisanName}</div>
                  <div className='text-[11px] text-gray-400'>{product.artisanVillage}</div>
                </div>

                {/* Action Buttons */}
                <div className='pt-2 flex items-center gap-2'>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className='flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 cursor-pointer'
                  >
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={() => handleBuyNow(product)}
                    className='flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#E5A93C] to-[#C2593F] text-[#07131D] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md'
                  >
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AR Modal */}
      {arProduct && <ARProductModal product={arProduct} onClose={() => setArProduct(null)} />}

      {/* Checkout Modal */}
      {checkoutModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200'>
          <div className='relative w-full max-w-md rounded-3xl glass-panel-warm border border-[#E5A93C]/40 p-6 sm:p-8 bg-[#07131D]/98 text-white space-y-5 shadow-2xl'>
            <button
              onClick={() => setCheckoutModalOpen(false)}
              className='absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white'
            >
              <X className='w-4 h-4' />
            </button>

            {!checkoutSuccess ? (
              <>
                <div>
                  <span className='px-2.5 py-0.5 rounded-full bg-[#E5A93C]/20 text-[#F3BA54] font-mono text-[10px] font-bold uppercase'>
                    Direct Fair-Trade Checkout
                  </span>
                  <h3 className='font-serif text-2xl font-bold mt-1'>Artisan Direct Order</h3>
                  <p className='text-xs text-gray-400 mt-1'>
                    Every purchase bypasses commercial middlemen, directly empowering rural indigenous cooperatives.
                  </p>
                </div>

                {/* Items in Cart */}
                <div className='max-h-48 overflow-y-auto custom-scrollbar space-y-2 text-xs'>
                  {marketplaceService.getCart().map((item, idx) => (
                    <div
                      key={idx}
                      className='p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between'
                    >
                      <div className='flex items-center gap-2.5'>
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className='w-9 h-9 rounded-lg object-cover'
                        />
                        <div>
                          <span className='font-semibold text-white block line-clamp-1'>{item.product.name}</span>
                          <span className='text-[10px] text-gray-400 font-mono'>Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className='font-mono font-bold text-white'>
                        ₹{(item.product.priceINR * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className='p-4 rounded-2xl bg-black/40 border border-white/10 font-mono text-xs space-y-1.5'>
                  <div className='flex justify-between text-gray-400'>
                    <span>Artisan Direct Share (85%):</span>
                    <span className='text-emerald-400 font-bold'>Verified Fair Trade</span>
                  </div>
                  <div className='flex justify-between text-base font-bold text-white pt-1 border-t border-white/5'>
                    <span>Total Amount:</span>
                    <span className='text-[#E5A93C]'>
                      ₹{marketplaceService.getCart().reduce((sum, item) => sum + item.product.priceINR * item.quantity, 0).toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleConfirmOrder}
                  className='w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#E5A93C] to-[#C2593F] text-[#07131D] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg'
                >
                  <CreditCard className='w-4 h-4' />
                  <span>Complete Demo Heritage Pay</span>
                </button>
              </>
            ) : (
              <div className='py-8 text-center space-y-3'>
                <div className='w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto'>
                  <CheckCircle className='w-8 h-8' />
                </div>
                <h4 className='font-serif text-2xl font-bold'>Order Confirmed!</h4>
                <p className='text-xs text-gray-300 max-w-sm mx-auto'>
                  Your order has been routed directly to the master artisan guild in Kondagaon. Your Dharohar Pass has been updated with +120 Local Supporter points!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
