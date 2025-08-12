# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Ionic v8 Angular TypeScript hybrid mobile application targeting iOS, Android, and web platforms. The project uses Angular 20 with standalone components (no NgModules), Capacitor 7 for native functionality, and implements a photo gallery feature.

## Essential Commands

### Development
```bash
npm start                    # Start dev server at http://localhost:4200
npm run build               # Production build to www/ directory
npm test                    # Run Karma unit tests
npm run lint                # Run ESLint
```

### Capacitor/Native Development
```bash
npx cap sync                # Sync web assets to native projects (run after build)
npx cap run ios            # Build and run on iOS simulator/device
npx cap run android        # Build and run on Android emulator/device
npx cap open ios           # Open Xcode project
npx cap open android       # Open Android Studio project
```

### Typical Workflow for Native Features
1. Make changes to TypeScript/Angular code
2. `npm run build` to compile to www/
3. `npx cap sync` to copy assets to native projects
4. `npx cap run [platform]` to test on device

## Architecture & Key Patterns

### Angular Standalone Components
All components use Angular's modern standalone API. When creating new components:
- Import Ionic components directly from `@ionic/angular/standalone`
- No NgModules needed - use direct imports in component decorator
- Routes use `loadComponent()` for lazy loading

Example component structure:
```typescript
import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-example',
  templateUrl: 'example.page.html',
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent]
})
```

### Routing Structure
- Main routes in `src/app/app.routes.ts`
- Tab navigation routes in `src/app/tabs/tabs.routes.ts`
- All routes use lazy loading with `loadComponent()`

### Service Pattern for Cross-Platform Features
The `PhotoService` demonstrates the pattern for cross-platform functionality:
- Use `Platform.is('hybrid')` to detect native vs web
- Different code paths for web (FileReader/fetch) vs native (Capacitor APIs)
- Services handle all business logic and platform differences

### Capacitor Plugins Configuration
Current plugins installed:
- Camera, Filesystem, Preferences (for photo gallery)
- App, Haptics, Keyboard, Status Bar (standard Ionic)

When adding new native features:
1. Install the Capacitor plugin: `npm install @capacitor/[plugin-name]`
2. Run `npx cap sync` to update native projects
3. Import and use in services, handling platform differences

### PWA Elements
The project includes `@ionic/pwa-elements` for web fallbacks of native features. Already configured in `src/main.ts` with:
```typescript
import { defineCustomElements } from '@ionic/pwa-elements/loader';
defineCustomElements(window);
```

## Project Structure
```
src/app/
├── services/           # Business logic and cross-platform services
├── tabs/              # Tab navigation container
├── tab1-3/           # Individual tab pages (lazy loaded)
└── app.routes.ts     # Main routing configuration
```

## Testing Approach
- Each component has a `.spec.ts` file for unit tests
- Run tests with `npm test`
- Tests use Jasmine + Karma with Chrome browser

## Key Dependencies & Versions
- Angular: 20.0.0
- Ionic: 8.0.0
- Capacitor: 7.4.2
- TypeScript: 5.8.0
- Target: ES2022

## Important Notes for Development

1. **Always use standalone components** - This project doesn't use NgModules
2. **Platform detection** - Use `Platform` service from `@ionic/angular` to detect web vs native
3. **Icon registration** - Register icons with `addIcons()` before using them
4. **Build before sync** - Always run `npm run build` before `npx cap sync`
5. **TypeScript strict mode** - Project uses strict TypeScript settings
6. **Bundle limits** - Warning at 2MB, error at 5MB for bundle sizes