import React, { useState } from 'react';
import { authService, DEMO_USERS } from '../../services/authService';
import { UserRole } from '../../types';
import { bookingService } from '../../services/bookingService';
import { marketplaceService } from '../../services/marketplaceService';
import { tourismLoadService } from '../../services/tourismLoadService';
import {
  LayoutDashboard,
  ShieldCheck,
  Users,
  ShoppingBag,
  Compass,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Award,
  Package,
  Calendar,
  FileText,
  Activity,
  Trees
} from 'lucide-react';

export const DashboardsSection: React.FC = () => {
  const [activeRole, setActiveRole] = useState<UserRole>('admin');
  const [activeUser, setActiveUser] = useState(() => authService.getCurrentUser());

  // Demo verifications queue state for Admin
  const [pendingVerifications, setPendingVerifications] = useState([
    {
      id: 'kyc-01',
      type: 'Guide',
      name: 'Prakash Markam',
      district: 'Dantewada',
      document: 'Tribal Tourism Guide Card & Aadhar',
      status: 'Pending'
    },
    {
      id: 'kyc-02',
      type: 'Artisan Seller',
      name: 'Sunita Bai Dewangan',
      district: 'Janjgir-Champa',
      document: 'Silk Handloom Cooperative Registration',
      status: 'Pending'
    },
    {
      id: 'kyc-03',
      type: 'Experience',
      name: 'Baiga Herbal Foraging Trail',
      district: 'Kabirdham',
      document: 'Gram Sabha Biodiversity Committee NOC',
      status: 'Pending'
    }
  ]);

  const handleRoleSwitch = (role: UserRole) => {
    setActiveRole(role);
    const user = authService.switchRole(role);
    setActiveUser(user);
  };

  const handleApproveKYC = (id: string) => {
    setPendingVerifications(prev =>
      prev.map(v => (v.id === id ? { ...v, status: 'Verified' } : v))
    );
  };

  const handleRejectKYC = (id: string) => {
    setPendingVerifications(prev =>
      prev.map(v => (v.id === id ? { ...v, status: 'Rejected' } : v))
    );
  };

  const userBookings = bookingService.getUserBookings();
  const products = marketplaceService.getProducts();
  const stateStats = tourismLoadService.calculateStatePressureStats();
  const loadList = tourismLoadService.getAllDestinationsLoad();

  return (
    <section id='dashboards' className='py-20 bg-[#061017] text-[#EEF3F0] relative overflow-hidden'>
      {/* Background ambient lighting */}
      <div className='absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#E5A93C]/10 rounded-full blur-[140px] pointer-events-none' />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Header with 4-in-1 Role Switcher */}
        <div className='flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10'>
          <div className='max-w-2xl'>
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5A93C]/20 border border-[#E5A93C]/40 text-[#F3BA54] font-mono text-xs uppercase tracking-widest mb-3'>
              <LayoutDashboard className='w-3.5 h-3.5' />
              <span>Multi-Stakeholder Control Center</span>
            </div>
            <h2 className='font-serif text-3xl sm:text-5xl font-light text-white tracking-tight'>
              Dharohar Platform Dashboards
            </h2>
            <p className='text-sm sm:text-base text-gray-400 font-light mt-3 leading-relaxed'>
              Select your perspective to inspect role-tailored workflows: Tourist reservations, Local Guide assignments, Artisan inventory, or State Tourism Authority oversight.
            </p>
          </div>

          {/* Role Switcher Pill Bar */}
          <div className='flex flex-wrap items-center gap-2 p-1.5 rounded-2xl glass-panel-warm border border-[#E5A93C]/40 self-start lg:self-auto shadow-xl'>
            {(
              [
                { id: 'admin', label: 'State Admin & Analytics', icon: ShieldCheck },
                { id: 'tourist', label: 'Tourist Portal', icon: Compass },
                { id: 'guide', label: 'Local Guide Platform', icon: Users },
                { id: 'seller', label: 'Artisan Seller Hub', icon: ShoppingBag }
              ] as const
            ).map(role => {
              const Icon = role.icon;
              const isActive = activeRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => handleRoleSwitch(role.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#E5A93C] text-[#07131D] shadow-md shadow-[#E5A93C]/20'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className='w-3.5 h-3.5' />
                  <span>{role.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* VIEW 1: STATE ADMIN & TOURISM AUTHORITY DASHBOARD */}
        {/* ------------------------------------------------------------- */}
        {activeRole === 'admin' && (
          <div className='space-y-8 animate-in fade-in duration-200'>
            {/* Top Telemetry Cards */}
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
              <div className='glass-panel p-5 rounded-3xl border border-white/10'>
                <span className='text-[11px] font-mono uppercase text-gray-400 block mb-1'>Live Footfall Monitored</span>
                <span className='font-display text-3xl font-bold text-white'>{stateStats.totalCurrentVisitors}</span>
                <span className='text-xs text-gray-400 block mt-1'>Capacity: {stateStats.totalCapacity} (Safe)</span>
              </div>

              <div className='glass-panel p-5 rounded-3xl border border-white/10'>
                <span className='text-[11px] font-mono uppercase text-emerald-400 block mb-1'>State Green Index</span>
                <span className='font-display text-3xl font-bold text-emerald-400'>{stateStats.greenIndexScore} / 100</span>
                <span className='text-xs text-emerald-300/80 block mt-1'>88% Rural Rupee Retention</span>
              </div>

              <div className='glass-panel p-5 rounded-3xl border border-white/10'>
                <span className='text-[11px] font-mono uppercase text-[#F3BA54] block mb-1'>Active Partners</span>
                <span className='font-display text-3xl font-bold text-white'>1,240</span>
                <span className='text-xs text-gray-400 block mt-1'>540 Artisans • 180 Guides</span>
              </div>

              <div className='glass-panel p-5 rounded-3xl border border-white/10'>
                <span className='text-[11px] font-mono uppercase text-sky-400 block mb-1'>Gross Rural Economy Disbursed</span>
                <span className='font-display text-3xl font-bold text-sky-400'>₹42,85,000</span>
                <span className='text-xs text-gray-400 block mt-1'>Zero Intermediary Leakage</span>
              </div>
            </div>

            {/* Middle Section: Real-time Tourism Pressure Heatmap & Verification Queue */}
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
              {/* Destination Pressure Radar (7 cols) */}
              <div className='lg:col-span-7 glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-4'>
                <div className='flex items-center justify-between border-b border-white/10 pb-4'>
                  <div>
                    <h3 className='font-serif text-xl font-bold text-white flex items-center gap-2'>
                      <Activity className='w-5 h-5 text-[#E5A93C]' />
                      <span>District-Wise Carrying Capacity Radar</span>
                    </h3>
                    <span className='text-xs text-gray-400 font-mono'>Automated Over-tourism Alert Engine</span>
                  </div>
                  <span className='px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold'>
                    REAL-TIME
                  </span>
                </div>

                <div className='space-y-3 max-h-[360px] overflow-y-auto custom-scrollbar pr-1'>
                  {loadList.map(item => {
                    const ratio = Math.round((item.currentVisitors / item.capacityLimit) * 100);
                    return (
                      <div
                        key={item.destinationId}
                        className='p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between'
                      >
                        <div className='min-w-0 flex-1 mr-4'>
                          <div className='flex items-center gap-2'>
                            <span className='font-serif text-base font-semibold text-white truncate'>
                              {item.destinationName}
                            </span>
                            <span className='text-xs text-gray-400 font-mono'>({item.district})</span>
                          </div>
                          <div className='w-full h-2 bg-black/40 rounded-full mt-2 overflow-hidden'>
                            <div
                              className={`h-full rounded-full ${
                                ratio > 75 ? 'bg-rose-500' : ratio > 45 ? 'bg-amber-400' : 'bg-emerald-400'
                              }`}
                              style={{ width: `${ratio}%` }}
                            />
                          </div>
                        </div>

                        <div className='text-right flex-shrink-0'>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              item.currentLevel === 'LOW'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : item.currentLevel === 'MODERATE'
                                ? 'bg-amber-500/20 text-amber-400'
                                : 'bg-rose-500/20 text-rose-400'
                            }`}
                          >
                            {ratio}% ({item.currentLevel})
                          </span>
                          <span className='text-[10px] text-gray-400 font-mono block mt-1'>
                            {item.currentVisitors} / {item.capacityLimit}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* KYC & Experience Verification Approvals (5 cols) */}
              <div className='lg:col-span-5 glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-4'>
                <div className='flex items-center justify-between border-b border-white/10 pb-4'>
                  <div>
                    <h3 className='font-serif text-xl font-bold text-white flex items-center gap-2'>
                      <ShieldCheck className='w-5 h-5 text-emerald-400' />
                      <span>Pending KYC Verifications</span>
                    </h3>
                    <span className='text-xs text-gray-400 font-mono'>1-Click Community Approvals</span>
                  </div>
                  <span className='font-mono text-xs text-[#E5A93C] font-bold'>
                    {pendingVerifications.filter(v => v.status === 'Pending').length} Pending
                  </span>
                </div>

                <div className='space-y-3'>
                  {pendingVerifications.map(item => (
                    <div
                      key={item.id}
                      className='p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2.5'
                    >
                      <div className='flex items-center justify-between'>
                        <span className='px-2 py-0.5 rounded text-[10px] font-mono bg-[#E5A93C]/20 text-[#F3BA54] font-bold'>
                          {item.type}
                        </span>
                        <span
                          className={`text-[10px] font-mono font-bold ${
                            item.status === 'Verified'
                              ? 'text-emerald-400'
                              : item.status === 'Rejected'
                              ? 'text-rose-400'
                              : 'text-amber-400'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <div>
                        <h4 className='font-serif text-base font-bold text-white'>{item.name}</h4>
                        <span className='text-xs text-gray-400 font-mono'>{item.district} District</span>
                        <p className='text-xs text-gray-300 font-light mt-0.5'>{item.document}</p>
                      </div>

                      {item.status === 'Pending' && (
                        <div className='pt-2 flex items-center gap-2'>
                          <button
                            onClick={() => handleApproveKYC(item.id)}
                            className='flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold flex items-center justify-center gap-1 cursor-pointer'
                          >
                            <CheckCircle className='w-3.5 h-3.5' /> Approve
                          </button>
                          <button
                            onClick={() => handleRejectKYC(item.id)}
                            className='flex-1 py-1.5 rounded-lg bg-white/10 hover:bg-rose-600 text-white text-xs font-mono font-bold flex items-center justify-center gap-1 cursor-pointer'
                          >
                            <XCircle className='w-3.5 h-3.5' /> Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 2: TOURIST DASHBOARD */}
        {/* ------------------------------------------------------------- */}
        {activeRole === 'tourist' && (
          <div className='space-y-8 animate-in fade-in duration-200'>
            {/* User Profile Bar */}
            <div className='glass-panel p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6'>
              <div className='flex items-center gap-4'>
                <img
                  src={DEMO_USERS.tourist.avatar}
                  alt={DEMO_USERS.tourist.name}
                  className='w-16 h-16 rounded-2xl object-cover border-2 border-[#E5A93C]'
                />
                <div>
                  <h3 className='font-serif text-2xl font-bold text-white'>{DEMO_USERS.tourist.name}</h3>
                  <span className='text-xs text-[#E5A93C] font-mono'>Level: Explorer (Dharohar Pass)</span>
                  <span className='text-xs text-gray-400 block mt-0.5'>{DEMO_USERS.tourist.location}</span>
                </div>
              </div>
              <div className='flex items-center gap-4 text-center'>
                <div className='p-3 px-5 rounded-2xl bg-white/5 border border-white/10'>
                  <span className='text-[10px] font-mono uppercase text-gray-400 block'>Active Trips</span>
                  <span className='font-display text-2xl font-bold text-white'>1 Confirmed</span>
                </div>
                <div className='p-3 px-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40'>
                  <span className='text-[10px] font-mono uppercase text-emerald-300 block'>Impact Generated</span>
                  <span className='font-display text-2xl font-bold text-emerald-400'>₹4,200</span>
                </div>
              </div>
            </div>

            {/* Bookings Queue */}
            <div className='glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4'>
              <h3 className='font-serif text-2xl font-bold text-white flex items-center gap-2'>
                <Calendar className='w-5 h-5 text-[#E5A93C]' />
                <span>My Active Reservations & Experiences</span>
              </h3>

              <div className='space-y-3'>
                {userBookings.map(bk => (
                  <div
                    key={bk.id}
                    className='p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4'
                  >
                    <div>
                      <div className='flex items-center gap-2'>
                        <span className='px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E5A93C]/20 text-[#F3BA54] uppercase'>
                          {bk.bookingType}
                        </span>
                        <span className='text-xs text-gray-400 font-mono'>ID: {bk.id}</span>
                      </div>
                      <h4 className='font-serif text-xl font-bold text-white mt-1'>{bk.title}</h4>
                      <p className='text-xs text-gray-300 font-light mt-0.5'>
                        Provider: {bk.providerName} • Location: {bk.location}
                      </p>
                    </div>

                    <div className='flex items-center gap-6'>
                      <div className='text-right'>
                        <span className='text-xs font-mono text-gray-400 block'>Date: {bk.date}</span>
                        <span className='font-mono text-lg font-bold text-[#E5A93C]'>
                          ₹{bk.amountINR.toLocaleString()}
                        </span>
                      </div>

                      <span className='px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold'>
                        ✓ {bk.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 3: LOCAL GUIDE PLATFORM */}
        {/* ------------------------------------------------------------- */}
        {activeRole === 'guide' && (
          <div className='space-y-8 animate-in fade-in duration-200'>
            {/* Guide Profile */}
            <div className='glass-panel p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6'>
              <div className='flex items-center gap-4'>
                <img
                  src={DEMO_USERS.guide.avatar}
                  alt={DEMO_USERS.guide.name}
                  className='w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400'
                />
                <div>
                  <div className='flex items-center gap-2'>
                    <h3 className='font-serif text-2xl font-bold text-white'>{DEMO_USERS.guide.name}</h3>
                    <span className='px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold'>
                      KYC VERIFIED
                    </span>
                  </div>
                  <span className='text-xs text-[#E5A93C] font-mono'>Subterranean Cave & Wildlife Naturalist</span>
                  <span className='text-xs text-gray-400 block mt-0.5'>{DEMO_USERS.guide.location}</span>
                </div>
              </div>

              <div className='flex items-center gap-4 text-center'>
                <div className='p-3 px-5 rounded-2xl bg-white/5 border border-white/10'>
                  <span className='text-[10px] font-mono uppercase text-gray-400 block'>Rating</span>
                  <span className='font-display text-2xl font-bold text-[#E5A93C]'>★ 4.96</span>
                </div>
                <div className='p-3 px-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40'>
                  <span className='text-[10px] font-mono uppercase text-emerald-300 block'>Monthly Earnings</span>
                  <span className='font-display text-2xl font-bold text-emerald-400'>₹38,400</span>
                </div>
              </div>
            </div>

            {/* Guide Bookings & Assignments */}
            <div className='glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4'>
              <div className='flex items-center justify-between'>
                <h3 className='font-serif text-2xl font-bold text-white'>Upcoming Guided Expeditions</h3>
                <span className='px-3 py-1 rounded-xl bg-[#E5A93C] text-[#07131D] font-mono text-xs font-bold'>
                  Availability: Open
                </span>
              </div>

              <div className='p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                <div>
                  <span className='px-2.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 font-bold'>
                    CONFIRMED ASSIGNMENT
                  </span>
                  <h4 className='font-serif text-xl font-bold text-white mt-1'>
                    Kutumsar Cave Spelunking & Kanger River Walk
                  </h4>
                  <p className='text-xs text-gray-300'>Traveler: Rahul Verma • Group: 2 Travelers</p>
                </div>
                <div className='text-right'>
                  <span className='font-mono text-lg font-bold text-emerald-400 block'>Payout: ₹1,500</span>
                  <span className='text-xs font-mono text-gray-400'>Date: Oct 20, 2026 (08:30 AM)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 4: ARTISAN SELLER HUB */}
        {/* ------------------------------------------------------------- */}
        {activeRole === 'seller' && (
          <div className='space-y-8 animate-in fade-in duration-200'>
            {/* Seller Profile */}
            <div className='glass-panel p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6'>
              <div className='flex items-center gap-4'>
                <img
                  src={DEMO_USERS.seller.avatar}
                  alt={DEMO_USERS.seller.name}
                  className='w-16 h-16 rounded-2xl object-cover border-2 border-[#E5A93C]'
                />
                <div>
                  <div className='flex items-center gap-2'>
                    <h3 className='font-serif text-2xl font-bold text-white'>{DEMO_USERS.seller.name}</h3>
                    <span className='px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold'>
                      MASTER GUILD VERIFIED
                    </span>
                  </div>
                  <span className='text-xs text-[#E5A93C] font-mono'>Kondagaon Dokra Bell Metal Cooperative</span>
                  <span className='text-xs text-gray-400 block mt-0.5'>{DEMO_USERS.seller.location}</span>
                </div>
              </div>

              <div className='flex items-center gap-4 text-center'>
                <div className='p-3 px-5 rounded-2xl bg-white/5 border border-white/10'>
                  <span className='text-[10px] font-mono uppercase text-gray-400 block'>Orders Dispatched</span>
                  <span className='font-display text-2xl font-bold text-white'>88</span>
                </div>
                <div className='p-3 px-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40'>
                  <span className='text-[10px] font-mono uppercase text-emerald-300 block'>Total Revenue</span>
                  <span className='font-display text-2xl font-bold text-emerald-400'>₹84,200</span>
                </div>
              </div>
            </div>

            {/* Seller Inventory Management */}
            <div className='glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4'>
              <div className='flex items-center justify-between'>
                <h3 className='font-serif text-2xl font-bold text-white'>Handicraft Inventory & Stock</h3>
                <span className='text-xs font-mono text-gray-400'>Fair-Trade Direct Pricing</span>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {products.slice(0, 3).map(prod => (
                  <div
                    key={prod.id}
                    className='p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2'
                  >
                    <div className='flex items-center justify-between text-xs font-mono text-gray-400'>
                      <span>Stock: {prod.stockCount} units</span>
                      <span className='text-emerald-400 font-bold'>In Stock</span>
                    </div>
                    <h4 className='font-serif text-lg font-bold text-white line-clamp-1'>{prod.name}</h4>
                    <div className='flex justify-between items-baseline pt-2 border-t border-white/5'>
                      <span className='text-xs font-mono text-gray-400'>Price:</span>
                      <span className='font-mono text-base font-bold text-[#E5A93C]'>
                        ₹{prod.priceINR.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
