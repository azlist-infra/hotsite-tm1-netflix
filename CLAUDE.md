# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AZ Staff is a Next.js 15 application using the App Router, TypeScript, and Chakra UI v3 for the design system. The project supports multiple layout patterns for different application contexts (hotsite, auth, app, docs, events).

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm lint
```

## Architecture

### Path Aliases

The project uses extensive path mapping configured in `tsconfig.json`:

- `@/*` - Root src directory
- `@/app/*` - App directory
- `@/providers/*` - Provider components
- `@/lib/*` - Library utilities
- `@/components/*` - Reusable components (aliased to `src/lib/components`)
- `@/ui` - UI component index
- `@/hooks/*` - React hooks
- `@/types/*` - TypeScript types
- `@/utils/*` - Utility functions
- `@/services/*` - Service layer
- `@/layouts/*` - Layout components

### Application Structure

The app follows a route-group pattern with dedicated layouts:

1. **Root pages** (`src/app/`) - Public hotsite using `LayoutHotsite`
2. **Auth routes** (`src/app/auth/`) - Authentication pages using `LayoutAuth`
3. **App routes** (`src/app/app/`) - Main application using `LayoutApp`
4. **Event routes** (`src/app/app/(event)/`) - Event-specific UI using `LayoutAppEvent`
5. **Docs routes** (`src/app/docs/`) - Documentation using `LayoutDocs`

### Layout System

Layouts are composable and located in `src/layouts/`:

- **Layout components** (`src/layouts/layout/`) - Main layout wrappers exported from index
- **Headers** (`src/layouts/header/`) - Context-specific headers (hotsite, auth, app)
- **Footers** (`src/layouts/footer/`) - Footer components
- **Menus** (`src/layouts/menu/`) - Navigation menus (MenuHotsite, MenuApp, MenuUser)
- **Sidebars** (`src/layouts/sidebar/`) - Sidebar components (SidebarEvent, SidebarDocs)
- **Wrappers** (`src/layouts/wrapper/`) - Container components (Center, MaxWidth, Full)

All layouts support optional `header` and `footer` props for customization. Most layouts support a `fullWidth` prop to bypass container constraints.

### Theme System

Chakra UI v3 theme is configured in `src/theme/`:

- `src/theme/index.ts` - Main theme configuration with custom tokens
- `src/theme/fonts.ts` - Google Fonts integration
- `src/theme/tokens/text.ts` - Text styles and font family tokens
- Custom colors: `primary`, `secondary`, `azstaff`, `azlist`, `brand.*`
- Semantic color tokens for brand variants

The theme extends Chakra's default config and uses the design token system.

### Provider Setup

Root provider in `src/providers/ChakraProvider.tsx` wraps:
1. Chakra UI Provider with custom theme
2. next-themes ThemeProvider for dark mode support

All layouts must be client components (`'use client'`) due to Chakra UI requirements.

### Chakra UI Type Generation

When modifying theme tokens, regenerate TypeScript types:

```bash
npx @chakra-ui/cli typegen src/theme/index.ts
```

**Note**: Temporarily comment out Google Fonts imports in `src/theme/fonts.ts` before running the CLI, then restore them afterward (see `docs/INSTALL.MD`).

### Image Configuration

Next.js images are configured to allow remote patterns from `https://azstaff.com.br/**` in `next.config.ts`. Chakra UI package imports are optimized.

### Language

The application is configured for Brazilian Portuguese (`pt-BR`) as the primary language.
