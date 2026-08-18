import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, ArrowUp, Heart, Code2 } from 'lucide-react';
import { profileService } from '../services/profileService';

const Footer = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    profileService.getProfile()
      .then((res) => {
        if (res.success && res.data) {
          setProfile(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080B12] border-t border-slate-800/80 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Bio */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 text-white group">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                {profile?.name || 'Shashwat Pandey'}
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              {profile?.bio ||
                'Full-Stack Developer & AI/DS Student building practical web applications, backend systems, and solving problems in C++ and JavaScript.'}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={profile?.github || 'https://github.com/Shashwat-pandey21'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-indigo-600 hover:text-white flex items-center justify-center text-slate-300 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profile?.linkedin || 'https://www.linkedin.com/in/shashwat-pandey-b596a732a/'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-indigo-600 hover:text-white flex items-center justify-center text-slate-300 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={profile?.leetcode || 'https://leetcode.com/u/shashwatpandey_21/'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode Profile"
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-amber-600 hover:text-white flex items-center justify-center text-slate-300 transition-all"
                title="LeetCode Profile"
              >
                <Code2 className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profile?.email || 'pandeyshashwat510@gmail.com'}`}
                aria-label="Email Contact"
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-indigo-600 hover:text-white flex items-center justify-center text-slate-300 transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-indigo-400 transition-colors">
                  About Me
                </Link>
              </li>
              <li>
                <Link to="/skills" className="hover:text-indigo-400 transition-colors">
                  Skills & Stack
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-indigo-400 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/experience" className="hover:text-indigo-400 transition-colors">
                  Experience & Career
                </Link>
              </li>
              <li>
                <Link to="/education" className="hover:text-indigo-400 transition-colors">
                  Education & Background
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal & Back to top */}
          <div className="space-y-3 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold mb-3">
                System Portal
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/contact" className="hover:text-indigo-400 transition-colors">
                    Send Message
                  </Link>
                </li>
                <li>
                  <Link to="/admin/login" className="hover:text-indigo-400 transition-colors">
                    Admin CMS Login
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all group w-fit"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {currentYear} {profile?.name || 'Developer'}. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Engineered with React, Node.js, Express & MongoDB</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
