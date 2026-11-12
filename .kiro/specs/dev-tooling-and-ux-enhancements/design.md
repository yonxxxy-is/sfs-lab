# Design Document

## Introduction

This document provides the technical design for implementing three complementary enhancements to the React portfolio website: development tooling (ESLint and Prettier), SEO optimization (sitemap generation), and user experience (manual dark mode toggle). The design maintains consistency with the existing Vite + React + Tailwind CSS v4 architecture while adding minimal dependencies and preserving the site's clean, accessibility-focused design system.

## Overview

### Current Architecture

The portfolio is built with:
- **Build system**: Vite 6.x with React plugin and Tailwind CSS v4 Vite plugin
- **Framework**: React 18.3.x with React Router DOM 6.28.x
- **Styling**: Tailwind CSS v4 (using new `@import "tailwindcss"` syntax) with custom design tokens
- **Animation**: Framer Motion 11.15.x with reduced motion support
- **Theme**: System-preference dark mode via `prefers-color-scheme` media query
- **Deployment**: Vercel with SPA routing and cache headers

### Design Goals

1. **ESLint & Prettier**: Establish code quality and formatting standards without disrupting existing development workflow
2. **Sitemap Generation**: Automate SEO sitemap creation integrated into the build pipeline
3. **Dark Mode Toggle**: Provide user control over theme preference while maintaining existing accessibility standards

### Non-Goals

- Migrating from Tailwind CSS v4 to v3 (design will work with v4's new syntax)
- Adding TypeScript (ESLint will use JavaScript-compatible configuration)
- Creating a theme system beyond light/dark modes
- Supporting per-page theme preferences

## Architecture

### System Context

```
┌─────────────────────────────────────────────────────────────┐
│                      Portfolio Website                       │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   ESLint +   │  │   Sitemap    │  │  Dark Mode   │     │
│  │   Prettier   │  │  Generator   │  │    Toggle    │     │
│  │              │  │              │  │              │     │
│  │ • Pre-commit │  │ • Build hook │  │ • Component  │     │
│  │ • CI checks  │  │ • Static XML │  │ • Context    │     │
│  │ • IDE hints  │  │ • Routes map │  │ • Storage    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  Existing: Vite + React + Tailwind v4 + Framer Motion      │
└─────────────────────────────────────────────────────────────┘
```

### Component Interaction

```
User
  │
  ├──> ThemeToggle Component (in Navbar)
  │       │
  │       ├──> ThemeContext (provides theme state)
  │       │       │
  │       │       ├──> localStorage (persists preference)
  │       │       └──> matchMedia (detects system theme)
  │       │
  │       └──> HTML root element (data-theme attribute)
  │               │
  │               └──> CSS (responds to [data-theme="dark"])
  │
  └──> Build Process
          │
          ├──> ESLint (validates code)
          ├──> Prettier (formats code)
          └──> Sitemap Generator (creates sitemap.xml)
```

## Components and Interfaces

### 1. ESLint Configuration

#### Configuration File: `.eslintrc.cjs`

ESLint will use CommonJS format (`.cjs`) to avoid ESM compatibility issues with Vite.

```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier', // Disables ESLint style rules that conflict with Prettier
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/prop-types': 'warn', // Warn on missing prop types
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'react/jsx-uses-react': 'off', // Not needed with new JSX transform
    'react/react-in-jsx-scope': 'off', // Not needed with new JSX transform
  },
  ignorePatterns: ['dist', 'node_modules', '*.config.js'],
};
```

**Rationale**: 
- Uses `eslint:recommended` baseline with React-specific plugins
- Configures `react/jsx-runtime` to support React 17+ JSX transform (no import React needed)
- Integrates `eslint-config-prettier` to disable conflicting style rules
- Warns on missing prop types without blocking development
- Ignores build output and configuration files

#### Dependencies

```json
{
  "devDependencies": {
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.34.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-config-prettier": "^9.1.0"
  }
}
```

#### npm Scripts

```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.jsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext .js,.jsx --fix"
  }
}
```

**Interface**:
- `npm run lint`: Validates all JavaScript/JSX files and reports violations
- `npm run lint:fix`: Automatically fixes auto-fixable violations
- Exit code: 0 for success, non-zero for violations (CI-friendly)

---

### 2. Prettier Configuration

#### Configuration File: `.prettierrc.json`

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 110,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

**Rationale**:
- `printWidth: 110`: Matches existing code style (slightly wider than default 80)
- `singleQuote: false`: Maintains consistency with existing code using double quotes
- `trailingComma: "es5"`: Safe for all modern browsers, cleaner git diffs
- `endOfLine: "lf"`: Consistent line endings across operating systems

#### Ignore File: `.prettierignore`

```
dist
node_modules
*.config.js
*.config.cjs
package-lock.json
```

#### Dependencies

```json
{
  "devDependencies": {
    "prettier": "^3.2.5"
  }
}
```

#### npm Scripts

```json
{
  "scripts": {
    "format": "prettier --write \"src/**/*.{js,jsx,css,json}\"",
    "format:check": "prettier --check \"src/**/*.{js,jsx,css,json}\""
  }
}
```

**Interface**:
- `npm run format`: Formats all source files in place
- `npm run format:check`: Validates formatting without modifying files (CI-friendly)

---

### 3. ESLint and Prettier Integration

**Conflict Resolution**:
- Install `eslint-config-prettier` to disable ESLint formatting rules
- Place `'prettier'` last in ESLint's `extends` array
- Run Prettier before ESLint in CI/pre-commit workflows

**Recommended Execution Order**:
```bash
npm run format        # Format code first
npm run lint          # Then validate logic/patterns
```

**IDE Integration**:
- VS Code: Install ESLint and Prettier extensions
- Configure format-on-save via `.vscode/settings.json` (optional, not included in design)

---

### 4. Sitemap Generation

#### Approach: Static Generation via Build Script

**Decision**: Use a lightweight Node.js script executed during the Vite build process rather than a Vite plugin.

**Rationale**:
- Portfolio has static routes (/, /about, /projects) that don't change dynamically
- Avoids additional plugin dependencies
- Simple to maintain and customize
- Executes as part of `vite build` via npm script chaining

#### Implementation: Build Script

**File**: `scripts/generate-sitemap.js`

```javascript
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const DOMAIN = process.env.VITE_SITE_URL || 'https://sionfelix.dev'; // Replace with actual domain
const ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/projects', priority: '0.8', changefreq: 'weekly' },
];

// Generate sitemap XML
function generateSitemap() {
  const lastmod = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
  const urls = ROUTES.map(route => `
  <url>
    <loc>${DOMAIN}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

  return sitemap;
}

