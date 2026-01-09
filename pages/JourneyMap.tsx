import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Check, ChevronDown, ChevronUp, Lock, AlertTriangle, 
  FileText, Download, Printer, Mail, Info, Clock, 
  DollarSign, CheckCircle2, XCircle, AlertCircle, Sparkles,
  ArrowRight, Calendar
} from 'lucide-react';
import { NYSC_STAGES, MOCK_USER, MOCK_ARTICLES, MOCK_DEADLINES } from '../constants';
import { Link } from 'react-router-dom';
import { ChecklistItem } from '../types';

const JourneyMap: React.FC = () => {
  const currentStageIdx = useMemo(() => NYSC_STAGES.findIndex(s => s.slug === MOCK_USER.currentStage), []);
  
  const [expandedStage, setExpandedStage] = useState<string | null>(
    NYSC_STAGES[currentStageIdx]?.id || null
  );
  
  const [stageChecklists, setStageChecklists] = useState<{ [key: string]: ChecklistItem[] }>(
    NYSC_STAGES.reduce((acc, stage) => ({ ...acc, [stage.id]: stage.checklist }), {})
  );

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (expandedStage) {
      setTimeout(() => {
        const el = document.getElementById(`stage-${expandedStage}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  }, []);

  const toggleStage = (id: string) => {
    setExpandedStage(expandedStage === id ? null : id);
  };

  const toggleTask = (stageId: string, taskId: string) => {
    setStageChecklists(prev => ({
      ...prev,
      [stageId]: prev[stageId].map(item => 
        item.id === taskId ? { ...item, isCompleted: !item.isCompleted } : item
      )
    }));
  };

  const getOverallProgress = () => {
    const allItems = Object.values(stageChecklists).flat() as ChecklistItem[];
    const total = allItems.length;
    const completed = allItems.filter(t => t.isCompleted).length;
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  const overallProgress = getOverallProgress();

  return (
    <div className="max-w-4xl mx-auto pb-20" ref={containerRef}>
      {/* Header Section */}
      <div className="card-standard !p-8 md:!p-10 mb-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">NYSC Journey</h1>
            <p className="text-gray-500 text-sm mt-1">Track your progress through the service year.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="btn-secondary py-2 text-xs flex-1 sm:flex-none">
              <Download className="w-3.5 h-3.5 mr-2" /> Export
            </button>
            <button className="btn-secondary py-2 text-xs flex-1 sm:flex-none">
              <Printer className="w-3.5 h-3.5 mr-2" /> Print
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Progress</span>
            <span className="text-sm font-bold text-brand-600">{overallProgress}%</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-600 transition-all duration-700"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-6 relative">
        <div className="absolute left-6 md:left-8 top-8 bottom-8 w-0.5 bg-gray-100 hidden sm:block" />

        {NYSC_STAGES.map((stage, index) => {
          const isCompleted = index < currentStageIdx;
          const isCurrent = stage.slug === MOCK_USER.currentStage;
          const isExpanded = expandedStage === stage.id;
          const Icon = stage.icon;
          const checklist = stageChecklists[stage.id];
          const completedCount = checklist.filter(t => t.isCompleted).length;
          const totalCount = checklist.length;

          return (
            <div key={stage.id} id={`stage-${stage.id}`} className="relative sm:pl-16">
              <div className={`absolute left-0 top-6 w-12 h-12 rounded-xl flex items-center justify-center border-2 z-10 transition-all hidden sm:flex ${
                isCompleted ? 'bg-brand-600 border-brand-600 text-white' :
                isCurrent ? 'bg-white border-brand-600 text-brand-600 shadow-sm' :
                'bg-gray-50 border-gray-100 text-gray-300'
              }`}>
                {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>

              <div className={`card-standard !p-0 overflow-hidden ${isCurrent ? 'border-brand-600 ring-4 ring-brand-50' : ''}`}>
                <div 
                  className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleStage(stage.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="sm:hidden">
                       <Icon className={`w-5 h-5 ${isCurrent ? 'text-brand-600' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stage {index + 1}</p>
                      <h2 className={`font-bold text-lg ${isCurrent ? 'text-gray-900' : 'text-gray-500'}`}>{stage.name}</h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {isCurrent && <span className="hidden sm:inline text-[9px] font-bold uppercase text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">In Progress</span>}
                    <div className={`p-2 rounded-lg transition-all ${isExpanded ? 'bg-brand-50 text-brand-600' : 'text-gray-300'}`}>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-5 md:p-8 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300 space-y-6">
                    <div className="space-y-4">
                       <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Description</h3>
                       <p className="text-sm text-gray-600 leading-relaxed">{stage.overview}</p>
                    </div>

                    <div className="space-y-4">
                       <div className="flex items-center justify-between">
                         <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tasks ({completedCount}/{totalCount})</h3>
                       </div>
                       <div className="grid gap-3">
                          {checklist.map(item => (
                            <div 
                              key={item.id} 
                              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                              onClick={(e) => { e.stopPropagation(); toggleTask(stage.id, item.id); }}
                            >
                               <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-all ${
                                item.isCompleted ? 'bg-brand-600 border-brand-600 text-white' : 'bg-white border-gray-200'
                              }`}>
                                {item.isCompleted && <Check className="w-3.5 h-3.5" />}
                              </div>
                              <span className={`text-sm font-medium ${item.isCompleted ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{item.task}</span>
                            </div>
                          ))}
                       </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                       <div className="p-4 bg-brand-50 rounded-lg border border-brand-100">
                          <h4 className="text-[10px] font-bold text-brand-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                             <CheckCircle2 className="w-3 h-3" /> Tips
                          </h4>
                          <ul className="space-y-2">
                             {stage.dos.slice(0, 2).map((tip, i) => (
                               <li key={i} className="text-xs text-brand-800 font-medium leading-relaxed">• {tip}</li>
                             ))}
                          </ul>
                       </div>
                       <div className="p-4 bg-gray-900 rounded-lg text-white">
                          <h4 className="text-[10px] font-bold text-brand-600 uppercase tracking-widest mb-2">Details</h4>
                          <div className="space-y-2">
                             <p className="text-xs flex justify-between"><span className="opacity-60">Duration:</span> <span>{stage.duration}</span></p>
                             <p className="text-xs flex justify-between"><span className="opacity-60">Budget:</span> <span>{stage.estimatedCosts}</span></p>
                          </div>
                       </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JourneyMap;