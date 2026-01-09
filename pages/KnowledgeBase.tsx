
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, BookOpen, Clock, Filter, X, ChevronLeft, ChevronRight, 
  Star, AlertCircle, Eye, Calendar, MapPin, ChevronDown, ListFilter 
} from 'lucide-react';
import { MOCK_ARTICLES, NYSC_STAGES, MOCK_STATE_GUIDES } from '../constants';
import { Link } from 'react-router-dom';
import { Article } from '../types';

const KnowledgeBase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStages, setSelectedStages] = useState<string[]>([]);
  const [selectedRisks, setSelectedRisks] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const articlesPerPage = 12;
  const categories = ['Mobilization', 'Camp Life', 'PPA', 'Redeployment', 'CDS', 'Clearance', 'Penalties', 'General'];
  const riskLevels = ['High', 'Medium', 'Low'];

  // Simulate loading state when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategories, selectedStages, selectedRisks, selectedState]);

  const filteredArticles = useMemo(() => {
    return MOCK_ARTICLES.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (article.excerpt && article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(article.category);
      // Mocking stage match since Stage is currently separate from Article in some schemas, 
      // but we'll assume category/title checks for simplicity or extend Article type if needed.
      // For now, filtering by category as a proxy or simple inclusion.
      const matchesRisk = selectedRisks.length === 0 || selectedRisks.includes(article.riskLevel);
      
      return matchesSearch && matchesCategory && matchesRisk;
    });
  }, [searchTerm, selectedCategories, selectedRisks]);

  const sortedArticles = [...filteredArticles].sort((a, b) => (b.views || 0) - (a.views || 0));
  const featuredArticles = sortedArticles.slice(0, 2);
  const regularArticles = sortedArticles.slice(2);

  const totalPages = Math.ceil(regularArticles.length / articlesPerPage);
  const currentArticles = regularArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedStages([]);
    setSelectedRisks([]);
    setSelectedState('');
    setCurrentPage(1);
  };

  const toggleFilter = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* Search Header */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
          <BookOpen className="w-64 h-64 text-brand-primary" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            Knowledge Base
          </h1>
          <p className="text-lg text-gray-500 mt-4 font-medium leading-relaxed">
            Expert guides vetted by veteran corps members to help you navigate every stage of your service year.
          </p>
          
          <div className="mt-10 relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-primary transition-colors" />
            <input
              type="text"
              placeholder="Search for anything... e.g., redeployment, camp packing"
              className="w-full pl-16 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-3xl focus:bg-white focus:ring-4 focus:ring-green-50 focus:border-brand-primary outline-none transition-all text-gray-700 font-bold shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2 self-center">Trending:</span>
            {['Redeployment', 'Maami Market', 'Clearance'].map(tag => (
              <button 
                key={tag}
                onClick={() => setSearchTerm(tag)}
                className="text-[10px] font-bold text-gray-500 hover:text-brand-primary hover:bg-green-50 px-3 py-1 rounded-full border border-gray-200 transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Mobile Filter Trigger */}
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden flex items-center justify-center gap-2 p-4 bg-white border border-gray-100 rounded-2xl font-bold text-gray-700"
        >
          <Filter className="w-5 h-5" /> Filter Articles
        </button>

        {/* Sidebar Filters */}
        <aside className={`
          fixed inset-0 z-50 bg-white p-8 lg:p-0 lg:relative lg:bg-transparent lg:block lg:w-72 space-y-8 overflow-y-auto lg:overflow-visible
          ${isSidebarOpen ? 'block' : 'hidden'}
        `}>
          <div className="flex items-center justify-between lg:hidden mb-8">
            <h2 className="text-xl font-bold">Filters</h2>
            <button onClick={() => setIsSidebarOpen(false)}><X className="w-6 h-6" /></button>
          </div>

          <div className="space-y-8">
            {/* Category Filter */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center">
                <ListFilter className="w-3.5 h-3.5 mr-2" /> By Category
              </h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <label key={cat} className="flex items-center gap-3 group cursor-pointer">
                    <div 
                      onClick={() => toggleFilter(selectedCategories, setSelectedCategories, cat)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        selectedCategories.includes(cat) ? 'bg-brand-primary border-brand-primary shadow-sm shadow-green-100' : 'bg-white border-gray-200 group-hover:border-brand-primary/50'
                      }`}
                    >
                      {selectedCategories.includes(cat) && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className={`text-sm font-bold ${selectedCategories.includes(cat) ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'}`}>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Stage Filter */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-2" /> By Stage
              </h3>
              <div className="space-y-2">
                {NYSC_STAGES.map(stage => (
                  <label key={stage.id} className="flex items-center gap-3 group cursor-pointer">
                    <div 
                      onClick={() => toggleFilter(selectedStages, setSelectedStages, stage.name)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        selectedStages.includes(stage.name) ? 'bg-brand-primary border-brand-primary' : 'bg-white border-gray-200 group-hover:border-brand-primary/50'
                      }`}
                    >
                      {selectedStages.includes(stage.name) && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className={`text-sm font-bold ${selectedStages.includes(stage.name) ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'}`}>{stage.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Risk Filter */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center">
                <AlertCircle className="w-3.5 h-3.5 mr-2" /> By Risk Level
              </h3>
              <div className="space-y-2">
                {riskLevels.map(risk => (
                  <label key={risk} className="flex items-center gap-3 group cursor-pointer">
                    <div 
                      onClick={() => toggleFilter(selectedRisks, setSelectedRisks, risk)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        selectedRisks.includes(risk) ? 'bg-brand-primary border-brand-primary' : 'bg-white border-gray-200 group-hover:border-brand-primary/50'
                      }`}
                    >
                      {selectedRisks.includes(risk) && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className={`text-sm font-bold ${selectedRisks.includes(risk) ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'}`}>{risk}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* State Filter */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">By State</h3>
              <div className="relative group">
                <select 
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 outline-none focus:border-brand-primary focus:ring-4 focus:ring-green-50 appearance-none"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <option value="">All 36 States + FCT</option>
                  {MOCK_STATE_GUIDES.map(s => (
                    <option key={s.id} value={s.stateName}>{s.stateName}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <button 
              onClick={clearFilters}
              className="w-full py-4 text-xs font-black text-brand-primary border-2 border-brand-primary/10 rounded-2xl hover:bg-brand-primary hover:text-white transition-all uppercase tracking-widest"
            >
              Clear All Filters
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 space-y-12">
          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white rounded-[2rem] border border-gray-100 p-8 space-y-6 animate-pulse">
                  <div className="flex justify-between">
                    <div className="h-6 w-20 bg-gray-100 rounded-full"></div>
                    <div className="h-6 w-16 bg-gray-100 rounded-full"></div>
                  </div>
                  <div className="h-10 w-full bg-gray-100 rounded-xl"></div>
                  <div className="h-24 w-full bg-gray-50 rounded-2xl"></div>
                  <div className="h-6 w-32 bg-gray-50 rounded-full"></div>
                </div>
              ))}
            </div>
          ) : filteredArticles.length > 0 ? (
            <>
              {/* Featured Section */}
              {currentPage === 1 && searchTerm === '' && selectedCategories.length === 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-amber-50 text-amber-700 w-fit rounded-full border border-amber-100 mb-2">
                    <Star className="w-3.5 h-3.5 fill-amber-700" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Essential Reading</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    {featuredArticles.map(article => (
                      <ArticleCard key={article.id} article={article} featured />
                    ))}
                  </div>
                </div>
              )}

              {/* All Articles Grid */}
              <div className="space-y-8">
                <div className="flex items-center justify-between px-4">
                   <h2 className="text-xl font-bold text-gray-900">
                    {searchTerm || selectedCategories.length > 0 ? 'Search Results' : 'All Guides'}
                   </h2>
                   <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                     Showing {Math.min((currentPage - 1) * articlesPerPage + 1, regularArticles.length)}-{Math.min(currentPage * articlesPerPage, regularArticles.length)} of {regularArticles.length} guides
                   </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {currentArticles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 pt-10 border-t border-gray-100">
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="p-3 rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-brand-primary hover:border-brand-primary disabled:opacity-30 disabled:hover:text-gray-400 disabled:hover:border-gray-100 transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <div className="flex items-center gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-12 h-12 rounded-2xl font-black transition-all ${
                          currentPage === i + 1 
                            ? 'bg-brand-primary text-white shadow-lg shadow-green-100' 
                            : 'bg-white text-gray-500 border border-gray-100 hover:border-brand-primary hover:text-brand-primary'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="p-3 rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-brand-primary hover:border-brand-primary disabled:opacity-30 disabled:hover:text-gray-400 disabled:hover:border-gray-100 transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="py-32 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-50 mb-8">
                <Search className="h-10 w-10 text-gray-300" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">No guides match your search</h3>
              <p className="text-gray-500 mt-4 max-w-sm mx-auto font-medium leading-relaxed">
                Try searching for broader terms like "camp", "registration" or "clearance".
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button onClick={clearFilters} className="btn-primary py-4 px-10">
                  Clear All Filters
                </button>
                <Link to="/contact" className="btn-secondary py-4 px-10">
                  Request a Guide
                </Link>
              </div>
              
              <div className="mt-16 pt-16 border-t border-gray-50">
                <p className="text-xs font-black text-gray-300 uppercase tracking-widest mb-8">Popular Right Now</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {MOCK_ARTICLES.slice(0, 3).map(a => (
                    <Link key={a.id} to={`/knowledge/${a.slug}`} className="text-sm font-bold text-brand-primary hover:underline px-4 py-2 bg-green-50 rounded-full">
                      {a.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ArticleCard: React.FC<{ article: Article, featured?: boolean }> = ({ article, featured }) => (
  <Link to={`/knowledge/${article.slug}`} className="block group h-full">
    <div className={`card-standard relative flex flex-col h-full rounded-[2.5rem] p-8 transition-all hover:scale-[1.02] active:scale-95 ${featured ? 'border-amber-100 bg-amber-50/10' : ''}`}>
      <div className="flex justify-between items-start mb-6">
        <span className="px-4 py-1.5 bg-gray-50 text-gray-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-gray-100 group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-colors">
          {article.category}
        </span>
        <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border ${
          article.riskLevel === 'High' ? 'bg-red-50 text-red-600 border-red-100' : 
          article.riskLevel === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
          'bg-green-50 text-green-600 border-green-100'
        }`}>
          {article.riskLevel} Risk
        </span>
      </div>
      
      <h3 className={`font-black text-gray-900 mb-4 leading-tight group-hover:text-brand-primary transition-colors ${featured ? 'text-2xl' : 'text-lg'}`}>
        {article.title}
      </h3>
      
      <p className="text-gray-500 text-sm mb-8 flex-1 line-clamp-3 font-medium leading-relaxed">
        {article.excerpt || `Complete guide to ${article.title.toLowerCase()}. Learn common mistakes, mandatory documents, and expert tips.`}
      </p>

      <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
         <div className="flex items-center gap-6">
           <span className="flex items-center text-gray-400"><Clock className="h-4 w-4 mr-2" /> {article.readTime}</span>
           <span className="flex items-center text-gray-400"><Eye className="h-4 w-4 mr-2" /> {article.views?.toLocaleString()}</span>
         </div>
         <span className="text-brand-primary opacity-0 group-hover:opacity-100 transition-all flex items-center">
           Read Guide <ChevronRight className="w-4 h-4 ml-1" />
         </span>
      </div>
      
      {article.lastVerifiedDate && (
        <div className="mt-4 flex items-center text-[9px] font-black text-gray-300 uppercase tracking-widest">
           <Calendar className="w-3 h-3 mr-1.5" /> Verified {article.lastVerifiedDate.toLocaleDateString()}
        </div>
      )}
    </div>
  </Link>
);

const Check = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>;

export default KnowledgeBase;
