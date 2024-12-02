# aimansalim.com

Personal portfolio website implementing modern web development practices.

## Core Features

- Responsive design optimized for all viewport sizes
- Server-side rendering for improved performance
- Type-safe development with TypeScript
- Modular component architecture
- Efficient build system using Vite
- 3D graphics integration with Three.js
- CSS optimization with Tailwind

## Technology Stack

- React 18.x
- TypeScript 5.x
- Vite
- Tailwind CSS
- Three.js
- GSAP for animations
- GitHub Pages for deployment

## Development Setup

### Requirements

- Node.js version 16.0 or higher
- npm or yarn package manager

### Local Development

1. Clone the repository
```bash
git clone https://github.com/aimansalim/aimansalim.com.git
cd aimansalim.com
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start development server
```bash
npm run dev
# or
yarn dev
```

4. Access development server at `http://localhost:5173`

## Deployment

This site is automatically deployed via Cloudflare Pages. Any push to the `main` branch triggers a new deployment.

### Deployment Process
1. Changes pushed to `main` branch
2. Cloudflare Pages automatically detects the push
3. Builds the project using: `npm install && npm run build`
4. Deploys to: [aimansalim.com](https://aimansalim.com)

## Project Structure

```
aimansalim.com/
├── src/                    # Source files
│   ├── components/         # React components
│   ├── assets/            # Static assets
│   └── styles/            # Global styles
├── public/                # Public assets
└── package.json          # Project dependencies
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- Website: [aimansalim.com](https://aimansalim.com)
- GitHub: [@aimansalim](https://github.com/aimansalim)

## Acknowledgments

Special thanks to:
- Three.js community for 3D graphics inspiration
- React and TypeScript teams for amazing tools
- All open-source contributors

---

Made with ❤️ by Aiman Salim
