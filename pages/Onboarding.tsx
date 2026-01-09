import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, ArrowRight, ArrowLeft, MapPin, 
  Calendar, Layers, Search, Sparkles, PartyPopper 
} from 'lucide-react';

const STAGES = [
  { id: 'final_year', label: 'Final Year (Preparing for NYSC)', desc: 'Still in school or waiting for senate list.' },
  { id: 'mobilization', label: 'Mobilization/Registration', desc: 'Doing online registration or waiting for call-up.' },
  { id: 'camp', label: 'Orientation Camp', desc: 'Currently at the 3-week orientation camp.' },
  { id: 'ppa', label: 'Primary Assignment (PPA)', desc: 'Working at your assigned workplace.' },
  { id: 'cds', label: 'Community Development Service (CDS)', desc: 'Engaged in community projects.' },
  { id: 'clearance', label: 'Clearance Process', desc: 'In the final months of service.' },
  { id: 'completed', label: 'Completed/Alumni', desc: 'Finished service and have discharge certificate.' },
];

const STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT (Abuja)', 'Gombe', 
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 
  'Taraba', 'Yobe', 'Zamfara', 'Not deployed yet'
];

const BATCHES = [
  '2025 Batch A', '2024 Batch C', '2024 Batch B', '2024 Batch A', 
  '2023 Batch C', '2023 Batch B', '2023 Batch A', 'Not yet mobilized'
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isFinishing, setIsFinishing] = useState(false);
  const [searchState, setSearchState] = useState('');
  
  const [selection, setSelection] = useState({
    stage: '',
    state: '',
    batch: ''
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleComplete = () => {
    setIsFinishing(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2500);
  };

  const filteredStates = STATES.filter(s => 
    s.toLowerCase().includes(searchState.toLowerCase())
  );

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <Layers className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Where are you in your journey?</h2>
            </div>
            <div className="space-y-3">
              {STAGES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelection({...selection, stage: s.id})}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all group ${
                    selection.stage === s.id 
                      ? 'border-brand-primary bg-green-50 shadow-md ring-4 ring-green-50' 
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-bold ${selection.stage === s.id ? 'text-brand-primary' : 'text-gray-900'}`}>{s.label}</p>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">{s.desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selection.stage === s.id ? 'border-brand-primary bg-brand-primary' : 'border-gray-200'
                    }`}>
                      {selection.stage === s.id && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <MapPin className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Which state are you deployed to?</h2>
            </div>
            
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Search states..."
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-brand-primary/20 outline-none font-medium text-sm transition-all"
                value={searchState}
                onChange={(e) => setSearchState(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-2 scrollbar-hide">
              {filteredStates.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelection({...selection, state: s})}
                  className={`text-sm font-bold py-3.5 px-4 rounded-xl border-2 transition-all ${
                    selection.state === s 
                      ? 'border-brand-primary bg-green-50 text-brand-primary' 
                      : 'border-gray-50 bg-white text-gray-600 hover:border-gray-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                <Calendar className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What's your NYSC batch?</h2>
            </div>
            
            <div className="grid gap-3">
              {BATCHES.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelection({...selection, batch: b})}
                  className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                    selection.batch === b 
                      ? 'border-brand-primary bg-green-50 ring-4 ring-green-50 shadow-sm' 
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                >
                  <span className={`font-bold ${selection.batch === b ? 'text-brand-primary' : 'text-gray-900'}`}>{b}</span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selection.batch === b ? 'border-brand-primary bg-brand-primary' : 'border-gray-200'
                  }`}>
                    {selection.batch === b && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (isFinishing) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-1000">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-brand-primary mb-8 relative">
          <PartyPopper className="w-12 h-12" />
          <div className="absolute inset-0 animate-ping bg-green-200 rounded-full opacity-50"></div>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">You're All Set!</h1>
        <p className="text-gray-500 text-lg font-medium max-w-md">
          Your personalized NYSC dashboard is ready. Redirecting you to your companion...
        </p>
        <div className="mt-12 w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-brand-primary animate-progress-fast"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 md:py-24 px-4 overflow-x-hidden">
      <div className="w-full max-w-xl">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">
            <span>Setup Profile</span>
            <span>Step {step} of 3</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-primary transition-all duration-700 ease-out" 
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content Area */}
        <div className="mb-12">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center space-x-4">
          {step > 1 && (
            <button 
              onClick={prevStep}
              className="flex-1 btn-secondary py-4 flex items-center justify-center font-bold"
            >
              <ArrowLeft className="w-5 h-5 mr-2" /> Back
            </button>
          )}
          <button 
            disabled={
              (step === 1 && !selection.stage) || 
              (step === 2 && !selection.state) || 
              (step === 3 && !selection.batch)
            }
            onClick={step === 3 ? handleComplete : nextStep}
            className={`flex-[2] btn-primary py-4 text-lg font-bold shadow-xl flex items-center justify-center transition-all ${
              ((step === 1 && !selection.stage) || 
               (step === 2 && !selection.state) || 
               (step === 3 && !selection.batch))
                ? 'opacity-50 grayscale cursor-not-allowed'
                : 'shadow-green-100 active:scale-95'
            }`}
          >
            {step === 3 ? 'Complete Setup' : 'Next Step'}
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>

        {/* Brand Link */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
            <Sparkles className="w-3 h-3 text-brand-primary" />
            <span>SmartCorper Companion</span>
          </div>
        </div>
      </div>
    </div>
  );
}
