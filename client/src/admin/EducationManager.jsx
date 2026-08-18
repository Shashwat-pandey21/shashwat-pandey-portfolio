import React, { useEffect, useState } from 'react';
import { educationService } from '../services/educationService';
import { useToast } from '../context/ToastContext';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import {
  GraduationCap,
  Plus,
  Pencil,
  Trash2,
  Building,
  Award,
  Loader2,
} from 'lucide-react';

const EducationManager = () => {
  const { toast } = useToast();
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Delete state
  const [deletingEdu, setDeletingEdu] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    field: '',
    startYear: '',
    endYear: '',
    grade: '',
    description: '',
  });

  const fetchEducation = async () => {
    try {
      setLoading(true);
      const res = await educationService.getEducation();
      if (res.success && res.data) {
        setEducation(res.data);
      }
    } catch (err) {
      toast.error('Failed to load education entries: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const openCreateModal = () => {
    setEditingEdu(null);
    setFormData({
      institution: '',
      degree: '',
      field: '',
      startYear: '',
      endYear: '',
      grade: '',
      description: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (edu) => {
    setEditingEdu(edu);
    setFormData({
      institution: edu.institution,
      degree: edu.degree,
      field: edu.field,
      startYear: edu.startYear,
      endYear: edu.endYear || '',
      grade: edu.grade || '',
      description: edu.description || '',
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.institution.trim() || !formData.degree.trim() || !formData.field.trim() || !formData.startYear.trim()) {
      toast.error('Institution, Degree, Field, and Start Year are required.');
      return;
    }

    try {
      setIsSaving(true);
      if (editingEdu) {
        const res = await educationService.updateEducation(editingEdu._id, formData);
        if (res.success) {
          toast.success('Education credential updated successfully!');
        }
      } else {
        const res = await educationService.createEducation(formData);
        if (res.success) {
          toast.success('Education credential added successfully!');
        }
      }
      setIsModalOpen(false);
      fetchEducation();
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingEdu) return;

    try {
      setIsDeleting(true);
      const res = await educationService.deleteEducation(deletingEdu._id);
      if (res.success) {
        toast.success(`Record from "${deletingEdu.institution}" deleted!`);
        setDeletingEdu(null);
        fetchEducation();
      }
    } catch (err) {
      toast.error(err.message || 'Failed to delete education record');
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
            Education & Academic Background
          </h1>
          <p className="text-sm text-slate-400">
            Manage your degrees, certifications, institutions, and academic honors.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Academic Record</span>
        </button>
      </div>

      {/* List */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[11px] font-mono tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Degree & Field</th>
                <th className="px-6 py-4">Institution</th>
                <th className="px-6 py-4">Period</th>
                <th className="px-6 py-4">Grade / Honor</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin text-indigo-500 mx-auto mb-2" />
                    Loading education...
                  </td>
                </tr>
              ) : education.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                    No education records found.
                  </td>
                </tr>
              ) : (
                education.map((edu) => (
                  <tr key={edu._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-white">{edu.degree}</p>
                      <p className="text-xs text-slate-400">{edu.field}</p>
                    </td>
                    <td className="px-6 py-4 font-medium text-cyan-400">
                      {edu.institution}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded bg-slate-800 text-xs font-mono text-slate-300 border border-slate-700">
                        {edu.startYear} — {edu.endYear || 'Present'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-emerald-400">
                      {edu.grade || '—'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(edu)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingEdu(edu)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete"
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
        title={editingEdu ? `Edit Academic Record: ${editingEdu.institution}` : 'Add Academic Record'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
              Institution / University <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              placeholder="e.g. University of California, Berkeley"
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                Degree <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                placeholder="e.g. Bachelor of Science (B.S.)"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                Field of Study <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.field}
                onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                placeholder="e.g. Computer Science"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                Start Year <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.startYear}
                onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
                placeholder="e.g. 2018"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                End Year
              </label>
              <input
                type="text"
                value={formData.endYear}
                onChange={(e) => setFormData({ ...formData, endYear: e.target.value })}
                placeholder="e.g. 2022 or Present"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                Grade / Honors
              </label>
              <input
                type="text"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                placeholder="e.g. 3.9 GPA / Honors"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
              Description & Coursework
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Specialized in Algorithms, Distributed Networks, HCI..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 resize-none"
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
              <span>{editingEdu ? 'Update Record' : 'Save Record'}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingEdu}
        onClose={() => setDeletingEdu(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Education Record"
        message={`Are you sure you want to remove the record for "${deletingEdu?.degree}" at "${deletingEdu?.institution}"?`}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default EducationManager;
