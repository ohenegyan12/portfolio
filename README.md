# Portfolio Website

A modern portfolio website built with Next.js, React, and Tailwind CSS.

## Features

- 🚀 Built with Next.js 14 and React 18
- 🎨 Styled with Tailwind CSS
- 📱 Fully responsive design
- ⚡ Fast and optimized
- 🔧 TypeScript support
- 📄 Multiple pages (Home, About, Projects, Contact)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── projects/          # Projects page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ContactForm.tsx    # Contact form component
│   ├── Footer.tsx         # Footer component
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero section
│   ├── ProjectCard.tsx    # Project card component
│   └── SkillCard.tsx      # Skill card component
├── public/                # Static assets
│   ├── images/            # Images and graphics
│   ├── icons/             # Favicon and icons
│   └── resume/            # Resume files
└── ...config files
```

## Customization

1. Update your personal information in the components
2. Add your projects to the projects page
3. Customize colors in `tailwind.config.js`
4. Add your images to the `public/images/` directory
5. Update the metadata in `app/layout.tsx`

## Deployment

The easiest way to deploy your portfolio is to use [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- ESLint
