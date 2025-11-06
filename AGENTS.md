# Agent Instructions for expo-weather

This document provides guidelines for AI agents working on this codebase.

## Developer Context

- The developer is a beginner in React Native and Expo, though they have completed the Expo tutorial app.
- They are experienced in React, especially with React Router v7 framework mode.

## Build, Lint, and Test Commands

- **Lint:** `pnpm lint`
- **Format:** `pnpm format`
- **Build:** `pnpm build:dev`, `pnpm build:preview`, `pnpm build:prod`
- **Start:** `pnpm start`
- **Test:** There is no dedicated test command.

## Code Style Guidelines

### Formatting

- **Print Width:** 100 characters
- **Tab Width:** 2 spaces
- **Quotes:** Single quotes
- **Trailing Comma:** es5
- **Bracket Spacing:** `bracketSameLine: true`
- Run `pnpm format` to apply formatting.

### Linting

- This project uses ESLint with `eslint-config-expo`.
- Run `pnpm lint` to check for linting errors.

### Naming Conventions

- **Components:** `PascalCase` (e.g., `MyComponent`)
- **Functions/Variables:** `camelCase` (e.g., `myFunction`)
- **Constants:** `UPPER_SNAKE_CASE` (e.g., `MY_CONSTANT`)
- **Hooks:** `use` prefix (e.g., `useMyHook`)

### Imports

- Group imports by source (external, internal).
- Use the `@/` path alias for internal imports (e.g., `import { MyComponent } from '@/components/MyComponent';`).
- Import React as `import * as React from 'react';`.

### Types

- This project uses TypeScript with strict mode enabled.
- Define types using `type` aliases.
- All function component props should be typed.

### State Management

- Use Zustand for global state management.
- Define store interfaces with TypeScript.

### Styling

- Use NativeWind (Tailwind CSS for React Native).
- Use `class-variance-authority` (cva) for component variants.
- Use `Platform.select` for platform-specific code/styles.

### Error Handling

- Use `try...catch` blocks for operations that may fail.
- Use `Alert.alert` to display error messages to the user.
