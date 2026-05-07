# SkillKwiz Assessment Website

SkillKwiz is a responsive skill assessment website built with Next.js, React, and Tailwind CSS. This project focuses on polishing the existing SkillKwiz frontend, aligning the content with the official brand messaging, and completing the requested functional demo interactions.

## Live Demo

Netlify deployment:

```text
https://rajatassesmentskillkwiz.netlify.app/
```

## Project Summary

This implementation updates the provided SkillKwiz frontend with improved branding, page layout, carousel banners, responsive spacing, and demo-ready user interactions. The work was completed based on the assessment feedback shared by the client/interviewer.

## Key Updates

- Improved SkillKwiz logo visibility using the provided SVG logo asset.
- Fixed header and banner overlap issues.
- Added a homepage hero carousel with 4 actual SkillKwiz banner slides.
- Updated homepage banner text to match SkillKwiz website messaging.
- Reduced excessive spacing and layout gaps, including on the About page.
- Added a clear Sign Up option in the header and login areas.
- Replaced the heavy skill assessment image area with a lighter professional visual.
- Added visible animations and hover interactions across cards and sections.
- Added thank-you popup behavior for form/demo interactions.
- Added dummy downloadable files for blue links and report actions.
- Added View Report download behavior in the candidate list.
- Configured static export deployment for Netlify.

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Radix UI components
- Lucide React icons

## Main Pages

- `/` - Homepage with hero carousel, service messaging, feature sections, testimonials, and login CTA.
- `/about` - Company information, mission/vision/purpose cards, CEO section, and video section.
- `/blog` - Blog layout with downloadable dummy article links and thank-you popup interaction.
- `/services` - Login, signup/registration flow, assessment scheduling, employer profile, candidate list, and report download demo.

## Demo Functionality

This is a frontend assessment/demo project. The following interactions are intentionally mocked:

- Sign In opens the demo service flow.
- Sign Up opens the registration flow.
- Forgot Password downloads a dummy resource file.
- Blog download links download a dummy resource file.
- View Report downloads a dummy report file.
- Registration and scheduling actions show thank-you/success popups.

Dummy files are stored in:

```text
public/files/dummy-report.pdf
public/files/dummy-resource.pdf
```

## Getting Started Locally

Install dependencies:

```bash
npm install --legacy-peer-deps
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Build for production:

```bash
npm run build
```

## Deployment

The project is configured for static export deployment on Netlify.

Important deployment files:

```text
next.config.mjs
netlify.toml
.npmrc
```

Netlify build settings:

```text
Build command: npm run build
Publish directory: out
```

The `.npmrc` file enables legacy peer dependency resolution for this generated dependency tree:

```text
legacy-peer-deps=true
```

## Folder Structure

```text
app/                 Next.js app routes
components/          Reusable UI and page sections
components/ui/       Shared UI primitives
public/images/       Website image assets
public/files/        Dummy downloadable files
styles/              Global style assets
lib/                 Utility helpers
hooks/               Shared hooks
```

## Notes

- This project is optimized for frontend assessment review.
- Backend/API integration is not included.
- Netlify uses the generated `out` folder after `npm run build`.
- TypeScript and lint errors are skipped in `next.config.mjs` because this project was provided as a generated frontend codebase and the assessment scope is UI/functional polish.
