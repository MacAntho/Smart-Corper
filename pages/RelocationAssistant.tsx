
import React, { useState, useMemo } from 'react';
import { 
  ArrowRight, ShieldCheck, Heart, Users, FileCheck, 
  Info, AlertTriangle, Check, ChevronRight, Calculator,
  Zap, Clock, ShieldAlert, Star, GraduationCap, X,
  FileText, MessageSquare, Loader2, Award, BarChart3, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, ArrowLeft
} from 'lucide-react';
import { MOCK_USER } from '../constants';
import { generateNYSCAdvice } from '../services/geminiService';

type Step = 'intro' | 'basic' | 'details' | 'evidence' | 'calculating' | 'result';

const RelocationAssistant: React.FC = () => {
  const [activeStep, setActiveStep] = useState<Step>('intro');
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const [aiAdvice, setAiAdvice] = useState('');
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    currentState: MOCK_USER.deploymentState,
    requestedState: '',
    reason: '',
    details: '',
    hasDoc: 'no',
    evidenceTypes: [] as string[]
  });

  const reasons = [
    { id: 'medical', label: 'Medical', icon: Heart, desc: 'Chronic illness or urgent care.' },
    { id: 'marital', label: 'Marital', icon: Users, desc: 'Joining your husband.' },
    { id: 'security', label: 'Security', icon: ShieldAlert, desc: 'Threats in your local area.' },
    { id: 'other', label: 'Other', icon: Info, desc: 'Family emergencies.' }
  ];

  const calculateEligibility = async () => {
    setActiveStep('calculating');
    setLoadingAdvice(true);
    const query = `Analyze NYSC relocation case: Reason=${formData.reason}, From=${formData.currentState}, To=${formData.requestedState}. Context: ${formData.details}. User has ${formData.evidenceTypes.length} documents. Provide concise, expert advice (under 120 words).`;
    const advice = await generateNYSCAdvice(query);
    setAiAdvice(advice);
    setLoadingAdvice(false);
    setTimeout(() => setActiveStep('result'), 1500);
  };

  const handleNext = () => {
    if (activeStep === 'intro') setActiveStep('basic');
    else if (activeStep === 'basic') setActiveStep('details');
    else if (activeStep === 'details') setActiveStep('evidence');
    else if (activeStep === 'evidence') calculateEligibility();
  };

  const score = useMemo(() => {
    const scoreBase = formData.hasDoc === 'yes' ? 60 : 20;
    return Math.min(scoreBase + (formData.evidenceTypes.length * 15), 98);
  }, [formData]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-32">
      {activeStep === 'intro' && (
        <div className="space-y-12 animate-in fade-in duration-500">
           <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl p-8 md:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none hidden md:block">
                 <ShieldCheck className="w-64 h-64 text-brand-primary" />
              </div>
              <div className="relative z-10 max-w-3xl mx-auto">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                    <Calculator className="w-4 h-4" /> 2-Min Assessment
                 </div>
                 <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">Am I Eligible for <span className="text-brand-primary">Relocation?</span></h1>
                 <p className="text-lg md:text-xl text-gray-500 mt-6 font-medium leading-relaxed">
                   Run your case against 2024 NYSC Bye-Laws to check your odds instantly and get an AI review of your situation.
                 </p>
                 <button onClick={handleNext} className="mt-12 btn-primary w-full md:w-auto px-12 py-5 text-lg font-black shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-widest">
                    Start Assessment <ArrowRight className="w-6 h-6" />
                 </button>
                 <p className="mt-8 text-[10px] text-gray-400 font-bold uppercase tracking-widest">Final decision rests with official Zonal/State officials.</p>
              </div>
           </div>

           <div className="grid md:grid-cols-3 gap-8">
              {[
                { label: 'Success Rate', value: '47%', icon: BarChart3, color: 'text-green-600', bg: 'bg-green-50' },
                { label: 'Wait Time', value: '2-4 wks', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Key Ground', value: 'Medical', icon: Heart, color: 'text-red-600', bg: 'bg-red-50' }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5">
                   <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}><stat.icon className="w-6 h-6" /></div>
                   <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{stat.label}</p>
                      <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}

      {(['basic', 'details', 'evidence'].includes(activeStep)) && (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden animate-in slide-in-from-right-4 duration-500 max-w-3xl mx-auto">
           <div className="bg-gray-50 px-10 py-8 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <button onClick={() => setActiveStep('intro')} className="p-2 bg-white rounded-lg text-gray-400 hover:text-brand-primary"><ArrowLeft className="w-5 h-5" /></button>
                 <h2 className="font-black text-gray-900 uppercase tracking-widest text-sm">Case Assessment</h2>
              </div>
              <div className="w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                 <div className="h-full bg-brand-primary transition-all duration-700" style={{ width: `${activeStep === 'basic' ? 33 : activeStep === 'details' ? 66 : 100}%` }} />
              </div>
           </div>
           <div className="p-10 md:p-16 space-y-10">
              {activeStep === 'basic' && (
                <div className="space-y-10">
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Current State</label>
                         <input disabled className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm font-bold text-gray-400" value={formData.currentState} />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Desired State</label>
                         <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-brand-primary/20" value={formData.requestedState} onChange={(e) => setFormData({...formData, requestedState: e.target.value})}>
                            <option value="">Select State</option>
                            <option value="Lagos">Lagos</option>
                            <option value="Abuja">Abuja (FCT)</option>
                            <option value="Rivers">Rivers</option>
                         </select>
                      </div>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {reasons.map(r => (
                        <button key={r.id} onClick={() => setFormData({...formData, reason: r.id})} className={`p-6 rounded-2xl border-2 text-left flex items-center gap-4 transition-all ${formData.reason === r.id ? 'border-brand-primary bg-green-50 shadow-md' : 'border-gray-50 bg-white hover:border-gray-100'}`}>
                           <div className={`p-3 rounded-xl shrink-0 ${formData.reason === r.id ? 'bg-brand-primary text-white shadow-lg' : 'bg-gray-50 text-gray-400'}`}><r.icon className="w-5 h-5" /></div>
                           <div><h4 className={`font-black text-xs uppercase tracking-widest ${formData.reason === r.id ? 'text-brand-primary' : 'text-gray-900'}`}>{r.label}</h4><p className="text-[10px] text-gray-500 leading-tight mt-0.5">{r.desc}</p></div>
                        </button>
                      ))}
                   </div>
                </div>
              )}
              {activeStep === 'details' && (
                <div className="space-y-6 text-center">
                   <h3 className="text-xl font-black text-gray-900">Explain your situation</h3>
                   <textarea rows={6} className="w-full bg-gray-50 border border-gray-100 rounded-3xl px-8 py-8 text-sm font-bold outline-none focus:ring-4 focus:ring-green-50 focus:bg-white transition-all resize-none" placeholder="Provide brief context for our AI review..." value={formData.details} onChange={(e) => setFormData({...formData, details: e.target.value})} />
                </div>
              )}
              {activeStep === 'evidence' && (
                <div className="space-y-8 text-center">
                   <h3 className="text-xl font-black text-gray-900">Do you have documentation?</h3>
                   <div className="flex justify-center gap-4">
                      <button onClick={() => setFormData({...formData, hasDoc: 'yes'})} className={`px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${formData.hasDoc === 'yes' ? 'bg-brand-primary text-white shadow-lg' : 'bg-gray-50 text-gray-400'}`}>I Have Proof</button>
                      <button onClick={() => setFormData({...formData, hasDoc: 'no', evidenceTypes: []})} className={`px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${formData.hasDoc === 'no' ? 'bg-gray-900 text-white shadow-lg' : 'bg-gray-50 text-gray-400'}`}>No Proof Yet</button>
                   </div>
                   {formData.hasDoc === 'yes' && (
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 animate-in slide-in-from-bottom-2">
                        {['Medical Report', 'Marriage Cert', 'Work Letter', 'Police Report'].map(doc => (
                          <label key={doc} onClick={() => {
                            const next = formData.evidenceTypes.includes(doc) ? formData.evidenceTypes.filter(x => x !== doc) : [...formData.evidenceTypes, doc];
                            setFormData({...formData, evidenceTypes: next});
                          }} className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.evidenceTypes.includes(doc) ? 'border-brand-primary bg-green-50' : 'bg-white border-gray-50'}`}>
                             <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${formData.evidenceTypes.includes(doc) ? 'bg-brand-primary border-brand-primary text-white' : 'border-gray-200'}`}>{formData.evidenceTypes.includes(doc) && <Check className="w-3 h-3" />}</div>
                             <span className="text-xs font-bold text-gray-700">{doc}</span>
                          </label>
                        ))}
                     </div>
                   )}
                </div>
              )}
              <div className="pt-10">
                 <button onClick={handleNext} disabled={!formData.requestedState || !formData.reason} className="w-full btn-primary py-5 text-base font-black shadow-xl disabled:opacity-50 transition-all uppercase tracking-widest">
                    {activeStep === 'evidence' ? 'Analyze Case' : 'Continue'} <ArrowRight className="ml-2 w-5 h-5" />
                 </button>
              </div>
           </div>
        </div>
      )}

      {activeStep === 'calculating' && (
        <div className="min-h-[400px] flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
           <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-brand-primary mb-8 relative">
              <Loader2 className="w-10 h-10 animate-spin" />
              <div className="absolute inset-0 border-4 border-brand-primary rounded-3xl animate-ping opacity-10"></div>
           </div>
           <h2 className="text-2xl font-black text-gray-900 tracking-tight">Reviewing Case Files</h2>
           <p className="text-sm text-gray-500 mt-2 font-medium max-w-xs mx-auto">Matching your profile against the latest 2024 NYSC official redeployment criteria...</p>
        </div>
      )}

      {activeStep === 'result' && (
        <div className="space-y-12 animate-in zoom-in duration-500">
           <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden">
              <div className="p-8 md:p-16 flex flex-col md:flex-row items-center gap-10 bg-gray-900 text-white relative">
                 <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[100px] pointer-events-none"></div>
                 <div className="relative z-10 flex flex-col items-center">
                    <div className="w-48 h-48 rounded-full border-8 border-white/5 flex items-center justify-center relative">
                       <svg className="w-full h-full transform -rotate-90">
                          <circle cx="50%" cy="50%" r="44%" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                          <circle cx="50%" cy="50%" r="44%" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="280" strokeDashoffset={280 - (280 * score / 100)} className="text-brand-primary" strokeLinecap="round" />
                       </svg>
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-5xl font-black">{score}%</span>
                          <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 mt-1">Odds Score</span>
                       </div>
                    </div>
                 </div>
                 <div className="flex-1 space-y-4">
                    <div className="px-4 py-1 bg-brand-primary/20 text-brand-primary rounded-full text-[9px] font-black uppercase tracking-widest w-fit">Assessment Complete</div>
                    <h2 className="text-4xl font-black tracking-tight leading-tight">Your Eligibility <span className="text-brand-primary">Status</span></h2>
                    <p className="text-lg text-gray-400 font-medium leading-relaxed">
                       Based on your data, you have a <span className="text-white font-bold">{score >= 70 ? 'strong' : 'moderate'} case</span> for redeployment.
                    </p>
                 </div>
              </div>

              <div className="p-8 md:p-16 grid lg:grid-cols-12 gap-16">
                 <div className="lg:col-span-7 space-y-10">
                    <div className="space-y-4">
                       <h3 className="text-lg font-black text-gray-900 flex items-center gap-3"><MessageSquare className="w-5 h-5 text-brand-primary" /> Expert Review</h3>
                       <div className="bg-gray-50 rounded-3xl border border-gray-100 p-8 text-gray-600 font-medium leading-relaxed text-base italic">
                          "{aiAdvice || 'Reviewing your specific context...'}"
                       </div>
                    </div>
                    <div className="space-y-5">
                       <h3 className="text-lg font-black text-gray-900 flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-brand-primary" /> Application Checklist</h3>
                       <div className="grid gap-3">
                          {['Download Official Form', 'Get Medical Report Stamp', 'Notify PPA Employer', 'Lodge with ZI'].map((check, i) => (
                            <div key={i} className="flex gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
                               <div className="p-1 bg-green-50 text-green-600 rounded-lg h-fit"><Check className="w-4 h-4" /></div>
                               <p className="text-sm font-bold text-gray-700">{check}</p>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
                 <div className="lg:col-span-5 space-y-6">
                    <div className="bg-brand-primary rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform"><Award className="w-24 h-24" /></div>
                       <h3 className="text-xl font-black mb-3">Relocation Pack</h3>
                       <p className="text-green-50 text-xs font-medium mb-8 leading-relaxed">Unlock our Pro templates for formal relocation letters vetted by LGIs.</p>
                       <button className="w-full py-4 bg-white text-brand-primary font-black rounded-xl text-[10px] uppercase tracking-widest shadow-xl">Get Pro Guide</button>
                    </div>
                    <button onClick={() => setActiveStep('intro')} className="w-full py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900">New Assessment</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default RelocationAssistant;
