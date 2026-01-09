
import React, { useState, useMemo } from 'react';
import { 
  Menu, Home, Map, BookOpen, Calendar, Settings, LogOut, Bell, 
  Compass, Hammer, Archive, Sparkles, User, Search, Building2, 
  Briefcase, DownloadCloud, Repeat, X, ChevronRight 
} from 'lucide-react';
import { MOCK_USER, NYSC_STAGES } from '../constants';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const currentStage = useMemo(() => NYSC_STAGES.find(s => s.slug === MOCK_USER.currentStage), []);
  const currentStageIdx = useMemo(() => NYSC_STAGES.findIndex(s => s.slug === MOCK_USER.currentStage), []);
  const totalStages = NYSC_STAGES.length;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navItems = [
    { label: 'Dashboard', icon: Home, path: '/dashboard' },
    { label: 'Journey Map', icon: Map, path: '/journey' },
    { label: 'Knowledge Base', icon: BookOpen, path: '/knowledge' },
    { label: 'Deadlines', icon: Calendar, path: '/deadlines' },
    { label: 'State Guide', icon: Compass, path: '/state-guide' },
    { label: 'PPA Database', icon: Building2, path: '/ppa-database' },
    { label: 'CDS Toolkit', icon: Hammer, path: '/cds-toolkit' },
    { label: 'Relocation', icon: Repeat, path: '/relocation' },
    { label: 'Career Hub', icon: Briefcase, path: '/career-hub' },
    { label: 'Downloads', icon: DownloadCloud, path: '/downloads' },
    { label: 'Secure Vault', icon: Archive, path: '/vault' },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden text-gray-900 selection:bg-brand-600/10">
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 h-20 border-b border-gray-100 shrink-0">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-xl font-bold tracking-tight">SmartCorper</span>
            </Link>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-2 text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scrollbar-hide pb-24 md:pb-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                  isActive(item.path)
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-brand-50 hover:text-brand-600'
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${isActive(item.path) ? 'text-white' : 'text-gray-400'}`} />
                {item.label}
              </Link>
            ))}
            
            <div className="pt-4 mt-4 border-t border-gray-100 px-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Support</p>
              <Link to="/settings" className="flex items-center py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                <Settings className="mr-3 h-4 w-4" /> Settings
              </Link>
              <Link to="/faq" className="flex items-center py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                <Sparkles className="mr-3 h-4 w-4" /> FAQ
              </Link>
            </div>
          </nav>

          <div className="p-4 bg-gray-50 border-t border-gray-100 hidden md:block">
             {!MOCK_USER.isPro && (
               <div className="bg-gray-900 rounded-xl p-4 mb-4 text-white">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-brand-600 mb-1">Upgrade</p>
                 <p className="text-xs font-medium opacity-80 mb-3 leading-relaxed">Unlock unlimited AI support & relocation tools.</p>
                 <button onClick={() => navigate('/pricing')} className="w-full bg-brand-600 text-white py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">
                    Go Pro - ₦3,000
                 </button>
               </div>
             )}
             <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-500 rounded-lg hover:bg-red-50 transition-colors">
               <LogOut className="mr-3 h-5 w-5" /> Sign Out
             </button>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-16 md:h-20 px-4 md:px-8 bg-white border-b border-gray-200 flex items-center justify-between sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="p-2.5 -ml-2 text-gray-600 md:hidden bg-gray-100 rounded-xl">
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden md:flex flex-col">
               <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Status</span>
                  <div className="flex gap-1">
                    {[...Array(totalStages)].map((_, i) => (
                      <div key={i} className={`w-3 h-1 rounded-full ${i <= currentStageIdx ? 'bg-brand-600' : 'bg-gray-200'}`} />
                    ))}
                  </div>
               </div>
               <p className="text-sm font-bold text-gray-900 mt-1">{currentStage?.name}</p>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-6 hidden lg:block">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search tools & guides..." 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-green-50 outline-none transition-all font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          <div className="flex items-center gap-3">
             <button className="p-2.5 bg-gray-50 rounded-xl text-gray-500 hover:text-brand-600 transition-all relative">
               <Bell className="w-5 h-5" />
               <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
             </button>
             <div className="w-px h-8 bg-gray-200 hidden sm:block" />
             <Link to="/settings" className="flex items-center gap-3 p-1 rounded-xl hover:bg-gray-50 transition-all">
               <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center text-xs font-black shadow-lg shadow-green-100">
                 {MOCK_USER.avatarInitials}
               </div>
               <div className="hidden sm:flex flex-col">
                  <span className="text-xs font-black text-gray-900 leading-none">{MOCK_USER.name.split(' ')[0]}</span>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">{MOCK_USER.stateCode}</span>
               </div>
             </Link>
          </div>
        </header>

        {/* Scroll Content */}
        <main className="flex-1 overflow-y-auto scrollbar-hide pb-24 md:pb-12">
          <div className="p-4 md:p-10 w-full">
            {children}
          </div>
        </main>

        {/* Mobile Persistent Bottom Nav */}
        <nav className="md:hidden fixed bottom-4 left-4 right-4 h-16 bg-gray-900 rounded-[1.5rem] z-40 flex items-center justify-around px-4 shadow-2xl border border-white/5">
          {[
            { icon: Home, path: '/dashboard' },
            { icon: Map, path: '/journey' },
            { icon: Archive, path: '/vault' },
            { icon: User, path: '/settings' },
          ].map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className={`p-3 rounded-2xl transition-all ${
                isActive(item.path) ? 'text-brand-600 bg-white/10 scale-110 shadow-lg shadow-white/5' : 'text-gray-500'
              }`}
            >
              <item.icon className="w-6 h-6" />
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Layout;
