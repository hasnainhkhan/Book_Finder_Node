# 🚀 Book Finder - Setup & Run Guide

## 📋 Table of Contents
- [Quick Start (Recommended)](#-quick-start-recommended)
- [Development Setup](#-development-setup)
- [Deployment Options](#-deployment-options)
- [Troubleshooting](#-troubleshooting)
- [Project Structure](#-project-structure)

## ⚡ Quick Start (Recommended)

### Option 1: Standalone HTML (No Dependencies)
**Perfect for immediate testing and deployment**

1. **Start the application**:
   ```bash
   cd Book_Finder
   python -m http.server 3000
   ```

2. **Open in browser**:
   - Navigate to: `http://localhost:3000/index-standalone.html`
   - The application will load immediately

3. **Test the features**:
   - Try searching for "Harry Potter"
   - Switch between search types (Title, Author, Subject, ISBN)
   - Click on book cards to see detailed information

### Option 2: Simple Server (Any HTTP Server)
```bash
# Using Node.js (if available)
npx serve . -p 3000

# Using PHP (if available)
php -S localhost:3000

# Using Python 3
python -m http.server 3000

# Using Python 2
python -m SimpleHTTPServer 3000
```

## 🛠️ Development Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone or download the project**:
   ```bash
   cd Book_Finder
   ```

2. **Install dependencies**:
   ```bash
   # Using npm
   npm install

   # Using yarn (alternative)
   yarn install
   ```

3. **Start development server**:
   ```bash
   # Using npm
   npm run dev

   # Using yarn
   yarn dev
   ```

4. **Open in browser**:
   - Development server: `http://localhost:3000`
   - The application will auto-reload on file changes

### Build for Production
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment Options

### 1. Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts to configure your deployment
```

### 2. Netlify
**Option A: Drag & Drop**
1. Build the project: `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist` folder to the deploy area

**Option B: Git Integration**
1. Push code to GitHub
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### 3. GitHub Pages
1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**:
   ```bash
   # Install gh-pages
   npm install -g gh-pages

   # Deploy
   gh-pages -d dist
   ```

### 4. CodeSandbox
1. Go to [codesandbox.io](https://codesandbox.io)
2. Import from GitHub repository
3. Or upload the `index-standalone.html` file directly

### 5. StackBlitz
1. Go to [stackblitz.com](https://stackblitz.com)
2. Create new project
3. Upload project files or import from GitHub

## 🐛 Troubleshooting

### Common Issues

#### 1. npm install is slow or failing
**Solution**: Use the standalone HTML version
```bash
python -m http.server 3000
# Open: http://localhost:3000/index-standalone.html
```

#### 2. Corporate Network/Proxy Issues
**Solution**: Configure npm for corporate network
```bash
# Set longer timeouts
npm config set fetch-retry-mintimeout 20000
npm config set fetch-retry-maxtimeout 120000
npm config set fetch-retries 10

# Or use standalone version (no network dependencies)
```

#### 3. Port 3000 already in use
**Solution**: Use a different port
```bash
# Python
python -m http.server 8080

# Node.js
npx serve . -p 8080

# Vite dev server
npm run dev -- --port 8080
```

#### 4. CORS errors when testing locally
**Solution**: Always use a server (not file:// protocol)
```bash
# Never open HTML files directly
# ❌ file:///path/to/index.html

# Always use a server
# ✅ http://localhost:3000/index.html
```

#### 5. API requests failing
**Possible causes**:
- Network connectivity issues
- Corporate firewall blocking requests
- Open Library API temporarily unavailable

**Solutions**:
- Check internet connection
- Try from a different network
- Wait and retry (API might be temporarily down)

### Browser Compatibility
- **Modern browsers**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Mobile browsers**: iOS Safari 13+, Chrome Mobile 80+
- **IE**: Not supported (requires modern JavaScript features)

### Performance Tips
1. **Images load slowly**: This is normal with Open Library covers
2. **Search is slow**: API response times vary based on query complexity
3. **Large result sets**: Use filtering options to narrow results

## 📁 Project Structure

```
Book_Finder/
├── 📄 index-standalone.html     # Complete app in single file (RECOMMENDED)
├── 📄 index.html                # Main HTML template
├── 📄 package.json              # Dependencies and scripts
├── 📄 vite.config.js            # Vite configuration
├── 📄 tailwind.config.js        # Tailwind CSS configuration
├── 📄 postcss.config.js         # PostCSS configuration
├── 📄 .eslintrc.json            # ESLint configuration
├── 📄 README.md                 # Project documentation
├── 📄 SETUP.md                  # This file
├── 📄 QUICK_START.md            # Quick start guide
├── 📁 public/
│   └── 📄 book-icon.svg         # App icon
├── 📁 src/
│   ├── 📄 main.jsx              # React entry point
│   ├── 📄 App.jsx               # Main application component
│   ├── 📄 index.css             # Global styles and Tailwind
│   ├── 📁 components/           # React components
│   │   ├── 📄 Header.jsx
│   │   ├── 📄 SearchSection.jsx
│   │   ├── 📄 BookResults.jsx
│   │   ├── 📄 BookCard.jsx
│   │   ├── 📄 BookModal.jsx
│   │   ├── 📄 Pagination.jsx
│   │   └── 📄 LoadingSpinner.jsx
│   ├── 📁 hooks/                # Custom React hooks
│   │   └── 📄 useLocalStorage.js
│   └── 📁 utils/                # Utility functions
│       └── 📄 api.js            # API integration
└── 📁 dist/                     # Production build (created after npm run build)
```

## 🎯 Feature Overview

### Search Capabilities
- **Title Search**: Find books by their title
- **Author Search**: Discover books by specific authors
- **Subject Search**: Browse books by genre or topic
- **ISBN Search**: Look up books by their ISBN number

### User Interface
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Styling**: Clean, professional appearance
- **Loading States**: Smooth loading animations
- **Error Handling**: Graceful error messages

### Book Information
- **Cover Images**: High-quality book covers when available
- **Detailed View**: Comprehensive book information in modal
- **Ratings**: Star ratings and review counts
- **Metadata**: Publication info, page count, language, subjects

### Technical Features
- **Fast Search**: Optimized API calls to Open Library
- **Pagination**: Handle large result sets efficiently
- **Filtering**: Sort and filter search results
- **Accessibility**: Keyboard navigation and screen reader support

## 📞 Support

### Resources
- **Open Library API**: [openlibrary.org/developers/api](https://openlibrary.org/developers/api)
- **React Documentation**: [reactjs.org](https://reactjs.org)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **Vite**: [vitejs.dev](https://vitejs.dev)

### Common Commands Reference
```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run code linting

# Alternative servers (no npm required)
python -m http.server 3000           # Python 3
python -m SimpleHTTPServer 3000      # Python 2
php -S localhost:3000                # PHP
npx serve . -p 3000                  # Node.js (if available)

# Deployment
vercel                    # Deploy to Vercel
netlify deploy           # Deploy to Netlify
gh-pages -d dist         # Deploy to GitHub Pages
```

---

**📚 Happy book hunting! The application is ready to help students discover amazing books for college and beyond.**