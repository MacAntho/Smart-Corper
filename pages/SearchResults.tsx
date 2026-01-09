
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, FileText, Calendar, Hammer, Compass, ChevronRight, 
  ArrowRight, Info, AlertCircle, Clock, BookOpen, MapPin, 
  ChevronLeft, Loader2, DollarSign 
} from 'lucide-react';
import { MOCK_ARTICLES, MOCK_DEADLINES, MOCK_CDS_PROJECTS, MOCK_STATE_GUIDES } from '../constants';

type ResultType = 'Article' | 'Deadline' | 'CDSProject' | 'State';

const SearchResults: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [activeFilter, setActiveFilter] = useState<'All' | ResultType>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const resultsPerPage = 15;

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const searchResults = useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();

    const articles = MOCK_ARTICLES.filter(a => 
      a.title.toLowerCase().includes(lowerQuery) || a.category.toLowerCase().includes(lowerQuery) || (a.excerpt && a.excerpt.toLowerCase().includes(lowerQuery))
    ).map(a => ({ ...a, type: 'Article' as ResultType, relevance: a.title.toLowerCase().includes(lowerQuery) ? 2 : 1 }));

    const deadlines = MOCK_DEADLINES.filter(d => 
      d.title.toLowerCase().includes(lowerQuery) || d.stage.toLowerCase().includes(lowerQuery)
    ).map(d => ({ ...d, type: 'Deadline' as ResultType, relevance: d.title.toLowerCase().includes(lowerQuery) ? 2 : 1 }));

    const projects = MOCK_CDS_PROJECTS.filter(p => 
      p.title.toLowerCase().includes(lowerQuery) || p.description.toLowerCase().includes(lowerQuery) || p.category.toLowerCase().includes(lowerQuery)
    ).map(p => ({ ...p, type: 'CDSProject' as ResultType, relevance: p.title.toLowerCase().includes(lowerQuery) ? 2 : 1 }));

    const states = MOCK_STATE_GUIDES.filter(s => s.stateName.toLowerCase().includes(lowerQuery))
      .map(s => ({ ...s, title: s.stateName, type: 'State' as ResultType, relevance: 2 }));

    return [...articles, ...deadlines, ...projects, ...states].sort((a, b) => b.relevance - a.relevance);
  }, [query]);

  const filteredResults = useMemo(() => {
    if (activeFilter === 'All') return searchResults;
    return searchResults.filter(r => r.type === activeFilter);
  }, [searchResults, activeFilter]);

  const paginatedResults = useMemo(() => filteredResults.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage), [filteredResults, currentPage]);
  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);

  const getCount = (type: 'All' | ResultType) => {
    if (type === 'All') return searchResults.length;
    return searchResults.filter(r => r.type === type).length;
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => (
          part.toLowerCase() === highlight.toLowerCase() 
            ? <mark key={i} className="bg-brand-primary/10 text-brand-primary font-bold rounded px-0.5">{part}</mark> 
            : part
        ))}
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-32">
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none"><Search className="w-64 h-64 text-brand-primary" /></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            Results for: <span className="text-brand-primary">"{query}"</span>
          </h1>
          <p className="text-lg text-gray-500 mt-4 font-medium">Found {searchResults.length} matching results across our guides.</p>

          <div className="mt-10 flex flex-wrap gap-2">
            {[
              { id: 'All', label: 'All' },
              { id: 'Article', label: 'Articles' },
              { id: 'Deadline', label: 'Deadlines' },
              { id: 'CDSProject', label: 'Projects' },
              { id: 'State', label: 'States' },
            ].map((tab) => (
              <button key={tab.id} onClick={() => { setActiveFilter(tab.id as any); setCurrentPage(1); }} className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeFilter === tab.id ? 'bg-brand-primary text-white shadow-lg' : 'bg-gray-50 text-gray-400 hover:text-gray-600'}`}>
                {tab.label} <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeFilter === tab.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'}`}>{getCount(tab.id as any)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400 gap-4"><Loader2 className="w-10 h-10 animate-spin text-brand-primary" /><p className="font-bold uppercase tracking-widest text-[10px]">Searching...</p></div>
        ) : paginatedResults.length > 0 ? (
          <>
            <div className="grid gap-6">
              {paginatedResults.map((result: any) => (
                <div key={`${result.type}-${result.id}`} className="bg-white rounded-[2rem] border border-gray-100 p-6 md:p-8 hover:border-brand-primary/30 transition-all group">
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-1 space-y-4">
                         <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 ${result.type === 'Article' ? 'bg-purple-50 text-purple-600' : result.type === 'Deadline' ? 'bg-red-50 text-red-600' : result.type === 'CDSProject' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                              {result.type === 'Article' && <BookOpen className="w-3 h-3" />}
                              {result.type === 'Deadline' && <Calendar className="w-3 h-3" />}
                              {result.type === 'CDSProject' && <Hammer className="w-3 h-3" />}
                              {result.type === 'State' && <MapPin className="w-3 h-3" />}
                              {result.type}
                            </span>
                            {result.category && <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{result.category}</span>}
                         </div>
                         <div>
                            <h3 className="text-xl md:text-2xl font-black text-gray-900 group-hover:text-brand-primary transition-colors">{highlightText(result.title || '', query)}</h3>
                            <p className="text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed">{highlightText(result.excerpt || result.description || '', query)}</p>
                         </div>
                         <div className="flex flex-wrap items-center gap-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            {result.readTime && <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5" /> {result.readTime}</span>}
                            {result.budget && <span className="flex items-center"><DollarSign className="w-3.5 h-3.5 mr-1.5" /> Budget: {result.budget}</span>}
                            {result.stateName && <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1.5" /> {result.stateName} Guide</span>}
                         </div>
                      </div>
                      <div className="flex-shrink-0">
                         <Link to={result.type === 'Article' ? `/knowledge/${result.slug}` : result.type === 'Deadline' ? '/deadlines' : result.type === 'CDSProject' ? '/cds-toolkit' : '/state-guide'} className="inline-flex items-center gap-2 px-6 py-4 bg-gray-50 text-gray-900 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all group/btn">
                            View {result.type === 'Article' ? 'Guide' : 'Detail'} <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                         </Link>
                      </div>
                   </div>
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 pt-12 border-t border-gray-100">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="p-3 rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-brand-primary disabled:opacity-30 transition-all"><ChevronLeft className="w-6 h-6" /></button>
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-12 h-12 rounded-2xl font-black transition-all ${currentPage === i + 1 ? 'bg-brand-primary text-white shadow-lg' : 'bg-white text-gray-500 border border-gray-100'}`}>{i + 1}</button>
                ))}
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="p-3 rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-brand-primary disabled:opacity-30 transition-all"><ChevronRight className="w-6 h-6" /></button>
              </div>
            )}
          </>
        ) : (
          <div className="py-32 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-50 mb-8"><AlertCircle className="h-10 w-10 text-gray-300" /></div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">No results found for "{query}"</h3>
            <p className="text-gray-500 mt-4 max-w-sm mx-auto font-medium">Try different keywords or check your spelling.</p>
            <div className="mt-12 space-y-4 max-w-md mx-auto">
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Popular Searches</p>
               <div className="flex flex-wrap justify-center gap-2">
                  {['Registration', 'Biometrics', 'Redeployment', 'CDS Proposal'].map(tag => (
                    <button key={tag} onClick={() => setSearchParams({ q: tag })} className="px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-xs font-bold hover:bg-green-50 hover:text-brand-primary transition-all border border-gray-100">{tag}</button>
                  ))}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
