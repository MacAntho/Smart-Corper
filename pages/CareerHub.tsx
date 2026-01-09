
import React, { useState } from 'react';
import { Briefcase, Target, Award, ArrowRight, Star, Clock, MapPin, Building2, CheckCircle2, Sparkles, MessageSquare, Newspaper, Trophy, ChevronRight } from 'lucide-react';
import { MOCK_CAREER_JOBS, MOCK_USER } from '../constants';

const CareerHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'skills' | 'prep'>('jobs');

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-32">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-2">
          <Trophy className="w-4 h-4" /> Next Chapter Readiness
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
          Career Transition <span className="text-brand-primary">Hub</span>
        </h1>
        <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">
          Your service year is a launchpad. Use our specialized tools to land your dream role before your POP date.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="bg-white p-1.5 rounded-[2rem] border border-gray-100 shadow-xl flex flex-wrap gap-2">
          {[
            { id: 'jobs', label: 'Corper Friendly Jobs', icon: Briefcase },
            { id: 'skills', label: 'In-Demand Skills', icon: Target },
            { id: 'prep', label: 'Interview Prep', icon: Award },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id 
                  ? 'bg-brand-primary text-white shadow-lg' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10 animate-in fade-in duration-500">
           {activeTab === 'jobs' && (
             <div className="space-y-6">
                <div className="flex items-center justify-between">
                   <h2 className="text-2xl font-black text-gray-900">Recommended Opportunities</h2>
                   <button className="text-xs font-black text-brand-primary uppercase hover:underline">View All Jobs</button>
                </div>
                {MOCK_CAREER_JOBS.map(job => (
                  <div key={job.id} className="bg-white rounded-[2rem] border border-gray-100 p-8 hover:shadow-xl hover:border-brand-primary/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                     <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-3">
                           <span className="px-3 py-1 bg-green-50 text-brand-primary rounded-full text-[9px] font-black uppercase tracking-widest">Ex-Corper Friendly</span>
                           <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{job.type}</span>
                        </div>
                        <div>
                           <h3 className="text-2xl font-black text-gray-900 group-hover:text-brand-primary transition-colors">{job.title}</h3>
                           <p className="flex items-center text-gray-500 font-bold text-sm mt-1">
                              <Building2 className="w-4 h-4 mr-2" /> {job.company} • <MapPin className="w-4 h-4 mx-2" /> {job.location}
                           </p>
                        </div>
                        {job.salary && <p className="text-sm font-black text-brand-primary">{job.salary} <span className="text-[10px] text-gray-400">/ Monthly</span></p>}
                     </div>
                     <button className="px-8 py-4 bg-gray-900 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl group-hover:bg-brand-primary transition-colors">Apply Now</button>
                  </div>
                ))}
             </div>
           )}

           {activeTab === 'skills' && (
             <div className="space-y-10">
                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10 shadow-xl space-y-12">
                   <div>
                      <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2"><Sparkles className="w-6 h-6 text-brand-primary" /> Most In-Demand Skills 2024</h3>
                      <div className="grid grid-cols-2 gap-4">
                         {[
                           { name: 'Data Analytics', level: 'High', demand: '95%' },
                           { name: 'Digital Marketing', level: 'High', demand: '88%' },
                           { name: 'Project Management', level: 'Medium', demand: '82%' },
                           { name: 'Full-stack Dev', level: 'Critical', demand: '90%' },
                         ].map(skill => (
                           <div key={skill.name} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col justify-between h-32">
                              <p className="font-black text-gray-900">{skill.name}</p>
                              <div className="flex justify-between items-center mt-auto">
                                 <span className="text-[9px] font-black uppercase text-brand-primary px-2 py-0.5 bg-green-50 rounded-full">{skill.level} demand</span>
                                 <span className="text-xs font-bold text-gray-400">{skill.demand}</span>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
           )}

           {activeTab === 'prep' && (
             <div className="space-y-10">
                <div className="grid gap-6">
                   {[
                     { title: "LinkedIn Optimization", desc: "How to attract recruiters with a professional profile while serving.", icon: Newspaper },
                     { title: "The 30-Day Transition Plan", desc: "A step-by-step checklist for the 30 days following your POP.", icon: Clock },
                     { title: "Interview Scripts", desc: "Common questions asked in the Nigerian corporate space.", icon: MessageSquare }
                   ].map((item, i) => (
                     <div key={i} className="bg-white rounded-[2rem] border border-gray-100 p-8 flex items-center gap-8 group hover:border-brand-primary transition-all shadow-sm">
                        <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                           <item.icon className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                           <h4 className="text-xl font-black text-gray-900 group-hover:text-brand-primary transition-colors">{item.title}</h4>
                           <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                        </div>
                        <ChevronRight className="w-6 h-6 text-gray-200 group-hover:text-brand-primary transition-all" />
                     </div>
                   ))}
                </div>
             </div>
           )}
        </div>

        <div className="space-y-8">
           <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none"><Award className="w-32 h-32 text-brand-primary" /></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-6 tracking-tight">Personalized Career Assessment</h3>
                <p className="text-gray-400 text-sm font-medium leading-relaxed mb-10">Use our AI to analyze your PPA experience and generate a powerful CV summary.</p>
                <button className="w-full py-4 bg-brand-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">Start AI Assessment</button>
              </div>
           </div>

           <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-xl">
              <h4 className="font-black text-gray-900 mb-8 flex items-center gap-3">
                 <CheckCircle2 className="w-5 h-5 text-brand-primary" /> Transition Checklist
              </h4>
              <div className="space-y-6">
                 {[
                   'Update LinkedIn Profile Location',
                   'Draft Ex-Corper Resume Version',
                   'Apply for 5 Networking Events',
                   'Request PPA Recommendation Letter',
                   'Request CDS Impact Certificate'
                 ].map((item, i) => (
                   <label key={i} className="flex items-center gap-4 cursor-pointer group">
                      <div className="w-6 h-6 rounded-lg border-2 border-gray-100 flex items-center justify-center group-hover:border-brand-primary transition-colors">
                        <div className="w-3 h-3 rounded-sm bg-brand-primary opacity-0 group-hover:opacity-20" />
                      </div>
                      <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900">{item}</span>
                   </label>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CareerHub;
