import React, { useEffect, useState } from 'react';
import { useOptimizationSettings } from '../context/OptimizationContext.jsx';
import { getProfilerStats } from '../utils/renderStats.js';

const TOGGLES = [
  {
    key: 'memoCards',
    label: 'Memoize event cards',
    help: 'EventCard skips rendering when its own props are unchanged.'
  },
  {
    key: 'useCallbackHandlers',
    label: 'Stable event handlers',
    help: 'Handlers keep a stable reference instead of being recreated every render.'
  },
  {
    key: 'memoAgenda',
    label: 'Memoize upcoming events',
    help: 'The upcoming-events list is recomputed only when its inputs change.'
  }
];

function PerformanceMonitor() {
  const { settings, toggle } = useOptimizationSettings();
  const [profiler, setProfiler] = useState(() => getProfilerStats());

  useEffect(() => {
    const id = setInterval(() => setProfiler(getProfilerStats()), 500);
    return () => clearInterval(id);
  }, []);

  const profilerIds = Object.keys(profiler).sort();

  return (
    <div className="performance-monitor">
      <div className="performance-monitor__intro">
        <span className="performance-monitor__icon">⚡</span>
        <div>
          <h3>Performance Lab</h3>
          <p>Toggle optimizations and compare real React Profiler timings.</p>
        </div>
      </div>

      <div className="perf-toggles">
        {TOGGLES.map(({ key, label, help }) => (
          <label key={key} className="perf-toggle" title={help}>
            <span className={`perf-switch ${settings[key] ? 'perf-switch--on' : ''}`}>
              <input
                type="checkbox"
                checked={settings[key]}
                onChange={() => toggle(key)}
                aria-label={label}
              />
              <span className="perf-switch__track" />
            </span>
            <span className="perf-toggle__copy">
              <strong>{label}</strong>
              <small>{settings[key] ? 'Optimization enabled' : 'Optimization disabled'}</small>
            </span>
          </label>
        ))}
      </div>

      <div className="performance-monitor__section">
        <div className="performance-monitor__section-header">
          <div>
            <h4>Render timing</h4>
            <span>Live measurements from React Profiler</span>
          </div>
          <span className="perf-live">LIVE</span>
        </div>

        {profilerIds.length === 0 ? (
          <p className="performance-monitor__empty">Interact with the calendar to collect timing data.</p>
        ) : (
          <div className="performance-monitor__table-wrap">
            <table className="performance-monitor__table">
              <thead>
                <tr>
                  <th>Region</th>
                  <th>Commits</th>
                  <th>Last</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {profilerIds.map((id) => {
                  const stat = profiler[id];
                  return (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{stat.commits}</td>
                      <td>{stat.lastDuration.toFixed(2)} ms</td>
                      <td>{stat.totalDuration.toFixed(2)} ms</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default PerformanceMonitor;
