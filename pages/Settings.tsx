
import React, { useState, useEffect } from 'react';
import { 
  User, Bell, Shield, LogOut, CreditCard, Settings as SettingsIcon, 
  CheckCircle, Camera, ChevronRight, Download, Trash2, 
  Smartphone, Monitor, Globe, Moon, Sun, MonitorSmartphone,
  Lock, AlertTriangle, Mail, Phone, Calendar, MapPin, Award, 
  PieChart, Receipt, CheckCircle2, Info, Layout
} from 'lucide-react';
import { MOCK_USER, NYSC_STAGES } from '../constants';

type SettingsTab = 'profile' | 'subscription' | 'notifications' | 'preferences' | 'account';
type ThemeMode = 'light' | 'dark' | 'auto';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [showToast, setShowToast] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');
  
  // Default to 'light' instead of 'auto' to ensure the platform stays light unless toggled
  const [theme, setTheme] = useState<ThemeMode>(() => (localStorage.getItem('smartcorper-theme') as ThemeMode) || 'light');

  const [profileForm, setProfileForm] = useState({
    fullName: MOCK_USER.name,
    phone: '08012345678',
    stage: MOCK_USER.currentStage,
    state: MOCK_USER.deploymentState,
    batch: MOCK_USER.batch,
    startDate: '2024-02-15'
  });

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    localStorage.setItem('smartcorper-theme', newTheme);
    const root = window.document.documentElement;
    
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else if (newTheme === 'light') {
      root.classList.remove('dark');
    } else {
      // Auto logic
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  };

  const tabs: { id: SettingsTab; label: string; icon: any }[] = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon },
    { id: 'account', label: 'Account & Security', icon: Shield },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-32">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">Settings</h1>
        <p className="text-gray-500 font-medium mt-1">Manage your account preferences and service details.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="lg:w-64 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all whitespace-nowrap lg:w-full ${
                activeTab === tab.id 
                  ? 'bg-brand-primary text-white shadow-lg' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-white dark:hover:bg-gray-800'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
          <button className="flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 mt-auto transition-all">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </aside>

        <main className="flex-1 bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-xl overflow-hidden flex flex-col min-h-[650px]">
          {activeTab === 'profile' && (
            <div className="p-8 md:p-12 space-y-12 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row items-center gap-8 border-b border-gray-50 dark:border-gray-700 pb-10">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-green-100 dark:bg-green-900/30 text-brand-primary flex items-center justify-center text-4xl font-black border-4 border-white dark:border-gray-700 shadow-xl">{MOCK_USER.avatarInitials}</div>
                  <button className="absolute bottom-0 right-0 p-3 bg-brand-primary text-white rounded-2xl shadow-lg border-4 border-white dark:border-gray-700"><Camera className="w-5 h-5" /></button>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white">{profileForm.fullName}</h2>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-1">{MOCK_USER.stateCode}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-gray-300 uppercase tracking-[0.2em] flex items-center"><User className="w-4 h-4 mr-2" /> Personal Information</h3>
                  <div className="space-y-4">
                    <InputField label="Full Name" value={profileForm.fullName} onChange={(val) => setProfileForm({...profileForm, fullName: val})} />
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Email Address</label>
                      <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-2xl px-5 py-4">
                        <Mail className="w-4 h-4 text-gray-300" />
                        <span className="text-sm font-bold text-gray-400 flex-1">{MOCK_USER.email}</span>
                        <button className="text-[10px] font-black text-brand-primary uppercase hover:underline">Change</button>
                      </div>
                    </div>
                    <InputField label="Phone Number" value={profileForm.phone} onChange={(val) => setProfileForm({...profileForm, phone: val})} icon={Phone} />
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-gray-300 uppercase tracking-[0.2em] flex items-center"><MapPin className="w-4 h-4 mr-2" /> NYSC Information</h3>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Current Stage</label>
                      <select value={profileForm.stage} onChange={(e) => setProfileForm({...profileForm, stage: e.target.value as any})} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-2xl px-5 py-4 text-sm font-bold text-gray-700 dark:text-gray-200 outline-none">
                        {NYSC_STAGES.map(s => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                      </select>
                    </div>
                    <InputField label="Deployment State" value={profileForm.state} onChange={(val) => setProfileForm({...profileForm, state: val})} />
                    <InputField label="Batch Year" value={profileForm.batch} onChange={(val) => setProfileForm({...profileForm, batch: val})} />
                    <InputField label="Date Started Service" type="date" value={profileForm.startDate} onChange={(val) => setProfileForm({...profileForm, startDate: val})} icon={Calendar} />
                  </div>
                </div>
              </div>
              <div className="pt-10 flex justify-end"><button onClick={handleSave} className="btn-primary px-12 py-4 shadow-xl active:scale-95 transition-all">Save Changes</button></div>
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className="p-8 md:p-12 space-y-12 animate-in fade-in duration-500">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white relative shadow-2xl">
                  <div className="absolute top-0 right-0 p-8 opacity-10"><Award className="w-32 h-32 text-brand-primary" /></div>
                  <div className="relative z-10">
                    <span className="px-4 py-1 bg-brand-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">{MOCK_USER.isPro ? 'Pro' : 'Free'} Plan</span>
                    <h3 className="text-3xl font-black mb-6">Current Plan</h3>
                    <ul className="space-y-4 mb-10">
                       {['Standard Roadmap', 'Knowledge Base', 'AI Support', 'Relocation Packs'].map((feat, i) => (
                         <li key={i} className={`flex items-center gap-3 text-sm font-bold ${MOCK_USER.isPro || i < 2 ? 'text-white' : 'text-gray-600'}`}>
                           {MOCK_USER.isPro || i < 2 ? <CheckCircle className="w-4 h-4 text-brand-primary" /> : <Info className="w-4 h-4" />} {feat}
                         </li>
                       ))}
                    </ul>
                    <button className="w-full bg-brand-primary text-white font-black py-4 rounded-2xl text-xs uppercase tracking-widest shadow-xl">{MOCK_USER.isPro ? 'Manage Billing' : 'Upgrade to Pro'}</button>
                  </div>
                </div>
                <div className="space-y-8">
                  <h3 className="text-xs font-black text-gray-300 uppercase tracking-[0.2em] flex items-center"><PieChart className="w-4 h-4 mr-2" /> Usage Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-3xl"><p className="text-[10px] font-black text-gray-400 uppercase mb-1">Guides Read</p><p className="text-2xl font-black text-gray-900 dark:text-white">14</p></div>
                    <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-3xl"><p className="text-[10px] font-black text-gray-400 uppercase mb-1">Deadlines Met</p><p className="text-2xl font-black text-gray-900 dark:text-white">9</p></div>
                    <div className="col-span-2 p-6 bg-gray-50 dark:bg-gray-700 rounded-3xl flex items-center justify-between">
                      <div><p className="text-[10px] font-black text-gray-400 uppercase mb-1">Journey Progress</p><p className="text-2xl font-black text-gray-900 dark:text-white">65%</p></div>
                      <div className="w-16 h-16 rounded-full border-4 border-gray-200 dark:border-gray-600 border-t-brand-primary flex items-center justify-center text-xs font-black dark:text-white">65%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="p-8 md:p-12 space-y-12 animate-in fade-in duration-500">
               <div className="grid md:grid-cols-2 gap-16">
                  <div className="space-y-10">
                    <h3 className="text-xs font-black text-gray-300 uppercase tracking-[0.2em]">Interface Theme</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <button 
                        onClick={() => handleThemeChange('light')} 
                        className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${theme === 'light' ? 'bg-white dark:bg-gray-700 border-brand-primary shadow-lg ring-4 ring-green-50 dark:ring-green-900/10' : 'bg-gray-50 dark:bg-gray-700 border-transparent'}`}
                      >
                        <Sun className={`w-6 h-6 ${theme === 'light' ? 'text-brand-primary' : 'text-gray-400'}`} />
                        <span className="text-[10px] font-black uppercase">Light</span>
                      </button>
                      <button 
                        onClick={() => handleThemeChange('dark')} 
                        className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${theme === 'dark' ? 'bg-white dark:bg-gray-700 border-brand-primary shadow-lg ring-4 ring-green-50 dark:ring-green-900/10' : 'bg-gray-50 dark:bg-gray-700 border-transparent'}`}
                      >
                        <Moon className={`w-6 h-6 ${theme === 'dark' ? 'text-brand-primary' : 'text-gray-400'}`} />
                        <span className="text-[10px] font-black uppercase">Dark</span>
                      </button>
                      <button 
                        onClick={() => handleThemeChange('auto')} 
                        className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${theme === 'auto' ? 'bg-white dark:bg-gray-700 border-brand-primary shadow-lg ring-4 ring-green-50 dark:ring-green-900/10' : 'bg-gray-50 dark:bg-gray-700 border-transparent'}`}
                      >
                        <MonitorSmartphone className={`w-6 h-6 ${theme === 'auto' ? 'text-brand-primary' : 'text-gray-400'}`} />
                        <span className="text-[10px] font-black uppercase">Auto</span>
                      </button>
                    </div>
                    <div className="space-y-6">
                      <ToggleItem label="Compact View" desc="Reduce white space on roadmap pages." />
                      <ToggleItem label="Show Completed Tasks" desc="Keep finished items visible in dashboard." defaultChecked />
                    </div>
                  </div>
                  <div className="space-y-10">
                    <h3 className="text-xs font-black text-gray-300 uppercase tracking-[0.2em] flex items-center"><Globe className="w-4 h-4 mr-2" /> Language</h3>
                    <select className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-2xl px-5 py-4 text-sm font-bold text-gray-700 dark:text-gray-200 outline-none"><option>English (Official)</option><option disabled>Pidgin (Soon)</option></select>
                  </div>
               </div>
               <div className="pt-10 flex justify-end"><button onClick={handleSave} className="btn-primary px-12 py-4">Save My Preferences</button></div>
            </div>
          )}
        </main>
      </div>

      {showToast && (
        <div className="fixed bottom-10 right-10 z-[100] animate-in slide-in-from-right-10 duration-500">
           <div className="bg-gray-900 text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-4 border border-white/10">
              <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center"><CheckCircle className="w-5 h-5 text-white" /></div>
              <div><p className="text-sm font-black tracking-tight">Changes saved successfully!</p></div>
           </div>
        </div>
      )}
    </div>
  );
};

const InputField: React.FC<{ label: string, value: string, onChange: (val: string) => void, type?: string, icon?: any }> = ({ label, value, onChange, type = "text", icon: Icon }) => (
  <div className="space-y-1.5">
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">{label}</label>
    <div className="relative group">
      {Icon && <Icon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-brand-primary" />}
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={`w-full bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-2xl py-4 pr-5 focus:ring-4 focus:ring-green-50 dark:focus:ring-green-900/10 focus:border-brand-primary outline-none font-bold text-gray-700 dark:text-gray-200 transition-all ${Icon ? 'pl-14' : 'pl-5'}`} />
    </div>
  </div>
);

const ToggleItem: React.FC<{ label: string, desc: string, defaultChecked?: boolean }> = ({ label, desc, defaultChecked }) => {
  const [checked, setChecked] = useState(defaultChecked || false);
  return (
    <div className="flex items-center justify-between p-5 rounded-[1.5rem] border border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all">
      <div className="flex-1 pr-4"><p className="text-sm font-bold text-gray-800 dark:text-gray-100">{label}</p><p className="text-[10px] text-gray-400 font-medium">{desc}</p></div>
      <button onClick={() => setChecked(!checked)} className={`w-12 h-6 rounded-full relative transition-all ${checked ? 'bg-brand-primary shadow-lg shadow-green-50' : 'bg-gray-200 dark:bg-gray-600'}`}><div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${checked ? 'left-7' : 'left-1'}`} /></button>
    </div>
  );
};

export default Settings;
