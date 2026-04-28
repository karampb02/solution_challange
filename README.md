# TalentAI - Solution Challenge

A modern Next.js 16 application with a comprehensive dashboard for talent management and recruiting analytics.

## Tech Stack

- **Framework**: Next.js 16.2.4 with Turbopack
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Lucide React
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Runtime**: Node.js 18+

## Project Structure

```
src/
├── app/
│   ├── dashboard/          # Dashboard routes and pages
│   │   ├── activity/
│   │   ├── candidates/
│   │   ├── culture/
│   │   ├── interviews/
│   │   └── signals/
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css
├── components/
│   ├── dashboard/         # Dashboard-specific components
│   ├── Features.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── HowItWorks.tsx
│   ├── Integrations.tsx
│   ├── Navbar.tsx
│   ├── Testimonials.tsx
│   └── TrustedBy.tsx
└── lib/
    └── mock-data.ts       # Mock data for dashboard
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/karampb02/solution_challange.git
cd solution_challange
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The application will hot-reload as you edit files.

### Building

To create an optimized production build:

```bash
npm run build
```

### Production

To start the production server:

```bash
npm run start
```

## Deployment on Vercel

This project is optimized for deployment on Vercel, the platform built by the creators of Next.js.

### Automatic Deployment

The easiest way to deploy is using the [Vercel Platform](https://vercel.com):

1. Push your code to GitHub
2. Import the project in Vercel dashboard
3. Vercel will automatically detect it's a Next.js project and configure the build settings
4. Your app will be deployed at `https://your-project.vercel.app`

### Manual Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Environment Variables

If you need environment variables in production, add them in the Vercel dashboard under:
**Settings → Environment Variables**

### Build Settings

The following settings are automatically configured:
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Node.js Version**: 18.x (or specify in `vercel.json`)

### Troubleshooting Vercel Deployment

**Issue: Build fails on Vercel but works locally**
- Clear `.next` folder locally and rebuild
- Ensure all dependencies are in `package.json`
- Check Node.js version compatibility (18+ required)
- Verify environment variables are set

**Issue: TypeScript errors during build**
- The project includes strict TypeScript settings
- Ensure all components have proper type annotations
- Run `npm run build` locally to catch errors before pushing

**Issue: Missing dependencies**
- Run `npm install` to ensure all packages are installed
- Commit `package-lock.json` to git

## Features

- **Dashboard Pages**:
  - Activity tracking
  - Candidate management
  - Culture analytics
  - Interview scheduling
  - Signal tracking

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance**: Optimized with Turbopack and static generation
- **Analytics**: Real-time charts and data visualization

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment Guide](https://vercel.com/docs/frameworks/nextjs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## License

This project is part of the Solution Challenge.

## Support

For issues and questions, please refer to the [project repository](https://github.com/karampb02/solution_challange).
