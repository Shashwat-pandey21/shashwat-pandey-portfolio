import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  GraduationCap,
  Briefcase,
  Compass,
  FileDown,
  Mail,
  MapPin,
  Phone,
  CheckCircle2,
  Calendar,
  Building,
} from 'lucide-react';
import { profileService } from '../services/profileService';
import { educationService } from '../services/educationService';
import { experienceService } from '../services/experienceService';

const About = () => {
  const [profile, setProfile] = useState(null);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profRes, eduRes, expRes] = await Promise.all([
          profileService.getProfile(),
          educationService.getEducation(),
          experienceService.getExperiences(),
        ]);

        if (profRes.success) setProfile(profRes.data);
        if (eduRes.success) setEducation(eduRes.data);
        if (expRes.success) setExperience(expRes.data);
      } catch (err) {
        console.error('Error fetching about data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const careerInterests = [
    'Cloud-Native Microservices & High-Concurrency Architectures',
    'Real-time Data Streaming & Observability Platforms',
    'Design Systems & Accessible Reactive Web Frameworks',
    'Distributed Database Optimization & Sharding Strategies',
    'Developer Productivity Tooling & Automated CI/CD Pipelines',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-wider">
          <User className="w-3.5 h-3.5" />
          <span>Profile Overview</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          About <span className="gradient-text">{profile?.name || 'Shashwat Pandey'}</span>
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          {profile?.title || 'MERN Stack Developer'}
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Image & Quick Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/60 p-2 shadow-xl">
            <img
              src={profile?.profileImage || '/profile.jpg'}
              alt={profile?.name || 'Shashwat Pandey'}
              className="w-full aspect-[4/5] object-cover rounded-2xl"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/profile.jpg';
              }}
            />
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-widest text-slate-400 font-semibold">
              Contact & Location
            </h3>
            <ul className="space-y-3 text-sm">
              {profile?.location && (
                <li className="flex items-center gap-3 text-slate-300">
                  <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>{profile.location}</span>
                </li>
              )}
              {profile?.email && (
                <li className="flex items-center gap-3 text-slate-300">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors truncate">
                    {profile.email}
                  </a>
                </li>
              )}
              {profile?.phone && (
                <li className="flex items-center gap-3 text-slate-300">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{profile.phone}</span>
                </li>
              )}
            </ul>

            {profile?.resumeUrl && (
              <div className="pt-2">
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Curriculum Vitae</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Bio, Interests, Education summary */}
        <div className="lg:col-span-7 space-y-10">
          {/* Bio statement */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Personal Summary & Philosophy
            </h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                {profile?.bio ||
                  'Experienced software developer focused on modern web engineering, distributed databases, and high-performance applications.'}
              </p>
              <p>
                I thrive in fast-paced environments where reliability, testability, and developer experience are top priorities. I believe in clean code architectures, modular components, and writing clean, self-documenting code with comprehensive documentation.
              </p>
            </div>
          </div>

          {/* Career Interests */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xl font-bold text-white">
              <Compass className="w-5 h-5 text-indigo-400" />
              <h2>Core Technical Interests</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {careerInterests.map((interest, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 text-sm text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{interest}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education Summary */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xl font-bold text-white">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <h2>Academic Credentials</h2>
              </div>
              <Link
                to="/education"
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
              >
                View Details →
              </Link>
            </div>

            <div className="space-y-3">
              {education.map((edu) => (
                <div
                  key={edu._id}
                  className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-100">{edu.degree} in {edu.field}</h3>
                    <p className="text-sm text-slate-400 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{edu.institution}</span>
                    </p>
                  </div>
                  <div className="text-right sm:shrink-0">
                    <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-xs font-mono text-slate-300 border border-slate-700">
                      {edu.startYear} – {edu.endYear}
                    </span>
                    {edu.grade && (
                      <p className="text-xs text-emerald-400 font-mono mt-1 font-semibold">
                        {edu.grade}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick CTA */}
          <div className="pt-4 flex items-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all"
            >
              Get In Touch
            </Link>
            <Link
              to="/experience"
              className="px-6 py-3 rounded-xl font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all"
            >
              View Work History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
