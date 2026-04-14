# FizzBuzz

[![Netlify Status](https://api.netlify.com/api/v1/badges/34209c99-2a60-46c8-bde3-ff436b38c8af/deploy-status)](https://app.netlify.com/projects/fs3fizzbuzz/deploys)

> Interactive FizzBuzz coding challenge — configurable divisors, color-coded output, and multi-language code display.

## About

FizzBuzz is a classic programming challenge: count from 1 to N, replacing multiples of a **Fizz** divisor with *"Fizz"*, multiples of a **Buzz** divisor with *"Buzz"*, and multiples of both with *"FizzBuzz"*.

This project extends the classic by letting you configure both divisors and the range, then instantly visualises the full color-coded sequence. It also shows the algorithm implemented in four languages with Prism.js syntax highlighting.

## Features

- **Configurable solver** — set Fizz divisor (2–100), Buzz divisor (2–100), and count-to limit (1–1000)
- **Color-coded sequence** — Fizz (blue), Buzz (green), FizzBuzz (orange), numbers (gray)
- **Live statistics** — counts for each label type shown after every generation
- **Code page** — four-language implementations (JavaScript, Python, Java, C#) with Prism.js Okaidia theme
- **Dark / light theme** — persisted to `localStorage`, respects `prefers-color-scheme`
- **WCAG 2.1 AA** — semantic landmarks, ARIA attributes, keyboard nav, focus indicators, reduced-motion support
- **Netlify ready** — zero-config deployment with `netlify.toml`

## Quick Start

### Prerequisites

- [Node.js 22.20.0 LTS](https://nodejs.org/) (`.nvmrc` provided for nvm users)

### Installation

```bash
git clone https://github.com/ValhallaTech/FizzBuzz.git
cd FizzBuzz
yarn install
```

### Development

```bash
yarn dev          # Start dev server → http://localhost:1234
```

### Production Build

```bash
yarn build        # Output to dist/
```

## Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start Parcel dev server on localhost:1234 |
| `yarn build` | Production build → `dist/` |
| `yarn clean` | Remove `dist/` and `.parcel-cache/` |
| `yarn lint` | Lint JS with ESLint |
| `yarn format` | Format with Prettier |
| `yarn test` | Run Jest unit tests |
| `yarn test:coverage` | Run tests with coverage report |

## Tech Stack

### Frontend
- **Bootstrap 5.3.8** — Responsive UI framework
- **Font Awesome 7.2.0** — Icon library
- **Prism.js 1.30.0** — Syntax highlighting (Okaidia theme)
- **ES6+ JavaScript** — Modular, import-based source

### Build Tools
- **Parcel 2.16** — Zero-config bundler
- **ESLint 10** — Code linting
- **Prettier 3** — Code formatting
- **Jest 30** — Unit testing

### Deployment
- **Netlify** — Hosting with CDN (`netlify.toml` included)
- **Node.js 24.14.1** — Build environment

## Project Structure

```
FizzBuzz/
├── src/
│   ├── index.html              # Home page
│   ├── solve.html              # Interactive solver
│   ├── code.html               # Algorithm + code display
│   ├── images/                 # Favicons
│   ├── js/
│   │   ├── main.js             # Home page entry point
│   │   ├── solve.js            # Solve page entry point
│   │   ├── code.js             # Code page entry point
│   │   ├── fizzBuzz.js         # Core algorithm (pure functions)
│   │   ├── themeToggle.js      # Dark/light mode
│   │   ├── toast.js            # Toast notifications
│   │   ├── resultsDisplay.js   # Sequence rendering
│   │   └── codeDisplay.js      # Prism.js integration
│   ├── styles/
│   │   └── custom.css          # Custom styles + CSS variables
│   └── code-examples/
│       ├── javascript.txt      # JS FizzBuzz implementation
│       ├── python.txt          # Python implementation
│       ├── java.txt            # Java implementation
│       └── csharp.txt          # C# implementation
├── src/__tests__/
│   ├── __mocks__/              # Jest mock files
│   ├── fizzBuzz.test.js        # Core algorithm tests
│   ├── resultsDisplay.test.js  # Rendering tests
│   ├── themeToggle.test.js     # Theme tests
│   └── toast.test.js           # Toast tests
├── dist/                       # Production build (git-ignored)
├── netlify.toml                # Netlify configuration
├── package.json                # Dependencies and scripts
├── .nvmrc                      # Node version (22.20.0)
├── eslint.config.mjs           # ESLint flat configuration
├── .prettierrc                 # Prettier configuration
├── babel.config.json           # Babel (for Jest)
└── jest.config.json            # Jest configuration
```

> **Note on legacy files:** The repository also contains the original ASP.NET WebForms project (`FizzBuzz.sln`, `FizzBuzz.csproj`, `Web.config`, and root-level `index.html`/`Solve.html`/`Code.html`). These are preserved for reference. The authoritative source is the `src/` directory — all development, building, and deployment work should be performed there.

## Deploy to Netlify

```bash
yarn dlx netlify-cli@latest login
yarn dlx netlify-cli@latest init
yarn dlx netlify-cli@latest deploy --prod
```

Or connect the GitHub repository in the Netlify dashboard. The `netlify.toml` already sets:

```toml
[build]
  command = "yarn build"
  publish = "dist"
  [build.environment]
    NODE_VERSION = "24.14.1"
    YARN_VERSION = "4.13.0"
```

## SunsetHills Component Adoption

This project modernises the original FizzBuzz stack to match the patterns used in [ValhallaTech/SunsetHills](https://github.com/ValhallaTech/SunsetHills).

| Component | Adopted | Notes |
|-----------|---------|-------|
| Bootstrap 5 | ✅ | Upgraded from Bootstrap 4 CDN |
| Font Awesome | ✅ | Same version |
| Prism.js (code page) | ✅ | Same Okaidia theme |
| Dark/light theme toggle | ✅ | Identical implementation |
| Toast notifications | ✅ | Identical implementation |
| Parcel bundler | ✅ | Same config approach |
| ESLint + Prettier | ✅ | Same rule sets |
| Jest unit tests | ✅ | Adapted for FizzBuzz modules |
| netlify.toml | ✅ | Adapted for Yarn build commands |
| Chart.js / drag plugin | ❌ | Not relevant to FizzBuzz |
| chartjs-plugin-dragdata | ❌ | Not relevant to FizzBuzz |
| Statistics module | ❌ | Inline stats in resultsDisplay |
| Preset scenarios | ❌ | Not applicable |

## Browser Support

- Chrome / Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Author

**ValhallaTech** · [GitHub](https://github.com/ValhallaTech)

## License

MIT License — see [LICENSE](LICENSE) for details.
