import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  GraduationCap,
  Compass,
  FileDown,
  Mail,
  MapPin,
  CheckCircle2,
  Building,
  Code2,
} from 'lucide-react';
import { profileService } from '../services/profileService';
import { educationService } from '../services/educationService';

const About = () => {
  const [profile, setProfile] = useState(null);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profRes, eduRes] = await Promise.all([
          profileService.getProfile(),
          educationService.getEducation(),
        ]);

        if (profRes.success) setProfile(profRes.data);
        if (eduRes.success) setEducation(eduRes.data);
      } catch (err) {
        console.error('Error fetching about data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const careerInterests = [
    'Full-Stack Web Development',
    'Backend Development',
    'REST API Development',
    'Data Structures & Algorithms',
    'Database Management',
    'Artificial Intelligence & Data Science',
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
          {profile?.title || 'Full-Stack Developer | AI & Data Science Student'}
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
              <li className="flex items-center gap-3 text-slate-300">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Greater Noida, Uttar Pradesh, India</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="mailto:pandeyshashwat510@gmail.com" className="hover:text-white transition-colors truncate">
                  pandeyshashwat510@gmail.com
                </a>
              </li>
            </ul>

            {profile?.resumeUrl && (
              <div className="pt-2">
                <a
                  href={profile.resumeUrl}
                  download
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Resume</span>
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
              About Me
            </h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                I’m a B.Tech student specializing in Artificial Intelligence and Data Science with a strong interest in full-stack web development and problem solving. I enjoy building practical web applications and developing backend systems using technologies such as Node.js, Express.js, MongoDB, and REST APIs. I’m also consistently improving my Data Structures and Algorithms skills through problem solving and LeetCode.
              </p>
              <p>
                I focus on writing clean, modular code, building reliable server-side APIs, and applying algorithmic problem-solving techniques to build scalable software applications.
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

          {/* Education Summary (NO CGPA) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xl font-bold text-white">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <h2>Education</h2>
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
                    <h3 className="font-bold text-slate-100">{edu.degree}</h3>
                    <p className="text-sm text-slate-400 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{edu.institution}</span>
                    </p>
                  </div>
                  <div className="text-right sm:shrink-0">
                    <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-xs font-mono text-slate-300 border border-slate-700">
                      {edu.startYear} – {edu.endYear || 'Present'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick CTA */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all"
            >
              Get In Touch
            </Link>
            <a
              href="https://leetcode.com/u/shashwatpandey_21/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all"
            >
              <Code2 className="w-4 h-4 text-amber-400" />
              <span>LeetCode Profile</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
