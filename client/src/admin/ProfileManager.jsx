import React, { useEffect, useState } from 'react';
import { profileService } from '../services/profileService';
import { useToast } from '../context/ToastContext';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  FileText,
  Image as ImageIcon,
  Save,
  Loader2,
  ExternalLink,
} from 'lucide-react';

const ProfileManager = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    profileImage: '',
    email: '',
    phone: '',
    location: '',
    github: '',
    linkedin: '',
    leetcode: '',
    twitter: '',
    resumeUrl: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await profileService.getProfile();
        if (res.success && res.data) {
          setFormData({
            name: res.data.name || '',
            title: res.data.title || '',
            bio: res.data.bio || '',
            profileImage: res.data.profileImage || '',
            email: res.data.email || '',
            phone: res.data.phone || '',
            location: res.data.location || '',
            github: res.data.github || '',
            linkedin: res.data.linkedin || '',
            leetcode: res.data.leetcode || '',
            twitter: res.data.twitter || '',
            resumeUrl: res.data.resumeUrl || '',
          });
        }
      } catch (err) {
        toast.error('Failed to load profile details: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Name and Email are required fields.');
      return;
    }

    try {
      setIsSaving(true);
      const res = await profileService.updateProfile(formData);
      if (res.success) {
        toast.success('Portfolio profile updated successfully!');
      }
    } catch (err) {
      toast.error('Failed to update profile: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mx-auto" />
        <p className="text-sm text-slate-400">Loading profile configuration...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Developer Profile Management
          </h1>
          <p className="text-sm text-slate-400">
            Configure your personal biography, contact coordinates, social channels, and public avatar.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Identity */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h2 className="text-sm font-mono uppercase tracking-wider text-indigo-400 font-semibold flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>Core Identity & Bio</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">
                Full Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">
                Professional Title / Headline <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">
              Biography & Summary <span className="text-rose-400">*</span>
            </label>
            <textarea
              name="bio"
              rows="4"
              value={formData.bio}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
              <span>Profile Image URL</span>
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="url"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
              {formData.profileImage && (
                <img
                  src={formData.profileImage}
                  alt="Preview"
                  className="w-10 h-10 rounded-xl object-cover border border-slate-700 shrink-0"
                />
              )}
            </div>
          </div>
        </div>

        {/* Contact Coordinates */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h2 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>Contact & Location</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">
                Primary Contact Email <span className="text-rose-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">
                Location / Timezone
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Social Links & Resume */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h2 className="text-sm font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-2">
            <Github className="w-4 h-4" />
            <span>Social Handles & Resume</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-slate-400" />
                <span>GitHub URL</span>
              </label>
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="https://github.com/username"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-indigo-400" />
                <span>LinkedIn URL</span>
              </label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-amber-400" />
                <span>LeetCode URL</span>
              </label>
              <input
                type="url"
                name="leetcode"
                value={formData.leetcode}
                onChange={handleChange}
                placeholder="https://leetcode.com/u/username"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Twitter className="w-3.5 h-3.5 text-cyan-400" />
                <span>Twitter / X URL</span>
              </label>
              <input
                type="url"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                placeholder="https://twitter.com/username"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>Resume Document URL</span>
              </label>
              <input
                type="url"
                name="resumeUrl"
                value={formData.resumeUrl}
                onChange={handleChange}
                placeholder="https://example.com/resume.pdf"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 transition-all disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Profile...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileManager;
