# Brytebee | Senior Full Stack Developer Portfolio

> **Engineered Simplicity.** A data-driven, high-performance portfolio built for the modern web.

Built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**. This project showcases a premium, minimalist design philosophy focusing on content, typography, and micro-interactions.

---

## 🚀 Key Features

- **⚡️ Next.js 16 App Router**: Leveraging the latest React Server Components for optimal performance.
- **🎨 Engineered Simplicity**: A "dark-mode first" aesthetic with high-contrast typography and subtle glassmorphism.
- **📄 Zero-Config Content**: Entirely data-driven. Modify `lib/data.ts` and the UI updates instantly. No hardcoded HTML text.
- **🌗 Dynamic Theming**: Built-in dark/light mode support with smooth transitions (via `next-themes`).
- **📱 Fully Responsive**: Mobile-first architecture ensuring perfect rendering on all devices.
- **🔒 Type-Safe**: Comprehensive TypeScript coverage for a robust development experience.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Font**: [Geist Sans & Mono](https://vercel.com/font)

## 🏎️ Getting Started

### Prerequisites

- Node.js 18+
- npm, pnpm, or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/brytebee.git
   cd brytebee
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📝 Customization

This portfolio is designed to be easily forkable and customizable.

**1. Update Content:**
Navigate to `lib/data.ts`. This single file contains all the string data for the application including:

- Personal Info (Name, Role, Bio, Socials)
- Skills Matrix
- Experience History
- Projects
- Recommendations

**2. Update Theme:**
Tailwind 4 configuration is handled via CSS variables. Check `app/globals.css` to tweak the color palette.

## 📂 Project Structure

```bash
├── app/                  # Next.js App Router pages
├── components/           # Reusable UI components
├── lib/                  # Utilities and Data
│   └── data.ts           # CENTRAL DATA SOURCE
├── public/               # Static assets
└── ...
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is licensed under the MIT License.

---

_Designed and Developed by Bright Atsighi_
