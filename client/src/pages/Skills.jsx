import React, { useEffect, useState } from 'react';
import { skillService } from '../services/skillService';
import SkillBadge from '../components/SkillBadge';
import { SkillSkeleton } from '../components/LoadingSkeleton';
import { Wrench, Sparkles, Filter } from 'lucide-react';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Programming Languages',
    'Core CS',
    'Backend',
    'Frontend',
    'Database',
    'Tools & Technologies',
  ];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const res = await skillService.getSkills();
        if (res.success && res.data) {
          setSkills(res.data);
        }
      } catch (err) {
        console.error('Error loading skills:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const filteredSkills =
    selectedCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  // Grouped skills for organized display when "All" is active
  const groupedSkills = categories.slice(1).reduce((acc, cat) => {
    acc[cat] = skills.filter((s) => s.category === cat);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider">
          <Wrench className="w-3.5 h-3.5" />
          <span>Technical Capabilities</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Technical <span className="gradient-text">Skills & Stack</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
          Technical skills across programming languages, core computer science concepts, full-stack frameworks, databases, and development tooling.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-800">
        {categories.map((cat) => {
          const count =
            cat === 'All'
              ? skills.length
              : skills.filter((s) => s.category === cat).length;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                  selectedCategory === cat
                    ? 'bg-indigo-700 text-white'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Skills Content */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <SkillSkeleton key={i} />
          ))}
        </div>
      ) : filteredSkills.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400">
          <p>No skills found in this category.</p>
        </div>
      ) : selectedCategory !== 'All' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <SkillBadge key={skill._id} skill={skill} />
          ))}
        </div>
      ) : (
        /* Categorized Sections */
        <div className="space-y-12">
          {Object.entries(groupedSkills).map(([catName, catSkills]) => {
            if (catSkills.length === 0) return null;

            return (
              <div key={catName} className="space-y-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-slate-100">{catName}</h2>
                  <span className="text-xs font-mono text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                    {catSkills.length} {catSkills.length === 1 ? 'skill' : 'skills'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catSkills.map((skill) => (
                    <SkillBadge key={skill._id} skill={skill} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Skills;
