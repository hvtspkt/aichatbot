import React from 'react';
import FeatureGrid from './components/FeatureGrid';
import Instructions from './components/Instructions';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800">
        {/* Simple Header/Banner */}
        <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-6 shadow-md">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                        <i className="fa-solid fa-graduation-cap text-2xl"></i>
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold">TRƯỜNG THPT CÁT TIÊN</h1>
                        <p className="text-blue-200 text-sm">Lớp 10A2 - Thầy Tâm</p>
                    </div>
                </div>
                <div className="hidden md:block">
                     <span className="bg-blue-800/50 px-3 py-1 rounded-full text-xs border border-blue-400">
                        <i className="fa-solid fa-calendar-day mr-1"></i>
                        Năm học 2025 - 2026
                     </span>
                </div>
            </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Feature Grid Section */}
            <FeatureGrid />

            {/* Main Content: Split Instructions and Chat */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Instructions */}
                <div className="lg:col-span-4 space-y-6">
                    <Instructions />
                </div>

                {/* Right Side: Chat Interface */}
                <div className="lg:col-span-8">
                    <ChatInterface />
                </div>
            </div>
        </main>

        <footer className="bg-white border-t border-gray-200 py-6 mt-12 text-center text-gray-500 text-sm">
            <p>© 2025 Trợ lý ảo Thầy Tâm - Lớp 10A2. Được xây dựng để hỗ trợ học sinh.</p>
        </footer>
    </div>
  );
};

export default App;