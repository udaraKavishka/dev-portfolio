# DevOps Portfolio

A modern, professional portfolio website for DevOps engineers, featuring a Linux tiling window manager (Hyperland) aesthetic with terminal-inspired design elements.


## 🌟 Features

### 🎨 Design
- **Hyperland-Inspired Aesthetic**: Terminal-inspired UI with tiling window manager vibes
- **Dark/Light Mode**: Seamless theme toggle with smooth transitions
- **Rose Pine Color Palette**: Beautiful, eye-friendly color scheme inspired by popular Linux themes
- **Smooth Animations**: Framer Motion powered animations and transitions
- **Fully Responsive**: Mobile-first design that works on all devices

### 📱 Sections

1. **Hero / About Me**
   - Terminal-style introduction
   - Profile image
   - Tech stack showcase
   - Social media links

2. **Projects**
   - Tiling grid layout
   - Interactive hover effects
   - Tech stack badges
   - GitHub and live demo links

3. **Tech Stack**
   - Organized by category (Cloud, IaC, CI/CD, Monitoring, Programming)
   - Clean list format
   - Hover animations

4. **Education & Certifications**
   - Timeline layout
   - Degrees and certifications
   - Institution details

5. **Clubs & Societies**
   - List of memberships and roles
   - Clean, scannable format

6. **My Setup**
   - Hardware specifications
   - Software and tools
   - Services and applications

7. **Contact**
   - Contact form with validation
   - Social media links
   - Email integration ready

8. **Blog**
   - Markdown-based blog posts
   - Syntax-highlighted code blocks
   - Tags and metadata
   - Static site generation

## 🚀 Tech Stack

### Core
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **React 19** - Latest React features

### Styling
- **CSS Modules** - Component-scoped styling
- **Custom CSS Variables** - Theme management

### Animations
- **Framer Motion** - Smooth animations and transitions

### Icons
- **Lucide React** - Beautiful, consistent icons

### Blog
- **Gray Matter** - Frontmatter parsing
- **Remark** - Markdown processing
- **Remark HTML** - HTML conversion

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Customization

### Update Personal Information

1. **Hero Section**
   - Edit `src/components/Hero.tsx`
   - Update name, bio, tagline, and social links
   - Replace profile image in `public/` folder

2. **Projects**
   - Edit `src/components/Projects.tsx`
   - Update the `projects` array with your work

3. **Tech Stack**
   - Edit `src/components/Skills.tsx`
   - Modify the `skills` array

4. **Education**
   - Edit `src/components/Education.tsx`
   - Update the `education` array

5. **Clubs & Societies**
   - Edit `src/components/Clubs.tsx`
   - Modify the `clubs` array

6. **Setup**
   - Edit `src/components/Setup.tsx`
   - Update the `setupData` array with your hardware/software

7. **Contact**
   - Edit `src/components/Contact.tsx`
   - Update email and social media links

### Add Blog Posts

Create markdown files in the `posts/` directory:

```markdown
---
title: 'Your Post Title'
date: '2024-03-20'
excerpt: 'Short description'
tags: ['DevOps', 'Kubernetes']
---

# Your Content Here

Write your blog post content in markdown...
```

### Color Customization

Edit `src/app/globals.css` to change the color palette:

```css
:root {
  --bg-primary: #191724;
  --accent-primary: #ebbcba;
  /* ... more variables */
}
```

## 📝 Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start            # Start production server

# Linting
npm run lint         # Run ESLint
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy automatically on every push

### Netlify

1. Push your code to GitHub
2. Import project in [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `.next`

### Manual Deployment

```bash
npm run build
# Upload .next folder to your hosting provider
```

## 📂 Project Structure

```
portfolio/
├── public/              # Static assets
├── posts/              # Blog posts (markdown)
├── src/
│   ├── app/
│   │   ├── blog/       # Blog pages
│   │   ├── globals.css # Global styles
│   │   ├── layout.tsx  # Root layout
│   │   └── page.tsx    # Home page
│   ├── components/     # React components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Education.tsx
│   │   ├── Clubs.tsx
│   │   ├── Setup.tsx
│   │   ├── Contact.tsx
│   │   └── BlogList.tsx
│   └── lib/
│       └── posts.ts    # Blog utilities
├── .agent/
│   └── workflows/      # Custom workflows
└── package.json
```

## 🎨 Color Palette

### Dark Mode (Default)
- Background: `#191724`, `#1f1d2e`, `#26233a`
- Text: `#e0def4`, `#908caa`, `#6e6a86`
- Accents: Rose (`#ebbcba`), Iris (`#c4a7e7`), Foam (`#9ccfd8`), Gold (`#f6c177`)

### Light Mode
- Background: `#faf4ed`, `#fffaf3`, `#f2e9e1`
- Text: `#575279`, `#797593`, `#9893a5`
- Accents: Adjusted for light theme

## 🔧 Configuration

### Fonts
- **Sans-serif**: Inter (body text)
- **Monospace**: JetBrains Mono (headings, code, terminal elements)

Fonts are loaded from Google Fonts in `src/app/layout.tsx`.

### Metadata
Update site metadata in `src/app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: "Your Name - DevOps Engineer",
  description: "Your custom description",
};
```

## 🤝 Contributing

This is a personal portfolio template. Feel free to fork and customize for your own use!

## 📄 License

MIT License - feel free to use this template for your own portfolio.

## 🙏 Acknowledgments

- Design inspired by Hyperland and tiling window managers
- Color palette based on Rose Pine and Catppuccin themes
- Icons from [Lucide](https://lucide.dev/)
- Fonts from [Google Fonts](https://fonts.google.com/)

## 📧 Contact

For questions or suggestions, feel free to reach out!

---

**Built with ❤️ using Next.js and TypeScript**
