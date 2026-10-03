# Abid Sultan Nishan · Research Portfolio Website

A personal research portfolio designed for **Abid Sultan Nishan**, an **NLP, LLM & Deep Learning Researcher** and CSE Undergraduate at **Uttara University** (2024–2027).

---

## Architecture Overview

All personal data, research areas, projects, skills, education details, and contact configurations are maintained in a single centralized TypeScript file:

```
src/data/portfolioData.ts
```

This architecture ensures that updating any information never requires digging through UI markup.

---

## Customization Guide

### 1. Changing Your Name, Title, Bio, & Social Links

Open `src/data/portfolioData.ts` and modify the `personal` object:

```typescript
export const portfolioData = {
  personal: {
    name: 'ABID SULTAN NISHAN',
    title: 'NLP, LLM & Deep Learning Researcher',
    university: 'Uttara University',
    academicPeriod: '2024–2027',
    location: 'Uttara, Dhaka-1230, Bangladesh',
    email: 'abidsultannishan999@gmail.com',
    github: 'https://github.com/abid-sultan-nishan',
    linkedin: 'https://www.linkedin.com/in/abid-sultan-nishan',
    collaborationStatus: '[Your current collaboration status]',
    bioParagraph1: '...',
    bioParagraph2: '...',
  },
  // ...
};
```

### 2. Updating Research Projects & Works

In `src/data/portfolioData.ts`:
- Modify `featuredResearchPlaceholder` when you have a primary manuscript or benchmark ready to announce.
- Update `projects` array with your actual project titles, problem descriptions, personal contributions, and GitHub/Demo URLs.
- Change `isPlaceholder: true` to `isPlaceholder: false` once a project is verified.

### 3. Updating Skills & Technical Competencies

The `skills` array is grouped into:
1. Programming
2. Machine Learning
3. NLP & LLMs
4. Tools & Environments
5. Research Methodology

Each item has an honest proficiency level (`Working knowledge`, `Learning`, `Exploring`, `Foundational`). To add, edit, or remove skills:

```typescript
{
  category: 'NLP & LLMs',
  items: [
    { name: 'Transformers', level: 'Working knowledge' },
    { name: 'LoRA / QLoRA', level: 'Exploring' },
    // Add your new skill here:
    { name: 'DSPy', level: 'Learning' },
  ]
}
```

### 4. Updating Education, Coursework, & Achievements

In `src/data/portfolioData.ts`, update the `education` array:
- `relevantCoursework`: Add your completed university courses (e.g., Computer Architecture, Theory of Computation).
- `academicAchievements`: Replace the `[ADD ...]` placeholders with verified achievements (e.g., Dean's List, scholarships).
- `studentActivities` & `researchOrClubInvolvement`: Add club roles, seminars, or reading group participation.

### 5. Replacing the Abstract AI Visual with a Real Profile Photo

Currently, the hero uses an abstract transformer attention visual (`src/components/AbstractAiVisual.tsx`) as instructed to avoid fake stock avatars.

When you have your own professional photo:
1. Place your photo file (e.g., `abid-sultan-nishan.jpg`) in the `/public` or `/src/assets` folder.
2. In `src/components/Hero.tsx`, you can replace `<AbstractAiVisual />` with:
   ```tsx
   <img
     src="/abid-sultan-nishan.jpg"
     alt="Abid Sultan Nishan"
     className="w-full max-w-md rounded-2xl border border-slate-800 shadow-2xl object-cover aspect-square"
   />
   ```
   Or keep the interactive abstract visual alongside your portrait.

### 6. Configuring Contact Form & Backend Services

The contact form currently:
1. Validates all inputs client-side (name, email, subject, minimum message length).
2. Generates an immediate `mailto:` action that pre-fills your email client with the subject and body to guarantee message delivery without third-party failures.

To connect a headless form provider (such as Formspree, EmailJS, or Firebase Functions):
- **Formspree**: Sign up at [formspree.io](https://formspree.io), obtain your form ID, and `POST` the JSON body in `handleSubmit` within `src/components/ContactSection.tsx`:
  ```typescript
  await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  ```
- **EmailJS**: Install `@emailjs/browser` and use `emailjs.send(...)`.

### 7. Resume & CV

The "View Resume" button in the navigation bar opens an interactive, print-ready Curriculum Vitae sheet. Clicking **Print** formats it cleanly for printing or saving as a PDF directly from your browser.

### 8. RSS Feed for Publications & Technical Notes

An autodiscovery RSS feed is configured for academic aggregators, reader applications, and research subscribers:
- **Feed File**: `/public/rss.xml`
- **Head Autodiscovery**: `<link rel="alternate" type="application/rss+xml" href="/rss.xml" />`
- **Footer Link**: Accessible RSS icon and link in the footer.
- **Adding Items**: When you publish a paper or technical post, add an `<item>` block into `/public/rss.xml`:
  ```xml
  <item>
    <title>[Your Paper Title]</title>
    <link>https://arxiv.org/abs/YOUR_PAPER_ID</link>
    <description>[Abstract summary]</description>
    <pubDate>Mon, 01 Oct 2026 00:00:00 GMT</pubDate>
    <guid>https://arxiv.org/abs/YOUR_PAPER_ID</guid>
  </item>
  ```

---

## Development

Run development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```
