import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import SchedulePage from './components/SchedulePage';
import AWOSchedulePage from './components/AWOSchedulePage';
import ProgramDetailPage from './components/ProgramDetailPage';
import ProgramListPage from './components/ProgramListPage';
import { View } from './types';
import { MOCK_EVENTS, DEFAULT_SETTINGS } from './constants';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');
  
  const events = MOCK_EVENTS;
  const settings = DEFAULT_SETTINGS;
  
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const [initialScheduleBrand, setInitialScheduleBrand] = useState<string | null>(null);

  const handleSelectProgram = (id: string) => {
    setSelectedProgramId(id);
    setCurrentView('program-detail');
  };

  const handleViewScheduleWithBrand = (brand: string) => {
      setInitialScheduleBrand(brand);
      setCurrentView('schedule');
  };

  const getSelectedProgram = () => {
    return settings.promotions.find(p => p.id === selectedProgramId);
  };

  const handleSetCurrentView = (view: View) => {
      if (view !== 'schedule') {
          setInitialScheduleBrand(null);
      }
      setCurrentView(view);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'vi' ? 'en' : 'vi');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar 
        currentView={currentView} 
        setCurrentView={handleSetCurrentView} 
        settings={settings}
        onSelectProgram={handleSelectProgram}
        language={language}
        toggleLanguage={toggleLanguage}
      />
      
      <main>
        {currentView === 'home' && (
          <HomePage 
            setCurrentView={handleSetCurrentView} 
            settings={settings} 
            onSelectProgram={handleSelectProgram}
            onViewScheduleWithBrand={handleViewScheduleWithBrand}
            language={language}
          />
        )}
        
        {currentView === 'schedule' && (
          <SchedulePage 
            events={events} 
            settings={settings} 
            initialBrandFilter={initialScheduleBrand}
            language={language}
          />
        )}

        {currentView === 'awo-schedule' && (
          <AWOSchedulePage 
            promotions={settings.promotions}
            language={language}
          />
        )}

        {currentView === 'program-list' && (
            <ProgramListPage 
                promotions={settings.promotions}
                onSelectProgram={handleSelectProgram}
                setCurrentView={handleSetCurrentView}
                language={language}
            />
        )}

        {currentView === 'program-detail' && (
            <ProgramDetailPage 
                program={getSelectedProgram()} 
                onBack={() => handleSetCurrentView('program-list')}
                setCurrentView={handleSetCurrentView}
                onViewScheduleWithBrand={handleViewScheduleWithBrand}
                language={language}
            />
        )}
      </main>
      <Analytics />
    </div>
  );
}

export default App;