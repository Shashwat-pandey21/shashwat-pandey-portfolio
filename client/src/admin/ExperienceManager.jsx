import React, { useEffect, useState } from 'react';
import { experienceService } from '../services/experienceService';
import { useToast } from '../context/ToastContext';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import {
  Briefcase,
  Plus,
  Pencil,
  Trash2,
  Calendar,
  Building,
  Loader2,
} from 'lucide-react';

const ExperienceManager = () => {
  const { toast } = useToast();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Delete state
  const [deletingExp, setDeletingExp] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [formData, setFormData] = useState({
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    description: '',
    technologies: '',
  });

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const res = await experienceService.getExperiences();
      if (res.success && res.data) {
        setExperiences(res.data);
      }
    } catch (err) {
      toast.error('Failed to load experience records: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const openCreateModal = () => {
    setEditingExperience(null);
    setFormData({
      company: '',
      role: '',
      startDate: '',
      endDate: 'Present',
      description: '',
      technologies: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (exp) => {
    setEditingExperience(exp);
    setFormData({
      company: exp.company,
      role: exp.role,
      startDate: exp.startDate,
      endDate: exp.endDate || 'Present',
      description: exp.description,
      technologies: Array.isArray(exp.technologies)
        ? exp.technologies.join(', ')
        : exp.technologies || '',
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.company.trim() || !formData.role.trim() || !formData.startDate.trim()) {
      toast.error('Company, Role, and Start Date are required.');
      return;
    }

    try {
      setIsSaving(true);
      if (editingExperience) {
        const res = await experienceService.updateExperience(
          editingExperience._id,
          formData
        );
        if (res.success) {
          toast.success('Experience record updated successfully!');
        }
      } else {
        const res = await experienceService.createExperience(formData);
        if (res.success) {
          toast.success('Experience record created successfully!');
        }
      }
      setIsModalOpen(false);
      fetchExperiences();
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingExp) return;

    try {
      setIsDeleting(true);
      const res = await experienceService.deleteExperience(deletingExp._id);
      if (res.success) {
        toast.success(`Role at "${deletingExp.company}" deleted successfully!`);
        setDeletingExp(null);
        fetchExperiences();
      }
    } catch (err) {
      toast.error(err.message || 'Failed to delete record');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Work Experience & Career History
          </h1>
          <p className="text-sm text-slate-400">
            Manage your employment milestones, roles, and engineering contributions.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Experience</span>
        </button>
      </div>

      {/* List */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[11px] font-mono tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Role & Company</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin text-indigo-500 mx-auto mb-2" />
                    Loading experiences...
                  </td>
                </tr>
              ) : experiences.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-slate-400">
                    No work experience records found.
                  </td>
                </tr>
              ) : (
                experiences.map((exp) => (
                  <tr key={exp._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-white">{exp.role}</p>
                      <p className="text-xs text-indigo-400 font-semibold mt-0.5">
                        {exp.company}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded bg-slate-800 text-xs font-mono text-slate-300 border border-slate-700">
                        {exp.startDate} — {exp.endDate || 'Present'}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-md">
                      <p className="text-xs text-slate-300 line-clamp-2">
                        {exp.description}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(exp)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                          title="Edit Experience"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingExp(exp)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete Experience"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingExperience ? `Edit Experience: ${editingExperience.company}` : 'Add Work Experience'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                Company Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Personal & Academic Projects"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                Role / Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g. Student Developer"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                Start Date <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                placeholder="e.g. Mar 2022"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                End Date (or 'Present')
              </label>
              <input
                type="text"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                placeholder="e.g. Present or Dec 2024"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
              Description & Key Contributions <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Architected microservices, scaled database instances, led feature development..."
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
              Technologies Used (comma separated)
            </label>
            <input
              type="text"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              placeholder="React, Node.js, Express, MongoDB, Docker, AWS"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800 border border-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
            >
              {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{editingExperience ? 'Update Record' : 'Save Experience'}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingExp}
        onClose={() => setDeletingExp(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Experience"
        message={`Are you sure you want to remove the record for "${deletingExp?.role}" at "${deletingExp?.company}"?`}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default ExperienceManager;
