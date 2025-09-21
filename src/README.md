# Natural Plantation

A premium eco-friendly e-commerce website showcasing organic products including aloe vera, wood furniture, Ceylon tea, and natural soaps.

## Features

- 🌱 Eco-friendly product catalog
- 🛒 Shopping cart functionality
- 👤 User authentication & profiles
- 📱 Responsive design
- 🎨 Custom design system with green & natural aesthetics
- 🏪 Admin dashboard for product management
- 🇱🇰 Localized for Sri Lankan market (LKR pricing)

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v6
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Context
- **Data Storage**: LocalStorage (mock database)

## Quick Start

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd natural-plantation
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

## Deployment to Vercel

### Method 1: Vercel CLI (Recommended)
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Method 2: Git Integration
1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel will automatically detect it's a Vite project and deploy

### Method 3: Drag and Drop
1. Run `npm run build`
2. Go to [vercel.com](https://vercel.com)
3. Drag and drop the `dist` folder

## Environment Variables

No environment variables are required for the basic setup as it uses localStorage for data persistence.

## Project Structure

```
├── components/          # React components
│   ├── ui/             # Shadcn/ui components
│   ├── auth/           # Authentication components
│   └── admin/          # Admin dashboard components
├── contexts/           # React context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and types
├── pages/              # Page components
├── styles/             # Global CSS styles
└── public/             # Static assets
```

## Contact Information

**Location**: 99JG+4Q9 Karadipok, Kilinochchi, Sri Lanka  
**Phone**: +94 74 268 4140

## License

Copyright © 2024 Natural Plantation. All rights reserved.