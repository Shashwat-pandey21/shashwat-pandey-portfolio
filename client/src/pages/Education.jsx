import React, { useEffect, useState } from 'react';
import { educationService } from '../services/educationService';
import {
  GraduationCap,
  Calendar,
  Building,
  BookOpen,
  MapPin,
} from 'lucide-react';
import { TableSkeleton } from '../components/LoadingSkeleton';

const Education = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEdu = async () => {
      try {
        setLoading(true);
        const res = await educationService.getEducation();
        if (res.success && res.data) {
          setEducation(res.data);
        }
      } catch (err) {
        console.error('Error fetching education records:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEdu();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Academic Background</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Education & <span className="gradient-text">Academic Degree</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
          Undergraduate degree, computer science core subjects, Artificial Intelligence & Data Science curriculum.
        </p>
      </div>

      {/* Education Cards */}
      {loading ? (
        <TableSkeleton rows={2} />
      ) : education.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400">
          <p>No education records registered yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {education.map((edu) => (
            <div
              key={edu._id}
              className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="space-y-1.5">
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {edu.degree}
                  </h2>
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                    <Building className="w-4 h-4" />
                    <span>{edu.institution}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>Greater Noida, Uttar Pradesh</span>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-2 shrink-0">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700 w-fit">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>
                      {edu.startYear} – {edu.endYear || 'Present'}
                    </span>
                  </div>
                </div>
              </div>

              {edu.description && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Specialization & Core Subjects:</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Education;
