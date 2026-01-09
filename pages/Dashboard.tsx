import React, { useState, useMemo } from 'react';
import { 
  Calendar, BookOpen, Clock, ArrowRight, 
  Sparkles, Target, Award, Bell, Map, ChevronRight,
  Zap, Hammer, Compass, FileText, CheckCircle2, Repeat,
  AlertTriangle, Briefcase, ShieldCheck, Landmark,
  Wallet, TrendingUp, Users, QrCode, Shield, History,
  LayoutGrid, Activity, Star, Plus, Target as MissionIcon,
  RotateCw, Download, FileJson, Image as ImageIcon, File
} from 'lucide-react';
import { MOCK_USER, MOCK_DEADLINES, NYSC_STAGES } from '../constants';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const currentStage = useMemo(() => NYSC_STAGES.find(s => s.slug === MOCK_USER.currentStage), []);
  const currentStageIdx = useMemo(() => NYSC_STAGES.findIndex(s => s.slug === MOCK_USER.currentStage), []);
  
  const [phaseChecklist, setPhaseChecklist] = useState(currentStage?.checklist || []);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const [missionChecklist, setMissionChecklist] = useState([
    { id: 'm1', task: 'Get State Award', isCompleted: false },
    { id: 'm2', task: 'Impact 1,000+ Students', isCompleted: false },
    { id: 'm3', task: 'Execute 3 Personal CDS Projects', isCompleted: false },
    { id: 'm4', task: 'Secure Job Before POP', isCompleted: true },
  ]);

  const togglePhaseTask = (id: string) => {
    setPhaseChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    ));
  };

  const toggleMissionTask = (id: string) => {
    setMissionChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    ));
  };

  const handleDownload = (format: 'png' | 'pdf') => {
    setIsDownloading(true);
    // Simulate generation/download process
    setTimeout(() => {
      setIsDownloading(false);
      alert(`Your Digital ID has been generated in ${format.toUpperCase()} format and saved to your device.`);
    }, 2000);
  };

  const completedPhaseTasks = phaseChecklist.filter(t => t.isCompleted).length;
  const totalPhaseTasks = phaseChecklist.length;

  // Calculated Metrics
  const daysInService = 142; 
  const daysToPOP = 223; 
  const articlesMastered = 8; 
  const monthsCleared = 4; 
  const globalMastery = Math.round(((currentStageIdx + 1) / NYSC_STAGES.length) * 100);

  const activities = [
    { id: 1, text: 'Uploaded Call-up Letter to Vault', time: '2h ago', icon: <FileText className="w-3.5 h-3.5 text-blue-500" /> },
    { id: 2, text: 'Marked "Report to PPA" as complete', time: 'Yesterday', icon: <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" /> },
    { id: 3, text: 'Read "Surviving Maami Market"', time: '2 days ago', icon: <BookOpen className="w-3.5 h-3.5 text-purple-500" /> }
  ];

  const contextualIntelligence = useMemo(() => {
    switch (MOCK_USER.currentStage) {
      case 'ppa':
        return "Your PPA period is the longest phase. Focus on professional networking and ensuring your biometric clearance is done before the 25th of every month.";
      case 'cds':
        return "Legacy time! Aim for a project that impacts at least 100 people to increase your chances of a state award.";
      default:
        return "Stay consistent with your documentation. The secret to a stress-free POP is an organized file cabinet.";
    }
  }, []);

  return (
    <div className="space-y-8 pb-32 max-w-7xl mx-auto">
      {/* 1. Identification Card & Global Mastery Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Identification Card Section */}
        <div className="lg:col-span-5 flex flex-col gap-4">
           <div className="perspective-1000 relative h-64 w-full">
              <div className={`relative w-full h-full transition-transform duration-700 preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
                
                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-brand-900 via-brand-700 to-brand-600 rounded-[2.5rem] p-8 text-white shadow-2xl overflow-hidden group">
                  <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform">
                    <Landmark className="w-48 h-48" />
                  </div>
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-900 font-black text-xl shadow-lg">N</div>
                        <div>
                          <h3 className="font-black text-xs uppercase tracking-[0.2em] opacity-70">Identification Card</h3>
                          <p className="text-[10px] font-bold text-brand-100 uppercase tracking-widest">National Service Digital Credential</p>
                        </div>
                      </div>
                      <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg border border-white/10">
                        <QrCode className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="flex items-end justify-between">
                      <div className="space-y-4">
                        <div>
                          <p className="text-[10px] font-black text-brand-200 uppercase tracking-widest mb-1">Full Name</p>
                          <p className="text-xl font-black tracking-tight">{MOCK_USER.name}</p>
                        </div>
                        <div className="flex gap-8">
                          <div>
                            <p className="text-[9px] font-black text-brand-200 uppercase tracking-widest mb-0.5">State Code</p>
                            <p className="text-xs font-bold font-mono">{MOCK_USER.stateCode}</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-brand-200 uppercase tracking-widest mb-0.5">Batch</p>
                            <p className="text-xs font-bold">{MOCK_USER.batch}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-brand-700 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
                          <Shield className="w-3 h-3 fill-brand-700" /> Verified
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl overflow-hidden border border-white/10">
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                      <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-brand-primary">Terms of Use</h3>
                      <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center font-black">N</div>
                    </div>
                    
                    <div className="space-y-4 py-4">
                       <p className="text-[9px] font-medium leading-relaxed text-gray-400">
                         This card remains the property of the National Youth Service Corps (NYSC). It is for official identification purposes only during the period of national service. Misuse of this card is subject to the NYSC Bye-Laws and Nigerian Law.
                       </p>
                       <div className="grid grid-cols-2 gap-4 pt-2">
                          <div>
                             <p className="text-[8px] font-black uppercase text-gray-500 mb-1">Emergency Contact</p>
                             <p className="text-[10px] font-bold">0800-NYSC-HELP</p>
                          </div>
                          <div>
                             <p className="text-[8px] font-black uppercase text-gray-500 mb-1">Issue Date</p>
                             <p className="text-[10px] font-bold">Feb 2024</p>
                          </div>
                       </div>
                    </div>

                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
                       <div className="space-y-1">
                          <div className="w-24 h-8 border border-white/20 rounded-md flex items-center justify-center italic text-[8px] text-gray-500">Signature Area</div>
                          <p className="text-[7px] font-black uppercase text-gray-500 tracking-widest">Holder Signature</p>
                       </div>
                       <div className="text-right">
                          <p className="text-[7px] font-black uppercase text-gray-400 mb-1">Official Authenticator</p>
                          <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mx-auto">
                            <ShieldCheck className="w-6 h-6 text-brand-primary opacity-50" />
                          </div>
                       </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
                    <Landmark className="w-64 h-64" />
                  </div>
                </div>

              </div>
           </div>

           {/* Card Controls */}
           <div className="flex gap-2">
              <button 
                onClick={() => setIsFlipped(!isFlipped)} 
                className="flex-1 btn-secondary !py-3 !rounded-2xl text-[10px] uppercase font-black tracking-widest flex items-center justify-center gap-2"
              >
                <RotateCw className={`w-4 h-4 transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} /> 
                {isFlipped ? 'View Front' : 'View Back'}
              </button>
              
              <div className="relative group flex-1">
                 <button 
                  disabled={isDownloading}
                  className="w-full btn-primary !py-3 !rounded-2xl text-[10px] uppercase font-black tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-green-900/20"
                 >
                   {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />} 
                   Download ID
                 </button>
                 
                 {/* Download Dropdown */}
                 <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all p-2 z-20">
                    <button onClick={() => handleDownload('png')} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors">
                       <ImageIcon className="w-4 h-4 text-brand-primary" />
                       <div className="flex-1">
                          <p className="text-[10px] font-black uppercase text-gray-900 dark:text-white leading-none">Download PNG</p>
                          <p className="text-[8px] text-gray-400 font-bold mt-1">High resolution image</p>
                       </div>
                    </button>
                    <button onClick={() => handleDownload('pdf')} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors mt-1">
                       <File className="w-4 h-4 text-red-500" />
                       <div className="flex-1">
                          <p className="text-[10px] font-black uppercase text-gray-900 dark:text-white leading-none">Download PDF</p>
                          <p className="text-[8px] text-gray-400 font-bold mt-1">Print-ready document</p>
                       </div>
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Global Mastery & Metrics Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 p-8 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-brand-50 dark:bg-brand-900/30 text-brand-600 rounded-2xl"><Target className="w-5 h-5" /></div>
                    <h3 className="font-black text-sm uppercase tracking-widest text-gray-900 dark:text-white">Global Mastery</h3>
                 </div>
                 <span className="text-2xl font-black text-brand-600">{globalMastery}%</span>
              </div>
              <div className="space-y-4">
                 <div className="h-4 w-full bg-gray-50 dark:bg-gray-700 rounded-full overflow-hidden border border-gray-100 dark:border-gray-600 p-1">
                    <div className="h-full bg-brand-600 rounded-full transition-all duration-1000" style={{ width: `${globalMastery}%` }} />
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <span>Mobilization</span>
                    <span className="text-brand-600">Active Service</span>
                    <span>POP</span>
                 </div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-gray-50 dark:border-gray-700 pt-6">
                 <div>
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Articles Mastered</p>
                    <div className="flex items-center gap-2">
                       <BookOpen className="w-4 h-4 text-purple-500" />
                       <span className="text-lg font-black text-gray-900 dark:text-white">{articlesMastered}</span>
                    </div>
                 </div>
                 <div>
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Months Cleared</p>
                    <div className="flex items-center gap-2">
                       <CheckCircle2 className="w-4 h-4 text-brand-600" />
                       <span className="text-lg font-black text-gray-900 dark:text-white">{monthsCleared}/12</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-brand-50 dark:bg-brand-900/10 rounded-[2.5rem] p-8 flex flex-col justify-between border border-brand-100 dark:border-brand-900/30">
              <div className="space-y-6">
                 <div className="p-3 bg-white dark:bg-gray-800 rounded-2xl w-fit shadow-sm"><Clock className="w-6 h-6 text-brand-600" /></div>
                 <div>
                    <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{daysToPOP}</p>
                    <p className="text-[10px] font-black text-brand-700 dark:text-brand-400 uppercase tracking-widest mt-1">Days to POP</p>
                 </div>
              </div>
              <div className="pt-6 border-t border-brand-200/30 dark:border-brand-900/20">
                 <p className="text-xl font-black text-gray-800 dark:text-gray-200">{daysInService}</p>
                 <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Days in Service</p>
              </div>
           </div>
        </div>
      </div>

      {/* Styles for flip animation */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>

      {/* 2. Intelligence & Roadmap */}
      <div className="space-y-8">
           {/* Contextual Intelligence */}
           <div className="bg-gray-50 dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                 <Sparkles className="w-32 h-32 text-brand-primary" />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                 <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-2xl flex items-center justify-center text-brand-primary shadow-xl border border-brand-50 dark:border-gray-600 shrink-0">
                    <Zap className="w-8 h-8 fill-brand-primary" />
                 </div>
                 <div className="space-y-4">
                    <div className="flex items-center gap-2">
                       <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-[9px] font-black uppercase tracking-widest">Contextual Intelligence</span>
                       <span className="text-[9px] font-bold text-gray-400 uppercase">Stage: {currentStage?.name}</span>
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">Expert Strategy for your {currentStage?.name} phase.</h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium text-base leading-relaxed italic">
                       "{contextualIntelligence}"
                    </p>
                    <button className="flex items-center gap-2 text-xs font-black text-brand-primary uppercase tracking-widest hover:underline pt-2">
                       Ask AI specific question <ArrowRight className="w-4 h-4" />
                    </button>
                 </div>
              </div>
           </div>

           {/* Service Progress Roadmap */}
           <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 p-8 md:p-10 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                 <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-2xl"><Activity className="w-5 h-5" /></div>
                    <h3 className="font-black text-sm uppercase tracking-widest text-gray-900 dark:text-white">Service Progress Roadmap</h3>
                 </div>
                 <Link to="/journey" className="text-[10px] font-black text-brand-primary uppercase tracking-widest hover:underline">Full Details</Link>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative gap-8 md:gap-4 px-2">
                 <div className="absolute left-[23px] md:left-0 top-0 md:top-6 bottom-0 md:bottom-auto w-0.5 md:w-full h-full md:h-0.5 bg-gray-100 dark:bg-gray-700 z-0"></div>
                 <div className="absolute left-[23px] md:left-0 top-0 md:top-6 bottom-0 md:bottom-auto w-0.5 md:w-[60%] h-full md:h-0.5 bg-brand-600 z-0 transition-all duration-1000"></div>

                 {NYSC_STAGES.map((stage, i) => {
                   const isDone = i < currentStageIdx;
                   const isCurrent = i === currentStageIdx;
                   return (
                     <div key={stage.slug} className="relative z-10 flex md:flex-col items-center gap-4 md:gap-3 text-center w-full md:w-auto group">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-4 transition-all duration-500 ${
                          isDone ? 'bg-brand-600 border-brand-50 dark:border-brand-900 text-white' :
                          isCurrent ? 'bg-white dark:bg-gray-700 border-brand-600 text-brand-600 shadow-xl scale-110' :
                          'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-300 dark:text-gray-600'
                        }`}>
                           <stage.icon className="w-5 h-5" />
                        </div>
                        <div className="text-left md:text-center">
                           <p className={`text-[9px] font-black uppercase tracking-widest ${isCurrent ? 'text-brand-600' : 'text-gray-400'}`}>Stage {i+1}</p>
                           <p className={`text-[10px] font-bold truncate max-w-[100px] hidden md:block ${isCurrent ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>{stage.name}</p>
                        </div>
                     </div>
                   )
                 })}
              </div>
           </div>
      </div>

      {/* 3. Checklist Section (Phase & Mission) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Phase Checklist */}
          <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-gray-50 dark:border-gray-700 flex items-center justify-between">
                 <div>
                    <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">Phase Checklist</h3>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Current Focus: {currentStage?.name}</p>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                       <p className="text-lg font-black text-brand-600">{completedPhaseTasks}/{totalPhaseTasks}</p>
                       <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Tasks Met</p>
                    </div>
                    <button className="p-3 bg-gray-50 dark:bg-gray-700 rounded-2xl text-gray-400 hover:text-brand-primary transition-all"><Plus className="w-5 h-5" /></button>
                 </div>
              </div>
              <div className="p-6 grid gap-3 max-h-[350px] overflow-y-auto scrollbar-hide">
                 {phaseChecklist.map((task) => (
                   <div 
                    key={task.id} 
                    onClick={() => togglePhaseTask(task.id)}
                    className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer group ${
                      task.isCompleted ? 'bg-gray-50 dark:bg-gray-700/50 border-transparent opacity-60' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-brand-primary/30 hover:shadow-md'
                    }`}
                   >
                      <div className={`mt-0.5 w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                        task.isCompleted ? 'bg-brand-600 border-brand-600 text-white shadow-lg' : 'border-gray-200 dark:border-gray-600 group-hover:border-brand-primary'
                      }`}>
                         {task.isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className={`text-sm font-bold leading-snug ${task.isCompleted ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-gray-100'}`}>{task.task}</p>
                      </div>
                   </div>
                 ))}
              </div>
          </div>

          {/* Mission Checklist */}
          <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-gray-50 dark:border-gray-700 flex items-center justify-between">
                 <div>
                    <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">Mission Checklist</h3>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">High-Level Service Goals</p>
                 </div>
                 <div className="p-3 bg-brand-50 dark:bg-brand-900/30 text-brand-600 rounded-2xl"><MissionIcon className="w-5 h-5" /></div>
              </div>
              <div className="p-6 grid gap-3 max-h-[350px] overflow-y-auto scrollbar-hide">
                 {missionChecklist.map((task) => (
                   <div 
                    key={task.id} 
                    onClick={() => toggleMissionTask(task.id)}
                    className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer group ${
                      task.isCompleted ? 'bg-gray-50 dark:bg-gray-700/50 border-transparent opacity-60' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-brand-primary/30 hover:shadow-md'
                    }`}
                   >
                      <div className={`mt-0.5 w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                        task.isCompleted ? 'bg-special border-special text-white shadow-lg' : 'border-gray-200 dark:border-gray-600 group-hover:border-special'
                      }`}>
                         {task.isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className={`text-sm font-bold leading-snug ${task.isCompleted ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-gray-100'}`}>{task.task}</p>
                      </div>
                   </div>
                 ))}
              </div>
          </div>
      </div>

      {/* 4. Tracking Row (Allawee & Radar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Allawee Tracker */}
        <div className="lg:col-span-4 bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 p-8 shadow-xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 opacity-5"><Wallet className="w-40 h-40" /></div>
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-green-50 dark:bg-green-900/30 text-brand-primary rounded-2xl shadow-sm"><Wallet className="w-5 h-5" /></div>
                <h3 className="font-black text-sm uppercase tracking-widest text-gray-900 dark:text-white">Allawee Tracker</h3>
            </div>
            <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Federal Allowance</p>
                  <div className="flex items-center justify-between">
                      <h4 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">₦33,000</h4>
                      <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded text-[10px] font-black uppercase">Active</span>
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-50 dark:border-gray-700">
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Estimated Next Pay</p>
                  <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">~12 Days Left</span>
                      <div className="w-24 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-600 rounded-full" style={{ width: '60%' }} />
                      </div>
                  </div>
                </div>
            </div>
            <button className="w-full mt-10 py-4 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all">
                View History
            </button>
        </div>

        {/* Deadline Radar */}
        <div className="lg:col-span-5 bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-red-50 dark:bg-red-900/30 text-red-600 rounded-2xl"><Bell className="w-5 h-5" /></div>
                  <h3 className="font-black text-sm uppercase tracking-widest text-gray-900 dark:text-white">Deadline Radar</h3>
                </div>
                <Link to="/deadlines" className="text-[10px] font-black text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors">Calendar</Link>
            </div>
            <div className="space-y-4">
                {MOCK_DEADLINES.slice(0, 2).map((deadline) => (
                  <div key={deadline.id} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-2xl border border-transparent hover:border-red-100 transition-all">
                      <div className={`w-1 h-auto rounded-full ${deadline.urgency === 'Critical' ? 'bg-red-500' : 'bg-orange-500'}`} />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-black text-gray-900 dark:text-white truncate">{deadline.title}</h4>
                        <div className="flex justify-between items-center mt-2 text-[10px] font-black uppercase tracking-widest">
                            <span className="text-gray-400">{deadline.stage}</span>
                            <span className="text-red-600">In 2 Days</span>
                        </div>
                      </div>
                  </div>
                ))}
            </div>
        </div>

        {/* Quick Nav */}
        <div className="lg:col-span-3 space-y-4">
          <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Relocation', icon: Repeat, path: '/relocation', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                { label: 'Vault', icon: FileText, path: '/vault', color: 'text-brand-primary', bg: 'bg-green-50 dark:bg-green-900/20' },
                { label: 'Knowledge', icon: BookOpen, path: '/knowledge', color: 'text-special', bg: 'bg-purple-50 dark:bg-purple-900/20' },
                { label: 'CDS Tool', icon: Hammer, path: '/cds-toolkit', color: 'text-warning', bg: 'bg-orange-50 dark:bg-orange-900/20' },
              ].map((nav, i) => (
                <Link key={i} to={nav.path} className="flex flex-col items-center justify-center text-center p-4 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 hover:border-brand-primary transition-all group">
                    <div className={`p-3 rounded-2xl ${nav.bg} ${nav.color} mb-2 group-hover:scale-110 transition-transform`}>
                      <nav.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400">{nav.label}</span>
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* 5. Bottom Row (Recent History) */}
      <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-gray-50 dark:bg-gray-700 text-gray-400 rounded-2xl"><History className="w-5 h-5" /></div>
              <h3 className="font-black text-sm uppercase tracking-widest text-gray-900 dark:text-white">Recent History</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activities.map((act) => (
                <div key={act.id} className="flex gap-4 group">
                    <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center shrink-0 border border-gray-100 dark:border-gray-600">
                      {act.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-700 dark:text-gray-300 leading-snug">{act.text}</p>
                      <p className="text-[9px] font-black text-gray-300 dark:text-gray-500 uppercase tracking-widest mt-1">{act.time}</p>
                    </div>
                </div>
              ))}
          </div>
      </div>
    </div>
  );
};

// Custom Rotate component for flipping
const Loader2 = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export default Dashboard;