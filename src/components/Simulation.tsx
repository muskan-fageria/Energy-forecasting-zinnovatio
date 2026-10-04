import { useState } from 'react';
import { Settings, Play, CloudSun, Sun, Zap, Battery, Leaf, DollarSign, Activity } from 'lucide-react';

export default function Simulation() {
  const [inputs, setInputs] = useState({
    cloudCover: 20,
    solarGen: 4.2,
    demand: 3.1,
    battery: 78
  });

  const [simResults, setSimResults] = useState<{
    recoAction: string;
    recoClass: string;
    batteryBehavior: string;
    gridDependency: number;
    cost: number;
    co2: number;
    solarForecast: string;
  } | null>(null);

  const handleSimulate = () => {
    let recoAction = '';
    let recoClass = '';
    let batteryBehavior = '';
    let gridDependency = 0;
    
    // Simple Rule Engine
    if (inputs.solarGen > inputs.demand) {
      if (inputs.battery < 100) {
        recoAction = 'Use available solar directly, charge battery with excess';
        recoClass = 'solar';
        batteryBehavior = 'Charging';
      } else {
        recoAction = 'Use solar directly, reduce grid dependency to zero';
        recoClass = 'solar';
        batteryBehavior = 'Full';
      }
    } else {
      // Solar is lower than demand
      const deficit = inputs.demand - inputs.solarGen;
      if (inputs.battery > 20) {
        recoAction = 'Use stored energy from battery to cover demand deficit';
        recoClass = 'battery';
        batteryBehavior = 'Discharging';
      } else {
        recoAction = 'Battery low. Draw required energy from the grid';
        recoClass = 'grid';
        batteryBehavior = 'Idle';
        gridDependency = deficit;
      }
    }

    const co2 = (inputs.solarGen * 0.4).toFixed(2); // Mock calc: 0.4 kg per kW of solar
    const cost = (gridDependency * 0.15).toFixed(2); // Mock calc: $0.15 per kW from grid
    let solarForecast = 'Stable';
    if (inputs.cloudCover > 60) solarForecast = 'Dropping significantly due to clouds';
    else if (inputs.cloudCover > 30) solarForecast = 'Slightly decreasing';

    setSimResults({
      recoAction,
      recoClass,
      batteryBehavior,
      gridDependency: Number(gridDependency.toFixed(2)),
      cost: Number(cost),
      co2: Number(co2),
      solarForecast
    });
  };

  return (
    <div className="animate-fade-in delay-300">
      <div className="page-header">
        <h1 className="page-title">What-If Simulation</h1>
        <p className="page-subtitle">Adjust environmental and system variables to see how the optimization engine responds</p>
      </div>

      <div className="chart-grid">
        <div className="glass-panel">
          <h3 className="reco-title mb-4"><Settings size={20} /> Input Parameters</h3>
          
          <div className="input-group">
            <div className="input-label">
              <span><CloudSun size={14} className="inline mr-1" /> Cloud Cover (%)</span>
              <span>{inputs.cloudCover}%</span>
            </div>
            <input 
              type="range" 
              min="0" max="100" 
              value={inputs.cloudCover}
              onChange={(e) => setInputs({...inputs, cloudCover: Number(e.target.value)})}
            />
          </div>

          <div className="input-group">
            <div className="input-label">
              <span><Sun size={14} className="inline mr-1" /> Current Solar Gen (kW)</span>
              <span>{inputs.solarGen} kW</span>
            </div>
            <input 
              type="range" 
              min="0" max="10" step="0.1"
              value={inputs.solarGen}
              onChange={(e) => setInputs({...inputs, solarGen: Number(e.target.value)})}
            />
          </div>

          <div className="input-group">
            <div className="input-label">
              <span><Zap size={14} className="inline mr-1" /> Energy Demand (kW)</span>
              <span>{inputs.demand} kW</span>
            </div>
            <input 
              type="range" 
              min="0" max="10" step="0.1"
              value={inputs.demand}
              onChange={(e) => setInputs({...inputs, demand: Number(e.target.value)})}
            />
          </div>

          <div className="input-group mb-4">
            <div className="input-label">
              <span><Battery size={14} className="inline mr-1" /> Battery Level (%)</span>
              <span>{inputs.battery}%</span>
            </div>
            <input 
              type="range" 
              min="0" max="100" 
              value={inputs.battery}
              onChange={(e) => setInputs({...inputs, battery: Number(e.target.value)})}
            />
          </div>

          <button className="btn" onClick={handleSimulate} style={{ width: '100%', marginTop: '1rem' }}>
            <Play size={18} /> Run Simulation
          </button>
        </div>

        <div className="glass-panel" style={{ background: simResults ? 'var(--panel-bg)' : 'rgba(20, 26, 42, 0.3)' }}>
          <h3 className="reco-title mb-4"><Activity size={20} /> Simulation Results</h3>
          
          {!simResults ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', color: 'var(--text-secondary)' }}>
              <Settings size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
              <p>Adjust parameters and click Simulate</p>
            </div>
          ) : (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className={`recommendation-card ${simResults.recoClass}`} style={{ padding: '1rem', borderRadius: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Recommended Action</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>{simResults.recoAction}</div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Solar Forecast</span>
                <span style={{ fontWeight: 500 }}>{simResults.solarForecast}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Battery Behavior</span>
                <span style={{ fontWeight: 500 }}>{simResults.batteryBehavior}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Grid Dependency</span>
                <span style={{ fontWeight: 500, color: simResults.gridDependency > 0 ? 'var(--accent-warning)' : 'var(--accent-solar)' }}>
                  {simResults.gridDependency} kW
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}><DollarSign size={14} className="inline" /> Estimated Grid Cost /hr</span>
                <span style={{ fontWeight: 500 }}>${simResults.cost}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}><Leaf size={14} className="inline" /> Estimated CO₂ Avoided /hr</span>
                <span style={{ fontWeight: 500, color: 'var(--accent-solar)' }}>{simResults.co2} kg</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
