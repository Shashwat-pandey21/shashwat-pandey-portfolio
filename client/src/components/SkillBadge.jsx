import React from 'react';
import * as LucideIcons from 'lucide-react';

const SkillBadge = ({ skill }) => {
  const { name, category, proficiency = 80, icon } = skill;

  // Dynamically resolve icon or fallback
  const IconComponent = (icon && LucideIcons[icon]) ? LucideIcons[icon] : LucideIcons.Code2;

  // Category specific accent colors
  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Programming Languages':
        return {
          border: 'border-blue-500/30',
          badge: 'bg-blue-500/10 text-blue-400',
          bar: 'from-blue-500 to-indigo-500',
        };
      case 'Frontend':
        return {
          border: 'border-cyan-500/30',
          badge: 'bg-cyan-500/10 text-cyan-400',
          bar: 'from-cyan-500 to-teal-400',
        };
      case 'Backend':
        return {
          border: 'border-indigo-500/30',
          badge: 'bg-indigo-500/10 text-indigo-400',
          bar: 'from-indigo-500 to-violet-500',
        };
      case 'Database':
        return {
          border: 'border-emerald-500/30',
          badge: 'bg-emerald-500/10 text-emerald-400',
          bar: 'from-emerald-500 to-green-400',
        };
      case 'Tools & Technologies':
      default:
        return {
          border: 'border-amber-500/30',
          badge: 'bg-amber-500/10 text-amber-400',
          bar: 'from-amber-500 to-orange-400',
        };
    }
  };

  const style = getCategoryColor(category);

  return (
    <div className={`p-4 rounded-xl bg-slate-900/60 border ${style.border} hover:border-slate-600 transition-all duration-200 group flex flex-col justify-between`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${style.badge}`}>
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100 group-hover:text-white transition-colors">
              {name}
            </h4>
            <span className="text-[11px] text-slate-400 block font-mono">
              {category}
            </span>
          </div>
        </div>
        <span className="text-xs font-mono font-bold text-slate-300">
          {proficiency}%
        </span>
      </div>

      {/* Proficiency Progress Bar */}
      <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${style.bar} transition-all duration-1000`}
          style={{ width: `${proficiency}%` }}
        />
      </div>
    </div>
  );
};

export default SkillBadge;
