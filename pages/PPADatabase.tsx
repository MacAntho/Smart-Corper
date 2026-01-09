
import React, { useState, useMemo } from 'react';
// Added Link import from react-router-dom to fix reference error
import { Link } from 'react-router-dom';
import { Search, Building2, Star, MapPin, CheckCircle, ChevronRight, Filter, Info, ShieldCheck, Wallet, MessageSquare, ArrowRight } from 'lucide-react';
import { MOCK_PPA_DATABASE, MOCK_USER } from '../constants';
import { PPAOrg } from '../types';

const PPADatabase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState(MOCK_USER.deploymentState);
  const [selectedSector, setSelectedSector] = useState('All');

  const sectors = ['All', 'Education', 'Finance', 'Technology', 'Health', 'Public Service', 'Legal', 'Media'];

  const filteredPPAs = useMemo(() => {
    return MOCK_PPA_DATABASE.filter(ppa => {
      const matchesSearch = ppa.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesState = selectedState === 'All' || ppa.state === selectedState;
      const matchesSector = selectedSector === 'All' || ppa.sector === selectedSector;
      return matchesSearch && matchesState && matchesSector;
    });
  }, [searchTerm, selectedState, selectedSector]);

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-32">
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-8 md:p-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
          <Building2 className="w-64 h-64 text-brand-primary" />
        </div>
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
             <div className="p-2 bg-green-50 text-brand-primary rounded-xl">
                <ShieldCheck className="w-6 h-6" />
             </div>
             <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em]">Verified Career Registry</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
            Verified <span className="text-brand-primary">PPA</span> Database
          </h1>
          <p className="text-xl text-gray-500 mt-6 font-medium leading-relaxed">
            Search 5,000+ organizations vetted by real corpers. Compare allowances, ratings, and work culture before reporting.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Main Database Area */}
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-xl space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Organization name, industry..." 
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-700 outline-none focus:bg-white focus:ring-4 focus:ring-green-50 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                 <select 
                  value={selectedState} 
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="flex-1 px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-700 outline-none"
                >
                  <option value="All">All States</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Abuja">Abuja</option>
                  <option value="Kano">Kano</option>
                </select>
                <select 
                  value={selectedSector} 
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="flex-1 px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-700 outline-none"
                >
                  {sectors.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-black text-gray-900">Found {filteredPPAs.length} Results</h2>
              <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                 <button className="hover:text-gray-900 flex items-center gap-1.5"><Filter className="w-3.5 h-3.5" /> Filter</button>
                 <button className="hover:text-gray-900">Sort: Highest Rated</button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredPPAs.map((ppa) => (
                <div key={ppa.id} className="bg-white rounded-[2rem] border border-gray-50 p-8 hover:border-brand-primary/20 hover:shadow-2xl transition-all group flex flex-col md:flex-row md:items-center justify-between gap-10">
                   <div className="flex-1 flex gap-8 items-start">
                      <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-400 group-hover:bg-green-50 group-hover:text-brand-primary transition-colors shrink-0">
                         <Building2 className="w-10 h-10" />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                             {ppa.isVerified && (
                               <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-100">
                                 <CheckCircle className="w-3 h-3" /> Verified
                               </span>
                             )}
                             <div className="flex items-center gap-1 text-xs font-black text-gray-900">
                                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                {ppa.rating} <span className="text-gray-400 font-bold ml-1">({ppa.reviewsCount})</span>
                             </div>
                          </div>
                          <h3 className="text-2xl font-black text-gray-900 leading-tight">{ppa.name}</h3>
                          <p className="flex items-center gap-2 mt-1 text-gray-400 font-black uppercase tracking-widest text-[10px]">
                             <MapPin className="w-3 h-3" /> {ppa.state} • {ppa.sector}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                           {ppa.tags.map(tag => (
                             <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold rounded-lg border border-gray-100">#{tag}</span>
                           ))}
                        </div>
                      </div>
                   </div>

                   <div className="flex flex-col items-end gap-6 md:w-56 shrink-0 pt-6 md:pt-0 border-t md:border-t-0 border-gray-50">
                      <div className="text-left md:text-right w-full">
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Monthly Allowance</p>
                         <p className="text-2xl font-black text-brand-primary">{ppa.allowance}</p>
                         <p className="text-[10px] font-bold text-gray-500 mt-1 uppercase tracking-widest">{ppa.accommodation === 'Yes' ? 'Free Accommodation' : ppa.accommodation}</p>
                      </div>
                      <button className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl hover:bg-brand-primary transition-all active:scale-95">
                         View Details
                      </button>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-gray-900 rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform"><Wallet className="w-32 h-32" /></div>
              <div className="relative z-10 space-y-8">
                 <h3 className="text-2xl font-black tracking-tight leading-tight">Negotiation Mastery</h3>
                 <p className="text-gray-400 text-sm font-medium leading-relaxed">Most PPAs have a flexible budget. Use our proven scripts to negotiate for accommodation or transport allowances.</p>
                 <button className="w-full py-4 bg-brand-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">
                    Download Script Pack
                 </button>
              </div>
           </div>

           <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-xl space-y-10">
              <h4 className="font-black text-gray-900 text-sm uppercase tracking-widest flex items-center gap-3">
                 <MessageSquare className="w-5 h-5 text-brand-primary" /> Recent Peer Reviews
              </h4>
              <div className="space-y-8">
                 {[
                   { user: 'Martins O.', text: 'Great work-life balance at Mainstream. They value corper input.', rating: 5 },
                   { user: 'Ibrahim K.', text: 'Accommodation is basic but central. Management is supportive.', rating: 4 },
                 ].map((rev, i) => (
                   <div key={i} className="space-y-3">
                      <div className="flex items-center justify-between">
                         <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{rev.user}</span>
                         <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => <Star key={i} className={`w-2.5 h-2.5 ${i < rev.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />)}
                         </div>
                      </div>
                      <p className="text-xs text-gray-600 font-medium leading-relaxed italic">"{rev.text}"</p>
                   </div>
                 ))}
              </div>
              <button className="w-full py-4 bg-gray-50 text-gray-500 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-white border border-transparent hover:border-gray-100 transition-all">
                 Read All Reviews
              </button>
           </div>

           <div className="p-8 bg-blue-50 border border-blue-100 rounded-[2.5rem] space-y-4">
              <div className="flex items-start gap-4">
                 <Info className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                 <p className="text-xs text-blue-800 font-bold leading-relaxed">
                   Private organizations in Lagos and Abuja are 3x more likely to offer additional allowances than government parastatals.
                 </p>
              </div>
              <Link to="/knowledge/ppa-negotiation" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline flex items-center justify-end gap-2">
                 Learn More <ArrowRight className="w-3 h-3" />
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PPADatabase;
