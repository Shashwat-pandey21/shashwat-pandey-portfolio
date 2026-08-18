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
  GraduationCap,
  Trophy,
  Cpu,
  CheckCircle2,
  Binary,
  Target,
} from 'lucide-react';
import { profileService } from '../services/profileService';
import { projectService } from '../services/projectService';
import { skillService } from '../services/skillService';
import { educationService } from '../services/educationService';
import ProjectCard from '../components/ProjectCard';
import SkillBadge from '../components/SkillBadge';
import { CardSkeleton, SkillSkeleton } from '../components/LoadingSkeleton';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, projectsRes, skillsRes, educationRes] = await Promise.all([
          profileService.getProfile(),
          projectService.getProjects(),
          skillService.getSkills(),
          educationService.getEducation(),
        ]);

        if (profileRes.success) setProfile(profileRes.data);
        if (projectsRes.success) setFeaturedProjects(projectsRes.data);
        if (skillsRes.success) setSkills(skillsRes.data);
        if (educationRes.success) setEducationList(educationRes.data);
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const dsaTopics = [
    'Arrays',
    'Strings',
    'Binary Search',
    'Recursion',
    'Linked Lists',
    'Stack & Queue',
    'Trees',
    'Graphs',
    'Hashing',
    'Sliding Window',
    'Two Pointers',
    'Greedy Algorithms',
    'Dynamic Programming',
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative pt-12 sm:pt-20 lg:pt-28 radial-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              {/* Availability Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 -ml-3" />
                <span>Open for Software Development & Internship Opportunities</span>
              </div>

              {/* Headline */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-none">
                  Hi, I'm{' '}
                  <span className="gradient-text">
                    {profile?.name || 'Shashwat Pandey'}
                  </span>
                </h1>
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-300">
                  {profile?.title || 'Full-Stack Developer | AI & Data Science Student'}
                </h2>
              </div>

              {/* Short Bio */}
              <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Building practical full-stack applications, developing backend systems, and solving problems through Data Structures & Algorithms.
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

                <a
                  href="https://leetcode.com/u/shashwatpandey_21/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 shadow-lg shadow-amber-500/10 transition-all hover:scale-[1.02]"
                >
                  <Code2 className="w-4 h-4 text-amber-400" />
                  <span>View LeetCode</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

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
                    download
                    className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 border border-transparent hover:border-slate-700 transition-all"
                  >
                    <FileDown className="w-4 h-4 text-slate-400" />
                    <span>Download Resume</span>
                  </a>
                )}
              </div>

              {/* Social Links Bar */}
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 border-t border-slate-800/80">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Connect:
                </span>
                <a
                  href={profile?.github || 'https://github.com/Shashwat-pandey21'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={profile?.linkedin || 'https://www.linkedin.com/in/shashwat-pandey-b596a732a/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={profile?.leetcode || 'https://leetcode.com/u/shashwatpandey_21/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LeetCode"
                  className="p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                  title="LeetCode Profile"
                >
                  <Code2 className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${profile?.email || 'pandeyshashwat510@gmail.com'}`}
                  aria-label="Email"
                  className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
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
                    src={profile?.profileImage || '/profile.jpg'}
                    alt={profile?.name || 'Shashwat Pandey'}
                    className="w-full h-full object-cover rounded-2xl"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/profile.jpg';
                    }}
                  />
                </div>

                {/* Floating Metric Card 1 */}
                <div className="absolute -bottom-4 -left-4 sm:-left-6 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-md flex items-center gap-3 animate-float">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Full-Stack & Backend</p>
                    <p className="text-[11px] text-slate-400 font-mono">Node.js • Express • Mongo</p>
                  </div>
                </div>

                {/* Floating Metric Card 2 */}
                <div className="absolute -top-4 -right-4 sm:-right-6 p-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-md flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-xs font-semibold text-slate-200">450+ LeetCode Solved</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. About Me Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-indigo-400 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>About Me</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Aspiring Software Engineer & AI / DS Student
              </h2>
            </div>
            <Link
              to="/about"
              className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-400 hover:text-indigo-300"
            >
              <span>Full Profile Overview</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            I’m a B.Tech student specializing in Artificial Intelligence and Data Science with a strong interest in full-stack web development and problem solving. I enjoy building practical web applications and developing backend systems using technologies such as Node.js, Express.js, MongoDB, and REST APIs. I’m also consistently improving my Data Structures and Algorithms skills through problem solving and LeetCode.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60">
              <h4 className="text-xs font-mono uppercase text-indigo-400 mb-1">Education</h4>
              <p className="text-sm font-semibold text-white">B.Tech in AI & Data Science</p>
              <p className="text-xs text-slate-400">Galgotias College of Eng. & Tech.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60">
              <h4 className="text-xs font-mono uppercase text-indigo-400 mb-1">Primary Focus</h4>
              <p className="text-sm font-semibold text-white">Full-Stack & Backend Systems</p>
              <p className="text-xs text-slate-400">Node.js, Express, MongoDB, REST APIs</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60">
              <h4 className="text-xs font-mono uppercase text-indigo-400 mb-1">Problem Solving</h4>
              <p className="text-sm font-semibold text-white">450+ LeetCode (C++)</p>
              <p className="text-xs text-slate-400">Contest Rating 1710</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-indigo-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Project Showcase</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : featuredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400">
            <p>No featured projects found at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </section>

      {/* 4. Problem Solving & DSA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-indigo-500/30 shadow-2xl space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Competitive Problem Solving & DSA</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Problem Solving & Data Structures
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                I regularly practice Data Structures and Algorithms through LeetCode, focusing on problem-solving patterns and efficient C++ solutions.
              </p>
            </div>

            <a
              href="https://leetcode.com/u/shashwatpandey_21/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-xl shadow-amber-500/20 transition-all hover:scale-105 shrink-0"
            >
              <Code2 className="w-5 h-5" />
              <span>View LeetCode Profile</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* DSA Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/30 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">450+</p>
                <p className="text-xs font-medium text-slate-400">LeetCode Problems Solved</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-indigo-500/30 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-indigo-300">1710</p>
                <p className="text-xs font-medium text-slate-400">LeetCode Contest Rating</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <Binary className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-300">500+</p>
                <p className="text-xs font-medium text-slate-400">Problems Solved Across Platforms</p>
              </div>
            </div>
          </div>

          {/* Problem-Solving Topics */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Core Problem-Solving Areas (Primary Language: <span className="text-amber-300 font-bold">C++</span>)
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {dsaTopics.map((topic, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs font-mono text-slate-200 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{topic}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Technical Skills Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Technical Skills</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Programming Languages, Frameworks & Tools
            </h2>
          </div>
          <Link
            to="/skills"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>Explore All Skills Matrix</span>
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
            {skills.map((skill) => (
              <SkillBadge key={skill._id} skill={skill} />
            ))}
          </div>
        )}
      </section>

      {/* 6. Education Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-indigo-400 mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Education
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {educationList.map((edu) => (
            <div
              key={edu._id}
              className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 hover:border-slate-700 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-medium text-indigo-400">
                    {edu.institution}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 self-start sm:self-auto">
                  {edu.startYear} – {edu.endYear || 'Present'}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                Location: Greater Noida, Uttar Pradesh
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Contact / Internship collaboration call-to-action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900/60 via-slate-900 to-slate-900 border border-indigo-500/30 p-8 sm:p-12 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Looking for a Dedicated Full-Stack Developer?
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              I am open to discussions regarding Software Engineering internships, full-stack web development projects, and problem-solving collaborations.
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
              About Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
