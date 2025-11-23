---
description: Update portfolio with personal information and commit to GitHub
---

# Portfolio Update and Git Commit Workflow

This workflow helps you update your portfolio with personal information and commit changes to GitHub with proper commit messages.

## Prerequisites

- Git repository initialized
- GitHub remote configured
- Personal information document ready

## Steps

### 1. Review Current Git Status

```bash
git status
```

Check for any uncommitted changes before starting.

---

### 2. Create a New Branch (Optional but Recommended)

```bash
git checkout -b update-portfolio-content
```

---

### 3. Update Hero Section

**File:** `src/components/Hero.tsx`

Update:
- Name/title
- Bio text
- Tagline
- Social media links (GitHub, LinkedIn, Email)

**Commit:**
```bash
git add src/components/Hero.tsx
git commit -m "feat(hero): update personal information and bio

- Update name and professional title
- Add personalized bio and tagline
- Update social media links"
```

---

### 4. Update Profile Image

**Files:** 
- Place your image in `public/` folder (e.g., `public/profile.jpg`)
- Update `src/components/Hero.tsx` image src

**Commit:**
```bash
git add public/profile.jpg src/components/Hero.tsx
git commit -m "feat(hero): add profile image

- Add personal profile photo
- Update Hero component to use new image"
```

---

### 5. Update Projects Section

**File:** `src/components/Projects.tsx`

Update the `projects` array with your actual projects.

**Commit:**
```bash
git add src/components/Projects.tsx
git commit -m "feat(projects): add personal projects

- Replace sample projects with actual work
- Add project descriptions and tech stacks
- Include GitHub and live demo links"
```

---

### 6. Update Skills/Tech Stack

**File:** `src/components/Skills.tsx`

Update the `skills` array with your technologies.

**Commit:**
```bash
git add src/components/Skills.tsx
git commit -m "feat(skills): update tech stack

- Add personal technology proficiencies
- Organize by category (Cloud, IaC, CI/CD, etc.)
- Remove unused technologies"
```

---

### 7. Update Education & Certifications

**File:** `src/components/Education.tsx`

Update the `education` array with your degrees and certifications.

**Commit:**
```bash
git add src/components/Education.tsx
git commit -m "feat(education): add educational background

- Add degree information
- Include certifications
- Update institutions and dates"
```

---

### 8. Update Clubs & Societies

**File:** `src/components/Clubs.tsx`

Update the `clubs` array with your memberships.

**Commit:**
```bash
git add src/components/Clubs.tsx
git commit -m "feat(clubs): add club memberships and roles

- List actual club participations
- Include leadership roles
- Update organization names"
```

---

### 9. Update Setup Section

**File:** `src/components/Setup.tsx`

Update the `setupData` array with your actual hardware and software.

**Commit:**
```bash
git add src/components/Setup.tsx
git commit -m "feat(setup): add personal hardware and software setup

- Update hardware specifications
- List actual software and tools used
- Include services and applications"
```

---

### 10. Update Contact Information

**File:** `src/components/Contact.tsx`

Update social media links and contact email.

**Commit:**
```bash
git add src/components/Contact.tsx
git commit -m "feat(contact): update contact information

- Add personal email address
- Update social media links
- Ensure contact form is configured"
```

---

### 11. Update Site Metadata

**File:** `src/app/layout.tsx`

Update site title and description.

**Commit:**
```bash
git add src/app/layout.tsx
git commit -m "feat(meta): update site metadata

- Update page title
- Add personalized description
- Improve SEO metadata"
```

---

### 12. Add Blog Posts (Optional)

**Files:** `posts/*.md`

Add your blog posts as markdown files.

**Commit:**
```bash
git add posts/
git commit -m "feat(blog): add initial blog posts

- Add [number] blog posts
- Include technical content
- Set up frontmatter metadata"
```

---

### 13. Test the Build

// turbo
```bash
npm run build
```

Ensure everything builds successfully.

---

### 14. Review All Changes

```bash
git log --oneline
git diff main..update-portfolio-content
```

---

### 15. Push to GitHub

```bash
git push origin update-portfolio-content
```

---

### 16. Create Pull Request (if using branch)

Go to GitHub and create a PR from `update-portfolio-content` to `main`.

**OR** merge directly if working on main:

```bash
git checkout main
git merge update-portfolio-content
git push origin main
```

---

### 17. Deploy (if using Vercel/Netlify)

If connected to Vercel or Netlify, deployment will happen automatically on push.

Otherwise, manually deploy:
```bash
npm run build
# Follow your hosting provider's deployment steps
```

---

## Quick Update Script

For future updates, you can use this pattern:

```bash
# 1. Make changes to a file
# 2. Add and commit with descriptive message
git add <file>
git commit -m "type(scope): description"

# 3. Push when ready
git push origin main
```

## Commit Message Convention

Follow this format:
```
type(scope): subject

body (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, styling
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

**Examples:**
- `feat(hero): update personal bio`
- `fix(navbar): correct navigation links`
- `docs(readme): add setup instructions`
- `style(projects): improve card layout`

---

## Notes

- Always test locally before committing
- Write clear, descriptive commit messages
- Keep commits focused on single changes
- Review changes before pushing
- Consider using branches for major updates
