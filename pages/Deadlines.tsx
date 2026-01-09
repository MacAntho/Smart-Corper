
import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, Clock, AlertCircle, CheckCircle, 
  ChevronLeft, ChevronRight, List, Bell, Settings, Filter,
  X, Check, Plus, CalendarDays, Share2, Info
} from 'lucide-react';
import { MOCK_DEADLINES, MOCK_USER } from '../constants';
import { Deadline } from '../types';

const Deadlines: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [showSettings, setShowSettings] = useState(false);
  const [filterBatch, setFilterBatch] = useState(false);
  const [filterStage, setFilterStage] = useState(false);
  const [showType, setShowType] = useState<'All' | 'Upcoming' | 'Past'>('Upcoming');
  const [category, setCategory] = useState('All');
  const [doneDeadlines, setDoneDeadlines] = useState<string[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const categories = ['All', 'Registration', 'Camp', 'CDS', 'Clearance'];

  const getDaysLeft = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(date);
    deadlineDate.setHours(0, 0, 0, 0);
    return Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const filteredDeadlines = useMemo(() => {
    return MOCK_DEADLINES.filter(d => {
      const days = getDaysLeft(d.date);
      const matchesShow = showType === 'All' || (showType === 'Upcoming' ? days >= 0 : days < 0);
      const matchesCategory = category === 'All' || d.stage.toUpperCase() === category.toUpperCase();
      const matchesBatch = !filterBatch || true; // Mock: assuming all match for now
      const matchesStage = !filterStage || d.stage.toLowerCase() === MOCK_USER.currentStage.replace('_', ' ');
      
      return matchesShow && matchesCategory && matchesBatch && matchesStage;
    }).sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [showType, category, filterBatch, filterStage]);

  const groupedDeadlines = useMemo(() => {
    const groups = {
      urgent: [] as Deadline[],
      comingUp: [] as Deadline[],
      upcoming: [] as Deadline[],
      past: [] as Deadline[]
    };

    filteredDeadlines.forEach(d => {
      const days = getDaysLeft(d.date);
      if (days < 0) groups.past.push(d);
      else if (days <= 3) groups.urgent.push(d);
      else if (days <= 7) groups.comingUp.push(d);
      else groups.upcoming.push(d);
    });

    return groups;
  }, [filteredDeadlines]);

  const toggleDone = (id: string) => {
    setDoneDeadlines(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Calendar Helpers
  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  return (
    <div className="max-w-6xl mx-auto pb-20 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-brand-primary/10 rounded-lg">
              <CalendarDays className="w-5 h-5 text-brand-primary" />
            </div>
            <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em]">Service Schedule</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Deadlines & Key Dates</h1>
          <p className="text-gray-500 font-medium mt-1">Never miss a clearance window or mobilization step.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded-2xl border border-gray-100 shadow-sm flex items-center">
            <button 
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${viewMode === 'list' ? 'bg-brand-primary text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="w-4 h-4" /> List
            </button>
            <button 
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${viewMode === 'calendar' ? 'bg-brand-primary text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <CalendarIcon className="w-4 h-4" /> Calendar
            </button>
          </div>
          <button 
            onClick={() => setShowSettings(true)}
            className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-brand-primary hover:bg-green-50 transition-all shadow-sm"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-[2rem] border border-gray-100 p-4 md:p-6 shadow-xl shadow-gray-100/50 flex flex-col lg:flex-row lg:items-center gap-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl border border-gray-100">
             <Filter className="w-3.5 h-3.5 text-gray-400" />
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Quick Filters</span>
          </div>
          <label className="flex items-center gap-2 cursor-pointer group">
            <div 
              onClick={() => setFilterBatch(!filterBatch)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${filterBatch ? 'bg-brand-primary border-brand-primary' : 'bg-white border-gray-200 group-hover:border-brand-primary/50'}`}
            >
              {filterBatch && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
            </div>
            <span className="text-xs font-bold text-gray-600">My Batch Only</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <div 
              onClick={() => setFilterStage(!filterStage)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${filterStage ? 'bg-brand-primary border-brand-primary' : 'bg-white border-gray-200 group-hover:border-brand-primary/50'}`}
            >
              {filterStage && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
            </div>
            <span className="text-xs font-bold text-gray-600">My Stage Only</span>
          </label>
        </div>

        <div className="h-px lg:h-8 lg:w-px bg-gray-100"></div>

        <div className="flex flex-wrap items-center gap-4 flex-1">
          <div className="flex-1 min-w-[140px]">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 px-1">Status</p>
            <select 
              value={showType} 
              onChange={(e) => setShowType(e.target.value as any)}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-bold text-gray-700 focus:ring-2 focus:ring-brand-primary/20 outline-none"
            >
              <option value="All">All Deadlines</option>
              <option value="Upcoming">Upcoming Only</option>
              <option value="Past">Past Only</option>
            </select>
          </div>
          <div className="flex-1 min-w-[140px]">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 px-1">Category</p>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-bold text-gray-700 focus:ring-2 focus:ring-brand-primary/20 outline-none"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <button 
            onClick={() => { setShowType('Upcoming'); setCategory('All'); setFilterBatch(false); setFilterStage(false); }}
            className="mt-5 text-[10px] font-black text-brand-primary uppercase tracking-widest hover:underline px-4"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Main View Area */}
      <div className="min-h-[400px]">
        {viewMode === 'list' ? (
          <div className="space-y-12">
            {/* Urgent Section */}
            {groupedDeadlines.urgent.length > 0 && (
              <div className="space-y-6">
                <h3 className="flex items-center gap-2 text-red-600 font-black uppercase tracking-widest text-xs px-2">
                  <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" /> Urgent (Next 3 days)
                </h3>
                <div className="grid gap-4">
                  {groupedDeadlines.urgent.map(d => (
                    <DeadlineCard key={d.id} deadline={d} isDone={doneDeadlines.includes(d.id)} onToggleDone={() => toggleDone(d.id)} />
                  ))}
                </div>
              </div>
            )}

            {/* Coming Up Section */}
            {groupedDeadlines.comingUp.length > 0 && (
              <div className="space-y-6">
                <h3 className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-widest text-xs px-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500" /> Coming Up (4-7 days)
                </h3>
                <div className="grid gap-4">
                  {groupedDeadlines.comingUp.map(d => (
                    <DeadlineCard key={d.id} deadline={d} isDone={doneDeadlines.includes(d.id)} onToggleDone={() => toggleDone(d.id)} />
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Section */}
            {groupedDeadlines.upcoming.length > 0 && (
              <div className="space-y-6">
                <h3 className="flex items-center gap-2 text-green-600 font-black uppercase tracking-widest text-xs px-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" /> Future Deadlines (8+ days)
                </h3>
                <div className="grid gap-4">
                  {groupedDeadlines.upcoming.map(d => (
                    <DeadlineCard key={d.id} deadline={d} isDone={doneDeadlines.includes(d.id)} onToggleDone={() => toggleDone(d.id)} />
                  ))}
                </div>
              </div>
            )}

            {/* Past Section */}
            {groupedDeadlines.past.length > 0 && (
              <div className="space-y-6 opacity-60">
                <h3 className="text-gray-400 font-black uppercase tracking-widest text-xs px-2">Past Deadlines</h3>
                <div className="grid gap-4">
                  {groupedDeadlines.past.map(d => (
                    <DeadlineCard key={d.id} deadline={d} isDone={doneDeadlines.includes(d.id)} onToggleDone={() => toggleDone(d.id)} />
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {filteredDeadlines.length === 0 && (
              <div className="py-20 text-center bg-white rounded-[3rem] border border-dashed border-gray-100">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                   <CheckCircle className="w-10 h-10 text-gray-200" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">You're all caught up!</h3>
                <p className="text-gray-500 mt-2 font-medium max-w-sm mx-auto">No upcoming deadlines match your filters. Enjoy the peace of mind while it lasts.</p>
                <button 
                  onClick={() => { setShowType('All'); setCategory('All'); setFilterBatch(false); setFilterStage(false); }}
                  className="mt-8 btn-primary px-10"
                >
                  View All History
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Calendar View */
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-100/50 p-6 md:p-10 overflow-hidden">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-black text-gray-900">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                  className="p-2 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setCurrentDate(new Date())}
                  className="px-4 py-2 text-xs font-black uppercase tracking-widest text-brand-primary bg-green-50 rounded-xl"
                >
                  Today
                </button>
                <button 
                  onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                  className="p-2 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-px bg-gray-100 rounded-3xl overflow-hidden border border-gray-100">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="bg-gray-50 p-4 text-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{day}</span>
                </div>
              ))}
              {[...Array(firstDayOfMonth(currentDate))].map((_, i) => (
                <div key={`empty-${i}`} className="bg-white p-4 h-32 md:h-40" />
              ))}
              {[...Array(daysInMonth(currentDate))].map((_, i) => {
                const day = i + 1;
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                const dayDeadlines = MOCK_DEADLINES.filter(d => 
                  d.date.getFullYear() === date.getFullYear() &&
                  d.date.getMonth() === date.getMonth() &&
                  d.date.getDate() === date.getDate()
                );
                const isToday = new Date().toDateString() === date.toDateString();

                return (
                  <div key={day} className={`bg-white p-2 md:p-4 h-32 md:h-40 border-t border-l border-gray-50 transition-colors hover:bg-gray-50 group`}>
                    <div className="flex justify-between items-start">
                      <span className={`text-sm font-black ${isToday ? 'bg-brand-primary text-white w-7 h-7 rounded-full flex items-center justify-center -mt-1 -ml-1' : 'text-gray-400'}`}>
                        {day}
                      </span>
                    </div>
                    <div className="mt-2 space-y-1 overflow-y-auto max-h-24 scrollbar-hide">
                      {dayDeadlines.map(d => (
                        <div 
                          key={d.id} 
                          className={`px-2 py-1 rounded-lg text-[9px] font-bold truncate ${
                            d.urgency === 'Critical' ? 'bg-red-50 text-red-600 border border-red-100' :
                            d.urgency === 'High' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                            'bg-green-50 text-green-600 border border-green-100'
                          }`}
                        >
                          {d.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-10 flex flex-wrap gap-6 justify-center">
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500" />
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Critical</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-orange-500" />
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">High Urgency</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-green-500" />
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Standard</span>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setShowSettings(false)} />
          <div className="relative bg-white rounded-[2.5rem] w-full max-w-md p-8 md:p-12 shadow-2xl animate-in zoom-in duration-300">
            <button onClick={() => setShowSettings(false)} className="absolute top-8 right-8 text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-black text-gray-900 mb-2">Notification Settings</h2>
            <p className="text-gray-500 font-medium text-sm mb-8">Choose how and when you want to be reminded.</p>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Channels</h3>
                <div className="space-y-3">
                  <ToggleItem label="Email Reminders" description="Official alerts to your inbox" defaultChecked />
                  <ToggleItem label="App Notifications" description="Push alerts on this device" defaultChecked />
                  <ToggleItem label="SMS Priority Alerts" description="Critical deadlines via text (Pro)" disabled />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Frequency</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['7 days before', '3 days before', '1 day before', 'Morning of'].map(f => (
                    <button key={f} className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-600 hover:border-brand-primary transition-all text-left flex items-center justify-between">
                      {f} <CheckCircle className="w-3.5 h-3.5 text-brand-primary" />
                    </button>
                  ))}
                </div>
              </div>

              <button className="w-full btn-primary py-4 mt-4" onClick={() => setShowSettings(false)}>
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DeadlineCard: React.FC<{ deadline: Deadline, isDone: boolean, onToggleDone: () => void }> = ({ deadline, isDone, onToggleDone }) => {
  const daysLeft = Math.ceil((deadline.date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const isPast = daysLeft < 0;

  const getUrgencyColor = () => {
    if (isPast) return 'border-l-gray-200';
    if (daysLeft <= 3) return 'border-l-red-500';
    if (daysLeft <= 7) return 'border-l-orange-500';
    return 'border-l-green-500';
  };

  const getDaysText = () => {
    if (isPast) return 'Ended';
    if (daysLeft === 0) return 'Today';
    if (daysLeft === 1) return 'Tomorrow';
    return `${daysLeft} days left`;
  };

  return (
    <div className={`bg-white rounded-[2rem] border border-gray-100 border-l-8 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:shadow-xl hover:shadow-gray-100/50 group ${getUrgencyColor()} ${isDone ? 'opacity-50 grayscale' : ''}`}>
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
            deadline.urgency === 'Critical' ? 'bg-red-50 text-red-600' :
            deadline.urgency === 'High' ? 'bg-orange-50 text-orange-600' :
            'bg-green-50 text-green-600'
          }`}>
            {deadline.urgency}
          </span>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center">
            <Info className="w-3 h-3 mr-1" /> {deadline.stage}
          </span>
        </div>
        <div>
          <h4 className={`text-xl font-black text-gray-900 leading-tight group-hover:text-brand-primary transition-colors ${isDone ? 'line-through' : ''}`}>
            {deadline.title}
          </h4>
          <p className="text-gray-500 text-sm font-medium mt-1">Required step to ensure no disruptions to your monthly allowance.</p>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
           <span className="flex items-center"><CalendarIcon className="w-3.5 h-3.5 mr-1.5" /> {deadline.date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
           <span className="bg-gray-100 px-2 py-0.5 rounded">All Batches</span>
        </div>
      </div>

      <div className="flex flex-col md:items-end gap-6 min-w-[180px]">
        <div className="text-left md:text-right">
          <p className={`text-3xl font-black tracking-tighter ${isPast ? 'text-gray-300' : daysLeft <= 3 ? 'text-red-500 animate-pulse' : 'text-gray-900'}`}>
            {getDaysText()}
          </p>
          {!isPast && <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Time Remaining</p>}
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={onToggleDone}
            className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all ${isDone ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-green-100' : 'border-gray-100 text-gray-300 hover:border-brand-primary hover:text-brand-primary bg-white'}`}
          >
            <Check className="w-5 h-5" strokeWidth={3} />
          </button>
          <button className="flex-1 md:flex-none px-6 h-12 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-primary hover:bg-green-50 transition-all flex items-center justify-center">
            <Clock className="w-4 h-4 mr-2" /> Remind
          </button>
          <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-brand-primary hover:bg-green-50 transition-all">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ToggleItem: React.FC<{ label: string, description: string, defaultChecked?: boolean, disabled?: boolean }> = ({ label, description, defaultChecked, disabled }) => {
  const [checked, setChecked] = useState(defaultChecked || false);
  return (
    <div className={`flex items-center justify-between p-4 rounded-2xl border border-gray-50 ${disabled ? 'opacity-50 grayscale' : 'hover:bg-gray-50'} transition-colors`}>
      <div className="flex-1">
        <p className="text-sm font-bold text-gray-900">{label}</p>
        <p className="text-[10px] font-medium text-gray-500">{description}</p>
      </div>
      <button 
        disabled={disabled}
        onClick={() => setChecked(!checked)}
        className={`w-12 h-6 rounded-full relative transition-all ${checked ? 'bg-brand-primary' : 'bg-gray-200'}`}
      >
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${checked ? 'left-7' : 'left-1'}`} />
      </button>
    </div>
  );
};

export default Deadlines;
