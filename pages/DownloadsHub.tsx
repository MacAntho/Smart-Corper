
import React, { useState, useMemo } from 'react';
import { DownloadCloud, FileText, Lock, Search, ChevronRight, Award, FileCheck } from 'lucide-react';
import { MOCK_DOWNLOADS, MOCK_USER } from '../constants';
import { DownloadableResource } from '../types';

const DownloadsHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Official' | 'Templates' | 'Blueprints' | 'Career'>('All');

  const filteredDownloads = useMemo(() => {
    return MOCK_DOWNLOADS.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-32">
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-8 md:p-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
          <DownloadCloud className="w-64 h-64 text-brand-primary" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <FileCheck className="w-5 h-5" />
             </div>
             <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Resource Center</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            Downloads & <span className="text-brand-primary">Blueprints</span>
          </h1>
          <p className="text-lg text-gray-500 mt-4 font-medium leading-relaxed">
            Official NYSC handbooks, vetted CDS proposal templates, and premium career transition blueprints.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="lg:w-64 space-y-8">
           <div className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-xl space-y-6">
              <h3 className="text-xs font-black text-gray-300 uppercase tracking-widest px-2">Categories</h3>
              <div className="space-y-1">
                 {['All', 'Official', 'Templates', 'Blueprints', 'Career'].map((cat) => (
                   <button
                    key={cat}
                    onClick={() => setActiveCategory(cat as any)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      activeCategory === cat ? 'bg-brand-primary text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                   >
                     {cat}
                   </button>
                 ))}
              </div>
           </div>

           <div className="bg-amber-50 rounded-[2rem] border border-amber-100 p-8">
              <Award className="w-8 h-8 text-amber-500 mb-4" />
              <h4 className="font-black text-gray-900 mb-2">Premium Templates</h4>
              <p className="text-xs text-amber-700 font-medium leading-relaxed mb-6">Pro members get access to "LGI-Proof" proposal templates and financial blueprints.</p>
              {!MOCK_USER.isPro && (
                <button className="w-full py-3 bg-amber-500 text-white font-black rounded-xl text-[9px] uppercase tracking-widest shadow-xl">Upgrade Account</button>
              )}
           </div>
        </aside>

        <main className="flex-1 space-y-8">
           <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-primary transition-colors" />
              <input
                type="text"
                placeholder="Search templates, blueprints, guides..."
                className="w-full pl-16 pr-6 py-5 bg-white border border-gray-100 rounded-[2rem] shadow-xl focus:ring-4 focus:ring-green-50 outline-none font-bold text-gray-700 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDownloads.map((item) => (
                <div key={item.id} className="bg-white rounded-[2rem] border border-gray-100 p-8 hover:border-brand-primary/20 hover:shadow-2xl transition-all group">
                   <div className="flex items-start justify-between mb-8">
                      <div className="p-4 bg-gray-50 rounded-2xl text-gray-400 group-hover:bg-green-50 group-hover:text-brand-primary transition-colors">
                         <FileText className="w-8 h-8" />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                         <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{item.fileSize}</span>
                         {item.isPremium && (
                           <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[8px] font-black uppercase tracking-widest border border-amber-100">
                             <Lock className="w-2.5 h-2.5" /> Premium
                           </span>
                         )}
                      </div>
                   </div>

                   <div className="space-y-4">
                      <h3 className="text-xl font-black text-gray-900 group-hover:text-brand-primary transition-colors leading-tight">{item.title}</h3>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed line-clamp-2">{item.description}</p>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                         <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                            <DownloadCloud className="w-4 h-4" /> {item.downloadCount.toLocaleString()}
                         </div>
                         <button className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                           item.isPremium && !MOCK_USER.isPro 
                             ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                             : 'bg-brand-primary text-white shadow-xl hover:scale-105 active:scale-95'
                         }`}>
                           {item.isPremium && !MOCK_USER.isPro ? 'Unlock to Download' : 'Download Now'}
                         </button>
                      </div>
                   </div>
                </div>
              ))}
           </div>

           {filteredDownloads.length === 0 && (
             <div className="py-20 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-black text-gray-900">No resources found</h3>
                <p className="text-gray-500 font-medium max-w-xs mx-auto mt-2">Try different keywords or check another category.</p>
                <button onClick={() => { setSearchTerm(''); setActiveCategory('All'); }} className="mt-6 text-brand-primary font-black uppercase tracking-widest text-xs hover:underline">Clear all filters</button>
             </div>
           )}
        </main>
      </div>

      <div className="bg-gray-900 rounded-[3rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
         <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
         <div className="relative z-10 max-w-xl">
            <h3 className="text-3xl font-black mb-6 tracking-tight">Submit Your Own Guide</h3>
            <p className="text-gray-400 text-lg font-medium leading-relaxed">
              Help your fellow Compatriots by sharing your successful CDS proposals or relocation request letters. Verified submissions earn 3 months of Pro access.
            </p>
         </div>
         <button className="relative z-10 px-12 py-5 bg-brand-primary text-white font-black rounded-2xl text-sm uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center gap-3">
            Submit Document <ChevronRight className="w-5 h-5" />
         </button>
      </div>
    </div>
  );
};

export default DownloadsHub;
