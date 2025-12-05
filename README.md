# DevOps Portfolio

A modern, professional portfolio website for DevOps engineers, featuring a Linux tiling window manager (Hyperland) aesthetic with terminal-inspired design elements.

**🚀 Live Demo:** [udaradev.me](https://udaradev.me)

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
   - **Data Source**: Managed via `src/data/content.ts`

3. **Tech Stack**
   - Organized by category (Cloud, IaC, CI/CD, Monitoring, Programming)
   - Clean list format
   - Hover animations
   - **Data Source**: Managed via `src/data/content.ts`

4. **Education & Certifications**
   - Timeline layout
   - Degrees and certifications
   - Institution details
   - **Data Source**: Managed via `src/data/content.ts`

5. **Clubs & Societies**
   - List of memberships and roles
   - Clean, scannable format
   - **Data Source**: Managed via `src/data/content.ts`

6. **My Setup**
   - Hardware specifications
   - Software and tools
   - Services and applications
   - **Data Source**: Managed via `src/data/content.ts`

7. **Contact**
   - Contact form with validation
   - Social media links
   - Email integration ready
   - **Data Source**: Managed via `src/data/content.ts`

8. **Blog**
   - Powered by **Sanity.io** (Headless CMS)
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

### CMS (Blog)
- **Sanity.io** - Headless CMS for managing blog posts
- **Next-Sanity** - Sanity integration for Next.js
- **Portable Text** - Rich text content rendering

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

All personal data (Projects, Skills, Education, Setup, Contact info) is centralized in `src/data/content.ts`.

1. **Edit Data File**
   - Open `src/data/content.ts`
   - Update the `heroData`, `projectsData`, `skillsData`, `educationData`, `clubsData`, `setupData`, and `contactData` objects with your own information.

2. **Profile Image**
   - Replace the profile image in the `public/` folder (e.g., `public/profile.jpg`) and update the path in `heroData`.

### Manage Blog Posts (Sanity CMS)

This project uses Sanity.io for blog content.

1. **Sanity Configuration**
   - The Sanity configuration is located in `sanity.config.js` and `sanity.cli.js`.
   - The client configuration is in `src/lib/sanity.ts`.

2. **Sanity Studio**
   - The Sanity Studio is embedded in the application (typically at `/studio` or a separate route, or run locally).
   - To manage content locally, you might need to run the Sanity Studio command if configured, or access your Sanity project dashboard online.
   - *Note: Check `package.json` for specific Sanity scripts if available, or use `npx sanity start` inside the `portfolio-studio` directory if it exists.*

3. **Content Schema**
   - Schemas are defined in `portfolio-studio/schemaTypes/` (or similar path depending on setup).

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

This project is deployed on [Vercel](https://vercel.com) and accessible at [udaradev.me](https://udaradev.me).

1. Push your code to GitHub
2. Import project in Vercel
3. Add your custom domain (e.g., `udaradev.me`) in Vercel settings
4. Deploy automatically on every push

### Netlify

1. Push your code to GitHub
2. Import project in [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `.next`

## 📂 Project Structure

```
portfolio/
├── public/              # Static assets
├── portfolio-studio/    # Sanity Studio configuration & schemas
├── src/
│   ├── app/
│   │   ├── blog/       # Blog pages (Sanity integration)
│   │   ├── globals.css # Global styles
│   │   ├── layout.tsx  # Root layout
│   │   └── page.tsx    # Home page
│   ├── components/     # React components
│   ├── data/           # Data files (content.ts)
│   └── lib/
│       ├── sanity.ts   # Sanity client configuration
│       └── posts.ts    # Legacy/Utility for posts
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
