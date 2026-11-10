# 🚀 The Tiny Site — Homepage Recreation

A modern, responsive, and visually pixel-perfect recreation of [The Tiny Site](https://thetinysite.vercel.app/).

This project showcases a clean user interface, smooth scrolling, interactive animations, and dark/light mode toggle functionality using the latest React and Next.js ecosystem.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Live Demo](https://thetinysite.vercel.app/)
- [Design & Planning](#-design--planning)
- [Screenshots](#-screenshots)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Responsive Design](#-responsive-design)
- [Installation and Setup](#-installation-and-setup)
- [Developer Information](#-developer-information)

---

## 🔍 Project Overview

The goal of this assignment is to recreate the homepage of **The Tiny Site** with a focus on code quality, responsiveness, smooth animations, and seamless dark/light mode integration.

### Core Objectives
* Clean, modular, and maintainable TypeScript codebase.
* Smooth scrolling and interactive Micro-animations.
* Fully responsive layout supporting Mobile, Tablet, and Desktop screens.
* Dynamic theme switcher using Next-Themes and Tailwind CSS.

---

## 🌐 Live Demo

* **Live Site:** [https://thetinysite.vercel.app](https://thetinysite.vercel.app/) *(Replace with your actual link)*
* **GitHub Repository:** [https://github.com/halimaashu/thetiny.site](https://github.com/halimaashu/thetiny.site)

---

## 🎨 Design & Planning

Before coding, the layout structure, section hierarchies, and responsive breakpoints were mapped out via hand-drawn wireframes to ensure precise UI alignment.

<p align="center">
  <img src="./planing.jpg" alt="Design Planning Sketch" width="800" />
  <br />
  <em>Hand-drawn Notebook Wireframe & Layout Planning</em>
</p>

---

## 📸 Screenshots

### 💻 Desktop View

| Light Mode | Dark Mode |
| :---: | :---: |
| <img src="./desktop-light.jpg" alt="Desktop Light Mode" width="400" /> | <img src="./desktop-dark.png" alt="Desktop Dark Mode" width="400" /> |

### 📱 Mobile View

| Light Mode | Dark Mode |
| :---: | :---: |
| <img src="./mobile-light.jpg" alt="Mobile Light Mode" width="200" /> | <img src="./mobile-dark.jpg" alt="Mobile Dark Mode" width="200" /> |

---

## ✨ Key Features

- **Pixel-Perfect UI:** Closely follows the original layout, typography, and spacing of the reference site.
- **Theme Switcher:** Seamless transition between Light and Dark themes with zero layout shift.
- **Smooth Inertial Scrolling:** Integrated Lenis smooth scroll for a fluid user experience.
- **Fluid Animations:** Scroll-triggered motion effects and hover micro-interactions powered by Framer Motion.
- **Accessible UI Components:** Accessible buttons, navbars, and interactive cards built using HeroUI.
- **Fully Responsive Layout:** Optimized mobile navigation drawer and dynamic multi-column layouts for desktop viewports.

---

## 🛠️ Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

| Category | Technology Used |
| :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering/) |
| **UI Components** | [HeroUI](https://heroui.com/) |
| **Icons** | [React Icons](https://react-icons.github.io/react-icons/) / [Gravity UI](https://gravity-ui.com/) |
| **Theme Management**| [Next-Themes](https://github.com/pacocoursey/next-themes) |
| **Deployment** | [Vercel](https://vercel.com) |

---

## 📁 Folder Structure

```text
the-tiny-site-recreation/
├── public/
│   ├── favicon.ico
│   └── images/
├── screenshots/
│   ├── desktop-dark.png
│   ├── desktop-light.png
│   ├── mobile-dark.png
│   ├── mobile-light.png
│   └── planning-sketch.jpg
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── common/
│   │   │   ├── Footer.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── sections/
│   │   │   ├── AboutSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   └── HeroSection.tsx
│   │   └── ui/
│   ├── hooks/
│   │   └── useSmoothScroll.ts
│   ├── providers/
│   │   └── ThemeProvider.tsx
│   └── types/
│       └── index.ts
├── .gitignore
├── next.config.mjs
├── package.json
├── README.md
├── tailwind.config.ts
└── tsconfig.json

## 📦 Installation and Setup

Follow these steps to get the project running locally on your machine.

### Prerequisites

Ensure you have the following installed on your local environment:
- **Node.js:** `v18.0.0` or higher
- **npm** or **yarn** or **pnpm**

---

### 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/halimaashu/thetiny.site.git](https://github.com/halimaashu/thetiny.site.git)
   cd thetiny.site