
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Hammer, Heart, Book, Sprout, Download, Star, ArrowRight, 
  ChevronDown, ChevronUp, Info, ListFilter, DollarSign, 
  Clock, Sparkles, Wand2, FileText, Send, Loader2, X,
  CheckCircle2, Users, AlertCircle, Share2, Printer, Bookmark, 
  Calendar, Layers, Target, ShieldCheck, Plus, Trash2, 
  LayoutDashboard, ClipboardCheck, MessageSquare, Coffee,
  Award, Briefcase, FileSpreadsheet, ListTodo, HelpCircle,
  FileSearch, Lightbulb, PieChart, ChevronRight, Save, ClipboardList,
  FileEdit, PenTool, ArrowUp, ArrowDown, AlertTriangle, Scale,
  ExternalLink, Eye
} from 'lucide-react';
import { MOCK_CDS_PROJECTS } from '../constants';
import { generateCDSProposal } from '../services/geminiService';
import { CDSProject } from '../types';

type ToolTab = 'ideas' | 'planning' | 'guides';

const CDSToolkit: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ToolTab>('ideas');
  
  // Ideas State
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [budgetRange, setBudgetRange] = useState(1000000);
  const [difficulty, setDifficulty] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<CDSProject | null>(null);

  // Planning Hub: Budget State
  const [budgetItems, setBudgetItems] = useState([
    { id: '1', item: 'White Paint (20L)', qty: 3, cost: 18500, category: 'Materials' },
    { id: '2', item: 'Painter Labor (3 days)', qty: 2, cost: 5000, category: 'Labor' },
    { id: '3', item: 'Transportation of materials', qty: 1, cost: 7000, category: 'Logistics' },
  ]);

  // Planning Hub: Milestone State
  const [milestones, setMilestones] = useState([
    { id: '1', name: 'Conduct Town Hall Meeting', date: '2024-07-01', status: 'done', priority: 'High' },
    { id: '2', name: 'Submit Proposal to LGI', date: '2024-07-15', status: 'pending', priority: 'High' },
    { id: '3', name: 'Fundraising Drive (Donations)', date: '2024-08-01', status: 'pending', priority: 'Medium' },
  ]);

  // Planning Hub: AI Proposal State
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiProposalResult, setAiProposalResult] = useState('');
  const [proposalInputs, setProposalInputs] = useState({
    title: '',
    community: '',
    category: 'Education',
    goal: '',
    audience: 'Traditional Rulers & Local Government'
  });

  const categories = ['All Categories', 'Education', 'Health', 'Environment', 'Infrastructure', 'Agriculture', 'Other'];
  const difficulties = ['Easy', 'Medium', 'Hard'];

  const filteredProjects = useMemo(() => {
    return MOCK_CDS_PROJECTS.filter(project => {
      const catMatch = activeCategory === 'All Categories' || project.category === activeCategory;
      const diffMatch = difficulty.length === 0 || difficulty.includes(project.difficulty);
      const budgetVal = parseInt(project.budget.replace(/[^0-9]/g, '')) || 0;
      return catMatch && diffMatch && budgetVal <= budgetRange;
    });
  }, [activeCategory, difficulty, budgetRange]);

  // Budget Calculator Logic
  const addBudgetItem = () => {
    setBudgetItems([...budgetItems, { id: Date.now().toString(), item: '', qty: 1, cost: 0, category: 'Materials' }]);
  };

  const removeBudgetItem = (id: string) => {
    setBudgetItems(budgetItems.filter(i => i.id !== id));
  };

  const updateBudgetItem = (id: string, field: string, value: any) => {
    setBudgetItems(budgetItems.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const totalBudget = useMemo(() => {
    return budgetItems.reduce((acc, curr) => acc + (curr.qty * curr.cost), 0);
  }, [budgetItems]);

  // Milestone Logic
  const addMilestone = () => {
    setMilestones([...milestones, { id: Date.now().toString(), name: '', date: '', status: 'pending', priority: 'Medium' }]);
  };

  const toggleMilestone = (id: string) => {
    setMilestones(milestones.map(m => m.id === id ? { ...m, status: m.status === 'done' ? 'pending' : 'done' } : m));
  };

  const moveMilestone = (index: number, direction: 'up' | 'down') => {
    const newMilestones = [...milestones];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newMilestones.length) {
      [newMilestones[index], newMilestones[targetIndex]] = [newMilestones[targetIndex], newMilestones[index]];
      setMilestones(newMilestones);
    }
  };

  const removeMilestone = (id: string) => {
    setMilestones(milestones.filter(m => m.id !== id));
  };

  // AI Proposal Generation
  const handleGenerateProposal = async () => {
    if (!proposalInputs.title || !proposalInputs.community) {
      alert("Please fill in the project title and community name.");
      return;
    }
    setIsAiGenerating(true);
    const result = await generateCDSProposal(
      proposalInputs.title, 
      `${proposalInputs.category} project in ${proposalInputs.community}. Targeted at: ${proposalInputs.audience}. Goal: ${proposalInputs.goal}. Current total budget estimation from calculator: ₦${totalBudget.toLocaleString()}`
    );
    setAiProposalResult(result);
    setIsAiGenerating(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-32">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 text-brand-600 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border border-brand-100">
          <Award className="w-4 h-4" /> Impact & Legacy
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
          CDS Project <span className="text-brand-600">Toolkit</span>
        </h1>
        <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
          The definitive suite for planning, financing, and executing community development projects that matter.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex justify-center px-4">
        <div className="bg-white p-1 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-1 w-full max-w-2xl">
          {[
            { id: 'ideas', label: 'Inspiration', icon: Lightbulb },
            { id: 'planning', label: 'Planning Hub', icon: LayoutDashboard },
            { id: 'guides', label: 'Approval Guide', icon: ClipboardCheck },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ToolTab)}
              className={`flex-1 flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === tab.id 
                  ? 'bg-brand-600 text-white shadow-sm' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'ideas' && (
        <div className="space-y-10 animate-in fade-in duration-500">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Sector</label>
                <select 
                  value={activeCategory} 
                  onChange={(e) => setActiveCategory(e.target.value)} 
                  className="input-standard bg-gray-50 border-gray-100"
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Max Budget</label>
                  <span className="text-xs font-bold text-brand-600">₦{budgetRange.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="0" max="1000000" step="50000" 
                  value={budgetRange} onChange={(e) => setBudgetRange(Number(e.target.value))} 
                  className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand-600" 
                />
              </div>
              <div className="space-y-2 lg:col-span-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Difficulty</label>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map(d => (
                    <button 
                      key={d} 
                      onClick={() => setDifficulty(prev => prev.includes(d) ? prev.filter(i => i !== d) : [...prev, d])} 
                      className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border ${
                        difficulty.includes(d) ? 'bg-brand-600 border-brand-600 text-white shadow-sm' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="card-standard group flex flex-col h-full hover:border-brand-600 transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-brand-50 text-brand-600 rounded-lg shrink-0">
                    <Hammer className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">{project.category}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-brand-600 transition-colors">{project.title}</h3>
                <p className="text-gray-500 text-sm font-medium mb-8 leading-relaxed line-clamp-2">{project.description}</p>
                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Est. Budget</p>
                    <p className="text-sm font-bold text-gray-900">₦{project.budget}</p>
                  </div>
                  <button onClick={() => setSelectedProject(project)} className="p-2.5 bg-gray-50 text-gray-600 rounded-lg hover:bg-brand-600 hover:text-white transition-all active:scale-95">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'planning' && (
        <div className="space-y-12 animate-in fade-in duration-500">
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* 1. Budget Calculator */}
            <div className="lg:col-span-7 space-y-6">
              <div className="card-standard flex flex-col h-full !p-0 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 text-green-600 rounded-lg"><DollarSign className="w-5 h-5" /></div>
                    <h3 className="text-lg font-bold text-gray-900">Budget Calculator</h3>
                  </div>
                  <button onClick={addBudgetItem} className="btn-primary !p-2 !rounded-lg text-xs">
                    <Plus className="w-4 h-4 mr-1" /> Add Row
                  </button>
                </div>
                <div className="p-6 flex-1 space-y-4">
                  <div className="hidden md:grid grid-cols-12 gap-3 mb-2 px-2">
                    <div className="col-span-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Item Name</div>
                    <div className="col-span-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</div>
                    <div className="col-span-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Qty</div>
                    <div className="col-span-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cost (₦)</div>
                    <div className="col-span-1"></div>
                  </div>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 scrollbar-hide">
                    {budgetItems.map((item) => (
                      <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white hover:border-green-100 transition-all">
                        <div className="col-span-5">
                          <input 
                            type="text" value={item.item} placeholder="e.g. Paint buckets, Bags of cement..." 
                            onChange={(e) => updateBudgetItem(item.id, 'item', e.target.value)}
                            className="w-full bg-white border-gray-200 rounded-lg text-sm p-2 outline-none focus:border-brand-600 border"
                          />
                        </div>
                        <div className="col-span-2">
                          <select 
                            value={item.category} 
                            onChange={(e) => updateBudgetItem(item.id, 'category', e.target.value)}
                            className="w-full bg-white border-gray-200 rounded-lg text-[10px] p-2 outline-none focus:border-brand-600 border font-bold uppercase"
                          >
                            <option value="Materials">Materials</option>
                            <option value="Labor">Labor</option>
                            <option value="Logistics">Logistics</option>
                            <option value="Admin">Admin</option>
                          </select>
                        </div>
                        <div className="col-span-1">
                          <input 
                            type="number" value={item.qty} 
                            onChange={(e) => updateBudgetItem(item.id, 'qty', parseInt(e.target.value) || 0)}
                            className="w-full bg-white border-gray-200 rounded-lg text-sm p-2 outline-none focus:border-brand-600 border text-center"
                          />
                        </div>
                        <div className="col-span-3">
                          <input 
                            type="number" value={item.cost} 
                            onChange={(e) => updateBudgetItem(item.id, 'cost', parseInt(e.target.value) || 0)}
                            className="w-full bg-white border-gray-200 rounded-lg text-sm p-2 outline-none focus:border-brand-600 border font-bold"
                          />
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <button onClick={() => removeBudgetItem(item.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {budgetItems.length === 0 && (
                      <div className="py-12 text-center text-gray-300 text-sm italic border-2 border-dashed border-gray-100 rounded-2xl">
                        Your budget list is currently empty.
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-6 bg-brand-600 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Total Planned Spend</span>
                    <span className="text-3xl font-black">₦{totalBudget.toLocaleString()}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-all border border-white/20 flex items-center justify-center gap-2">
                      <FileSpreadsheet className="w-4 h-4" /> Export CSV
                    </button>
                    <button className="flex-1 px-4 py-2 bg-brand-700 hover:bg-brand-900 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-inner">
                      <Save className="w-4 h-4" /> Save Local
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Info Box */}
              <div className="p-5 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-4">
                <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-blue-900">Fundraising Rule #14</p>
                  <p className="text-[11px] text-blue-800 leading-relaxed">
                    Always account for "Contingency" (5-10% of total) in your formal proposal budget to handle price fluctuations in the local market.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Milestone Planner */}
            <div className="lg:col-span-5 space-y-6">
              <div className="card-standard flex flex-col h-full !p-0 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><ClipboardList className="w-5 h-5" /></div>
                    <h3 className="text-lg font-bold text-gray-900">Timeline Planner</h3>
                  </div>
                  <button onClick={addMilestone} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6 flex-1 relative">
                  <div className="absolute left-10 top-10 bottom-10 w-0.5 bg-gray-100 z-0"></div>
                  <div className="space-y-4 relative z-10">
                    {milestones.map((m, idx) => (
                      <div key={m.id} className={`flex items-start gap-3 p-4 rounded-xl border transition-all ${m.status === 'done' ? 'bg-gray-50 border-gray-100 opacity-70' : 'bg-white border-gray-100 shadow-sm'}`}>
                        <div className="flex flex-col gap-1 pr-1">
                          <button onClick={() => moveMilestone(idx, 'up')} className="text-gray-300 hover:text-brand-600" disabled={idx === 0}><ArrowUp className="w-3.5 h-3.5" /></button>
                          <button onClick={() => moveMilestone(idx, 'down')} className="text-gray-300 hover:text-brand-600" disabled={idx === milestones.length - 1}><ArrowDown className="w-3.5 h-3.5" /></button>
                        </div>
                        <button onClick={() => toggleMilestone(m.id)} className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${m.status === 'done' ? 'bg-brand-600 border-brand-600 text-white' : 'bg-white border-gray-200'}`}>
                          {m.status === 'done' && <CheckCircle2 className="w-4 h-4" />}
                        </button>
                        <div className="flex-1 min-w-0">
                          <input type="text" value={m.name} placeholder="Milestone task..." onChange={(e) => setMilestones(milestones.map(ms => ms.id === m.id ? { ...ms, name: e.target.value } : ms))} className={`w-full bg-transparent border-none outline-none text-sm font-bold truncate ${m.status === 'done' ? 'line-through text-gray-400' : 'text-gray-900 focus:text-brand-600'}`} />
                          <div className="flex items-center gap-3 mt-1">
                            <input type="date" value={m.date} onChange={(e) => setMilestones(milestones.map(ms => ms.id === m.id ? { ...ms, date: e.target.value } : ms))} className="text-[10px] font-bold text-gray-400 uppercase bg-transparent border-none p-0 outline-none" />
                            <select value={m.priority} onChange={(e) => setMilestones(milestones.map(ms => ms.id === m.id ? { ...ms, priority: e.target.value } : ms))} className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded-md border ${m.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                              <option>High</option><option>Medium</option><option>Low</option>
                            </select>
                          </div>
                        </div>
                        <button onClick={() => removeMilestone(m.id)} className="text-gray-200 hover:text-red-400 transition-colors mt-1"><X className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-brand-900 rounded-xl p-6 text-white space-y-4 shadow-xl">
                 <div className="flex items-center gap-2 text-brand-400"><Sparkles className="w-4 h-4 fill-brand-400" /><span className="text-[10px] font-black uppercase tracking-widest">Pro Planning</span></div>
                 <p className="text-sm font-medium leading-relaxed">"Most rejected projects fail due to poor timeline planning. LGIs want to see you start and finish within your service year."</p>
              </div>
            </div>

            {/* 3. AI Proposal Generator */}
            <div className="lg:col-span-12">
               <div className="card-standard border-2 border-brand-100 bg-brand-50/10 !p-8 md:!p-12">
                  <div className="grid lg:grid-cols-12 gap-12">
                     <div className="lg:col-span-4 space-y-8">
                        <div className="space-y-2">
                           <div className="flex items-center gap-2 text-brand-600"><Sparkles className="w-5 h-5 fill-brand-600" /><span className="text-[10px] font-black uppercase tracking-[0.2em]">AI Document Engine</span></div>
                           <h2 className="text-2xl font-black text-gray-900">Proposal Draftsman</h2>
                           <p className="text-sm text-gray-500 font-medium">Input core details for a structured formal proposal.</p>
                        </div>
                        <div className="space-y-5">
                          <div className="space-y-1.5"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Project Title</label><input className="input-standard bg-white border-gray-200" placeholder="e.g. School Renovation" value={proposalInputs.title} onChange={(e) => setProposalInputs({...proposalInputs, title: e.target.value})} /></div>
                          <div className="space-y-1.5"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Community / LGA</label><input className="input-standard bg-white border-gray-200" placeholder="e.g. Alimosho LGA" value={proposalInputs.community} onChange={(e) => setProposalInputs({...proposalInputs, community: e.target.value})} /></div>
                          <button onClick={handleGenerateProposal} disabled={isAiGenerating || !proposalInputs.title} className="w-full btn-primary py-4 px-10 shadow-lg shadow-green-200 flex items-center justify-center gap-3">
                            {isAiGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <PenTool className="w-5 h-5" />}
                            {isAiGenerating ? 'Structuring Draft...' : 'Generate Formatted Proposal'}
                          </button>
                        </div>
                     </div>
                     <div className="lg:col-span-8 flex flex-col min-h-[500px]">
                        <div className="flex-1 bg-white rounded-[2rem] border border-gray-200 p-8 md:p-12 flex flex-col relative shadow-inner overflow-hidden">
                           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '100% 2.5rem' }}></div>
                           {aiProposalResult ? (
                             <div className="flex-1 space-y-8 relative z-10 animate-in fade-in duration-500">
                                <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                                   <div className="flex items-center gap-3"><div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-brand-primary"><FileText className="w-6 h-6" /></div><div><h3 className="font-black text-gray-900 uppercase text-xs tracking-widest">Document Preview</h3><p className="text-[9px] font-bold text-gray-400 uppercase">DRAFT VERSION 1.0</p></div></div>
                                   <div className="flex gap-2"><button onClick={() => navigator.clipboard.writeText(aiProposalResult)} className="p-2.5 bg-gray-50 text-gray-400 hover:text-brand-600 rounded-xl transition-all"><Share2 className="w-4 h-4" /></button><button className="p-2.5 bg-gray-900 text-brand-primary rounded-xl transition-all shadow-lg active:scale-95"><Download className="w-4 h-4" /></button></div>
                                </div>
                                <div className="prose prose-sm max-w-none text-gray-700 font-medium leading-relaxed whitespace-pre-wrap font-serif text-base">{aiProposalResult}</div>
                             </div>
                           ) : (
                             <div className="flex-1 flex flex-col items-center justify-center text-center space-y-5 text-gray-300 relative z-10"><div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center border-2 border-dashed border-gray-200"><FileEdit className="w-10 h-10" /></div><div><h4 className="text-lg font-black text-gray-400 uppercase tracking-widest">Document Ready</h4><p className="text-sm font-medium max-w-xs mx-auto">Fill the details on the left and hit generate.</p></div></div>
                           )}
                           {isAiGenerating && <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-30 flex flex-col items-center justify-center gap-5"><div className="relative"><div className="w-20 h-20 border-4 border-gray-50 rounded-full"></div><div className="absolute inset-0 border-4 border-t-brand-primary border-transparent rounded-full animate-spin"></div><Sparkles className="absolute inset-0 m-auto w-8 h-8 text-brand-primary animate-pulse" /></div><div className="text-center space-y-1"><p className="text-lg font-black text-gray-900 tracking-tight">Writing Proposal...</p><p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Vetting against LGI standards</p></div></div>}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'guides' && (
        <div className="space-y-10 animate-in fade-in duration-500">
           <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 md:p-12 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none transform rotate-12">
                 <ShieldCheck className="w-64 h-64 text-brand-primary" />
              </div>
              <div className="grid lg:grid-cols-12 gap-12 relative z-10">
                 <div className="lg:col-span-7 space-y-10">
                    <div className="space-y-3">
                       <h2 className="text-2xl font-black text-gray-900 tracking-tight">Rules for Choosing a Personal CDS Project</h2>
                       <p className="text-gray-500 font-medium leading-relaxed">Official administrative protocols required for recognition and awards.</p>
                    </div>
                    
                    <div className="space-y-8">
                       {[
                         { id: 1, title: 'The "Felt-Need" Requirement', text: 'Projects must be based on observed community challenges jointly identified through "Community Entry" with traditional, religious, and youth leaders.', icon: Users },
                         { id: 2, title: 'The SMART Test of Selection', text: 'All proposals must be Specific, Measurable, Achievable, Rewarding, and Time-bound (capable of completion within 11 months).', icon: Target },
                         { id: 3, title: 'Mandatory Administrative Approval', text: 'Submit a formal proposal addressed to the State Coordinator through your LGI and ZI before starting any work.', icon: ClipboardList },
                         { id: 4, title: 'Financial Prohibitions', text: 'ON NO ACCOUNT should you use personal money. Act as a facilitator mobilizing corporate or government resources.', icon: Scale },
                         { id: 5, title: 'Execution and Reporting Rules', text: 'Submit progress reports with pictorial evidence every two months and obtain official commissioning before passing out.', icon: PieChart },
                       ].map(step => (
                         <div key={step.id} className="flex gap-6 group">
                            <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center font-bold group-hover:bg-brand-600 group-hover:text-white transition-all shrink-0 shadow-sm border border-gray-100">
                               <step.icon className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                               <h4 className="font-black text-gray-900 uppercase tracking-widest text-xs">{step.id}. {step.title}</h4>
                               <p className="text-sm text-gray-500 font-medium leading-relaxed">{step.text}</p>
                            </div>
                         </div>
                       ))}
                    </div>

                    <Link to="/knowledge/rules-for-choosing-personal-cds-project" className="inline-flex items-center gap-2 text-xs font-black text-brand-primary uppercase tracking-widest hover:underline">
                       Read Detailed Guidelines <ArrowRight className="w-4 h-4" />
                    </Link>
                 </div>

                 <div className="lg:col-span-5 space-y-8">
                    <div className="p-10 bg-red-50 border border-red-100 rounded-[2.5rem] space-y-6 relative overflow-hidden group">
                       <div className="absolute -top-10 -right-10 opacity-5 group-hover:scale-110 transition-transform"><Scale className="w-48 h-48" /></div>
                       <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-500 shadow-sm mb-4"><AlertTriangle className="w-6 h-6" /></div>
                       <h3 className="text-xl font-black text-red-900 leading-tight">Critical Prohibition: Personal Funding</h3>
                       <p className="text-red-700 text-sm font-medium leading-relaxed italic">
                         "Using personal funds nullifies the viability of a CDS project. Your role is as a facilitator, not a donor. Accountability requires a detailed analysis of income and expenditure with all receipts attached."
                       </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-100 rounded-[2.5rem] p-10 text-center space-y-6">
                       <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm text-gray-300">
                          <Eye className="w-8 h-8" />
                       </div>
                       <div className="space-y-2">
                          <h4 className="text-xl font-black text-gray-900">Pictorial Evidence</h4>
                          <p className="text-sm text-gray-500 font-medium leading-relaxed">Ensure you take high-quality photos of the 'Before', 'During', and 'After' stages for your final report.</p>
                       </div>
                       <button className="btn-secondary w-full py-4 text-[10px] font-black uppercase tracking-widest bg-white">View Success Sample Gallery</button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Blueprint Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setSelectedProject(null)} />
           <div className="relative bg-white rounded-2xl w-full max-w-4xl h-[85vh] overflow-hidden shadow-2xl animate-in zoom-in duration-300 flex flex-col">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <span className="px-3 py-1 bg-green-50 text-brand-primary rounded-full text-[9px] font-black uppercase tracking-widest border border-green-100">Blueprint</span>
                   <h2 className="text-xl font-bold text-gray-900 truncate">{selectedProject.title}</h2>
                 </div>
                 <button onClick={() => setSelectedProject(null)} className="p-2 hover:bg-gray-50 rounded-lg transition-colors"><X className="w-6 h-6 text-gray-400" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-10">
                 <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                       <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Project Overview</h3>
                       <p className="text-lg text-gray-700 font-medium leading-relaxed">{selectedProject.fullDescription}</p>
                    </div>
                    <div className="space-y-4">
                       <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Core Vitals</p>
                          <div className="space-y-4">
                             <div className="flex justify-between items-center"><span className="text-xs text-gray-500 font-bold">Difficulty</span><span className="text-xs font-black text-gray-900 px-2 py-1 bg-white rounded border">{selectedProject.difficulty}</span></div>
                             <div className="flex justify-between items-center"><span className="text-xs text-gray-500 font-bold">Duration</span><span className="text-xs font-black text-gray-900 px-2 py-1 bg-white rounded border">{selectedProject.duration}</span></div>
                             <div className="flex justify-between items-center"><span className="text-xs text-gray-500 font-bold">Reached</span><span className="text-xs font-black text-brand-600 px-2 py-1 bg-green-50 rounded border border-green-100">{selectedProject.beneficiaries}</span></div>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className="space-y-6">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Administrative Requirements</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                       {selectedProject.requirements.map((req, i) => (
                         <div key={i} className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-600" />
                            <span className="text-sm font-medium text-gray-700">{req}</span>
                         </div>
                       ))}
                    </div>
                 </div>
                 <div className="bg-gray-900 rounded-2xl p-8 text-white relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 opacity-5 transform scale-150"><Clock className="w-64 h-64" /></div>
                    <h3 className="text-xs font-black uppercase tracking-widest mb-6 text-brand-600 relative z-10">Implementation Phases</h3>
                    <div className="space-y-6 relative z-10">
                       {selectedProject.timeline.map((item, i) => (
                         <div key={i} className="flex gap-4 group">
                            <div className="flex flex-col items-center"><div className="w-3 h-3 rounded-full bg-brand-600"></div><div className="w-0.5 h-full bg-white/10 my-1"></div></div>
                            <div><span className="text-[10px] font-black text-gray-500 uppercase">{item.week}</span><p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{item.milestone}</p></div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                 <button className="flex-1 btn-primary py-4 text-xs shadow-lg shadow-green-100">Download Blueprint (PDF)</button>
                 <button className="flex-1 btn-secondary py-4 text-xs bg-white" onClick={() => { setActiveTab('planning'); setSelectedProject(null); }}>Use this in Planner</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default CDSToolkit;
