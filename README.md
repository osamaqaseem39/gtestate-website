# GT Estate Website

A modern, next-generation real estate website built with Next.js 14, featuring AI-powered property matching, virtual reality tours, and smart home integration.

## Features

- 🏠 **AI-Powered Property Search** - Intelligent property matching based on your preferences
- 🥽 **Virtual Reality Tours** - Immersive 360° property tours from anywhere
- 🏡 **Smart Home Integration** - Connect with IoT devices and smart home systems
- 🔒 **Blockchain Security** - Secure transactions with blockchain technology
- 📱 **Responsive Design** - Optimized for all devices and screen sizes
- ⚡ **Modern UI/UX** - Sleek, futuristic design with smooth animations

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Responsive**: Mobile-first design

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the website directory:
```bash
cd website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
website/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   ├── about/            # About page
│   ├── properties/        # Properties page
│   └── contact/          # Contact page
├── components/           # React components
│   ├── Hero.tsx          # Hero section
│   ├── Navigation.tsx    # Navigation bar
│   ├── Footer.tsx        # Footer
│   ├── QuickSearch.tsx   # Property search
│   ├── FeaturedProperties.tsx # Property listings
│   ├── TechFeatures.tsx # Technology features
│   ├── Testimonials.tsx  # Customer testimonials
│   ├── CTA.tsx          # Call-to-action
│   └── ...              # Other components
├── package.json         # Dependencies
├── tailwind.config.js  # Tailwind configuration
├── next.config.js      # Next.js configuration
└── tsconfig.json       # TypeScript configuration
```

## Pages

- **Home** (`/`) - Landing page with hero, features, and testimonials
- **Properties** (`/properties`) - Property search and listings
- **About** (`/about`) - Company information and mission
- **Contact** (`/contact`) - Contact form and information

## Customization

### Colors
The website uses a custom color palette defined in `tailwind.config.js`:
- `neon-blue`: #00D4FF
- `neon-purple`: #8B5CF6
- `neon-green`: #10B981
- `neon-pink`: #EC4899

### Components
All components are built with:
- TypeScript for type safety
- Framer Motion for animations
- Tailwind CSS for styling
- Responsive design principles

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The website can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Performance

- ⚡ **Fast Loading** - Optimized images and code splitting
- 📱 **Mobile Optimized** - Responsive design for all devices
- 🔍 **SEO Ready** - Meta tags and structured data
- ♿ **Accessible** - WCAG compliant design

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact us at info@gtestates.com.pk

