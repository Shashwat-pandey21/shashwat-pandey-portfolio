import React, { useEffect, useState } from 'react';
import { experienceService } from '../services/experienceService';
import {
  Briefcase,
  Calendar,
  Building,
  CheckCircle2,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { TableSkeleton } from '../components/LoadingSkeleton';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExp = async () => {
      try {
        setLoading(true);
        const res = await experienceService.getExperiences();
        if (res.success && res.data) {
          setExperiences(res.data);
        }
      } catch (err) {
        console.error('Error fetching experiences:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchExp();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-wider">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Professional Background</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Development <span className="gradient-text">Experience & Projects</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
          Record of full-stack application development, backend system implementations, and academic software engineering.
        </p>
      </div>

      {/* Timeline */}
      {loading ? (
        <TableSkeleton rows={4} />
      ) : experiences.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400">
          <p>No work experience entries recorded yet.</p>
        </div>
      ) : (
        <div className="relative pl-6 sm:pl-8 border-l-2 border-indigo-500/30 space-y-12">
          {experiences.map((exp, index) => (
            <div key={exp._id} className="relative group">
              {/* Timeline node dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-slate-950 border-2 border-indigo-500 flex items-center justify-center group-hover:scale-125 group-hover:bg-indigo-600 transition-all">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>

              {/* Experience Card */}
              <div className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {exp.role}
                    </h2>
                    <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm mt-1">
                      <Building className="w-4 h-4" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700 w-fit">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    <span>
                      {exp.startDate} — {exp.endDate || 'Present'}
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line">
                  {exp.description}
                </p>

                {/* Technologies */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-slate-400 mr-1 flex items-center gap-1">
                      <Layers className="w-3 h-3" /> Stack:
                    </span>
                    {exp.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md bg-slate-800 border border-slate-700/60 text-xs font-mono text-indigo-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Experience;
