import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  Wrench,
  Briefcase,
  Mail,
  GraduationCap,
  Plus,
  User,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Database,
  ExternalLink,
} from 'lucide-react';
import { messageService } from '../services/messageService';
import StatCard from '../components/StatCard';

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    featuredProjects: 0,
    totalSkills: 0,
    totalExperiences: 0,
    totalEducation: 0,
    totalMessages: 0,
    unreadMessages: 0,
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsRes, messagesRes] = await Promise.all([
          messageService.getDashboardStats(),
          messageService.getMessages(),
        ]);

        if (statsRes.success && statsRes.data) {
          setStats(statsRes.data);
        }
        if (messagesRes.success && messagesRes.data) {
          setRecentMessages(messagesRes.data.slice(0, 5));
        }
      } catch (err) {
        console.error('Error fetching admin dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm text-slate-400">
            Welcome to your centralized portfolio management console.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>MongoDB Connected & Active</span>
          </span>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Projects"
          count={stats.totalProjects}
          icon={FolderGit2}
          color="indigo"
          subtitle={`${stats.featuredProjects} marked as featured`}
        />
        <StatCard
          title="Dynamic Skills"
          count={stats.totalSkills}
          icon={Wrench}
          color="cyan"
          subtitle="Across 5 technical categories"
        />
        <StatCard
          title="Work Experience"
          count={stats.totalExperiences}
          icon={Briefcase}
          color="emerald"
          subtitle="Career timeline records"
        />
        <StatCard
          title="Contact Messages"
          count={stats.totalMessages}
          icon={Mail}
          color={stats.unreadMessages > 0 ? 'rose' : 'amber'}
          subtitle={`${stats.unreadMessages} unread inquiries`}
        />
      </div>

      {/* Quick Action Shortcuts */}
      <div className="space-y-3">
        <h2 className="text-sm font-mono uppercase tracking-wider text-slate-400 font-semibold">
          Quick Operations
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link
            to="/admin/projects"
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all flex flex-col items-center justify-center gap-2 text-center group"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-200">Add Project</span>
          </Link>

          <Link
            to="/admin/skills"
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/80 transition-all flex flex-col items-center justify-center gap-2 text-center group"
          >
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-200">Manage Skills</span>
          </Link>

          <Link
            to="/admin/profile"
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-violet-500/50 hover:bg-slate-800/80 transition-all flex flex-col items-center justify-center gap-2 text-center group"
          >
            <div className="w-9 h-9 rounded-lg bg-violet-500/10 text-violet-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <User className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-200">Edit Profile</span>
          </Link>

          <Link
            to="/admin/experience"
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all flex flex-col items-center justify-center gap-2 text-center group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-200">Add Experience</span>
          </Link>

          <Link
            to="/admin/education"
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/80 transition-all flex flex-col items-center justify-center gap-2 text-center group"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-200">Edit Education</span>
          </Link>

          <Link
            to="/admin/messages"
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-rose-500/50 hover:bg-slate-800/80 transition-all flex flex-col items-center justify-center gap-2 text-center group"
          >
            <div className="w-9 h-9 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-200">Inbox ({stats.unreadMessages})</span>
          </Link>
        </div>
      </div>

      {/* Recent Contact Messages Preview */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-indigo-400" />
            <h2 className="text-base font-bold text-white">Recent Inquiries & Messages</h2>
          </div>
          <Link
            to="/admin/messages"
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
          >
            View All ({stats.totalMessages}) →
          </Link>
        </div>

        {recentMessages.length === 0 ? (
          <p className="text-xs text-slate-500 py-4">No contact messages received yet.</p>
        ) : (
          <div className="divide-y divide-slate-800/80">
            {recentMessages.map((msg) => (
              <Link
                key={msg._id}
                to="/admin/messages"
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-800/40 px-2 rounded-xl transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${msg.isRead ? 'bg-slate-600' : 'bg-rose-500'}`} />
                    <span className="text-sm font-semibold text-slate-200">{msg.name}</span>
                    <span className="text-xs text-slate-400 font-mono">({msg.email})</span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">{msg.subject} — {msg.message}</p>
                </div>
                <span className="text-[11px] font-mono text-slate-500 shrink-0">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;
