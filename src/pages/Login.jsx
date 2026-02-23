import React, { useState } from 'react';
import { Camera, Lock, Mail, Eye, EyeOff, UserPlus, LogIn, AlertCircle, Sparkles } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setError('');
  };

  const handleAction = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError('Şifrə ən az 6 simvoldan ibarət olmalıdır!');
      return;
    }

    if (!isLoginMode) {
      localStorage.setItem('app_user', JSON.stringify(formData));
      alert("Hesab uğurla yaradıldı! İndi daxil ola bilərsiniz.");
      setIsLoginMode(true);
    } else {
      const savedUser = JSON.parse(localStorage.getItem('app_user'));
      
      if (savedUser && savedUser.email === formData.email && savedUser.password === formData.password) {
        localStorage.setItem('isLoggedIn', 'true');
        onLogin(); 
      } else {
        setError('Giriş uğursuzdur! Məlumatları yoxlayın və ya qeydiyyatdan keçin.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F8FAFC] relative overflow-hidden">
      
      {/* ARXAFON DEKORASİYASI (OYUN HAVASI) */}
      <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-indigo-200 rounded-full blur-[100px] opacity-30"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-purple-200 rounded-full blur-[100px] opacity-30"></div>

      <div className="w-full max-w-md relative z-10">
        
        {/* LOGO BÖLMƏSİ */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-gradient-to-tr from-indigo-600 to-indigo-500 p-5 rounded-[2.5rem] text-white shadow-[0_20px_40px_-10px_rgba(79,70,229,0.4)] mb-6 transform hover:rotate-12 transition-all duration-500 border-b-8 border-indigo-800 active:translate-y-2 active:border-b-0">
            <Camera size={40} strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl font-black text-gray-900 italic tracking-tighter">
            RENT<span className="text-indigo-600">FLOW</span>
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2">
             <span className="h-[2px] w-8 bg-indigo-100"></span>
             <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">Business Simulator</p>
             <span className="h-[2px] w-8 bg-indigo-100"></span>
          </div>
        </div>

        {/* FORM KARTI */}
        <div className="bg-white p-10 rounded-[3.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border-b-[12px] border-gray-100 relative group">
          
          <div className="absolute -top-4 -right-4 bg-yellow-400 text-white p-3 rounded-2xl rotate-12 shadow-lg group-hover:scale-110 transition-transform">
            <Sparkles size={20} fill="white" />
          </div>

          <h2 className="text-2xl font-black text-gray-800 mb-8 uppercase tracking-tighter italic">
            {isLoginMode ? 'Xoş Gəldin, Maqnat!' : 'Yeni İmperiya Qur'}
          </h2>

          {/* XƏTA MESAJI */}
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-[10px] font-black mb-6 flex items-center gap-3 border-2 border-red-100 animate-bounce">
              <AlertCircle size={18} />
              <span className="uppercase tracking-wider">{error}</span>
            </div>
          )}

          <form onSubmit={handleAction} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase ml-4 tracking-widest italic">Oyunçu Maili</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input 
                  required
                  type="email"
                  className="w-full bg-gray-50 p-5 pl-14 rounded-2xl outline-none border-2 border-transparent focus:border-indigo-100 focus:bg-white font-bold transition-all placeholder:text-gray-300 text-gray-700"
                  placeholder="name@empire.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase ml-4 tracking-widest italic">Gizli Şifrə</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input 
                  required
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-gray-50 p-5 pl-14 rounded-2xl outline-none border-2 border-transparent focus:border-indigo-100 focus:bg-white font-bold transition-all placeholder:text-gray-300 text-gray-700"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-indigo-600 text-white py-6 rounded-[2rem] font-black shadow-[0_10px_20px_-5px_rgba(79,70,229,0.4)] border-b-8 border-indigo-800 hover:brightness-110 active:border-b-0 active:translate-y-2 transition-all flex items-center justify-center gap-3 mt-4 text-xs uppercase tracking-[0.2em]"
            >
              {isLoginMode ? <><LogIn size={20} strokeWidth={3}/> Oyuna Başla</> : <><UserPlus size={20} strokeWidth={3}/> Hesabını Aktivləşdir</>}
            </button>
          </form>

          <div className="mt-10 text-center">
            <button 
              onClick={toggleMode}
              className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-700 transition-all hover:scale-105"
            >
              {isLoginMode ? "Hələ qeydiyyatdan keçməmisən? Büradan keç" : "Artıq hesabın var? Geri dön"}
            </button>
          </div>
        </div>

        {/* ALT QEYD */}
        <div className="flex justify-center gap-8 mt-10">
            <div className="flex flex-col items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Server: Online</span>
            </div>
            <div className="flex flex-col items-center gap-1">
                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Version: 2.0.26</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;