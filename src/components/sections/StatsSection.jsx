import React from 'react';
export function StatsSection({ section }) {
  const { content, styles } = section;
  const stats = content.stats || [];
  return (
    <section className="relative" style={{ background: styles.backgroundGradient || styles.backgroundColor || 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: styles.padding || '80px 0' }}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (<div key={stat.id || index} className="text-center"><div className="text-5xl md:text-6xl font-bold text-white mb-2">{stat.value}<span className="text-blue-400">{stat.suffix || ''}</span></div><div className="text-slate-400 text-sm uppercase tracking-wider">{stat.label}</div></div>))}
        </div>
      </div>
    </section>
  );
}
