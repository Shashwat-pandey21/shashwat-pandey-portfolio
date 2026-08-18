import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  FileDown,
  Terminal,
  Sparkles,
  Layers,
  ChevronRight,
  ExternalLink,
  Code2,
} from 'lucide-react';
import { profileService } from '../services/profileService';
import { projectService } from '../services/projectService';
import { skillService } from '../services/skillService';
import ProjectCard from '../components/ProjectCard';
import SkillBadge from '../components/SkillBadge';
import { CardSkeleton, SkillSkeleton } from '../components/LoadingSkeleton';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, projectsRes, skillsRes] = await Promise.all([
          profileService.getProfile(),
          projectService.getProjects(true),
          skillService.getSkills(),
        ]);

        if (profileRes.success) setProfile(profileRes.data);
        if (projectsRes.success) setFeaturedProjects(projectsRes.data);
        if (skillsRes.success) setSkills(skillsRes.data);
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 lg:pt-28 radial-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              {/* Availability Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 -ml-3" />
                <span>Available for Full-Stack & Engineering Roles</span>
              </div>

              {/* Headline */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-none">
                  Hi, I'm{' '}
                  <span className="gradient-text">
                    {profile?.name || 'Ethan Vance'}
                  </span>
                </h1>
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-300">
                  {profile?.title || 'Lead Full-Stack Software Engineer'}
                </h2>
              </div>

              {/* Short Bio */}
              <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {profile?.bio ||
                  'Architecting resilient distributed systems, modern reactive web interfaces, and high-throughput backend APIs with precision and modern best practices.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/projects"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>View Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 transition-all hover:border-slate-600"
                >
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <span>Contact Me</span>
                </Link>
                {profile?.resumeUrl && (
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 border border-transparent hover:border-slate-700 transition-all"
                  >
                    <FileDown className="w-4 h-4 text-slate-400" />
                    <span>Resume</span>
                  </a>
                )}
              </div>

              {/* Social Links Bar */}
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 border-t border-slate-800/80">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Connect:
                </span>
                {profile?.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {profile?.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="p-2 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {profile?.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    aria-label="Email"
                    className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

            {/* Right Visual Image & Tech Badges */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-72 sm:w-80 lg:w-96 aspect-square">
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 blur-2xl opacity-40 animate-pulse-slow" />
                
                {/* Avatar Card */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-slate-700/80 bg-slate-900 shadow-2xl p-2">
                  <img
                    src={profile?.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                    alt={profile?.name || 'Developer Avatar'}
                    className="w-full h-full object-cover rounded-2xl"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                </div>

                {/* Floating Metric Card 1 */}
                <div className="absolute -bottom-4 -left-4 sm:-left-6 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-md flex items-center gap-3 animate-float">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Full-Stack MERN</p>
                    <p className="text-[11px] text-slate-400 font-mono">React • Node • Mongo</p>
                  </div>
                </div>

                {/* Floating Metric Card 2 */}
                <div className="absolute -top-4 -right-4 sm:-right-6 p-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-md flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-slate-200">Verified System</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-indigo-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Production Work</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Featured Engineering Projects
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>View All Projects</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : featuredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400">
            <p>No featured projects found at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.slice(0, 3).map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </section>

      {/* Core Skills Snapshot */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Technical Expertise</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Dynamic Skills & Capabilities
            </h2>
          </div>
          <Link
            to="/skills"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>Explore All Skills</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SkillSkeleton />
            <SkillSkeleton />
            <SkillSkeleton />
            <SkillSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills.slice(0, 8).map((skill) => (
              <SkillBadge key={skill._id} skill={skill} />
            ))}
          </div>
        )}
      </section>

      {/* Ready to collaborate Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900/60 via-slate-900 to-slate-900 border border-indigo-500/30 p-8 sm:p-12 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Have an upcoming project or role?
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              I am open to discussions regarding full-stack engineering roles, microservice consulting, or distributed systems development.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 transition-all hover:scale-105"
            >
              Get In Touch
            </Link>
            <Link
              to="/about"
              className="px-6 py-3.5 rounded-xl font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-all"
            >
              Learn More About Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
