import { useState } from 'react';
import { LayoutDashboard, CloudSun, Zap, Settings, Activity } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Forecasting from './components/Forecasting';
import Optimization from './components/Optimization';
import Simulation from './components/Simulation';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'forecasting':
        return <Forecasting />;
      case 'optimization':
        return <Optimization />;
      case 'simulation':
        return <Simulation />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <Zap size={28} color="#10b981" />
          <span>SolarSync</span>
        </div>
        
        <nav className="nav-links">
          <button 
            className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>
          <button 
            className={`nav-link ${activeTab === 'forecasting' ? 'active' : ''}`}
            onClick={() => setActiveTab('forecasting')}
          >
            <CloudSun size={20} />
            Forecasting
          </button>
          <button 
            className={`nav-link ${activeTab === 'optimization' ? 'active' : ''}`}
            onClick={() => setActiveTab('optimization')}
          >
            <Activity size={20} />
            Optimization
          </button>
          <button 
            className={`nav-link ${activeTab === 'simulation' ? 'active' : ''}`}
            onClick={() => setActiveTab('simulation')}
          >
            <Settings size={20} />
            Simulation
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
