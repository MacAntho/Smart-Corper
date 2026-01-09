
import React, { useState, useMemo, useRef } from 'react';
import { 
  MapPin, Shield, DollarSign, Home, ArrowLeft, Search, 
  Tent, Briefcase, Zap, Info, Heart, Users, ChevronRight, 
  Star, Phone, MessageCircle, Languages, AlertTriangle,
  Lightbulb, Calculator, PieChart, TrendingUp, Map as MapIcon,
  LayoutGrid, MousePointer2, Sparkles, Building2, Target, Globe
} from 'lucide-react';
import { MOCK_STATE_GUIDES } from '../constants';
import { StateGuide as IStateGuide } from '../types';

const ALL_STATE_NAMES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 
  'Taraba', 'Yobe', 'Zamfara', 'Abuja (FCT)'
];

// Stylized SVG Paths for Nigeria States (Simplified for performance and clarity)
// In a production app, these would be precise GeoJSON converted to SVG paths.
const NIGERIA_SVG_PATHS = {
  'Sokoto': 'M40,10 L120,5 L140,40 L90,60 L40,45 Z',
  'Kebbi': 'M10,40 L40,45 L90,60 L70,120 L20,110 Z',
  'Zamfara': 'M140,40 L190,30 L220,70 L150,85 L140,40 Z',
  'Katsina': 'M190,30 L260,20 L280,70 L220,70 Z',
  'Kano': 'M280,70 L340,60 L360,110 L280,120 Z',
  'Jigawa': 'M340,60 L410,40 L440,90 L360,110 Z',
  'Yobe': 'M440,90 L520,70 L540,140 L470,160 Z',
  'Borno': 'M520,70 L620,60 L650,180 L540,220 L540,140 Z',
  'Gombe': 'M470,160 L540,140 L540,220 L480,240 Z',
  'Bauchi': 'M360,110 L440,90 L470,160 L480,240 L380,220 Z',
  'Kaduna': 'M220,70 L280,70 L360,110 L380,220 L280,240 L230,180 Z',
  'Niger': 'M70,120 L220,140 L230,180 L180,260 L80,240 Z',
  'Kwara': 'M20,150 L100,180 L180,260 L140,320 L40,300 Z',
  'Oyo': 'M40,300 L140,320 L130,380 L60,400 Z',
  'Ogun': 'M60,400 L130,380 L140,440 L80,450 Z',
  'Lagos': 'M80,450 L140,440 L140,470 L80,470 Z',
  'Osun': 'M140,320 L200,340 L190,390 L130,380 Z',
  'Ondo': 'M190,390 L200,340 L260,360 L240,440 L140,440 Z',
  'Ekiti': 'M200,340 L260,340 L260,360 Z',
  'Kogi': 'M180,260 L280,240 L340,320 L300,380 L200,340 Z',
  'Abuja (FCT)': 'M280,240 L320,240 L340,280 L290,290 Z',
  'Nasarawa': 'M320,240 L400,240 L420,300 L340,320 Z',
  'Plateau': 'M380,220 L480,240 L500,300 L420,300 L400,240 Z',
  'Taraba': 'M500,300 L580,250 L640,380 L540,450 Z',
  'Adamawa': 'M540,220 L650,180 L680,300 L580,350 Z',
  'Benue': 'M340,320 L420,300 L500,300 L540,450 L400,420 Z',
  'Enugu': 'M300,380 L340,320 L400,420 L360,450 Z',
  'Anambra': 'M260,360 L300,380 L300,440 L260,440 Z',
  'Edo': 'M240,440 L260,360 L200,340 L190,390 Z',
  'Delta': 'M190,390 L240,440 L240,500 L180,500 Z',
  'Bayelsa': 'M180,500 L240,500 L220,550 L180,550 Z',
  'Rivers': 'M240,500 L300,500 L300,550 L220,550 Z',
  'Imo': 'M260,440 L300,440 L300,480 L260,480 Z',
  'Abia': 'M300,440 L360,450 L360,500 L300,500 Z',
  'Akwa Ibom': 'M360,500 L410,500 L410,550 L360,550 Z',
  'Cross River': 'M400,420 L540,450 L500,550 L410,550 L410,500 L360,500 L360,450 Z',
  'Ebonyi': 'M360,450 L400,420 L410,500 L360,500 Z',
};

