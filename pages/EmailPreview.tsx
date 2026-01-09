
import React, { useState } from 'react';
import { Mail, ChevronRight, Eye, Send, Code, Info, ArrowLeft } from 'lucide-react';
import { templates } from '../services/emailTemplates';
import { Link } from 'react-router-dom';

const EmailPreview: React.FC = () => {
  const [activeTemplate, setActiveTemplate] = useState<keyof typeof templates>('welcome');
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');

  const getHtml = () => {
    switch(activeTemplate) {
      case 'welcome': return templates.welcome('Chioma Adebayo');
      case 'deadline': return templates.deadline('Monthly Bio-metrics Clearance', 2, 'PPA Stage');
      case 'weeklySummary': return templates.weeklySummary('Chioma Adebayo', 60, 12);
      case 'newArticle': return templates.newArticle('Surviving Maami Market Prices', 'Learn how to eat well in camp without going broke...', 'surviving-maami');
      case 'upgrade': return templates.upgrade();
      case 'passwordReset': return templates.passwordReset('https://smartcorper.app/reset-password?token=xyz123');
      case 'expiry': return templates.expiry(5);
      default: return '';
    }
  };

  const templateList: { id: keyof typeof templates; label: string; desc: string }[] = [
    { id: 'welcome', label: 'Welcome Email', desc: 'Sent immediately after user registration.' },
    { id: 'deadline', label: 'Deadline Reminder', desc: 'Triggered based on upcoming checklist items.' },
    { id: 'weeklySummary', label: 'Weekly Summary', desc: 'Monday morning progress reports.' },
    { id: 'newArticle', label: 'New Guide Alert', desc: 'Sent when relevant guides are published.' },
    { id: 'upgrade', label: 'Upgrade Prompt', desc: 'Encouraging free users to go Pro.' },
    { id: 'passwordReset', label: 'Password Reset', desc: 'Security link for lost passwords.' },
    { id: 'expiry', label: 'Subscription Expiry', desc: 'Alert for Pro members nearing end of plan.' },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-32">
      <div className="mb-10 flex items-center justify-between">
        <div>
           <Link to="/settings" className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-primary mb-4 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5 mr-2" /> Back to Settings
           </Link>
           <h1 className="text-3xl font-black text-gray-900 tracking-tight">Email System Preview</h1>
           <p className="text-gray-500 font-medium mt-1">Review and test notification templates for the SmartCorper system.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-gray-200 shadow-sm">
           <button 
            onClick={() => setViewMode('preview')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'preview' ? 'bg-brand-primary text-white shadow-lg shadow-green-100' : 'text-gray-400 hover:text-gray-600'}`}
           >
             <Eye className="w-4 h-4" /> Visual
           </button>
           <button 
            onClick={() => setViewMode('code')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'code' ? 'bg-brand-primary text-white shadow-lg shadow-green-100' : 'text-gray-400 hover:text-gray-600'}`}
           >
             <Code className="w-4 h-4" /> Code
           </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Sidebar Selector */}
        <div className="lg:col-span-4 space-y-4">
           {templateList.map((t) => (
             <button
              key={t.id}
              onClick={() => setActiveTemplate(t.id)}
              className={`w-full text-left p-6 rounded-[2rem] border transition-all flex items-start gap-5 group ${
                activeTemplate === t.id 
                  ? 'bg-white border-brand-primary shadow-xl shadow-green-100' 
                  : 'bg-gray-50 border-transparent hover:border-gray-200'
              }`}
             >
               <div className={`p-3 rounded-2xl transition-colors ${activeTemplate === t.id ? 'bg-green-50 text-brand-primary' : 'bg-white text-gray-400 group-hover:text-gray-600'}`}>
                 <Mail className="w-6 h-6" />
               </div>
               <div className="flex-1">
                 <h4 className={`font-black text-sm uppercase tracking-widest ${activeTemplate === t.id ? 'text-gray-900' : 'text-gray-400'}`}>{t.label}</h4>
                 <p className="text-xs text-gray-500 font-medium mt-1 leading-relaxed">{t.desc}</p>
               </div>
               <ChevronRight className={`w-4 h-4 mt-1 transition-all ${activeTemplate === t.id ? 'text-brand-primary translate-x-1' : 'text-gray-200'}`} />
             </button>
           ))}
           
           <div className="p-8 bg-gray-900 rounded-[2.5rem] text-white mt-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-10"><Send className="w-20 h-20" /></div>
             <h3 className="font-black text-xl mb-4 relative z-10">Test Send</h3>
             <p className="text-gray-400 text-xs font-medium mb-6 relative z-10">Send a test copy of this template to your registered email address.</p>
             <button className="w-full py-4 bg-brand-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all relative z-10">
               Send Test to chioma@ex...
             </button>
           </div>
        </div>

        {/* Content Preview */}
        <div className="lg:col-span-8 flex flex-col h-full">
           <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-100/50 flex-1 flex flex-col overflow-hidden">
              <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex items-center gap-4">
                 <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-red-400" />
                   <div className="w-3 h-3 rounded-full bg-yellow-400" />
                   <div className="w-3 h-3 rounded-full bg-green-400" />
                 </div>
                 <div className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-1.5 text-[10px] font-bold text-gray-400 flex items-center justify-between">
                    <span>Subject: {templateList.find(t => t.id === activeTemplate)?.label} | NYSC Smart Companion</span>
                    <Info className="w-3 h-3" />
                 </div>
              </div>
              <div className="flex-1 overflow-y-auto bg-[#f9fafb] p-8 md:p-12">
                 {viewMode === 'preview' ? (
                   <div className="flex justify-center">
                     <div 
                      className="w-full bg-white shadow-sm"
                      dangerouslySetInnerHTML={{ __html: getHtml() }} 
                     />
                   </div>
                 ) : (
                   <div className="bg-gray-900 rounded-3xl p-8 font-mono text-xs text-green-400 leading-relaxed overflow-x-auto whitespace-pre">
                     {getHtml()}
                   </div>
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EmailPreview;
