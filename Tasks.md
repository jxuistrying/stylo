# Week 1, Day 1: Project Setup & Routing Tasks

Keep this file open in a tab to track your progress! Place an `x` in the brackets as you complete each file.

## 1. `src/app/globals.css`
- [ ] Delete all default Next.js boilerplate css.
- [ ] Add `@import "tailwindcss";` at the very top.

## 2. `src/components/Navbar.tsx`
- [ ] Create the `src/components/` folder if it doesn't exist.
- [ ] Create `Navbar.tsx`.
- [ ] Import `Link` from `"next/link"`.
- [ ] Create and export a `Navbar` function returning a `<nav>` element.
- [ ] Add a `<Link>` for Home (`/`), Dashboard (`/dashboard`), and Login (`/login`).
- [ ] Style it with Tailwind (`flex`, `justify-between`, `items-center`, `p-6`, etc.).

## 3. `src/app/layout.tsx`
- [ ] Import your new `Navbar` at the top: `import Navbar from "@/components/Navbar";`
- [ ] Inside the `RootLayout` function, find the `<body>` tag.
- [ ] Add `<Navbar />` right above `{children}` so the navbar appears on every single page.

## 4. `src/app/page.tsx` (Landing Page)
- [ ] Delete all the default Next.js starting code inside the `Home` function.
- [ ] Return a simple `<div>`.
- [ ] Add an `<h1>` heading (e.g., "Stylo - Turn Inspiration into Reality").
- [ ] Add a short description `<p>`.
- [ ] Add two `<Link>` buttons: one to `/login` and one to `/dashboard`.
- [ ] Style it to look like a hero section (`flex col`, `items-center`, `text-center`, etc.).

## 5. `src/app/dashboard/page.tsx` (Dashboard)
- [ ] Create a `dashboard` folder inside `src/app/`.
- [ ] Create a `page.tsx` file inside that folder.
- [ ] Create and export a `DashboardPage` function.
- [ ] Add a heading (`<h1>Your Inspiration Board</h1>`).
- [ ] Add a grid container for outfits: `<div className="grid grid-cols-1 md:grid-cols-3 gap-6">`.
- [ ] Put a few placeholder `<div>` boxes inside the grid to simulate uploaded outfit cards.
- [ ] Add an empty "Upload Image" card as the first item.