const StateGuide: React.FC = () => {
  const [selectedState, setSelectedState] = useState<IStateGuide | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'camp' | 'costs' | 'ppa' | 'safety' | 'opps'>('camp');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const filteredStates = ALL_STATE_NAMES.filter(s => 
    s.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStateSelect = (stateName: string) => {
    const guide = MOCK_STATE_GUIDES.find(g => g.stateName.toLowerCase() === stateName.toLowerCase());
    if (guide) {
      setSelectedState(guide);
      setActiveTab('camp');
      window.scrollTo(0, 0);
    } else {
      alert(`Guide for ${stateName} is coming soon! Our veterans are currently vetting the data.`);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.left = `${e.clientX + 15}px`;
      tooltipRef.current.style.top = `${e.clientY + 15}px`;
    }
  };

  if (!selectedState) {
    return (
      <div className="max-w-7xl mx-auto space-y-12 pb-32">
        {/* Header Section */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 p-8 md:p-14 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
            <MapPin className="w-64 h-64 text-brand-primary" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
              State Survival <span className="text-brand-primary">Guides</span>
            </h1>
            <p className="text-lg text-gray-500 mt-6 font-medium leading-relaxed">
              Get vetted, location-specific intelligence on every orientation camp, PPA landscape, and living cost across Nigeria.
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto">
              <div className="relative group flex-1 w-full">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search for your state..."
                  className="w-full pl-16 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-3xl focus:bg-white focus:ring-4 focus:ring-green-50 focus:border-brand-primary outline-none transition-all text-gray-700 font-bold shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm flex items-center shrink-0">
                <button 
                  onClick={() => setViewMode('map')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${viewMode === 'map' ? 'bg-brand-primary text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <MapIcon className="w-4 h-4" /> Map
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${viewMode === 'list' ? 'bg-brand-primary text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <LayoutGrid className="w-4 h-4" /> Grid
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* View Content */}
        <div className="space-y-8 min-h-[600px] animate-in fade-in duration-500">
          {viewMode === 'map' ? (
            <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
               {/* Map SVG Container */}
               <div className="relative bg-white rounded-[3rem] border border-gray-100 p-8 md:p-12 shadow-2xl flex-1 w-full overflow-hidden" onMouseMove={handleMouseMove}>
                  <div className="absolute top-8 left-8 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-brand-primary" />
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Guide Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-100" />
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Coming Soon</span>
                    </div>
                  </div>
                  
                  <div className="max-w-3xl mx-auto">
                    <svg viewBox="0 0 700 600" className="w-full h-auto drop-shadow-2xl">
                      {Object.entries(NIGERIA_SVG_PATHS).map(([name, path]) => {
                        const hasGuide = MOCK_STATE_GUIDES.some(g => g.stateName === name);
                        const isActive = hoveredState === name;
                        return (
                          <path
                            key={name}
                            d={path}
                            onClick={() => handleStateSelect(name)}
                            onMouseEnter={() => setHoveredState(name)}
                            onMouseLeave={() => setHoveredState(null)}
                            className={`transition-all duration-300 cursor-pointer stroke-white stroke-[2] ${
                              hasGuide 
                                ? isActive ? 'fill-brand-primary' : 'fill-brand-primary/20' 
                                : isActive ? 'fill-gray-300' : 'fill-gray-50'
                            }`}
                          />
                        );
                      })}
                    </svg>
                  </div>

                  {/* Tooltip */}
                  {hoveredState && (
                    <div 
                      ref={tooltipRef}
                      className="fixed z-[100] bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-2xl pointer-events-none flex items-center gap-2 animate-in fade-in zoom-in duration-150"
                      style={{ position: 'fixed' }}
                    >
                      <MapPin className="w-3 h-3 text-brand-primary" />
                      {hoveredState}
                      {MOCK_STATE_GUIDES.some(g => g.stateName === hoveredState) && (
                        <span className="ml-2 px-1.5 py-0.5 bg-brand-primary rounded text-[8px]">PRO</span>
                      )}
                    </div>
                  )}

                  <div className="mt-12 flex justify-center items-center gap-4 text-gray-400 font-bold text-xs uppercase tracking-widest">
                     <MousePointer2 className="w-4 h-4" /> Click a state to explore local guides
                  </div>
               </div>

               {/* Map Legend/Quick Access */}
               <div className="w-full lg:w-80 space-y-6">
                  <div className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100">
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Recently Updated</h3>
                    <div className="space-y-4">
                       {MOCK_STATE_GUIDES.map(guide => (
                         <button 
                          key={guide.id} 
                          onClick={() => setSelectedState(guide)}
                          className="w-full text-left p-4 bg-white border border-gray-100 rounded-2xl hover:border-brand-primary transition-all group flex items-center justify-between"
                         >
                            <div className="flex items-center gap-3">
                               <span className="text-xl">{guide.flagEmoji}</span>
                               <span className="font-bold text-gray-700 group-hover:text-brand-primary">{guide.stateName}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-brand-primary" />
                         </button>
                       ))}
                    </div>
                  </div>
                  <div className="bg-brand-primary rounded-[2.5rem] p-8 text-white shadow-xl">
                    <Sparkles className="w-8 h-8 mb-4" />
                    <h3 className="font-black mb-2">State-specific intel</h3>
                    <p className="text-xs text-green-50 leading-relaxed font-medium">We provide more than just camp addresses. Get real living costs, PPA salary averages, and safety reports from real corpers.</p>
                  </div>
               </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
              {filteredStates.map((name) => {
                const hasGuide = MOCK_STATE_GUIDES.some(g => g.stateName === name);
                return (
                  <button
                    key={name}
                    onClick={() => handleStateSelect(name)}
                    className={`flex flex-col items-center justify-center p-6 bg-white rounded-3xl border transition-all group ${
                      hasGuide 
                        ? 'border-gray-100 hover:border-brand-primary hover:shadow-xl hover:shadow-green-50' 
                        : 'border-gray-50 opacity-60 cursor-not-allowed grayscale'
                    }`}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 transition-transform group-hover:scale-110 ${
                      hasGuide ? 'bg-green-50' : 'bg-gray-50'
                    }`}>
                      🇳🇬
                    </div>
                    <h3 className={`font-bold text-sm text-center ${hasGuide ? 'text-gray-900' : 'text-gray-400'}`}>
                      {name}
                    </h3>
                    {hasGuide && (
                      <span className="mt-3 text-[8px] font-black text-brand-primary uppercase tracking-[0.2em] bg-green-50 px-2 py-0.5 rounded">
                        Guide Active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-32 space-y-10">
      {/* Detail Header */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-100/50 overflow-hidden">
        <div className="p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-gray-50">
          <div className="space-y-4">
            <button 
              onClick={() => setSelectedState(null)}
              className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-primary transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-2" /> Back to selector
            </button>
            <div className="flex items-center gap-4">
              <span className="text-5xl">{selectedState.flagEmoji}</span>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">
                {selectedState.stateName}
              </h1>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
               <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Safety Rating</p>
               <div className="flex items-center gap-2">
                 <div className={`w-2.5 h-2.5 rounded-full ${
                   selectedState.safetyCulture.rating === 'Safe' ? 'bg-green-500' : 
                   selectedState.safetyCulture.rating === 'Moderate' ? 'bg-orange-500' : 'bg-red-500'
                 }`} />
                 <span className="text-sm font-bold text-gray-900">{selectedState.safetyCulture.rating}</span>
               </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
               <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Cost Level</p>
               <span className="text-sm font-bold text-gray-900">{selectedState.livingCosts.monthlyRange}</span>
            </div>
            <div className="hidden sm:block bg-gray-50 p-4 rounded-2xl border border-gray-100">
               <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Avg Salary</p>
               <span className="text-sm font-bold text-gray-900">{selectedState.ppaLandscape.avgSalary}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-2 bg-gray-50 flex items-center overflow-x-auto scrollbar-hide">
          {[
            { id: 'camp', label: 'Orientation Camp', icon: Tent },
            { id: 'costs', label: 'Living & Costs', icon: Calculator },
            { id: 'ppa', label: 'PPA Landscape', icon: Briefcase },
            { id: 'safety', label: 'Safety & Culture', icon: Shield },
            { id: 'opps', label: 'Opportunities', icon: TrendingUp },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4 border-b-4 transition-all whitespace-nowrap text-sm font-black uppercase tracking-widest ${
                activeTab === tab.id 
                  ? 'border-brand-primary text-brand-primary bg-white' 
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-8 md:p-14 animate-in fade-in duration-500">
          {activeTab === 'camp' && (
            <div className="grid lg:grid-cols-2 gap-16">
              <div className="space-y-10">
                <div>
                   <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                    <MapPin className="w-6 h-6 mr-3 text-brand-primary" /> Camp Location
                   </h2>
                   <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
                      <h4 className="font-black text-gray-900 mb-2">{selectedState.campLocation.name}</h4>
                      <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6">{selectedState.campLocation.address}</p>
                      <button className="btn-secondary w-full py-3 flex items-center justify-center bg-white">
                        <MapPin className="w-4 h-4 mr-2" /> Open in Google Maps
                      </button>
                   </div>
                </div>
                <div>
                   <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-3 text-orange-500" /> Survival Tips
                   </h2>
                   <div className="space-y-4">
                      {selectedState.campLocation.survivalTips.map((tip, i) => (
                        <div key={i} className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                           <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-black text-xs">
                             {i + 1}
                           </div>
                           <p className="text-sm text-gray-600 font-medium leading-relaxed">{tip}</p>
                        </div>
                      ))}
                   </div>
                </div>
              </div>

              <div className="space-y-10">
                 <h2 className="text-2xl font-black text-gray-900 mb-6">Facilities Report</h2>
                 <div className="grid gap-4">
                    {selectedState.campLocation.facilities.map((fac, i) => (
                      <div key={i} className="p-6 bg-white rounded-[1.5rem] border border-gray-100 flex items-start gap-4">
                         <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                            <Info className="w-5 h-5" />
                         </div>
                         <div>
                            <h4 className="font-black text-gray-900 text-sm uppercase tracking-widest mb-1">{fac.label}</h4>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed">{fac.info}</p>
                         </div>
                      </div>
                    ))}
                 </div>
                 <div className="p-8 bg-brand-primary rounded-[2.5rem] text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                       <Tent className="w-24 h-24" />
                    </div>
                    <h4 className="text-xl font-black mb-4">Want more camp info?</h4>
                    <p className="text-green-50 text-sm font-medium mb-8 leading-relaxed">Check our detailed article "Everything you need to pack for {selectedState.stateName} camp".</p>
                    <button className="bg-white text-brand-primary font-black px-8 py-3 rounded-xl text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all">
                       Read Article
                    </button>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'costs' && (
            <div className="space-y-16">
              <div className="grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                  <h2 className="text-3xl font-black text-gray-900">Budget Breakdown</h2>
                  
                  <div className="grid sm:grid-cols-2 gap-8">
                     <div className="space-y-6">
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center">
                          <Home className="w-4 h-4 mr-2" /> Accommodation
                        </h3>
                        <div className="space-y-3">
                           {selectedState.livingCosts.accommodation.map((acc, i) => (
                             <div key={i} className="p-5 bg-white border border-gray-100 rounded-2xl flex justify-between items-center shadow-sm">
                               <span className="text-sm font-bold text-gray-700">{acc.type}</span>
                               <span className="text-sm font-black text-brand-primary">{acc.price}</span>
                             </div>
                           ))}
                        </div>
                     </div>
                     <div className="space-y-6">
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center">
                          <TrendingUp className="w-4 h-4 mr-2" /> Transportation
                        </h3>
                        <div className="space-y-3">
                           {selectedState.livingCosts.transport.map((t, i) => (
                             <div key={i} className="p-5 bg-white border border-gray-100 rounded-2xl flex justify-between items-center shadow-sm">
                               <span className="text-sm font-bold text-gray-700">{t.mode}</span>
                               <span className="text-sm font-black text-gray-900">{t.avgPrice}</span>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div>
                     <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Popular Corper Neighborhoods</h3>
                     <div className="grid gap-4">
                        {selectedState.livingCosts.popularAreas.map((area, i) => (
                          <div key={i} className="p-6 bg-gray-50 border border-gray-100 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                             <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-gray-400">
                                  {i + 1}
                                </div>
                                <div>
                                   <h4 className="font-bold text-gray-900">{area.name}</h4>
                                   <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{area.distance}</p>
                                </div>
                             </div>
                             <p className="text-xs text-gray-500 font-medium max-w-xs">{area.pros}</p>
                             <ChevronRight className="w-5 h-5 text-gray-300 hidden sm:block" />
                          </div>
                        ))}
                     </div>
                  </div>
                </div>

                <div className="space-y-8">
                   <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-2xl">
                      <div className="flex items-center gap-3 mb-8">
                         <Calculator className="w-6 h-6 text-brand-primary" />
                         <h3 className="text-xl font-black">Budget Calculator</h3>
                      </div>
                      <div className="space-y-8">
                         <BudgetSlider label="Rent per month" min={10000} max={80000} step={5000} initial={30000} />
                         <BudgetSlider label="Feeding / Daily" min={1000} max={5000} step={500} initial={2000} />
                         <BudgetSlider label="Data & Transport" min={5000} max={30000} step={2000} initial={15000} />
                         
                         <div className="pt-8 border-t border-white/10 mt-10">
                            <div className="flex justify-between items-center mb-2">
                               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Monthly Est.</span>
                               <span className="text-2xl font-black text-brand-primary">₦105,000</span>
                            </div>
                            <p className="text-[10px] text-gray-500 font-medium italic">Based on standard corper living style in {selectedState.stateName}.</p>
                         </div>
                      </div>
                   </div>
                   
                   <div className="bg-amber-50 border border-amber-100 rounded-[2.5rem] p-8">
                      <h4 className="text-amber-800 font-black text-xs uppercase tracking-widest flex items-center mb-4">
                        <AlertTriangle className="w-4 h-4 mr-2" /> Cost of Living Alert
                      </h4>
                      <p className="text-sm text-amber-700 font-medium leading-relaxed italic">
                        "Lagos rent is paid yearly in 90% of cases. Ensure you have your full year's rent saved before passing out of camp if you plan to stay in the city center."
                      </p>
                   </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ppa' && (
            <div className="space-y-16 animate-in fade-in duration-500">
               <div className="grid lg:grid-cols-2 gap-16">
                  <div className="space-y-12">
                     <div>
                        <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center">
                           <PieChart className="w-6 h-6 mr-3 text-brand-primary" /> Posting Distribution
                        </h2>
                        <div className="space-y-6">
                           {selectedState.ppaLandscape.orgTypes.map((org, i) => (
                             <div key={i} className="space-y-2">
                                <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                                   <span className="text-gray-500">{org.type}</span>
                                   <span className="text-gray-900">{org.percentage}%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                   <div 
                                     className="h-full bg-brand-primary rounded-full transition-all duration-1000"
                                     style={{ width: `${org.percentage}%` }}
                                   />
                                </div>
                             </div>
                           ))}
                        </div>
                     </div>

                     <div className="p-8 bg-blue-50 border border-blue-100 rounded-[2.5rem]">
                        <h3 className="text-blue-900 font-black mb-4">Allowance Intelligence</h3>
                        <p className="text-blue-700 text-sm font-medium leading-relaxed mb-6">
                           {selectedState.ppaLandscape.extraAllowances}
                        </p>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl w-fit border border-blue-200 shadow-sm">
                           <Zap className="w-4 h-4 text-blue-500 fill-blue-500" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Smart Tip: Ask for accommodation backup</span>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-10">
                     <div>
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Top Professional Sectors</h3>
                        <div className="flex flex-wrap gap-3">
                           {selectedState.ppaLandscape.topSectors.map((sector, i) => (
                             <div key={i} className="px-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 shadow-sm flex items-center">
                                <div className="w-2 h-2 rounded-full bg-brand-primary mr-2" /> {sector}
                             </div>
                           ))}
                        </div>
                     </div>

                     <div className="bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100 space-y-6">
                        <h3 className="text-xl font-black text-gray-900 tracking-tight">Rejected by PPA?</h3>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed">
                           Don't panic. In {selectedState.stateName}, most rejections happen within the first week. If you get a rejection letter, report back to your ZI immediately with your files.
                        </p>
                        <button className="btn-primary w-full py-4 text-xs font-black uppercase tracking-widest">
                           Rejection Survival Guide
                        </button>
                     </div>
                  </div>
               </div>

               {/* New Common Posting Locations Section */}
               <div className="space-y-8">
                  <div className="flex items-center gap-3">
                     <div className="p-3 bg-green-50 text-brand-primary rounded-2xl">
                        <Building2 className="w-6 h-6" />
                     </div>
                     <h2 className="text-2xl font-black text-gray-900">Common Posting Locations</h2>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                     {selectedState.ppaLandscape.commonLocations.map((loc, i) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl hover:shadow-green-50 transition-all group">
                           <div className="flex items-center justify-between mb-6">
                              <h4 className="font-black text-lg text-gray-900">{loc.name}</h4>
                              <MapPin className="w-5 h-5 text-gray-300 group-hover:text-brand-primary transition-colors" />
                           </div>
                           <p className="text-sm text-gray-500 font-medium leading-relaxed">{loc.description}</p>
                        </div>
                     ))}
                  </div>
               </div>

               {/* New Best Sectors to Target Section */}
               <div className="space-y-8 pt-8">
                  <div className="flex items-center gap-3">
                     <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                        <Target className="w-6 h-6" />
                     </div>
                     <h2 className="text-2xl font-black text-gray-900">Best Sectors to Target</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                     {selectedState.ppaLandscape.bestSectors.map((sector, i) => (
                        <div key={i} className="bg-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl group">
                           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                              <Globe className="w-32 h-32 text-brand-primary" />
                           </div>
                           <div className="relative z-10">
                              <div className="flex items-center justify-between mb-6">
                                 <h4 className="text-2xl font-black tracking-tight">{sector.name}</h4>
                                 <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                    sector.difficulty === 'Easy' ? 'bg-green-500' : 
                                    sector.difficulty === 'Medium' ? 'bg-orange-500' : 'bg-red-500'
                                 }`}>
                                    {sector.difficulty} Selection
                                 </span>
                              </div>
                              <p className="text-gray-400 font-medium leading-relaxed mb-8">
                                 {sector.reason}
                              </p>
                              <div className="flex items-center gap-2 text-brand-primary font-black text-xs uppercase tracking-widest">
                                 Strategy Pack Available <ChevronRight className="w-4 h-4" />
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'safety' && (
            <div className="grid lg:grid-cols-2 gap-16">
               <div className="space-y-12">
                  <div>
                     <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                        <Shield className="w-6 h-6 mr-3 text-brand-primary" /> Security Briefing
                     </h2>
                     <div className="bg-red-50 border border-red-100 p-8 rounded-[2.5rem] space-y-4">
                        <h4 className="text-red-800 font-black text-xs uppercase tracking-widest">Areas to Avoid</h4>
                        <ul className="space-y-3">
                           {selectedState.safetyCulture.areasToAvoid.map((area, i) => (
                             <li key={i} className="flex items-center text-sm font-bold text-red-700">
                                <AlertTriangle className="w-4 h-4 mr-3 flex-shrink-0" /> {area}
                             </li>
                           ))}
                        </ul>
                     </div>
                  </div>

                  <div>
                     <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center">
                        <Languages className="w-4 h-4 mr-2" /> Helpful Local Phrases
                     </h3>
                     <div className="grid gap-3">
                        {selectedState.safetyCulture.localPhrases.map((p, i) => (
                          <div key={i} className="p-5 bg-white border border-gray-100 rounded-2xl flex items-center justify-between shadow-sm">
                             <span className="text-sm font-black text-brand-primary italic">"{p.phrase}"</span>
                             <span className="text-xs font-bold text-gray-400">Means: {p.meaning}</span>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="space-y-12">
                  <div>
                     <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Cultural Ettiquette</h3>
                     <div className="space-y-4">
                        {selectedState.safetyCulture.customs.map((c, i) => (
                          <div key={i} className="p-6 bg-gray-50 rounded-[1.5rem] border border-gray-100 text-sm font-medium text-gray-600 leading-relaxed">
                             {c}
                          </div>
                        ))}
                     </div>
                  </div>

                  <div className="bg-white border border-gray-100 shadow-xl rounded-[2.5rem] p-10">
                     <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center">
                        <Phone className="w-5 h-5 mr-3 text-brand-primary" /> Emergency Contacts
                     </h3>
                     <div className="space-y-6">
                        {selectedState.safetyCulture.emergencyContacts.map((contact, i) => (
                          <div key={i} className="flex items-center justify-between">
                             <span className="text-sm font-bold text-gray-500">{contact.label}</span>
                             <a href={`tel:${contact.phone}`} className="text-sm font-black text-brand-primary hover:underline">{contact.phone}</a>
                          </div>
                        ))}
                     </div>
                     <button className="w-full mt-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center">
                        <Star className="w-4 h-4 mr-2" /> Save to Contacts
                     </button>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'opps' && (
            <div className="grid lg:grid-cols-3 gap-10">
               <div className="lg:col-span-2 space-y-12">
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center">
                      <Zap className="w-6 h-6 mr-3 text-yellow-500 fill-yellow-500" /> Proven Side Hustles
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                       {selectedState.opportunities.sideHustles.map((hustle, i) => (
                         <div key={i} className="p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:border-brand-primary transition-colors flex flex-col h-full">
                            <h4 className="text-xl font-black text-gray-900 mb-2">{hustle.title}</h4>
                            <div className="mt-auto pt-6 border-t border-gray-50 flex justify-between items-center">
                               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Est. Income</span>
                               <span className="text-sm font-black text-brand-primary">{hustle.income}</span>
                            </div>
                         </div>
                       ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-10">
                    <div>
                       <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">In-Demand Skills Locally</h3>
                       <div className="flex flex-wrap gap-2">
                          {selectedState.opportunities.skills.map((s, i) => (
                            <span key={i} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100">{s}</span>
                          ))}
                       </div>
                    </div>
                    <div>
                       <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Networking Hubs</h3>
                       <ul className="space-y-3">
                          {selectedState.opportunities.networking.map((n, i) => (
                            <li key={i} className="flex items-center text-sm font-bold text-gray-700">
                               <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mr-3" /> {n}
                            </li>
                          ))}
                       </ul>
                    </div>
                  </div>
               </div>

               <div className="space-y-8">
                  <div className="bg-brand-primary rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform">
                       <TrendingUp className="w-48 h-48" />
                    </div>
                    <h3 className="text-2xl font-black mb-6">Want to Share Your Intel?</h3>
                    <p className="text-green-50 text-sm font-medium mb-10 leading-relaxed">
                      Had a unique experience in {selectedState.stateName}? Help fellow Compatriots by sharing your tips and reviews.
                    </p>
                    <button className="w-full py-4 bg-white text-brand-primary rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all">
                       Submit a Tip
                    </button>
                  </div>
                  
                  <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 text-center">
                     <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-6" />
                     <h3 className="text-xl font-black text-gray-900 mb-2">State Community</h3>
                     <p className="text-gray-500 text-sm font-medium mb-8">Join our verified {selectedState.stateName} Telegram group for real-time updates.</p>
                     <button className="btn-secondary w-full py-3 flex items-center justify-center">
                        Join Community
                     </button>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Contributions Footer */}
        <div className="bg-gray-50 p-8 md:p-14 border-t border-gray-100">
           <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">
              <div className="text-center md:text-left">
                 <h4 className="font-black text-gray-900">Information Verified</h4>
                 <p className="text-xs text-gray-500 font-medium">Last updated by {selectedState.stateName} veterans on May 15, 2024.</p>
              </div>
              <div className="flex gap-4">
                 <button className="px-8 py-3 bg-white border border-gray-100 text-gray-600 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-gray-50 transition-all">Report Error</button>
                 <button className="px-8 py-3 bg-white border border-gray-100 text-gray-600 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-gray-50 transition-all">Request Update</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const BudgetSlider: React.FC<{ label: string, min: number, max: number, step: number, initial: number }> = ({ label, min, max, step, initial }) => {
  const [val, setVal] = useState(initial);
  return (
    <div className="space-y-4">
       <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
          <span>{label}</span>
          <span className="text-white text-xs">₦{val.toLocaleString()}</span>
       </div>
       <input 
         type="range" 
         min={min} 
         max={max} 
         step={step} 
         value={val} 
         onChange={(e) => setVal(parseInt(e.target.value))}
         className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand-primary"
       />
    </div>
  );
};

const CheckCircle = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>;

export default StateGuide;
