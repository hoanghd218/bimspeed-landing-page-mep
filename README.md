# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/2279a6c7-ff06-4fae-b479-ba5432ff67bd

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/2279a6c7-ff06-4fae-b479-ba5432ff67bd) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Mobile Optimization

This landing page has been fully optimized for mobile screens with the following improvements:

### Responsive Design
- **Adaptive Text Sizing**: Font sizes scale progressively from mobile (text-2xl) to desktop (text-5xl)
  - Hero Title: 2xl → 3xl → 4xl → 5xl across breakpoints
  - Headings: 2xl → 3xl → 4xl across breakpoints
  - Body text: sm → base → lg across breakpoints

### Layout Optimizations
- **Single Column on Mobile**: Grid layouts automatically switch to single column on mobile devices
  - 3-column grids (md:grid-cols-3) become single column on mobile
  - 2-column grids (md:grid-cols-2) become single column on mobile
  
- **Responsive Spacing**: Padding and margins adjust per screen size
  - Container padding: 1rem (mobile) → 1.5rem (sm) → 2rem (md+)
  - Section padding: Optimized for comfortable spacing on all devices
  - Gap sizes scale appropriately between elements

### Component Optimizations
- **Header**: Responsive button sizes with text scaling (text-xs → text-base)
- **Hero Form**: Full-width on mobile, takes up half the screen on desktop
- **Videos**: Responsive grid layout (1 column mobile → 2 column tablet → 3 column desktop)
- **Testimonials**: Cards properly sized for readability with responsive text
- **Countdown Timer**: Flexible layout that wraps on small screens

### Touch & Interaction
- **Touch Targets**: All buttons and inputs have minimum 44px height for mobile accessibility
- **Font Size**: Set to 16px on mobile to prevent zoom on input focus
- **Icon Sizing**: Icons scale appropriately (w-4 h-4 on mobile → w-6 h-6 on desktop)

### Specific File Changes
- **src/pages/Index.tsx**: Applied responsive Tailwind utilities throughout
- **src/index.css**: Added mobile-first accessibility optimizations
- **tailwind.config.ts**: Updated container padding to be responsive
- **src/App.css**: Cleaned up unused styles

## Testing Mobile
To test mobile responsiveness:
```sh
npm run dev
# Open Chrome DevTools (F12)
# Toggle device toolbar (Ctrl+Shift+M)
# Test on various devices: iPhone SE, iPhone 12, iPhone 14 Pro, Pixel 5, etc.
```

## Special Features

### Countdown Timer in Hero Section
- Integrated directly into the registration form (below submit button) for better space optimization
- Compact, inline design: Shows hours (h), minutes (m), and seconds (s) in abbreviated format
- Displays with accent color background
- Creates urgency for users to register
- Fully responsive and mobile-optimized

### Special Offer - Zoom Sessions
- **Limited to first 20 registrants** who sign up during the promotional period
- **Benefit**: Weekly free Zoom sessions sharing MEP implementation experiences and best practices
- **Value**: 2,000,000đ worth of training (4 sessions)
- **Integrated Design**: Positioned directly in form section below countdown timer (no separate cards)
- Clean, compact presentation with green styling
- Text optimized for mobile: "Zoom hàng tuần chia sẻ MEP"
- Responsive design that scales well on all devices

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/2279a6c7-ff06-4fae-b479-ba5432ff67bd) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
