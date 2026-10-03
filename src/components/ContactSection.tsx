import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Mail, MapPin, Github, Linkedin, Copy, Send, CheckCircle2, AlertCircle, ArrowUpRight, MessageSquare } from 'lucide-react';
import { useToast } from './Toast';
import { KaggleIcon, DiscordIcon, FacebookIcon, InstagramIcon } from './SocialIcons';
import { ScrollReveal } from './ScrollReveal';

export const ContactSection: React.FC = () => {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    showToast({
      message: 'Email address copied to clipboard: ' + portfolioData.personal.email,
      type: 'success',
    });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please provide a subject.';
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please enter a message of at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Prepare direct mailto link to guarantee real communication delivery
    const mailtoUrl = `mailto:${portfolioData.personal.email}?subject=${encodeURIComponent(
      `[Research Inquiry] ${formData.subject}`
    )}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
    )}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast({
        message: 'Opening your default mail client to dispatch message to Abid Sultan Nishan.',
        type: 'success',
      });
      window.location.href = mailtoUrl;
    }, 400);
  };

  return (
    <section id="contact" className="fluid-section-py px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <ScrollReveal direction="up" distance={20} className="max-w-3xl mb-10 sm:mb-12">
        <div className="font-mono text-xs font-semibold text-[#A855F7] dark:text-[#C084FC] uppercase tracking-wider mb-2 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7]" />
          <span>Collaboration &amp; Inquiries</span>
        </div>
        <h2 className="fluid-h2 font-bold tracking-tight text-slate-900 dark:text-white mb-4">
          Let’s connect and explore intelligent systems.
        </h2>
        <p className="fluid-body-lg text-slate-600 dark:text-[#94A3B8] leading-relaxed font-normal">
          I am open to learning opportunities, research discussions, technical collaborations, and meaningful conversations about NLP, LLMs, deep learning, and applied machine learning.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start w-full">
        {/* Contact Info & Verified Channels */}
        <div className="lg:col-span-5 space-y-6 container-card">
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <div className="card-premium p-6 sm:p-7 space-y-6">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] font-semibold border-b border-slate-200 dark:border-white/10 pb-3">
                Direct Contact Channels
              </h3>

            <div className="space-y-4">
              {/* Email item */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-[#38BDF8] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-mono text-slate-500 dark:text-[#94A3B8]">Primary Email</div>
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-200 truncate mt-0.5">
                    {portfolioData.personal.email}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={handleCopyEmail}
                      className="inline-flex min-h-[40px] items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-[#38BDF8] hover:text-[#7DD3FC] hover:bg-white/[0.04] rounded-lg transition-colors cursor-pointer active:scale-95"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Address</span>
                    </button>
                    <span className="text-slate-300 dark:text-slate-700">·</span>
                    <a
                      href={`mailto:${portfolioData.personal.email}`}
                      className="inline-flex min-h-[40px] items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-[#A855F7] hover:text-purple-300 hover:bg-white/[0.04] rounded-lg transition-colors active:scale-95"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Mail</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Location item */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-[#A855F7] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 dark:text-[#94A3B8]">Location</div>
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-200 mt-0.5">
                    {portfolioData.personal.location}
                  </div>
                  <div className="text-xs text-slate-400 dark:text-slate-500 font-mono mt-0.5">
                    Timezone: GMT+6 (Bangladesh Standard Time)
                  </div>
                </div>
              </div>

              {/* GitHub Link */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 shrink-0">
                  <Github className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-mono text-slate-500 dark:text-[#94A3B8]">GitHub Code &amp; Repos</div>
                  <a
                    href={portfolioData.personal.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-[#38BDF8] hover:text-[#7DD3FC] transition-colors mt-0.5 truncate"
                  >
                    <span>github.com/abid-sultan-nishan</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </div>

              {/* LinkedIn Link */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-[#38BDF8] shrink-0">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-mono text-slate-500 dark:text-[#94A3B8]">Professional Network</div>
                  <a
                    href={portfolioData.personal.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-[#38BDF8] hover:text-[#7DD3FC] transition-colors mt-0.5 truncate"
                  >
                    <span>linkedin.com/in/abid-sultan-nishan</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </div>

              {/* Kaggle Link */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-[#38BDF8] shrink-0">
                  <KaggleIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-mono text-slate-500 dark:text-[#94A3B8]">Kaggle (ML &amp; Datasets)</div>
                  <a
                    href={portfolioData.personal.kaggle}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-[#38BDF8] hover:text-[#7DD3FC] transition-colors mt-0.5 truncate"
                  >
                    <span>kaggle.com/ariyanabid</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </div>

              {/* Discord Link */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-[#A855F7] shrink-0">
                  <DiscordIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-mono text-slate-500 dark:text-[#94A3B8]">Discord Profile</div>
                  <a
                    href={portfolioData.personal.discord}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-[#A855F7] hover:text-purple-300 transition-colors mt-0.5 truncate"
                  >
                    <span>discord.com/users/1209157823989293107</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </div>

              {/* Facebook Link */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-[#38BDF8] shrink-0">
                  <FacebookIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-mono text-slate-500 dark:text-[#94A3B8]">Facebook Profile</div>
                  <a
                    href={portfolioData.personal.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-[#38BDF8] hover:text-[#7DD3FC] transition-colors mt-0.5 truncate"
                  >
                    <span>facebook.com/abidsultan.nishan</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </div>

              {/* Instagram Link */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-pink-500 shrink-0">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-mono text-slate-500 dark:text-[#94A3B8]">Instagram Profile</div>
                  <a
                    href={portfolioData.personal.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-pink-400 hover:text-pink-300 transition-colors mt-0.5 truncate"
                  >
                    <span>instagram.com/abid_sultan_nishan</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} duration={0.6} delay={0.1}>
            <div className="card-subtle p-4 sm:p-5 text-xs font-mono text-slate-600 dark:text-[#94A3B8]">
              <span className="text-slate-900 dark:text-white font-semibold block mb-1">
                Academic &amp; Research Inquiries
              </span>
              <p className="text-[11px] leading-relaxed">
                For research supervision, paper collaborations, or discussions on language model adaptation, direct email is preferred.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Validated Contact Form */}
        <ScrollReveal direction="up" distance={24} duration={0.6} delay={0.15} className="lg:col-span-7">
          <div className="card-premium p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="w-4 h-4 text-[#A855F7]" />
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">
                Send a Message
              </h3>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-white dark:bg-white/[0.03] border border-emerald-400/40 text-center space-y-3">
                <CheckCircle2 className="w-9 h-9 text-[#34D399] mx-auto" />
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Message Dispatched to Email Client
                </h4>
                <p className="text-xs font-mono text-slate-600 dark:text-[#94A3B8] max-w-md mx-auto">
                  Your email client has been prepared with your inquiry. Once sent, I will get back to you promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-mono text-[#38BDF8] hover:underline cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-600 dark:text-[#94A3B8] mb-1.5">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border text-base sm:text-xs font-mono bg-white dark:bg-white/[0.03] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none transition-all touch-manipulation ${
                        errors.name
                          ? 'border-rose-500/80 focus:border-rose-500'
                          : 'border-slate-200 dark:border-white/10 focus:border-[#38BDF8] focus:shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                      }`}
                    />
                    {errors.name && (
                      <span className="text-[11px] text-rose-500 font-mono flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-600 dark:text-[#94A3B8] mb-1.5">
                      Your Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. alex@institution.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border text-base sm:text-xs font-mono bg-white dark:bg-white/[0.03] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none transition-all touch-manipulation ${
                        errors.email
                          ? 'border-rose-500/80 focus:border-rose-500'
                          : 'border-slate-200 dark:border-white/10 focus:border-[#38BDF8] focus:shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[11px] text-rose-500 font-mono flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-600 dark:text-[#94A3B8] mb-1.5">
                    Subject / Discussion Topic <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Research inquiry on Bengali LLM evaluation"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border text-base sm:text-xs font-mono bg-white dark:bg-white/[0.03] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none transition-all touch-manipulation ${
                      errors.subject
                        ? 'border-rose-500/80 focus:border-rose-500'
                        : 'border-slate-200 dark:border-white/10 focus:border-[#38BDF8] focus:shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                    }`}
                  />
                  {errors.subject && (
                    <span className="text-[11px] text-rose-500 font-mono flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.subject}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-600 dark:text-[#94A3B8] mb-1.5">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Write your research questions, potential collaboration ideas, or inquiries..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-base sm:text-xs font-mono bg-white dark:bg-white/[0.03] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none transition-all touch-manipulation ${
                      errors.message
                        ? 'border-rose-500/80 focus:border-rose-500'
                        : 'border-slate-200 dark:border-white/10 focus:border-[#38BDF8] focus:shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-[11px] text-rose-500 font-mono flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#A855F7] via-[#8B5CF6] to-[#7C3AED] hover:from-[#B46BF8] hover:to-[#6D28D9] active:scale-[0.98] rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.65)] hover:scale-[1.01] cursor-pointer disabled:opacity-50 border border-white/20 touch-manipulation"
                >
                  <Send className="w-4 h-4 text-cyan-200" />
                  <span>{isSubmitting ? 'Preparing Transmission...' : 'Transmit Message (Mailto)'}</span>
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
