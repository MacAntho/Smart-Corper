
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, Eye, Calendar, Share2, ThumbsUp, ThumbsDown, 
  BookOpen, ChevronRight, Download, Printer, Bookmark, 
  AlertTriangle, Info, ArrowLeft, Twitter, 
  Facebook, MessageCircle, Link as LinkIcon, Mail, AlertCircle,
  CheckCircle2, Sparkles, ArrowRight
} from 'lucide-react';
import { MOCK_ARTICLES } from '../constants';

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const article = MOCK_ARTICLES.find(a => a.slug === slug);
  const [activeHeading, setActiveHeading] = useState('');
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  // Extract headings for Table of Contents
  const tocItems = useMemo(() => {
    if (!article?.body) return [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(article.body, 'text/html');
    const headings = doc.querySelectorAll('h2, h3');
    return Array.from(headings).map(h => ({
      id: h.id,
      text: h.textContent || '',
      level: h.tagName.toLowerCase()
    }));
  }, [article]);

  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll('h2[id], h3[id]');
      let currentId = '';
      for (const h of headings) {
        const top = h.getBoundingClientRect().top;
        if (top < 150) {
          currentId = h.id;
        }
      }
      setActiveHeading(currentId);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto py-32 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 text-gray-300 mb-6">
          <BookOpen className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Guide not found</h2>
        <p className="text-gray-500 mt-2 font-medium">The article you're looking for has been moved or archived.</p>
        <Link to="/knowledge" className="mt-8 btn-primary inline-flex">
          Back to Knowledge Base
        </Link>
      </div>
    );
  }

  const relatedArticles = MOCK_ARTICLES
    .filter(a => (a.category === article.category) && a.id !== article.id)
    .slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="max-w-7xl mx-auto pb-32">
      {/* Breadcrumb */}
      <nav className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-10 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <Link to="/knowledge" className="hover:text-brand-primary transition-colors flex items-center">
          Knowledge Base
        </Link>
        <ChevronRight className="w-3.5 h-3.5 mx-3" />
        <span className="text-gray-400">{article.category}</span>
        <ChevronRight className="w-3.5 h-3.5 mx-3" />
        <span className="text-gray-900 truncate">{article.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content Area */}
        <div className="lg:col-span-8">
          <article className="bg-white rounded-[3rem] border border-gray-100 overflow-hidden shadow-2xl shadow-gray-100/50">
            {/* Article Header */}
            <div className="p-8 md:p-14 border-b border-gray-100">
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="px-5 py-1.5 bg-gray-50 text-gray-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-gray-100">
                  {article.category}
                </span>
                <span className={`px-5 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full border ${
                  article.riskLevel === 'High' ? 'bg-red-50 text-red-600 border-red-100' :
                  article.riskLevel === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                  'bg-blue-50 text-blue-600 border-blue-100'
                }`}>
                  {article.riskLevel} Risk
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-10 leading-[1.1] tracking-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 gap-y-4 gap-x-10">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-2.5 text-gray-300" /> {article.readTime} read
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2.5 text-gray-300" /> Updated {article.lastVerifiedDate?.toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-2.5 text-gray-300" /> {article.views.toLocaleString()} views
                </span>
              </div>

              {/* Social Share & Quick Actions */}
              <div className="mt-12 pt-10 border-t border-gray-50 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  {[
                    { icon: Twitter, color: 'text-sky-500 hover:bg-sky-50', action: () => {} },
                    { icon: Facebook, color: 'text-blue-600 hover:bg-blue-50', action: () => {} },
                    { icon: MessageCircle, color: 'text-green-500 hover:bg-green-50', action: () => {} },
                    { icon: LinkIcon, color: 'text-gray-400 hover:bg-gray-100', action: handleCopyLink },
                  ].map((btn, i) => (
                    <button 
                      key={i} 
                      onClick={btn.action}
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center border border-gray-100 transition-all ${btn.color}`}
                    >
                      <btn.icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                   <button className="w-11 h-11 rounded-2xl flex items-center justify-center border border-gray-100 text-gray-400 hover:text-brand-primary hover:bg-green-50 transition-all">
                     <Printer className="w-5 h-5" />
                   </button>
                   <button className="w-11 h-11 rounded-2xl flex items-center justify-center border border-gray-100 text-gray-400 hover:text-brand-primary hover:bg-green-50 transition-all">
                     <Download className="w-5 h-5" />
                   </button>
                   <button className="h-11 px-6 rounded-2xl flex items-center border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-primary hover:bg-green-50 transition-all">
                     <Bookmark className="w-4 h-4 mr-2" /> Save Guide
                   </button>
                </div>
              </div>
            </div>

            {/* Article Body Content */}
            <div className="p-8 md:p-14 prose-custom max-w-none">
              <div dangerouslySetInnerHTML={{ 
                __html: article.body || '<p>Our experts are currently updating this guide. Check back soon.</p>' 
              }} />
            </div>

            {/* Source Attribution & Verified Badge */}
            <div className="bg-gray-50 p-8 md:p-14 border-t border-gray-100">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
                  <div className="space-y-4">
                     <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-brand-primary" />
                        <span className="text-xs font-black text-gray-900 uppercase tracking-widest">Verified Information</span>
                     </div>
                     <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-md">
                       This guide was compiled from <span className="text-gray-900 font-bold">{article.source || 'NYSC Bye-Laws and Official Directives'}</span> and verified by our editorial board on {article.lastVerifiedDate?.toLocaleDateString()}.
                     </p>
                  </div>
                  <div className="flex flex-col gap-2">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Last Audit</p>
                     <p className="text-sm font-bold text-gray-900 text-right">{article.lastVerifiedDate?.toLocaleDateString()}</p>
                     <button className="text-[10px] font-black text-brand-primary uppercase tracking-widest hover:underline text-right mt-2 flex items-center justify-end">
                       Report Outdated <AlertCircle className="w-3 h-3 ml-1" />
                     </button>
                  </div>
               </div>

               {/* Disclaimer */}
               <div className="mt-10 px-8 flex gap-4">
                  <div className="mt-0.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  </div>
                  <p className="text-[11px] text-gray-400 font-medium leading-relaxed italic">
                    Disclaimer: While SmartCorper strives for 100% accuracy, NYSC policies can change without prior notice. Always confirm critical decisions with your Zonal Inspector (ZI) or Local Government Inspector (LGI).
                  </p>
               </div>
            </div>
          </article>

          {/* Feedback Section */}
          <div className="mt-12 bg-white rounded-[2.5rem] border border-gray-100 p-10 md:p-12 text-center shadow-lg shadow-gray-100">
             {!feedbackGiven ? (
               <div className="animate-in fade-in duration-500">
                  <h3 className="text-xl font-black text-gray-900 mb-4 tracking-tight">Was this article helpful?</h3>
                  <p className="text-gray-500 text-sm font-medium mb-10">Your feedback helps us keep our guides accurate and helpful for all Compatriots.</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button 
                      onClick={() => setFeedbackGiven(true)}
                      className="px-10 py-4 bg-green-50 text-brand-primary font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-brand-primary hover:text-white transition-all flex items-center justify-center"
                    >
                      <ThumbsUp className="w-5 h-5 mr-3" /> Yes, Very Helpful
                    </button>
                    <button 
                      onClick={() => setFeedbackGiven(true)}
                      className="px-10 py-4 bg-gray-50 text-gray-500 font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-gray-900 hover:text-white transition-all flex items-center justify-center"
                    >
                      <ThumbsDown className="w-5 h-5 mr-3" /> No, Needs Improvement
                    </button>
                  </div>
               </div>
             ) : (
               <div className="animate-in zoom-in duration-500">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-brand-primary mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">Thank you for your feedback!</h3>
                  <p className="text-gray-500 text-sm font-medium">We've shared this with our editorial team.</p>
               </div>
             )}
          </div>

          {/* Related Articles Footer */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8 px-4">
               <h3 className="text-2xl font-black text-gray-900 tracking-tight">You Might Also Need</h3>
               <Link to="/knowledge" className="text-[10px] font-black text-brand-primary uppercase tracking-widest hover:underline flex items-center">
                 View Knowledge Base <ChevronRight className="w-3 h-3 ml-1" />
               </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map(rel => (
                <Link to={`/knowledge/${rel.slug}`} key={rel.id} className="block group">
                  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 h-full flex flex-col hover:border-brand-primary transition-all hover:shadow-xl hover:shadow-green-50">
                    <span className="text-[9px] font-black text-brand-primary uppercase tracking-widest mb-4 block">{rel.category}</span>
                    <h4 className="font-black text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-2 text-lg leading-tight mb-4">
                      {rel.title}
                    </h4>
                    <div className="mt-auto pt-6 flex items-center justify-between text-[10px] text-gray-400 font-black uppercase tracking-wider">
                      <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5" /> {rel.readTime}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar (Desktop) */}
        <div className="lg:col-span-4 space-y-8">
          <div className="sticky top-28 space-y-8">
            {/* Table of Contents */}
            {tocItems.length > 0 && (
              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 p-10">
                <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-8">Table of Contents</h3>
                <nav className="space-y-5">
                  {tocItems.map((item, i) => (
                    <a 
                      key={i} 
                      href={`#${item.id}`} 
                      className={`block text-sm font-bold transition-all border-l-2 pl-5 ${
                        activeHeading === item.id 
                          ? 'text-brand-primary border-brand-primary' 
                          : 'text-gray-400 border-transparent hover:text-gray-600'
                      } ${item.level === 'h3' ? 'ml-4 text-xs' : ''}`}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* AI Callout */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] shadow-2xl p-10 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-24 h-24" />
               </div>
               <div className="relative z-10">
                 <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-brand-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">Smart Helper</span>
                 </div>
                 <h3 className="font-black text-2xl mb-4 tracking-tight leading-tight">Specific Question?</h3>
                 <p className="text-gray-400 text-sm mb-8 leading-relaxed font-medium">
                   Get instant, expert answers about <span className="text-white font-bold">{article.category}</span> from our AI companion.
                 </p>
                 <button className="w-full py-4 bg-brand-primary text-white font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-green-700 transition-all shadow-lg active:scale-95 flex items-center justify-center">
                   Ask AI Now <ArrowRight className="ml-2 w-4 h-4" />
                 </button>
               </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 flex flex-col gap-3">
              <button className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group transition-all hover:bg-brand-primary hover:text-white">
                <div className="flex items-center gap-3">
                  <Download className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-widest">Download PDF</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group transition-all hover:bg-brand-primary hover:text-white">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-widest">Email Guide</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Internal Component Styles */}
      <style>{`
        .prose-custom h2 {
          font-size: 1.875rem;
          font-weight: 900;
          color: #111827;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          scroll-margin-top: 120px;
        }
        .prose-custom h3 {
          font-size: 1.5rem;
          font-weight: 800;
          color: #111827;
          margin-top: 2rem;
          margin-bottom: 1rem;
          scroll-margin-top: 120px;
        }
        .prose-custom p {
          font-size: 1.125rem;
          line-height: 1.75;
          color: #4B5563;
          margin-bottom: 1.5rem;
          font-weight: 500;
        }
        .prose-custom ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 2rem;
        }
        .prose-custom li {
          margin-bottom: 0.75rem;
          color: #4B5563;
          font-weight: 500;
        }
        .prose-custom .callout {
          padding: 2rem;
          border-radius: 1.5rem;
          margin: 2.5rem 0;
          border-left: 6px solid;
          background-color: #F9FAFB;
        }
        .prose-custom .info-box {
          border-left-color: #3B82F6;
          background-color: #EFF6FF;
          color: #1E40AF;
        }
        .prose-custom .warning-box {
          border-left-color: #EF4444;
          background-color: #FEF2F2;
          color: #991B1B;
        }
        .prose-custom .tip-box {
          border-left-color: #10B981;
          background-color: #ECFDF5;
          color: #065F46;
        }
        .prose-custom .callout p {
          margin-bottom: 0;
          color: inherit;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
}
