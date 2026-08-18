import React from 'react';
import * as LucideIcons from 'lucide-react';

const SkillBadge = ({ skill }) => {
  const { name, category, label, icon } = skill;

  // Dynamically resolve icon or fallback
  const IconComponent = (icon && LucideIcons[icon]) ? LucideIcons[icon] : LucideIcons.Code2;

  // Category specific accent colors
  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Programming Languages':
        return {
          border: 'border-blue-500/30 hover:border-blue-500/60',
          badge: 'bg-blue-500/10 text-blue-400',
          pill: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
        };
      case 'Core CS':
        return {
          border: 'border-purple-500/30 hover:border-purple-500/60',
          badge: 'bg-purple-500/10 text-purple-400',
          pill: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
        };
      case 'Frontend':
        return {
          border: 'border-cyan-500/30 hover:border-cyan-500/60',
          badge: 'bg-cyan-500/10 text-cyan-400',
          pill: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
        };
      case 'Backend':
        return {
          border: 'border-indigo-500/30 hover:border-indigo-500/60',
          badge: 'bg-indigo-500/10 text-indigo-400',
          pill: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
        };
      case 'Database':
        return {
          border: 'border-emerald-500/30 hover:border-emerald-500/60',
          badge: 'bg-emerald-500/10 text-emerald-400',
          pill: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
        };
      case 'Tools & Technologies':
      default:
        return {
          border: 'border-amber-500/30 hover:border-amber-500/60',
          badge: 'bg-amber-500/10 text-amber-400',
          pill: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
        };
    }
  };

  const style = getCategoryColor(category);

  return (
    <div className={`p-4 rounded-xl bg-slate-900/70 border ${style.border} transition-all duration-200 group flex flex-col justify-between h-full space-y-3`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${style.badge}`}>
          <IconComponent className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-bold text-slate-100 group-hover:text-white transition-colors truncate">
            {name}
          </h4>
          <span className="text-[11px] text-slate-400 block font-mono truncate">
            {category}
          </span>
        </div>
      </div>

      {/* Clean Descriptive Label Tag */}
      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
        <span className={`px-2.5 py-1 rounded-md text-[11px] font-medium border ${style.pill} line-clamp-1`}>
          {label || category}
        </span>
      </div>
    </div>
  );
};

export default SkillBadge;
