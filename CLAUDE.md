# GridConstructor

A 3D perspective construction tool built with Next.js and React. The app renders a 3D canvas where users can place points in 3D space and view them from a configurable perspective using a custom projection engine.

## Project Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19
- **Language**: TypeScript 5 (strict mode)
- **Styling**: CSS Modules + globals.css
- **Build/Dev**: `npm run dev` / `npm run build`
- **Linting**: `npm run lint` (ESLint 9)

## Key Commands

```bash
npm run dev     # Start dev server
npm run build   # Build for production
npm run lint    # Run ESLint
```

## Project Structure

```
src/app/
  GCEngine.ts           # Core 3D projection engine (singleton, "use client")
  GCView.tsx            # Canvas component — renders the 3D view
  page.tsx              # Main page
  layout.tsx            # Root layout
  data.ts               # Static data (gizmo lines, etc.)
  SettingsDialog.tsx    # Camera/perspective settings UI
  NewPoint.tsx          # UI for adding new 3D points
  SelectedPoint.tsx     # UI for a selected point
  GenericNumberInput.tsx # Reusable number input component
  globals.css / App.css # Global styles
```

## Architecture Notes

- `GCEngine` is a singleton class exported as `export default new GCEngine()`. It is marked `"use client"` and uses `localStorage` for persistence and `window` directly — it must only run in the browser.
- The projection uses a perspective transform with configurable rotation, elevation, distance, and picture plane parameters.
- 3D coordinates use `{x, y, z}` (type `Vec`); projected 2D canvas coordinates use `{h, v}` (type `Point`).
- Points in a drawing are stored as a dictionary keyed by `"x,y,z"` strings.
- Settings and the current drawing are persisted to `localStorage` under the keys `gc_settings` and `gc_current_drawing`.

## Migration Context

This project was migrated from Create React App to Next.js (App Router) to resolve security vulnerabilities in legacy CRA dependencies. Old CRA entry files (`src/index.tsx`, `src/serviceWorker.ts`, `public/`) remain in the repo but are not used by Next.js.

## Coding Conventions

- Use TypeScript strict mode — avoid `any` where possible
- Keep engine logic in `GCEngine.ts`, UI logic in React components
- All client-side components that use browser APIs must include `"use client"` at the top
- Path alias `@/*` maps to `./src/*`
