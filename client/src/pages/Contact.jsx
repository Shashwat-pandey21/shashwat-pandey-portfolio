import React, { useState, useEffect } from 'react';
import { messageService } from '../services/messageService';
import { profileService } from '../services/profileService';
import { useToast } from '../context/ToastContext';
import {
  Mail,
  Send,
  User,
  MessageSquare,
  Sparkles,
  MapPin,
  Phone,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    profileService.getProfile()
      .then((res) => {
        if (res.success && res.data) setProfile(res.data);
      })
      .catch(() => {});
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address';
    } else {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please provide a valid email format';
      }
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please enter a message subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please type your message';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error('Please resolve the highlighted form errors before submitting');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await messageService.sendMessage(formData);

      if (res.success) {
        toast.success(res.message || 'Message sent successfully!');
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      }
    } catch (err) {
      toast.error(err.message || 'Failed to transmit message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5" />
          <span>Direct Inquiries</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Get In <span className="gradient-text">Touch</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
          Have an engineering opportunity, consulting inquiry, or technical challenge? Send a direct message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Col: Contact Info & Status */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Contact Information
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Messages submitted through this form are stored securely in MongoDB and forwarded directly to the admin management portal.
            </p>

            <div className="space-y-4 pt-2">
              {profile?.email && (
                <div className="flex items-start gap-3 text-sm text-slate-300">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block uppercase">Email</span>
                    <a href={`mailto:${profile.email}`} className="font-medium hover:text-white transition-colors">
                      {profile.email}
                    </a>
                  </div>
                </div>
              )}

              {profile?.phone && (
                <div className="flex items-start gap-3 text-sm text-slate-300">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block uppercase">Phone</span>
                    <span className="font-medium">{profile.phone}</span>
                  </div>
                </div>
              )}

              {profile?.location && (
                <div className="flex items-start gap-3 text-sm text-slate-300">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block uppercase">Location</span>
                    <span className="font-medium">{profile.location}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Typical response time: Within 24-48 business hours</span>
            </div>
          </div>
        </div>

        {/* Right Col: Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-2xl backdrop-blur-md">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4 animate-in fade-in">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Transmitted!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Your message has been safely persisted to the database and will be reviewed shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                      Your Name <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jane Doe"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-800/80 border text-sm text-slate-100 placeholder-slate-400 focus:outline-none transition-all ${
                          errors.name
                            ? 'border-rose-500/80 focus:border-rose-500'
                            : 'border-slate-700 focus:border-indigo-500'
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-800/80 border text-sm text-slate-100 placeholder-slate-400 focus:outline-none transition-all ${
                          errors.email
                            ? 'border-rose-500/80 focus:border-rose-500'
                            : 'border-slate-700 focus:border-indigo-500'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-2">
                  <label htmlFor="contact-subject" className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                    Subject <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Job Opportunity"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-800/80 border text-sm text-slate-100 placeholder-slate-400 focus:outline-none transition-all ${
                      errors.subject
                        ? 'border-rose-500/80 focus:border-rose-500'
                        : 'border-slate-700 focus:border-indigo-500'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.subject}</span>
                    </p>
                  )}
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                    Message Content <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows="5"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hello Ethan, I would love to connect regarding..."
                    className={`w-full px-4 py-3 rounded-xl bg-slate-800/80 border text-sm text-slate-100 placeholder-slate-400 focus:outline-none transition-all resize-none ${
                      errors.message
                        ? 'border-rose-500/80 focus:border-rose-500'
                        : 'border-slate-700 focus:border-indigo-500'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
