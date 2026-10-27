# Portfolio

A modern, static portfolio website built with Next.js 15.

## ✨ Features

- 🎨 Modern, responsive design
- 🌓 Dark/Light mode toggle
- ⚡ Smooth animations with Motion
- 📱 Mobile-first responsive layout
- 📧 Contact form (submitted via web3forms)
- 🎯 Single-page application with smooth scroll

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (React 19), statically exported
- **Styling**: Tailwind CSS 4
- **Animations**: Motion
- **Content**: Static TypeScript data in `data/`
- **Deployment**: Vercel-ready

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## 📝 Editing Content

- Projects: edit [data/projects.ts](./data/projects.ts)
- Other section text and images: edit the components in `app/components/` and the assets in `assets/`

No environment variables or external backend are required.

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── components/         # Page sections and UI components
│   ├── layout.tsx
│   └── page.tsx
├── assets/                 # Static asset references
├── components/ui/          # Reusable UI components
├── data/                   # Static content (projects)
├── public/                 # Public files and images
├── types/                  # Shared TypeScript types
└── lib/                    # Utilities
```

## 🚢 Deployment

Deploy to Vercel (or any static host) after pushing to GitHub. No environment variables are needed.

## 🧪 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 📝 License

This project is open source and available for personal and commercial use.

## 🙋 Support

Having issues? Check these resources:

1. Check [Next.js Documentation](https://nextjs.org/docs)
2. Check [web3forms Documentation](https://web3forms.com/docs) for the contact form

## 🎉 Credits

Built with ❤️ using modern web technologies.

---

**Your portfolio is static: update the content in `data/` and redeploy.** 🚀
