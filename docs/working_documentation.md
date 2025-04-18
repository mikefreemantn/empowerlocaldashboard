# EmpowerLocal Portal - Working Documentation

## Project Overview
**Last Updated:** April 18, 2025

This document serves as a living record of decisions, progress, and technical details for the EmpowerLocal Portal project. It will be updated regularly as development progresses.

### Project Goals
- Create a new user flow for the Willamette Week Advertiser Portal
- Develop a demo with working aspects (rollovers, button clicks, etc.)
- Establish a proper framework structure for future development
- Provide a general style direction

## Current Project State
The existing portal appears to be a React-based web application for Willamette Week's advertising platform targeted at local Portland businesses. The current implementation lacks proper structure, making it difficult to maintain and extend.

## Project Documentation
The project includes detailed documentation on various administrative user flows:
- Company Management
- Publication Management
- Profile Management
- Audience Management
- Inventory Management
- Lead Management
- Team Management
- System Configuration

## Technical Decisions

### Framework Selection
**Selected Framework: Next.js with TypeScript**

After careful consideration, we've selected Next.js with TypeScript as our framework for the following reasons:

1. **Component-Based Architecture**: Next.js is built on React, allowing for reusable components that align with the modular nature of the administrative flows.

2. **TypeScript Integration**: TypeScript provides type safety, better documentation, and improved developer experience, which will help maintain code quality as the project grows.

3. **Built-in Routing**: Next.js offers a file-based routing system that simplifies navigation between different administrative sections.

4. **Server-Side Rendering (SSR) & Static Site Generation (SSG)**: These features improve performance and SEO, which is beneficial for a public-facing portal.

5. **API Routes**: Built-in API routes make it easy to create backend functionality without setting up a separate server.

6. **UI Component Libraries**: Compatible with popular UI libraries like Material-UI, Chakra UI, or Tailwind CSS for rapid development.

7. **Strong Community Support**: Extensive documentation and community resources for troubleshooting and best practices.

#### UI Component Library
**Selected Library: Chakra UI**

Chakra UI provides:
- Accessible components out of the box
- Customizable theming system for consistent styling
- Responsive design utilities
- Dark/light mode support
- Composition-based component API

### Style Direction
We'll implement a clean, modern interface with:
- Consistent color scheme based on the publication's branding
- Responsive design for all device sizes
- Accessible UI components
- Clear visual hierarchy and navigation
- Interactive elements with appropriate feedback (hover states, transitions)

#### Color Palette
Based on the official style guide:

**Primary Brand Colors**
- Teal-to-Blue Gradient: #25A87E to #2868C3 (core brand identifier)
- Deep Navy: #0A2756 (for headers and key text)
- Light Neutral: #F8FAFC (for backgrounds and subtle separators)

**Accent Colors**
- Gold/Amber: #F59E0B (for primary CTAs and highlights)
- Coral/Peach: #F97316 (for energy and emphasis)
- Terracotta: #C2410C (for grounding elements and secondary accents)

**Functional Colors**
- Success: #34D399
- Warning: #FBBF24
- Error: #EF4444
- Info: #60A5FA

## Next Steps
1. Set up Next.js project with TypeScript
2. Configure Chakra UI theming
3. Create base layout components
4. Implement navigation structure
5. Develop key screens for the demo
6. Add interactive elements (rollovers, button clicks)

## Notes
- The demo doesn't need full functionality but should have working interactions
- Focus on creating a solid foundation for future development
- Prioritize the most important user flows for the demo
