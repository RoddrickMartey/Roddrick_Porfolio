# Frontend – Portfolio Website

This is the **React frontend** for the portfolio site. It uses **Redux Toolkit**, **Tailwind CSS**, and **ShadCN/UI** for a modern design and state management.

---

## 🚀 Features

- Responsive layout with Tailwind CSS
- Redux Toolkit for global state
- Axios for API calls
- Theme switcher (Light/Dark)
- Pages: Home, About, Projects, Contact
- Client-side routing with React Router v6

---

## 📂 Structure

```
/src
  ├── app          # Redux store
  ├── features     # Redux slices (auth, theme, projects, ui)
  ├── components   # UI components (including ShadCN UI)
  ├── pages        # Home, About, Projects, Contact
  ├── layouts      # Layout wrappers (add later)
  ├── services     # Axios instance + API calls (add later)
  └── main.jsx
```

---

## ⚙️ Setup

```bash
pnpm install
pnpm dev
```

---

## 🧰 Commands

| Command        | Description              |
| -------------- | ------------------------ |
| `pnpm dev`     | Start development server |
| `pnpm build`   | Build for production     |
| `pnpm preview` | Preview production build |

---

## 🔗 Technologies

- React 18
- Redux Toolkit
- Tailwind CSS
- ShadCN/UI (Radix + Tailwind-based components)
- Axios
- React Router

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
