import { Sun, Zap, BatteryCharging, Leaf, DollarSign, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockChartData = [
  { time: '06:00', solar: 10, consumption: 20 },
  { time: '08:00', solar: 45, consumption: 35 },
  { time: '10:00', solar: 80, consumption: 40 },
  { time: '12:00', solar: 100, consumption: 45 },
  { time: '14:00', solar: 95, consumption: 50 },
  { time: '16:00', solar: 60, consumption: 55 },
  { time: '18:00', solar: 15, consumption: 70 },
  { time: '20:00', solar: 0, consumption: 60 },
];

export default function Dashboard() {
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Energy Dashboard</h1>
        <p className="page-subtitle">Real-time overview of your energy ecosystem</p>
      </div>

      <div className="dashboard-grid">
        <div className="glass-panel metric-card">
          <div className="metric-header">
            <span>Current Solar Gen</span>
            <div className="metric-icon-wrapper solar">
              <Sun size={20} />
            </div>
          </div>
          <div className="metric-value">
            4.2 <span className="metric-unit">kW</span>
          </div>
          <div className="metric-change change-positive">
            <TrendingUp size={16} /> +12% from yesterday
          </div>
        </div>

        <div className="glass-panel metric-card">
          <div className="metric-header">
            <span>Current Demand</span>
            <div className="metric-icon-wrapper warning">
              <Zap size={20} />
            </div>
          </div>
          <div className="metric-value">
            3.1 <span className="metric-unit">kW</span>
          </div>
          <div className="metric-change change-negative">
            <TrendingUp size={16} /> -5% from yesterday
          </div>
        </div>

        <div className="glass-panel metric-card">
          <div className="metric-header">
            <span>Battery Status</span>
            <div className="metric-icon-wrapper battery">
              <BatteryCharging size={20} />
            </div>
          </div>
          <div className="metric-value">
            78 <span className="metric-unit">%</span>
          </div>
          <div className="metric-change">
            Charging (est. 1h 20m to full)
          </div>
        </div>

        <div className="glass-panel metric-card">
          <div className="metric-header">
            <span>Grid Usage</span>
            <div className="metric-icon-wrapper grid">
              <Zap size={20} />
            </div>
          </div>
          <div className="metric-value">
            0.0 <span className="metric-unit">kW</span>
          </div>
          <div className="metric-change change-positive">
            100% self-sufficient right now
          </div>
        </div>
      </div>

      <div className="chart-grid">
        <div className="glass-panel">
          <h3 className="reco-title" style={{ marginBottom: '1.5rem' }}>Generation vs Consumption</h3>
          <div style={{ height: 300, width: '100%' }}>
            <ResponsiveContainer>
              <AreaChart data={mockChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCons" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(20, 26, 42, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="solar" name="Solar Gen (kW)" stroke="#10b981" fillOpacity={1} fill="url(#colorSolar)" />
                <Area type="monotone" dataKey="consumption" name="Consumption (kW)" stroke="#f59e0b" fillOpacity={1} fill="url(#colorCons)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="metric-header mb-2">
              <span>Today's Total Solar Gen</span>
            </div>
            <div className="metric-value mb-2">
              24.5 <span className="metric-unit">kWh</span>
            </div>
            <div className="metric-header mt-4 mb-2">
              <span>Predicted (Next 24h)</span>
            </div>
            <div className="metric-value" style={{ color: 'var(--accent-solar)' }}>
              32.0 <span className="metric-unit">kWh</span>
            </div>
          </div>

          <div className="glass-panel" style={{ flex: 1 }}>
            <h3 className="reco-title" style={{ marginBottom: '1rem' }}>Impact</h3>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div className="metric-icon-wrapper impact">
                <Leaf size={24} />
              </div>
              <div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>CO₂ Avoided</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>12.4 kg</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="metric-icon-wrapper impact" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                <DollarSign size={24} />
              </div>
              <div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Estimated Savings</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>$ 5.20</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
