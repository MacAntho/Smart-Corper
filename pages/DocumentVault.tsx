
import React, { useState, useMemo } from 'react';
import { 
  FileText, Upload, CheckCircle, Clock, AlertCircle, 
  Trash2, Search, Plus, ShieldCheck, Download, 
  Share2, Eye, Edit3, X, Filter, ChevronRight, Info,
  Lock, FileCheck, Layers, MoreVertical, Printer, 
  HardDrive, QrCode, Calendar, CheckSquare,
  ArrowRight, Camera, FileUp, Sparkles, RefreshCw, Copy,
  History, ExternalLink
} from 'lucide-react';
import { MOCK_DOCS, MOCK_USER } from '../constants';
import { NYSCDocument, DocumentType } from '../types';

const DocumentVault: React.FC = () => {
  const [docs, setDocs] = useState<NYSCDocument[]>(MOCK_DOCS);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<NYSCDocument | null>(null);
  const [uploadStep, setUploadStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSharing, setIsSharing] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { id: 'All', label: 'All Documents', count: docs.length },
    { id: 'Essential', label: 'Essential', count: 5 },
    { id: 'Clearance', label: 'Clearance', count: 3 },
    { id: 'Medical', label: 'Medical', count: 1 },
    { id: 'Personal', label: 'Personal', count: 0 },
  ];
  
  const storageLimit = MOCK_USER.isPro ? 500 : 50;
  const currentUsage = useMemo(() => {
    const bytes = docs.reduce((acc, curr) => acc + curr.fileSize, 0);
    return parseFloat((bytes / (1024 * 1024)).toFixed(2));
  }, [docs]);

  const usagePercent = Math.min(Math.round((currentUsage / storageLimit) * 100), 100);

  const essentialDocs = [
    { type: 'call_up_letter', label: 'Call-Up Letter', requiredBy: 'Camp Officials' },
    { type: 'camp_discharge', label: 'Camp Discharge Certificate', requiredBy: 'PPA & Final POP' },
    { type: 'ppa_posting', label: 'PPA Posting Letter', requiredBy: 'Monthly Clearance' },
    { type: 'cds_clearance', label: 'CDS Clearance', requiredBy: 'Final POP' },
    { type: 'discharge_certificate', label: 'Final Discharge Certificate', requiredBy: 'Job Applications' },
  ];

  const filteredDocs = useMemo(() => {
    return docs.filter(d => {
      const matchesSearch = d.fileName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === 'All' || d.category === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [docs, searchTerm, activeTab]);

  const handleUpload = () => {
    setUploadProgress(0);
    setUploadStep(3);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setUploadStep(4), 500);
          return 100;
        }
        return prev + 5;
      });
    }, 80);
  };

  const getDocIcon = (mimeType: string) => {
    if (mimeType.includes('pdf')) return <FileText className="w-8 h-8 text-red-500" />;
    if (mimeType.includes('image')) return <Eye className="w-8 h-8 text-blue-500" />;
    return <FileText className="w-8 h-8 text-gray-500" />;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32">
      {/* Dynamic Storage Header */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none hidden md:block">
          <HardDrive className="w-64 h-64 text-brand-primary" />
        </div>
        
        <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
             <div className="flex items-center gap-2">
                <div className="p-2 bg-green-50 text-brand-primary rounded-lg">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Secure Cloud Storage</span>
             </div>
             <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Document <span className="text-brand-primary">Vault</span></h1>
             <p className="text-gray-500 font-medium max-w-xl leading-relaxed">
               Your digital file cabinet for the entire service year. Encrypted, backed up, and ready whenever you report to camp or PPA.
             </p>
             <div className="flex flex-wrap gap-3 pt-2">
                <button 
                  onClick={() => { setUploadStep(1); setIsUploadModalOpen(true); }}
                  className="btn-primary py-3 px-8 shadow-md active:scale-95 transition-all flex items-center gap-2"
                >
                   <Upload className="w-4 h-4" /> Upload Document
                </button>
                <button className="btn-secondary py-3 px-8 flex items-center gap-2 bg-white">
                   <Camera className="w-4 h-4" /> Scan with Phone
                </button>
             </div>
          </div>
          
          <div className="lg:col-span-5 bg-gray-50/50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-center">
             <div className="flex justify-between items-end mb-3">
                <div>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Storage Status</p>
                   <p className="text-xl font-black text-gray-900">{currentUsage} MB <span className="text-gray-300 font-medium text-sm">/ {storageLimit} MB</span></p>
                </div>
                <span className={`text-xs font-black px-2 py-1 rounded-md ${usagePercent > 90 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>{usagePercent}%</span>
             </div>
             <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden mb-4">
                <div 
                  className={`h-full transition-all duration-1000 ease-out rounded-full ${usagePercent > 90 ? 'bg-red-50' : 'bg-brand-primary'}`}
                  style={{ width: `${usagePercent}%` }}
                />
             </div>
             {!MOCK_USER.isPro && (
               <div className="flex items-center justify-between gap-4 p-3 bg-amber-50 border border-amber-100 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <p className="text-[10px] font-bold text-amber-800 uppercase">Upgrade for 10x space</p>
                  </div>
                  <button className="text-[10px] font-black text-amber-600 hover:underline">Learn More</button>
               </div>
             )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Sidebar: Checklist & Filters */}
        <aside className="lg:col-span-4 space-y-6">
           <div className="bg-gray-900 rounded-xl p-6 text-white space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><FileCheck className="w-20 h-20" /></div>
              <div className="relative z-10">
                <h3 className="text-xs font-black uppercase tracking-widest mb-1 flex items-center gap-2 text-brand-primary">
                  <CheckSquare className="w-4 h-4" /> Compliance Guard
                </h3>
                <p className="text-[10px] text-gray-400 font-medium">Verify you have all mandatory service files.</p>
              </div>
              <div className="space-y-3 relative z-10">
                 {essentialDocs.map((item) => {
                   const isUploaded = docs.some(d => d.documentType === item.type);
                   return (
                     <div key={item.type} className="group">
                        <div className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all">
                           <div className="flex items-center gap-3">
                              {isUploaded ? (
                                <div className="p-1.5 bg-green-500/20 text-green-400 rounded-lg"><CheckCircle className="w-3.5 h-3.5" /></div>
                              ) : (
                                <div className="p-1.5 bg-red-500/20 text-red-400 rounded-lg"><AlertCircle className="w-3.5 h-3.5" /></div>
                              )}
                              <span className={`text-[11px] font-bold ${isUploaded ? 'text-white' : 'text-gray-400'}`}>
                                {item.label}
                              </span>
                           </div>
                           {!isUploaded && <button className="p-1.5 bg-brand-primary/20 text-brand-primary rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><Plus className="w-3 h-3" /></button>}
                        </div>
                     </div>
                   );
                 })}
              </div>
           </div>

           <div className="card-standard !p-2 space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest p-4 pb-2">Document Types</p>
              {categories.map(cat => (
                <button 
                  key={cat.id} 
                  onClick={() => setActiveTab(cat.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                    activeTab === cat.id ? 'bg-brand-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {cat.label}
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === cat.id ? 'bg-white/20' : 'bg-gray-100'}`}>{cat.count}</span>
                </button>
              ))}
           </div>
        </aside>

        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-6">
           <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                 <input 
                  type="text" 
                  placeholder="Search vault..."
                  className="input-standard pl-11 py-3"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>
              <div className="flex bg-white p-1 rounded-lg border border-gray-200">
                 <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-100 text-brand-primary' : 'text-gray-400'}`}><Layers className="w-4 h-4" /></button>
                 <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-gray-100 text-brand-primary' : 'text-gray-400'}`}><MoreVertical className="w-4 h-4" /></button>
              </div>
           </div>

           {viewMode === 'grid' ? (
             <div className="grid md:grid-cols-2 gap-6">
                {filteredDocs.map((doc) => (
                  <div 
                    key={doc.id} 
                    className="card-standard group flex flex-col h-full cursor-pointer hover:border-brand-primary"
                    onClick={() => setSelectedDoc(doc)}
                  >
                    <div className="flex items-start justify-between mb-6">
                       <div className="p-4 bg-gray-50 rounded-xl group-hover:bg-green-50 transition-colors">
                          {getDocIcon(doc.mimeType)}
                       </div>
                       <div className="flex flex-col items-end gap-1.5">
                          <span className={`badge-standard !py-0.5 !text-[9px] ${
                            doc.isVerified ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                          }`}>
                            {doc.isVerified ? 'Verified' : 'Manual'}
                          </span>
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{(doc.fileSize / (1024 * 1024)).toFixed(2)} MB</span>
                       </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-primary transition-colors leading-tight truncate mb-1">{doc.fileName}</h3>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">{doc.documentType.replace(/_/g, ' ')}</p>
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                       <div className="flex items-center gap-2">
                          <button className="p-2 bg-gray-50 text-gray-400 hover:text-brand-primary rounded-lg transition-all"><Eye className="w-3.5 h-3.5" /></button>
                          <button className="p-2 bg-gray-50 text-gray-400 hover:text-brand-primary rounded-lg transition-all"><Download className="w-3.5 h-3.5" /></button>
                       </div>
                       <button className="p-2 text-gray-300 hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => { setUploadStep(1); setIsUploadModalOpen(true); }}
                  className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-gray-400 hover:border-brand-primary hover:text-brand-primary hover:bg-green-50/20 transition-all group min-h-[220px]"
                >
                  <Plus className="w-8 h-8 mb-2" />
                  <span className="font-bold text-xs uppercase tracking-widest">Add New File</span>
                </button>
             </div>
           ) : (
             <div className="card-standard !p-0 overflow-hidden divide-y divide-gray-100">
                {filteredDocs.map((doc) => (
                  <div key={doc.id} onClick={() => setSelectedDoc(doc)} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors cursor-pointer">
                     <div className="p-3 bg-gray-50 rounded-lg">{getDocIcon(doc.mimeType)}</div>
                     <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 truncate">{doc.fileName}</h4>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                           <span>{doc.documentType.replace(/_/g, ' ')}</span>
                           <span>•</span>
                           <span>{(doc.fileSize / (1024 * 1024)).toFixed(2)} MB</span>
                        </div>
                     </div>
                     <button className="p-2 text-gray-400 hover:text-brand-primary"><Download className="w-4 h-4" /></button>
                  </div>
                ))}
             </div>
           )}
        </div>
      </div>

      {/* Security Info Card */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-5">
            <div className="p-4 bg-white rounded-xl shadow-sm text-brand-primary"><Lock className="w-8 h-8" /></div>
            <div className="max-w-md">
               <h4 className="text-lg font-bold text-gray-900">Encrypted Storage</h4>
               <p className="text-xs text-gray-500 font-medium leading-relaxed mt-1">All documents are encrypted with AES-256 before being stored. Only you hold the decryption keys.</p>
            </div>
         </div>
         <div className="flex gap-3">
            <button className="btn-secondary py-2.5 px-6 text-xs bg-white">Access Policy</button>
            <button className="btn-secondary py-2.5 px-6 text-xs bg-white flex items-center gap-2">Audit Log <ExternalLink className="w-3 h-3" /></button>
         </div>
      </div>

      {/* Upload Modal Wizard */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm" onClick={() => setIsUploadModalOpen(false)} />
           <div className="relative bg-white rounded-xl w-full max-w-xl overflow-hidden shadow-2xl animate-in zoom-in duration-300 flex flex-col">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                 <h2 className="text-xl font-bold text-gray-900">Upload to Vault</h2>
                 <button onClick={() => setIsUploadModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
              </div>
              <div className="p-8 flex-1">
                 {uploadStep === 1 && (
                   <div className="space-y-6 animate-in fade-in duration-300 text-center">
                      <div className="border-2 border-dashed border-gray-100 rounded-xl p-12 hover:border-brand-primary transition-all cursor-pointer bg-gray-50/20">
                         <FileUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                         <p className="text-lg font-bold text-gray-900">Drag & Drop Documents</p>
                         <p className="text-xs text-gray-500 mt-1">PDF, JPEG, PNG (Max 10MB)</p>
                         <button className="mt-6 px-8 py-3 bg-gray-900 text-white font-bold rounded-lg text-[10px] uppercase tracking-widest shadow-md">Choose File</button>
                      </div>
                      <button onClick={() => setUploadStep(2)} className="w-full btn-primary py-4 text-sm">Continue to Details</button>
                   </div>
                 )}
                 {uploadStep === 2 && (
                   <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Document Type</label>
                        <select className="input-standard bg-gray-50">
                          {essentialDocs.map(e => <option key={e.type} value={e.type}>{e.label}</option>)}
                          <option value="custom">Other / Custom</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Tags</label>
                        <input type="text" className="input-standard bg-gray-50" placeholder="e.g. clearance, camp" />
                      </div>
                      <div className="flex gap-3 pt-4">
                         <button onClick={() => setUploadStep(1)} className="btn-secondary flex-1 py-3.5 text-xs">Back</button>
                         <button onClick={handleUpload} className="btn-primary flex-[2] py-3.5 text-xs">Securely Upload</button>
                      </div>
                   </div>
                 )}
                 {uploadStep === 3 && (
                   <div className="flex flex-col items-center justify-center py-16 animate-in fade-in duration-300">
                      <div className="w-full max-w-sm space-y-5">
                        <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                           <div className="h-full bg-brand-primary transition-all duration-100" style={{ width: `${uploadProgress}%` }} />
                        </div>
                        <p className="text-center text-xl font-black text-gray-900">Encrypting... {uploadProgress}%</p>
                      </div>
                   </div>
                 )}
                 {uploadStep === 4 && (
                   <div className="flex flex-col items-center justify-center py-6 animate-in zoom-in duration-500 text-center">
                      <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center text-brand-primary mb-6">
                         <CheckCircle className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-black text-gray-900">Vault Updated!</h3>
                      <p className="text-gray-500 mt-2 font-medium text-sm px-6">Your file is now stored in your personal vault and accessible across all devices.</p>
                      <div className="mt-10 flex flex-col gap-2 w-full max-w-xs">
                         <button onClick={() => setIsUploadModalOpen(false)} className="btn-primary py-4 text-xs font-bold uppercase tracking-widest shadow-lg">Done</button>
                         <button onClick={() => setUploadStep(1)} className="text-xs font-bold text-gray-400 py-3">Upload Another</button>
                      </div>
                   </div>
                 )}
              </div>
           </div>
        </div>
      )}

      {/* Detail & Sharing Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-sm" onClick={() => setSelectedDoc(null)} />
           <div className="relative bg-white rounded-xl w-full max-w-6xl h-[85vh] overflow-hidden shadow-2xl animate-in zoom-in duration-300 flex flex-col md:flex-row">
              <div className="flex-[3] bg-gray-100 flex flex-col items-center justify-center p-12">
                 <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6">
                    {getDocIcon(selectedDoc.mimeType)}
                 </div>
                 <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Secure Preview</p>
                 <button className="bg-gray-900 text-white font-bold px-8 py-3 rounded-lg text-xs uppercase tracking-widest shadow-xl flex items-center gap-2">
                    <Download className="w-4 h-4" /> Download Original
                 </button>
              </div>
              <div className="flex-[2] bg-white p-8 md:p-12 overflow-y-auto border-l border-gray-100 flex flex-col">
                 <div className="flex items-center justify-between mb-8">
                    <span className="badge-standard bg-green-50 text-green-600">File Settings</span>
                    <button onClick={() => setSelectedDoc(null)} className="p-2.5 bg-gray-50 rounded-lg"><X className="w-5 h-5 text-gray-400" /></button>
                 </div>
                 <div className="space-y-10">
                    <div className="space-y-2">
                       <h2 className="text-2xl font-black text-gray-900 leading-tight">{selectedDoc.fileName}</h2>
                       <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
                          <History className="w-3 h-3" /> {selectedDoc.uploadDate.toLocaleDateString()}
                       </div>
                    </div>
                    <div className="space-y-4">
                       <div className="flex items-center justify-between">
                          <h3 className="text-xs font-bold text-gray-900 uppercase">External Sharing</h3>
                          <button onClick={() => setIsSharing(!isSharing)} className={`w-10 h-5 rounded-full relative transition-all ${isSharing ? 'bg-brand-primary' : 'bg-gray-200'}`}>
                             <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${isSharing ? 'left-5.5' : 'left-0.5'}`} />
                          </button>
                       </div>
                       {isSharing && (
                         <div className="p-5 bg-blue-50 border border-blue-100 rounded-xl space-y-4 animate-in fade-in">
                            <p className="text-[10px] text-blue-800 font-bold leading-relaxed">Unique shareable link. Access expires in 24 hours.</p>
                            <div className="flex gap-2">
                               <input disabled className="flex-1 bg-white border border-blue-200 rounded-lg px-3 py-2 text-[10px] font-mono" value="smartcorper.app/s/vault_f2..." />
                               <button className="p-2 bg-blue-600 text-white rounded-lg"><Copy className="w-4 h-4" /></button>
                            </div>
                            <div className="flex justify-center"><QrCode className="w-20 h-20 text-blue-900" /></div>
                         </div>
                       )}
                    </div>
                    <div className="pt-8 border-t border-gray-50 mt-auto flex flex-col gap-2">
                       <button className="w-full btn-primary py-4 text-xs shadow-lg"><Edit3 className="w-4 h-4 mr-2" /> Edit Details</button>
                       <button className="btn-secondary py-3 text-[10px] bg-white text-red-500 border-red-100 flex items-center justify-center gap-2"><Trash2 className="w-3.5 h-3.5" /> Delete File</button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default DocumentVault;
