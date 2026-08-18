import React from 'react';

const StatCard = ({ title, count, icon: Icon, color = 'indigo', subtitle, to, onClick }) => {
  const colorMap = {
    indigo: {
      bg: 'bg-indigo-500/10',
      text: 'text-indigo-400',
      border: 'border-indigo-500/20 hover:border-indigo-500/40',
      glow: 'shadow-indigo-500/10',
    },
    cyan: {
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-400',
      border: 'border-cyan-500/20 hover:border-cyan-500/40',
      glow: 'shadow-cyan-500/10',
    },
    emerald: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/20 hover:border-emerald-500/40',
      glow: 'shadow-emerald-500/10',
    },
    amber: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/20 hover:border-amber-500/40',
      glow: 'shadow-amber-500/10',
    },
    rose: {
      bg: 'bg-rose-500/10',
      text: 'text-rose-400',
      border: 'border-rose-500/20 hover:border-rose-500/40',
      glow: 'shadow-rose-500/10',
    },
  };

  const scheme = colorMap[color] || colorMap.indigo;

  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-2xl bg-slate-900/70 border ${scheme.border} shadow-lg ${scheme.glow} backdrop-blur-md transition-all duration-300 hover:-translate-y-1 flex items-center justify-between ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="space-y-1">
        <p className="text-xs font-mono uppercase tracking-wider text-slate-400 font-medium">
          {title}
        </p>
        <p className="text-3xl font-bold text-white tracking-tight">
          {count !== undefined ? count : '—'}
        </p>
        {subtitle && (
          <p className="text-xs text-slate-400">{subtitle}</p>
        )}
      </div>

      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${scheme.bg} ${scheme.text}`}>
        {Icon && <Icon className="w-6 h-6" />}
      </div>
    </div>
  );
};

export default StatCard;
