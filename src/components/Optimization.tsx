import { CheckCircle2, Zap, Battery, Sun, ArrowRight } from 'lucide-react';

export default function Optimization() {
  // Mock current state
  const currentState = {
    solar: 'High', // High, Medium, Low
    battery: 'Medium', // High, Medium, Low
    demand: 'Medium' // High, Medium, Low
  };

  return (
    <div className="animate-fade-in delay-200">
      <div className="page-header">
        <h1 className="page-title">Energy Optimization Engine</h1>
        <p className="page-subtitle">Smart recommendations based on current and predicted conditions</p>
      </div>

      <div className="chart-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-panel">
            <h3 className="reco-title mb-4">Current System State</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '150px', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  <Sun size={16} /> Predicted Solar
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--accent-solar)' }}>{currentState.solar}</div>
              </div>
              <div style={{ flex: 1, minWidth: '150px', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  <Battery size={16} /> Battery Level
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--accent-battery)' }}>{currentState.battery} (65%)</div>
              </div>
              <div style={{ flex: 1, minWidth: '150px', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  <Zap size={16} /> Energy Demand
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--accent-warning)' }}>{currentState.demand}</div>
              </div>
            </div>
          </div>

          <div className="glass-panel recommendation-card">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <CheckCircle2 size={28} color="var(--accent-solar)" style={{ marginTop: '0.2rem' }} />
              <div>
                <h3 className="reco-title" style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Active Strategy: Maximize Solar & Store</h3>
                <p className="reco-desc" style={{ fontSize: '1rem', lineHeight: 1.6 }}>
                  Because predicted solar generation is currently <strong>High</strong> and battery capacity is available, the engine is routing solar energy to cover all current building loads. The excess 1.1 kW is being used to charge the battery.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-panel recommendation-card battery">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <ArrowRight size={28} color="var(--accent-battery)" style={{ marginTop: '0.2rem' }} />
              <div>
                <h3 className="reco-title" style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Upcoming Action (in 4 hours)</h3>
                <p className="reco-desc" style={{ fontSize: '1rem', lineHeight: 1.6 }}>
                  Solar generation will drop significantly by 18:00. The system plans to switch to battery storage to handle the evening demand peak, avoiding grid usage during peak pricing hours.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ height: 'fit-content' }}>
          <h3 className="reco-title mb-4">Rule Engine Logic</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderLeft: '3px solid var(--accent-solar)', borderRadius: '0 0.5rem 0.5rem 0' }}>
              <strong>High Solar + Battery Space:</strong><br/>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Use solar directly, route excess to charge battery.</span>
            </li>
            <li style={{ padding: '1rem', background: 'rgba(139, 92, 246, 0.1)', borderLeft: '3px solid var(--accent-battery)', borderRadius: '0 0.5rem 0.5rem 0' }}>
              <strong>Low Solar + Battery Sufficient:</strong><br/>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Use stored energy to reduce grid dependency.</span>
            </li>
            <li style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderLeft: '3px solid var(--accent-grid)', borderRadius: '0 0.5rem 0.5rem 0' }}>
              <strong>Low Solar + Low Battery:</strong><br/>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Draw energy from the grid (optimized for off-peak hours if possible).</span>
            </li>
            <li style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', borderLeft: '3px solid var(--accent-warning)', borderRadius: '0 0.5rem 0.5rem 0' }}>
              <strong>High Demand Spikes:</strong><br/>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Shift flexible consumption (HVAC, EV charging) to high-solar hours.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
