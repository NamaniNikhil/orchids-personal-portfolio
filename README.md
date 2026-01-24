# Nikhil Namani - Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features smooth animations, dark theme, and easy content management through a single JSON file.

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Radix UI

## Features

- Responsive design (mobile, tablet, desktop)
- Smooth scroll animations
- Dark theme with emerald accents
- Single-file content management
- Contact form with success modal
- Scroll-to-top button
- Accessible navigation
- SEO optimized

## Installation

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Setup

```bash
# Clone the repository
git clone https://github.com/NamaniNikhil/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Content Editing Guide

All website content is managed through a single file: `src/data/content.json`

### File Location

```
src/
└── data/
    └── content.json    <- Edit this file to update content
```

### JSON Structure Overview

```json
{
  "personal": { },      // Name, title, bio, contact info
  "social": { },        // Social media links
  "skills": { },        // Technical skills by category
  "projects": [ ],      // Portfolio projects
  "experience": [ ],    // Work history
  "education": [ ],     // Educational background
  "certifications": [ ],// Professional certifications
  "navigation": [ ]     // Navigation menu items
}
```

### Common Updates

#### Update Personal Information

```json
"personal": {
  "name": "Your Name",
  "title": "Your Job Title",
  "tagline": "Your tagline or motto",
  "bio": "A paragraph about yourself...",
  "email": "your.email@example.com",
  "location": "City, State",
  "avatar": "https://your-image-url.com/photo.jpg",
  "resume": "/resume.pdf",
  "highlights": [
    "Achievement 1",
    "Achievement 2"
  ]
}
```

#### Add a New Project

Add to the `projects` array:

```json
{
  "id": 5,
  "title": "Project Name",
  "description": "Brief description of what the project does.",
  "image": "https://images.unsplash.com/photo-xxx",
  "tags": ["React", "Node.js", "PostgreSQL"],
  "github": "https://github.com/username/repo",
  "live": "https://project-demo.com",
  "featured": true
}
```

- `id`: Unique number for each project
- `featured`: Set to `true` to highlight on homepage
- `live`: Set to `null` if no live demo

#### Add Work Experience

Add to the `experience` array:

```json
{
  "id": 1,
  "company": "Company Name",
  "role": "Job Title",
  "period": "January 2024 – Present",
  "location": "City, State",
  "description": "Brief overview of your role.",
  "achievements": [
    "Key achievement or responsibility 1",
    "Key achievement or responsibility 2"
  ],
  "technologies": ["Python", "SQL", "AWS"]
}
```

#### Update Skills

Modify the `skills` object:

```json
"skills": {
  "languages": ["Python", "JavaScript", "SQL"],
  "databases": ["PostgreSQL", "MongoDB", "Redis"],
  "tools": ["Docker", "Git", "CI/CD"],
  "cloud": ["AWS", "GCP", "Azure"]
}
```

#### Update Social Links

```json
"social": {
  "github": "https://github.com/yourusername",
  "linkedin": "https://linkedin.com/in/yourusername",
  "email": "mailto:your.email@example.com"
}
```

## Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |

### File Structure

```
├── public/
│   └── resume.pdf          # Your resume file
├── src/
│   ├── app/
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   ├── components/
│   │   ├── About.tsx       # About section
│   │   ├── Contact.tsx     # Contact form
│   │   ├── Education.tsx   # Education section
│   │   ├── Experience.tsx  # Work experience
│   │   ├── Footer.tsx      # Site footer
│   │   ├── Header.tsx      # Navigation header
│   │   ├── Hero.tsx        # Hero section
│   │   ├── Projects.tsx    # Projects showcase
│   │   ├── ScrollToTop.tsx # Scroll button
│   │   └── Skills.tsx      # Skills section
│   ├── data/
│   │   └── content.json    # All website content
│   └── lib/
│       └── utils.ts        # Utility functions
├── package.json
└── tailwind.config.ts
```

### Component Overview

| Component | Description |
|-----------|-------------|
| `Header` | Fixed navigation with mobile menu |
| `Hero` | Landing section with name and social links |
| `About` | Bio and key highlights |
| `Skills` | Technical skills organized by category |
| `Projects` | Portfolio project cards with links |
| `Experience` | Work history timeline |
| `Education` | Educational background |
| `Contact` | Contact form and information |
| `Footer` | Site footer with links |
| `ScrollToTop` | Floating scroll-to-top button |

## Deployment

### Build for Production

```bash
npm run build
```

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Deploy (settings are auto-detected)

### Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" > "Import an existing project"
4. Connect to GitHub and select repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

### GitHub Pages

Use the included GitHub Actions workflow (`.github/workflows/deploy.yml`):

1. Go to repository Settings > Pages
2. Set Source to "GitHub Actions"
3. Push to `main` branch to trigger deployment

## Customization

### Changing Colors

The site uses Tailwind CSS. Main colors:

- Primary: `#10b981` (emerald)
- Background: `#0a0a0a` (near black)
- Surface: `#1a1a1a` (dark gray)
- Text: `#ffffff` (white) and `#9ca3af` (gray)

To change the accent color, search and replace `#10b981` in the components.

### Changing Fonts

Fonts are configured in `src/app/layout.tsx`. Update the Google Fonts import:

```tsx
import { Your_Font } from "next/font/google";

const yourFont = Your_Font({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
```

### Adding New Sections

1. Create a new component in `src/components/`
2. Import and add it to `src/app/page.tsx`
3. Add navigation item in `content.json`:

```json
"navigation": [
  { "label": "New Section", "href": "#new-section" }
]
```

## Resume File

Place your resume PDF in the `public/` folder as `resume.pdf`. The download button in the Contact section will link to it.

## License

MIT License - feel free to use this template for your own portfolio.