// Write sitemap to dist directory
function writeSitemap() {
  const distPath = path.resolve(__dirname, '../dist');
  const sitemapPath = path.join(distPath, 'sitemap.xml');

  // Ensure dist directory exists
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
  }

  const sitemap = generateSitemap();
  fs.writeFileSync(sitemapPath, sitemap, 'utf-8');
  
  console.log(`✓ Sitemap generated at ${sitemapPath}`);
}

writeSitemap();
```

**Features**:
- Reads domain from `VITE_SITE_URL` environment variable or falls back to hardcoded default
- Generates lastmod timestamp on each build (reflects build date)
- Outputs to `dist/sitemap.xml` (served at `/sitemap.xml` by Vercel)
- Priority values: 1.0 for home, 0.8 for main pages

#### Build Integration

**Modified package.json scripts**:

```json
{
  "scripts": {
    "build": "vite build && node scripts/generate-sitemap.js"
  }
}
```

**Deployment Configuration**:
- Set `VITE_SITE_URL` environment variable in Vercel dashboard
- Sitemap will be accessible at `https://yourdomain.com/sitemap.xml`
- Submit sitemap URL to Google Search Console and Bing Webmaster Tools

#### robots.txt Update

Update `public/robots.txt` to reference the sitemap:

```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

---

### 5. Dark Mode Toggle Component

#### State Management: React Context API

**Rationale**:
- Lightweight: No external state library needed
- Sufficient for single theme state shared across navbar and future components
- Supports three modes: light, dark, system (follows OS preference)
- Integrates with existing React architecture

#### Component Structure

```
src/
├── contexts/
│   └── ThemeContext.jsx       # Theme state provider
├── components/
│   ├── ThemeToggle.jsx        # Toggle button component
│   └── Navbar.jsx             # Updated to include ThemeToggle
└── App.jsx                     # Wrapped with ThemeProvider
```

#### ThemeContext Implementation

**File**: `src/contexts/ThemeContext.jsx`

```javascript
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Theme can be: 'light', 'dark', or 'system'
  const [theme, setTheme] = useState(() => {
    // Read from localStorage on mount
    const stored = localStorage.getItem('theme');
    return stored || 'system';
  });

  // Compute the actual applied theme (resolves 'system' to 'light' or 'dark')
  const [appliedTheme, setAppliedTheme] = useState('light');

  useEffect(() => {
    // Function to get the resolved theme
    const resolveTheme = (themeValue) => {
      if (themeValue === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return themeValue;
    };

    const updateAppliedTheme = () => {
      const resolved = resolveTheme(theme);
      setAppliedTheme(resolved);
      
      // Apply theme to document root
      document.documentElement.setAttribute('data-theme', resolved);
      
      // Persist preference
      localStorage.setItem('theme', theme);
    };

    updateAppliedTheme();

    // Listen for system theme changes when in system mode
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => updateAppliedTheme();
      
      // Modern browsers
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      }
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [theme]);

  // Cycle through themes: light → dark → system → light
  const cycleTheme = () => {
    setTheme((current) => {
      if (current === 'light') return 'dark';
      if (current === 'dark') return 'system';
      return 'light';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, appliedTheme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

**Key Features**:
- Three-state system: `light`, `dark`, `system`
- Reads initial preference from localStorage
- Updates `data-theme` attribute on `<html>` element
- Listens for OS theme changes when in system mode
- Provides `cycleTheme` helper for toggle button

#### ThemeToggle Component

**File**: `src/components/ThemeToggle.jsx`

```javascript
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { button } from './tokens';

const THEME_CONFIG = {
  light: { icon: Sun, label: 'Light theme', next: 'Switch to dark theme' },
  dark: { icon: Moon, label: 'Dark theme', next: 'Switch to system theme' },
  system: { icon: Monitor, label: 'System theme', next: 'Switch to light theme' },
};

export default function ThemeToggle() {
  const { theme, cycleTheme } = useTheme();
  const config = THEME_CONFIG[theme];
  const Icon = config.icon;

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className={button('ghost', 'sm')}
      aria-label={config.next}
      title={config.label}
    >
      <Icon size={16} aria-hidden="true" />
      <span className="sr-only">{config.label}</span>
    </button>
  );
}
```

**Features**:
- Displays icon representing current theme (Sun/Moon/Monitor)
- Cycles through themes on click
- Accessible: keyboard operable, screen reader friendly
- Uses existing button design tokens for consistency

#### CSS Updates

**File**: `src/index.css`

Replace the existing `@media (prefers-color-scheme: dark)` body styles with attribute selector:

```css
@import "tailwindcss";

@theme {
  --font-sans: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
}

/* ── Base ── */
body {
  @apply bg-white font-sans text-slate-900 antialiased;
}

/* Dark theme via data attribute (replaces media query) */
[data-theme="dark"] body {
  @apply bg-slate-950 text-slate-100;
}

/* Focus styles */
:focus-visible {
  outline: 2px solid #0f172a;
  outline-offset: 2px;
}

[data-theme="dark"] :focus-visible {
  outline-color: #f1f5f9;
}

/* Receipt edge used by the SIPIM preview */
.receipt-edge {
  -webkit-mask: conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) bottom / 12px 100% repeat-x;
  mask: conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) bottom / 12px 100% repeat-x;
}

/* Smooth theme transitions (respects prefers-reduced-motion) */
@media (prefers-reduced-motion: no-preference) {
  body,
  body *,
  body *::before,
  body *::after {
    transition-property: background-color, border-color, color, fill, stroke;
    transition-duration: 200ms;
    transition-timing-function: ease-in-out;
  }
}
```

**Key Changes**:
1. Replaced `@media (prefers-color-scheme: dark)` with `[data-theme="dark"]`
2. Added smooth transitions for theme changes (respects reduced motion)
3. Transitions apply to colors only (not layout properties)
4. Existing Tailwind dark mode classes continue to work

#### Tailwind Configuration

**File**: `vite.config.js` (no changes needed)

Tailwind CSS v4 automatically detects the `dark:` variant based on `.dark` class or `[data-theme="dark"]` attribute. No additional configuration required.

#### Integration with Navbar

**File**: `src/components/Navbar.jsx`

Add ThemeToggle to the desktop navigation (before Contact button):

```jsx
import ThemeToggle from './ThemeToggle';

// In desktop nav section:
<div className="hidden items-center gap-8 sm:flex">
  <div className="flex gap-7">
    {/* Existing nav links */}
  </div>
  <div className="flex items-center gap-3 border-l border-slate-200 pl-6 dark:border-slate-800">
    <ThemeToggle />
    <a href={profile.links.linkedin} /* ... */>
      Contact
    </a>
  </div>
</div>

// In mobile nav section:
<nav className="flex flex-col px-5 pb-5 pt-2">
  <div className="flex items-center justify-between pb-2">
    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Theme</span>
    <ThemeToggle />
  </div>
  {/* Existing nav links */}
</nav>
```

#### App.jsx Updates

**File**: `src/App.jsx`

Wrap the application with ThemeProvider:

```jsx
import { ThemeProvider } from './contexts/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          {/* Existing content */}
        </BrowserRouter>
      </MotionConfig>
    </ThemeProvider>
  );
}
```

---

## Data Models

### Theme State Model

```typescript
interface ThemeState {
  theme: 'light' | 'dark' | 'system';        // User's preference
  appliedTheme: 'light' | 'dark';            // Resolved theme (never 'system')
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  cycleTheme: () => void;
}
```

**Storage**:
- **Key**: `theme`
- **Value**: `"light"` | `"dark"` | `"system"`
- **Location**: `localStorage`
- **Lifecycle**: Persists until user clears browser data

### Sitemap Data Model

```typescript
interface SitemapRoute {
  path: string;           // URL path (e.g., "/about")
  priority: string;       // "0.0" to "1.0"
  changefreq: string;     // "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
}

interface SitemapConfig {
  domain: string;         // Production domain URL
  routes: SitemapRoute[];
  lastmod: string;        // ISO 8601 date (YYYY-MM-DD)
}
```

### ESLint Violation Model

```typescript
interface ESLintMessage {
  ruleId: string;         // Rule identifier (e.g., "no-unused-vars")
  severity: 1 | 2;        // 1 = warning, 2 = error
  message: string;        // Human-readable description
  line: number;           // Line number (1-indexed)
  column: number;         // Column number (1-indexed)
  nodeType: string;       // AST node type
  source: string;         // Source code line
}
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

This feature involves infrastructure configuration (ESLint/Prettier), build-time artifact generation (sitemap), and UI rendering with side effects (theme toggle with localStorage). Property-based testing is **not applicable** for the following reasons:

1. **ESLint/Prettier Configuration**: These are declarative tool configurations, not functions with inputs/outputs. Validation is achieved through running the tools themselves.

2. **Sitemap Generation**: This is a build-time script with deterministic output based on a static route list. The script behavior doesn't vary meaningfully with input—it always produces the same XML structure for the same route configuration.

3. **Theme Toggle UI**: This feature involves:
   - UI rendering (not suitable for PBT)
   - Side effects (localStorage, DOM attribute mutations)
   - External dependencies (browser APIs)
   - One-time event handling (clicks, system theme changes)

**Alternative Testing Strategies**:
- **ESLint/Prettier**: Run tools against sample code, verify exit codes and output
- **Sitemap**: Unit tests with example route configurations, verify XML structure
- **Theme Toggle**: Component tests with React Testing Library, verify DOM state and localStorage calls

---

## Error Handling

### ESLint Error Handling

**Scenarios**:
1. **Parse errors**: Invalid JavaScript syntax
   - **Response**: ESLint reports file/line/column with detailed syntax error
   - **Recovery**: Developer fixes syntax, re-runs lint

2. **Rule violations**: Code patterns violating configured rules
   - **Response**: ESLint reports violation with rule ID and auto-fix suggestion (if available)
   - **Recovery**: Run `npm run lint:fix` for auto-fixable issues, manual fix for others

3. **Configuration errors**: Invalid `.eslintrc.cjs` syntax
   - **Response**: ESLint fails to start with configuration error message
   - **Recovery**: Validate configuration file, consult ESLint documentation

**Exit Codes**:
- `0`: No violations
- `1`: Violations found (warnings or errors)
- `2`: Configuration error

### Prettier Error Handling

**Scenarios**:
1. **Unparseable code**: Syntax errors preventing formatting
   - **Response**: Prettier reports file and error location
   - **Recovery**: Fix syntax errors first (ESLint will catch these)

2. **File permission errors**: Cannot write to file
   - **Response**: Prettier reports EACCES error
   - **Recovery**: Check file permissions

3. **Formatting check failure**: Code doesn't match formatting rules
   - **Response**: `npm run format:check` exits with non-zero code (CI fails)
   - **Recovery**: Run `npm run format` to apply formatting

### Sitemap Generation Error Handling

**Scenarios**:
1. **Missing dist directory**: Build hasn't run yet
   - **Response**: Script creates directory with `fs.mkdirSync({ recursive: true })`
   - **Recovery**: Automatic (no user action needed)

2. **Missing VITE_SITE_URL**: Environment variable not set
   - **Response**: Script uses fallback domain (logs warning in future enhancement)
   - **Recovery**: Set environment variable in Vercel dashboard

3. **Write permission error**: Cannot write sitemap.xml
   - **Response**: Node.js throws EACCES error, build fails
   - **Recovery**: Check file system permissions

4. **Invalid route configuration**: Malformed route object
   - **Response**: Script generates invalid XML (caught by validators)
   - **Recovery**: Fix ROUTES array in script

### Theme Toggle Error Handling

**Scenarios**:
1. **localStorage unavailable**: Incognito mode or disabled storage
   - **Response**: `try-catch` around localStorage calls, falls back to in-memory state
   - **Recovery**: Theme preference not persisted, resets on page reload
   - **Implementation**:
     ```javascript
     try {
       localStorage.setItem('theme', theme);
     } catch (e) {
       console.warn('localStorage unavailable, theme preference will not persist');
     }
     ```

2. **Invalid stored theme value**: Corrupted localStorage data
   - **Response**: Validate retrieved value, fall back to 'system'
   - **Recovery**: Automatic (ignores invalid value)
   - **Implementation**:
     ```javascript
     const stored = localStorage.getItem('theme');
     const validThemes = ['light', 'dark', 'system'];
     return validThemes.includes(stored) ? stored : 'system';
     ```

3. **matchMedia not supported**: Very old browsers
   - **Response**: Check for `window.matchMedia` existence, fall back to 'light'
   - **Recovery**: System theme detection disabled, user can still manually toggle
   - **Implementation**:
     ```javascript
     const systemPrefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
     ```

4. **Context used outside provider**: Developer error
   - **Response**: `useTheme` throws helpful error message
   - **Recovery**: Developer wraps component tree with `ThemeProvider`
   - **Implementation**: Already included in ThemeContext design

5. **Theme transition conflicts**: Multiple rapid clicks
   - **Response**: React batches state updates, last update wins
   - **Recovery**: No user-visible issue (transitions are smooth)

---

## Testing Strategy

### Unit Testing

**Scope**: Business logic and utility functions (not included in initial implementation, but recommended for future enhancement)

**Recommended Test Cases**:

1. **Sitemap generation logic**:
   - Verify XML structure conforms to sitemaps.org schema
   - Validate date format (ISO 8601)
   - Confirm priority values are within 0.0–1.0 range
   - Test with empty route array (edge case)

2. **Theme resolution logic** (extract from context for testability):
   - Test `resolveTheme('system')` with mocked matchMedia
   - Verify theme cycling order: light → dark → system → light
   - Test localStorage parsing with valid/invalid values

**Example Test** (using Vitest):
```javascript
import { describe, it, expect } from 'vitest';
import { resolveTheme } from './theme-utils';

describe('resolveTheme', () => {
  it('returns light or dark for system theme based on media query', () => {
    // Mock matchMedia
    window.matchMedia = (query) => ({
      matches: query === '(prefers-color-scheme: dark)',
    });
    expect(resolveTheme('system')).toBe('dark');
  });

  it('returns the theme unchanged for explicit light/dark', () => {
    expect(resolveTheme('light')).toBe('light');
    expect(resolveTheme('dark')).toBe('dark');
  });
});
```

### Integration Testing

**Scope**: Component interactions and browser API usage

**Recommended Test Cases**:

1. **ThemeToggle integration**:
   - Mount component with React Testing Library
   - Simulate click events
   - Verify `data-theme` attribute changes on document root
   - Verify localStorage calls (using mock)
   - Test keyboard navigation (Tab, Enter, Space)
   - Verify ARIA attributes and screen reader announcements

2. **Sitemap accessibility**:
   - Build the project
   - Verify `dist/sitemap.xml` exists
   - Parse XML and validate structure
   - Confirm all expected routes are present

3. **ESLint/Prettier integration**:
   - Run lint on sample files with intentional violations
   - Verify exit codes
   - Run format and confirm changes are applied
   - Run lint again and confirm no style conflicts

**Example Test** (React Testing Library):
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

test('theme toggle cycles through themes', () => {
  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );

  const button = screen.getByRole('button', { name: /theme/i });
  
  // Initial state: light (or system)
  fireEvent.click(button);
  expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  
  fireEvent.click(button);
  expect(document.documentElement.getAttribute('data-theme')).toMatch(/light|dark/); // system resolves to one
  
  fireEvent.click(button);
  expect(document.documentElement.getAttribute('data-theme')).toBe('light');
});
```

### Manual Testing Checklist

**ESLint & Prettier**:
- [ ] Run `npm run lint` on codebase with no violations
- [ ] Introduce a violation (unused variable), verify lint catches it
- [ ] Run `npm run format` and verify consistent formatting
- [ ] Test IDE integration (ESLint warnings appear in VS Code)

**Sitemap**:
- [ ] Run `npm run build` and verify `dist/sitemap.xml` is created
- [ ] Open sitemap in browser and verify XML is well-formed
- [ ] Validate sitemap with Google Search Console validator
- [ ] Verify all routes (/, /about, /projects) are present

**Dark Mode Toggle**:
- [ ] Toggle theme and verify smooth transition (no flash)
- [ ] Reload page and verify theme preference persists
- [ ] Clear localStorage and verify fallback to system theme
- [ ] Change OS theme (system mode) and verify app updates
- [ ] Test with `prefers-reduced-motion` enabled (transitions disabled)
- [ ] Test keyboard navigation (Tab to toggle, Enter to activate)
- [ ] Test with screen reader (NVDA/JAWS/VoiceOver) and verify announcements
- [ ] Verify focus indicators meet WCAG 2.1 AA contrast
- [ ] Test in mobile viewport (toggle appears in mobile menu)
- [ ] Test in incognito mode (localStorage unavailable fallback)

### Accessibility Testing

**Requirements**:
- Theme toggle must be keyboard accessible (Tab, Enter, Space)
- Screen readers must announce current theme and theme changes
- Dark mode must maintain WCAG 2.1 Level AA contrast ratios (4.5:1 for text, 3:1 for UI components)
- Focus indicators must be visible in both light and dark themes

**Testing Tools**:
- **axe DevTools**: Automated accessibility scanning
- **Lighthouse**: Accessibility audit in Chrome DevTools
- **Screen readers**: NVDA (Windows), JAWS (Windows), VoiceOver (macOS)
- **Contrast checkers**: WebAIM Contrast Checker, Chrome DevTools color picker

**Validation**:
- Run Lighthouse audit and verify 100 accessibility score maintained
- Test with screen reader and verify all interactive elements are announced
- Use contrast checker on all text/background combinations in dark mode
- Verify reduced motion preference disables theme transitions

---

## Dependencies

### New Dependencies

```json
{
  "devDependencies": {
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.34.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-config-prettier": "^9.1.0",
    "prettier": "^3.2.5"
  }
}
```

### Existing Dependencies (No Changes)

```json
{
  "dependencies": {
    "framer-motion": "^11.15.0",
    "lucide-react": "^0.468.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.28.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@vitejs/plugin-react": "^4.3.4",
    "tailwindcss": "^4.0.0",
    "vite": "^6.0.0"
  }
}
```

**Total New Dependencies**: 5 dev dependencies (all for linting/formatting)

---

## Implementation Plan

### Phase 1: ESLint and Prettier Setup

**Estimated Effort**: 1-2 hours

1. Install dependencies:
   ```bash
   npm install -D eslint eslint-plugin-react eslint-plugin-react-hooks eslint-config-prettier prettier
   ```

2. Create configuration files:
   - `.eslintrc.cjs` (ESLint configuration)
   - `.prettierrc.json` (Prettier configuration)
   - `.prettierignore` (Prettier ignore patterns)

3. Add npm scripts to `package.json`:
   - `lint`, `lint:fix`, `format`, `format:check`

4. Run formatter on codebase:
   ```bash
   npm run format
   ```

5. Run linter and fix violations:
   ```bash
   npm run lint:fix
   npm run lint
   ```

6. Test integration:
   - Introduce intentional violation, verify lint catches it
   - Verify no conflicts between ESLint and Prettier

**Acceptance Criteria**:
- ✓ `npm run lint` passes with zero warnings/errors
- ✓ `npm run format:check` passes
- ✓ Configuration files are committed

---

### Phase 2: Sitemap Generation

**Estimated Effort**: 1 hour

1. Create directory structure:
   ```bash
   mkdir scripts
   ```

2. Create sitemap script:
   - `scripts/generate-sitemap.js` (as detailed in Components section)

3. Update `package.json` build script:
   ```json
   "build": "vite build && node scripts/generate-sitemap.js"
   ```

4. Configure production URL:
   - Add `VITE_SITE_URL` to Vercel environment variables
   - Or update hardcoded domain in script

5. Update `public/robots.txt`:
   - Add sitemap reference

6. Test locally:
   ```bash
   npm run build
   cat dist/sitemap.xml
   ```

7. Validate sitemap:
   - Use Google Search Console sitemap validator
   - Or online XML validator

**Acceptance Criteria**:
- ✓ `npm run build` generates `dist/sitemap.xml`
- ✓ Sitemap contains all routes (/, /about, /projects)
- ✓ XML is well-formed and validates against sitemaps.org schema
- ✓ Sitemap is accessible at `/sitemap.xml` after deployment

---

### Phase 3: Dark Mode Toggle Implementation

**Estimated Effort**: 3-4 hours

1. Create ThemeContext:
   - `src/contexts/ThemeContext.jsx` (as detailed in Components section)

2. Create ThemeToggle component:
   - `src/components/ThemeToggle.jsx` (as detailed in Components section)

3. Update App.jsx:
   - Wrap application with `ThemeProvider`

4. Update Navbar.jsx:
   - Import and place `ThemeToggle` in desktop and mobile navigation
   - Adjust layout to accommodate toggle button

5. Update CSS:
   - Replace `@media (prefers-color-scheme: dark)` with `[data-theme="dark"]`
   - Add transition styles (respecting reduced motion)

6. Test functionality:
   - Manual testing checklist (see Testing Strategy section)
   - Verify localStorage persistence
   - Test accessibility with keyboard and screen reader

7. Cross-browser testing:
   - Chrome, Firefox, Safari, Edge
   - Test system theme detection on each platform

**Acceptance Criteria**:
- ✓ Theme toggle appears in navbar (desktop and mobile)
- ✓ Clicking toggle cycles through light/dark/system modes
- ✓ Theme preference persists across page reloads
- ✓ System mode responds to OS theme changes
- ✓ Transitions are smooth (with reduced motion support)
- ✓ Keyboard accessible (Tab, Enter, Space)
- ✓ Screen reader announces theme changes
- ✓ Dark mode maintains WCAG 2.1 AA contrast ratios
- ✓ No visual regressions in existing components

---

## Migration and Deployment

### Backward Compatibility

**No Breaking Changes**:
- ESLint/Prettier: Developer tooling only, no runtime impact
- Sitemap: Additive (new file), doesn't affect existing functionality
- Dark Mode: Defaults to system theme (existing behavior), adds user control

**CSS Migration**:
- Replacing media query with data attribute requires updating existing dark mode styles
- All components using Tailwind's `dark:` classes continue to work (Tailwind v4 supports `[data-theme="dark"]`)

### Deployment Checklist

1. **Pre-deployment**:
   - [ ] Run `npm run lint` and `npm run format:check` (both pass)
   - [ ] Run `npm run build` locally and verify sitemap generation
   - [ ] Test dark mode toggle in development

2. **Vercel Configuration**:
   - [ ] Set `VITE_SITE_URL` environment variable (e.g., `https://sionfelix.dev`)
   - [ ] Verify `vercel.json` includes SPA routing (already configured)

3. **Post-deployment**:
   - [ ] Verify sitemap accessible at `/sitemap.xml`
   - [ ] Submit sitemap to Google Search Console
   - [ ] Submit sitemap to Bing Webmaster Tools
   - [ ] Test dark mode toggle in production
   - [ ] Run Lighthouse audit (verify accessibility score maintained)

4. **Monitoring**:
   - [ ] Check browser console for errors (localStorage warnings, etc.)
   - [ ] Monitor analytics for theme toggle usage
   - [ ] Validate sitemap monthly (ensure routes stay synchronized)

---

## Future Enhancements

### Optional Improvements (Not in Scope)

1. **Pre-commit Hooks**:
   - Use Husky + lint-staged to run ESLint/Prettier on staged files before commit
   - Prevents committing code with violations

2. **CI/CD Integration**:
   - Add GitHub Actions workflow to run `lint` and `format:check` on PRs
   - Block merge if checks fail

3. **Sitemap Automation**:
   - Auto-detect routes from React Router configuration
   - Generate lastmod from file modification timestamps
   - Add dynamic routes (e.g., project detail pages if added)

4. **Theme Enhancements**:
   - Add theme transition animation (fade/slide effect)
   - Support per-page theme persistence (remember theme per route)
   - Add theme preview (show light/dark side-by-side before applying)

5. **Testing Infrastructure**:
   - Set up Vitest for unit testing
   - Add React Testing Library for component tests
   - Configure coverage reporting

---

## References

### Documentation

- [ESLint Documentation](https://eslint.org/docs/latest/)
- [Prettier Documentation](https://prettier.io/docs/en/)
- [Sitemaps.org Protocol](https://www.sitemaps.org/protocol.html)
- [React Context API](https://react.dev/reference/react/useContext)
- [Tailwind CSS v4 Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Tools

- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [axe DevTools](https://www.deque.com/axe/devtools/)

### Standards

- **Sitemaps Protocol**: XML sitemap format specification
- **ARIA 1.2**: Accessible Rich Internet Applications specification
- **WCAG 2.1 Level AA**: Web Content Accessibility Guidelines

---

## Glossary Mapping

| Requirement Term | Design Implementation |
|-----------------|----------------------|
| Portfolio_Site | React + Vite application |
| ESLint | `.eslintrc.cjs` + eslint npm package |
| Prettier | `.prettierrc.json` + prettier npm package |
| Linter | ESLint CLI (`eslint` command) |
| Formatter | Prettier CLI (`prettier` command) |
| Sitemap | `dist/sitemap.xml` generated by `scripts/generate-sitemap.js` |
| Theme_Toggle | `ThemeToggle` component in Navbar |
| Theme_Preference | State managed by ThemeContext, stored in localStorage |
| Local_Storage | Browser `localStorage` API |
| System_Theme | OS preference detected via `matchMedia('(prefers-color-scheme: dark)')` |
| Build_Process | Vite build pipeline + sitemap generation script |
| Package_Manager | npm (runs scripts defined in package.json) |

---

## Conclusion

This design integrates ESLint, Prettier, sitemap generation, and manual dark mode toggle into the existing React portfolio architecture with minimal disruption. The approach prioritizes:

- **Simplicity**: Lightweight implementations without unnecessary dependencies
- **Maintainability**: Clear separation of concerns, well-documented code
- **Accessibility**: WCAG 2.1 Level AA compliance, keyboard and screen reader support
- **Developer Experience**: Automated tooling, clear error messages, IDE integration
- **SEO**: Standards-compliant sitemap, automated generation

The phased implementation plan allows incremental delivery, with each phase independently testable and deployable. All components integrate seamlessly with the existing Vite + React + Tailwind CSS v4 + Framer Motion stack.
