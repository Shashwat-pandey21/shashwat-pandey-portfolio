import React, { useEffect, useState } from 'react';
import { messageService } from '../services/messageService';
import { useToast } from '../context/ToastContext';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import {
  Mail,
  MailOpen,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  User,
  Search,
  Loader2,
  Calendar,
  Sparkles,
} from 'lucide-react';

const MessagesManager = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRead, setFilterRead] = useState('All');

  // View modal state
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Delete state
  const [deletingMessage, setDeletingMessage] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await messageService.getMessages();
      if (res.success && res.data) {
        setMessages(res.data);
        setUnreadCount(res.unreadCount || 0);
      }
    } catch (err) {
      toast.error('Failed to load messages: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleOpenMessage = async (msg) => {
    setSelectedMessage(msg);
    // If unread, mark as read automatically
    if (!msg.isRead) {
      try {
        await messageService.toggleReadStatus(msg._id, true);
        setMessages((prev) =>
          prev.map((m) => (m._id === msg._id ? { ...m, isRead: true } : m))
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      } catch (err) {
        // silent fail
      }
    }
  };

  const handleToggleRead = async (e, msg) => {
    e.stopPropagation();
    try {
      const res = await messageService.toggleReadStatus(msg._id);
      if (res.success && res.data) {
        const updated = res.data;
        setMessages((prev) =>
          prev.map((m) => (m._id === msg._id ? updated : m))
        );
        setUnreadCount((prev) =>
          updated.isRead ? Math.max(0, prev - 1) : prev + 1
        );
        toast.info(
          updated.isRead ? 'Marked as read' : 'Marked as unread'
        );
      }
    } catch (err) {
      toast.error('Failed to toggle status: ' + err.message);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingMessage) return;

    try {
      setIsDeleting(true);
      const res = await messageService.deleteMessage(deletingMessage._id);
      if (res.success) {
        toast.success('Message deleted successfully!');
        if (selectedMessage?._id === deletingMessage._id) {
          setSelectedMessage(null);
        }
        setDeletingMessage(null);
        fetchMessages();
      }
    } catch (err) {
      toast.error(err.message || 'Failed to delete message');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredMessages = messages.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterRead === 'All'
        ? true
        : filterRead === 'Unread'
        ? !m.isRead
        : m.isRead;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Contact Messages & Inquiries
          </h1>
          <p className="text-sm text-slate-400">
            View, review, filter, and manage inquiries transmitted from the public contact form.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300">
            Total: {messages.length}
          </span>
          {unreadCount > 0 && (
            <span className="px-3 py-1.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-xs font-mono font-bold text-rose-300">
              {unreadCount} Unread
            </span>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by sender, email, subject, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {['All', 'Unread', 'Read'].map((filter) => (
            <button
              key={filter}
              onClick={() => setFilterRead(filter)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                filterRead === filter
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[11px] font-mono tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Sender</th>
                <th className="px-6 py-4">Subject & Message</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin text-indigo-500 mx-auto mb-2" />
                    Loading messages...
                  </td>
                </tr>
              ) : filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                    No contact messages found.
                  </td>
                </tr>
              ) : (
                filteredMessages.map((msg) => (
                  <tr
                    key={msg._id}
                    onClick={() => handleOpenMessage(msg)}
                    className={`cursor-pointer transition-colors ${
                      !msg.isRead
                        ? 'bg-indigo-950/20 hover:bg-indigo-900/30 font-medium'
                        : 'hover:bg-slate-800/40 text-slate-400'
                    }`}
                  >
                    <td className="px-6 py-4 w-12">
                      <button
                        onClick={(e) => handleToggleRead(e, msg)}
                        title={msg.isRead ? 'Mark as unread' : 'Mark as read'}
                        className="p-1 rounded-lg hover:bg-slate-800 transition-colors"
                      >
                        {msg.isRead ? (
                          <MailOpen className="w-4 h-4 text-slate-500" />
                        ) : (
                          <Mail className="w-4 h-4 text-indigo-400" />
                        )}
                      </button>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className={`text-sm ${!msg.isRead ? 'text-white font-bold' : 'text-slate-200'}`}>
                        {msg.name}
                      </p>
                      <p className="text-xs text-slate-400 font-mono">{msg.email}</p>
                    </td>

                    <td className="px-6 py-4 max-w-md">
                      <p className={`text-sm ${!msg.isRead ? 'text-indigo-200 font-semibold' : 'text-slate-300'} line-clamp-1`}>
                        {msg.subject}
                      </p>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                        {msg.message}
                      </p>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-slate-400">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenMessage(msg);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                          title="Open Message"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeletingMessage(msg);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete Message"
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

      {/* Message Details Modal */}
      {selectedMessage && (
        <Modal
          isOpen={!!selectedMessage}
          onClose={() => setSelectedMessage(null)}
          title="Message Details"
          maxWidth="max-w-2xl"
        >
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-xl bg-slate-800/80 border border-slate-700">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-400" />
                  <span className="font-bold text-white text-base">
                    {selectedMessage.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono">
                  <Mail className="w-3.5 h-3.5" />
                  <a href={`mailto:${selectedMessage.email}`} className="hover:underline">
                    {selectedMessage.email}
                  </a>
                </div>
              </div>

              <div className="text-right text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{new Date(selectedMessage.createdAt).toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Subject
              </span>
              <h3 className="text-lg font-bold text-slate-100">
                {selectedMessage.subject}
              </h3>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Message Body
              </span>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                {selectedMessage.message}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setDeletingMessage(selectedMessage)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Message</span>
              </button>

              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                    selectedMessage.subject
                  )}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>Reply via Email</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800 border border-slate-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingMessage}
        onClose={() => setDeletingMessage(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Message"
        message={`Are you sure you want to permanently delete the inquiry from "${deletingMessage?.name}"?`}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default MessagesManager;
