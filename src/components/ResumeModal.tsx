import React from 'react';
import { X, Printer, Download, Mail, Github, Linkedin, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useToast } from './Toast';
import { KaggleIcon, DiscordIcon, FacebookIcon, InstagramIcon } from './SocialIcons';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCv = () => {
    // Generate clean text CV download and open print dialog for PDF saving
    const md = `# CURRICULUM VITAE
# ${portfolioData.personal.name}
${portfolioData.personal.title}
Institution: ${portfolioData.education[0].institution} (${portfolioData.education[0].period})
Location: ${portfolioData.personal.location} | Email: ${portfolioData.personal.email}
GitHub: ${portfolioData.personal.github} | LinkedIn: ${portfolioData.personal.linkedin}

===================================================================
1. EDUCATION & ACADEMIC STANDING
===================================================================
Degree: ${portfolioData.education[0].degree}
Institution: ${portfolioData.education[0].institution} (${portfolioData.education[0].period})
Location: ${portfolioData.education[0].location}

Relevant Coursework:
${portfolioData.education[0].relevantCoursework.map((c) => `  * ${c}`).join('\n')}

Academic Achievements:
${portfolioData.education[0].academicAchievements.map((a) => `  * ${a}`).join('\n')}

===================================================================
2. FEATURED RESEARCH & METHODOLOGY
===================================================================
Title: ${portfolioData.featuredResearchPlaceholder.title} (${portfolioData.featuredResearchPlaceholder.year})
Category: ${portfolioData.featuredResearchPlaceholder.category}
ArXiv ID: ${portfolioData.featuredResearchPlaceholder.arxivId}
Key Results: ${portfolioData.featuredResearchPlaceholder.results}

===================================================================
3. PUBLICATIONS & PREPRINTS
===================================================================
${portfolioData.academicPublications.map((p) => `- "${p.title}"\n  Venue: ${p.venue} (${p.date})\n  Authors: ${p.authors.join(', ')}\n  Abstract: ${p.abstract}`).join('\n\n')}

===================================================================
4. CORE COMPETENCIES & TECHNICAL PROFICIENCIES
===================================================================
- Deep Learning & NLP: PyTorch, Hugging Face Transformers, LoRA, QLoRA, AdaLoRA, Quantization (NF4, 8-bit), Tokenizers
- Programming: Python, C/C++, TypeScript, SQL, Bash
- Environments: Linux (Ubuntu), Git/GitHub, CUDA, Jupyter, Docker
===================================================================
`;
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Abid_Sultan_Nishan_Curriculum_Vitae.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast({
      message: 'CV downloaded! You can also click "Save as PDF" in the print preview.',
      type: 'success',
    });
    setTimeout(() => {
      window.print();
    }, 450);
  };

  const handleCopyMarkdown = () => {
    const md = `# ${portfolioData.personal.name}
**${portfolioData.personal.title}**
${portfolioData.personal.location} | ${portfolioData.personal.email}
GitHub: ${portfolioData.personal.github} | LinkedIn: ${portfolioData.personal.linkedin}
Kaggle: ${portfolioData.personal.kaggle} | Discord: ${portfolioData.personal.discord}

## EDUCATION
- **${portfolioData.education[0].degree}**
  ${portfolioData.education[0].institution} (${portfolioData.education[0].period})
  Location: ${portfolioData.education[0].location}

## FEATURED RESEARCH
- **${portfolioData.featuredResearchPlaceholder.title}** (${portfolioData.featuredResearchPlaceholder.year})
  Category: ${portfolioData.featuredResearchPlaceholder.category}
  ArXiv: ${portfolioData.featuredResearchPlaceholder.arxivId}
  Key Results: ${portfolioData.featuredResearchPlaceholder.results}

## PUBLICATIONS & PREPRINTS
${portfolioData.academicPublications.map((p) => `- "${p.title}" - ${p.venue} (${p.date})`).join('\n')}

## RESEARCH FOCUS & METHODOLOGIES
- Natural Language Processing, Multilingual Representation Learning
- Large Language Models, Tokenization & Parameter-Efficient Fine-Tuning (LoRA / QLoRA / AdaLoRA)
- Deep Learning Optimization, Attention Mechanisms, and Evaluation

## TECHNICAL SKILLS
- Programming: Python, C++, JavaScript, SQL
- Deep Learning & ML: PyTorch, scikit-learn, NumPy, Pandas, TensorFlow
- NLP & Tools: Transformers, Hugging Face, Tokenizers, Git, Linux, Docker, Jupyter
`;
    navigator.clipboard.writeText(md);
    showToast({ message: 'Resume Markdown copied to clipboard!', type: 'success' });
  };

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
    >
      <div
        className="card-premium relative w-full max-w-4xl max-h-[92vh] max-h-[92dvh] flex flex-col text-slate-800 dark:text-slate-100 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Action Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-3.5 sm:px-6 py-3.5 border-b border-slate-200 dark:border-white/[0.08] bg-slate-50/95 dark:bg-[#070B14]/95">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#A855F7]/20 to-[#38BDF8]/20 text-[#38BDF8] font-mono font-bold text-xs sm:text-sm border border-white/10">
              ASN
            </div>
            <div className="min-w-0">
              <h2 id="resume-title" className="text-xs sm:text-base font-semibold text-slate-900 dark:text-white truncate max-w-[160px] sm:max-w-xs md:max-w-md">
                Curriculum Vitae · {portfolioData.personal.name}
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-[#94A3B8] font-mono truncate">
                Academic &amp; Research Profile · Uttara University
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleDownloadCv}
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 min-h-[38px] sm:min-h-[40px] text-xs font-mono font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#0284C7] hover:brightness-110 active:scale-95 rounded-xl transition-all shadow-xs cursor-pointer touch-manipulation"
              title="Download CV Document & Open Print to PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download CV / PDF</span>
              <span className="sm:hidden">PDF / CV</span>
            </button>
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 min-h-[40px] text-xs font-mono text-slate-700 dark:text-[#94A3B8] bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] hover:text-slate-900 dark:hover:text-white active:scale-95 rounded-xl border border-slate-200 dark:border-white/10 transition-colors cursor-pointer touch-manipulation"
              title="Print CV"
            >
              <Printer className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Print</span>
            </button>
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 min-h-[38px] sm:min-h-[40px] text-xs font-mono text-slate-700 dark:text-[#94A3B8] bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] hover:text-slate-900 dark:hover:text-white active:scale-95 rounded-xl border border-slate-200 dark:border-white/10 transition-colors cursor-pointer touch-manipulation"
              title="Copy Markdown"
            >
              <Download className="w-3.5 h-3.5 text-[#A855F7]" />
              <span className="hidden sm:inline">Copy Text</span>
              <span className="sm:hidden">Copy</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/[0.06] active:scale-95 transition-colors cursor-pointer touch-manipulation"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable CV Document */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-10 space-y-8 bg-slate-50 dark:bg-[#070B14] text-slate-800 dark:text-slate-200 print:bg-white print:text-black">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-b border-slate-200 dark:border-white/10 pb-6 print:border-black">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white print:text-black">
                {portfolioData.personal.name}
              </h1>
              <p className="text-[#38BDF8] font-mono text-sm mt-1 print:text-slate-800">
                {portfolioData.personal.title}
              </p>
              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-mono text-slate-500 dark:text-[#94A3B8] mt-3 print:text-slate-600">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#38BDF8] print:hidden" />
                  {portfolioData.personal.location}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-[#A855F7] print:hidden" />
                  {portfolioData.personal.email}
                </span>
                <span>·</span>
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#38BDF8] flex items-center gap-1"
                >
                  <Github className="w-3 h-3 print:hidden" />
                  github.com/abid-sultan-nishan
                </a>
                <span>·</span>
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#38BDF8] flex items-center gap-1"
                >
                  <Linkedin className="w-3 h-3 print:hidden" />
                  linkedin.com/in/abid-sultan-nishan
                </a>
                <span>·</span>
                <a
                  href={portfolioData.personal.kaggle}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#38BDF8] flex items-center gap-1"
                >
                  <KaggleIcon className="w-3 h-3 text-[#38BDF8] print:hidden" />
                  kaggle.com/ariyanabid
                </a>
                <span>·</span>
                <a
                  href={portfolioData.personal.discord}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#A855F7] flex items-center gap-1"
                >
                  <DiscordIcon className="w-3 h-3 text-[#A855F7] print:hidden" />
                  discord
                </a>
                <span>·</span>
                <a
                  href={portfolioData.personal.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#38BDF8] flex items-center gap-1"
                >
                  <FacebookIcon className="w-3 h-3 text-[#38BDF8] print:hidden" />
                  facebook.com/abidsultan.nishan
                </a>
                <span>·</span>
                <a
                  href={portfolioData.personal.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-pink-400 flex items-center gap-1"
                >
                  <InstagramIcon className="w-3 h-3 text-pink-400 print:hidden" />
                  instagram
                </a>
              </div>
            </div>

            <div className="shrink-0 self-start sm:self-center">
              <img
                src={portfolioData.personal.avatarUrl}
                alt={portfolioData.personal.name}
                className="w-20 h-24 object-cover object-top rounded-2xl border border-slate-300 dark:border-white/15 shadow-md print:w-16 print:h-20"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('passport-size-picture.jpg')) {
                    target.src = '/assets/passport-size-picture.jpg';
                  } else if (!target.src.includes('abid-sultan-nishan.jpg')) {
                    target.src = '/abid-sultan-nishan.jpg';
                  }
                }}
              />
            </div>
          </div>

          {/* Research Summary */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#A855F7] dark:text-[#C084FC] font-semibold mb-2 print:text-black">
              Statement &amp; Objective
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 print:text-slate-800">
              {portfolioData.personal.bioParagraph1}
            </p>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-[#94A3B8] mt-2 print:text-slate-800">
              {portfolioData.personal.bioParagraph2}
            </p>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#38BDF8] font-semibold mb-3 print:text-black">
              Education
            </h3>
            <div className="card-subtle p-5 print:border-slate-300 print:bg-slate-50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="font-semibold text-slate-900 dark:text-white print:text-black">
                  {portfolioData.education[0].degree}
                </div>
                <div className="text-xs font-mono text-[#A855F7] dark:text-[#C084FC] font-medium print:text-slate-600">
                  {portfolioData.education[0].period}
                </div>
              </div>
              <div className="text-sm text-slate-600 dark:text-[#94A3B8] mt-0.5 print:text-slate-700">
                {portfolioData.education[0].institution} · {portfolioData.education[0].location}
              </div>

              <div className="mt-3 text-xs text-slate-700 dark:text-slate-300 print:text-slate-800 space-y-1.5 font-mono">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white print:text-black">
                    Key Coursework:{' '}
                  </span>
                  <span className="text-slate-600 dark:text-[#94A3B8] print:text-slate-600">
                    {portfolioData.education[0].relevantCoursework.join(' · ')}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white print:text-black">
                    Achievements &amp; Notes:{' '}
                  </span>
                  <span className="text-slate-600 dark:text-[#94A3B8] print:text-slate-600">
                    {portfolioData.education[0].academicAchievements.join(' ')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Research Directions */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#38BDF8] font-semibold mb-3 print:text-black">
              Research Directions &amp; Technical Competencies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {portfolioData.skills.map((cat, idx) => (
                <div
                  key={idx}
                  className="card-subtle p-4 print:border-slate-300 print:bg-slate-50"
                >
                  <div className="font-medium text-slate-900 dark:text-white print:text-black mb-2 flex items-center justify-between">
                    <span>{cat.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs font-mono text-slate-700 dark:text-[#94A3B8] bg-slate-100 dark:bg-white/[0.03] px-2.5 py-0.5 rounded-lg border border-slate-200 dark:border-white/10 print:bg-slate-200 print:text-black"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Research in CV */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#A855F7] dark:text-[#C084FC] font-semibold mb-2 print:text-black">
              Featured Research Study &amp; Preprints
            </h3>
            <div className="card-subtle p-5 print:border-slate-300 print:bg-slate-50 space-y-2 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-bold text-slate-900 dark:text-white print:text-black">
                  {portfolioData.featuredResearchPlaceholder.title}
                </span>
                <span className="font-mono text-[#38BDF8] print:text-slate-700">
                  {portfolioData.featuredResearchPlaceholder.arxivId} ({portfolioData.featuredResearchPlaceholder.year})
                </span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 print:text-slate-700 leading-relaxed font-mono">
                {portfolioData.featuredResearchPlaceholder.summary}
              </p>
              <div className="pt-1 text-[11px] font-mono text-emerald-400 print:text-emerald-800">
                Primary Result: {portfolioData.featuredResearchPlaceholder.results}
              </div>
            </div>

            {/* Academic Publications List */}
            <div className="mt-3 space-y-2">
              {portfolioData.academicPublications.map((pub) => (
                <div
                  key={pub.id}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] text-xs shadow-xs dark:shadow-none print:border-slate-200"
                >
                  <div className="flex items-center justify-between text-slate-900 dark:text-white print:text-black font-semibold">
                    <span>{pub.title}</span>
                    <span className="font-mono text-[#38BDF8] text-[11px] print:text-slate-600">{pub.category}</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 dark:text-[#94A3B8] print:text-slate-600 mt-0.5">
                    {pub.venue} · {pub.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Work Placeholders */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#38BDF8] font-semibold mb-2 print:text-black">
              Research Exploration &amp; Implementations
            </h3>
            <div className="space-y-2">
              {portfolioData.projects.slice(0, 3).map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] text-xs shadow-xs dark:shadow-none"
                >
                  <div className="flex items-center justify-between text-slate-900 dark:text-white font-semibold">
                    <span>{p.title}</span>
                    <span className="font-mono text-slate-500 dark:text-[#94A3B8] text-[11px]">{p.category}</span>
                  </div>
                  <p className="text-slate-600 dark:text-[#94A3B8] mt-1 font-mono">{p.shortDescription}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="px-5 sm:px-6 py-4 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50/95 dark:bg-[#070B14]/95 text-xs text-slate-500 dark:text-[#94A3B8] font-mono flex items-center justify-between">
          <span>Official CV draft · Updated 2026</span>
          <button
            onClick={onClose}
            className="text-[#38BDF8] hover:text-[#38BDF8]/80 font-medium cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
