import { CloudSun, Info, Calendar } from 'lucide-react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const forecastData = [
  { time: '06:00', actual: 5, predicted: 6 },
  { time: '07:00', actual: 15, predicted: 14 },
  { time: '08:00', actual: 30, predicted: 32 },
  { time: '09:00', actual: 45, predicted: 50 },
  { time: '10:00', actual: 70, predicted: 68 },
  { time: '11:00', actual: 85, predicted: 80 },
  { time: '12:00', actual: 95, predicted: 90 },
  { time: '13:00', actual: null, predicted: 95 },
  { time: '14:00', actual: null, predicted: 92 },
  { time: '15:00', actual: null, predicted: 80 },
  { time: '16:00', actual: null, predicted: 60 },
  { time: '17:00', actual: null, predicted: 35 },
  { time: '18:00', actual: null, predicted: 15 },
  { time: '19:00', actual: null, predicted: 0 },
];

export default function Forecasting() {
  return (
    <div className="animate-fade-in delay-100">
      <div className="page-header">
        <h1 className="page-title">Solar Forecasting</h1>
        <p className="page-subtitle">AI-powered predictions based on weather and historical data</p>
      </div>

      <div className="dashboard-grid">
        <div className="glass-panel metric-card">
          <div className="metric-header">
            <span>Forecast Horizon</span>
            <Calendar size={18} />
          </div>
          <div className="metric-value">
            24 <span className="metric-unit">Hours</span>
          </div>
          <div className="metric-change">
            Updated 10 mins ago
          </div>
        </div>

        <div className="glass-panel metric-card">
          <div className="metric-header">
            <span>Confidence Indicator</span>
            <Info size={18} />
          </div>
          <div className="metric-value" style={{ color: 'var(--accent-solar)' }}>
            88 <span className="metric-unit">%</span>
          </div>
          <div className="metric-change">
            High accuracy expected today
          </div>
        </div>

        <div className="glass-panel metric-card">
          <div className="metric-header">
            <span>Weather Condition</span>
            <CloudSun size={18} />
          </div>
          <div className="metric-value">
            Partly Cloudy
          </div>
          <div className="metric-change">
            20% cloud cover
          </div>
        </div>
      </div>

      <div className="glass-panel mb-4">
        <h3 className="reco-title" style={{ marginBottom: '1.5rem' }}>Actual vs Predicted Generation</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          * The chart below compares historical actual data with AI predictions for the current day. Values are in kW.
        </p>
        <div style={{ height: 400, width: '100%' }}>
          <ResponsiveContainer>
            <ComposedChart data={forecastData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(20, 26, 42, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="actual" name="Actual Gen (kW)" barSize={20} fill="#10b981" radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="predicted" name="Predicted Gen (kW)" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} strokeDasharray="5 5" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="glass-panel" style={{ background: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6' }}>
        <h3 className="reco-title"><Info size={20} /> Model Information</h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          This prototype uses simulated predictions. In a production environment, this module will connect to a trained machine learning model processing real-time weather APIs and historical solar generation datasets.
        </p>
      </div>
    </div>
  );
}
