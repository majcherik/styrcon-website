# STYRCON Website - E-MA SK s.r.o.

Modern, fast, SEO-optimized presentation website for E-MA SK s.r.o. featuring STYRCON paropriepustné tepelnoizolačné dosky.

## 🏗️ Built With

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library
- **Radix UI** - Accessible UI primitives
- **Lucide React** - Beautiful icons
- **React Hook Form + Zod** - Form handling and validation

## 🚀 Features

- ✅ Responsive design (mobile-first)
- ✅ SEO optimized (Slovak language focus)
- ✅ Structured data (JSON-LD)
- ✅ Contact form with validation
- ✅ Technical specifications table
- ✅ Accessibility compliant (WCAG AA)
- ✅ Performance optimized
- ✅ TypeScript throughout

## 📋 Pages

1. **Homepage** (`/`) - Hero section, product overview, contact CTA
2. **Product Page** (`/styrcon-produkt`) - Technical specs, features, applications
3. **Contact Page** (`/kontakt`) - Contact form, company information
4. **API Endpoints** (`/api/contact`) - Contact form processing

## 🛠️ Development

### Prerequisites

- Node.js 18.17.0 or higher
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd styrcon-website

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="STYRCON - E-MA SK s.r.o."

# Database (when CMS is implemented)
DATABASE_URL=postgresql://localhost:5432/styrcon_dev

# CMS (when implemented)
STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your-dev-token

# Media (when implemented)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-name

# Email (when implemented)
EMAIL_API_KEY=your-dev-email-key
CONTACT_EMAIL=dev@e-ma-sk.com

# Analytics (when configured)
NEXT_PUBLIC_GA_ID=G-DEV-ID
```

### Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run type-check   # Run TypeScript check
npm run format       # Format with Prettier
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub repository
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on every push to main branch

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm start
```

## 📝 Content Management

Currently, content is managed through React components. Future phases will include:

- **Phase B**: Strapi CMS integration
- **Phase C**: Multi-language support

## 🎨 Customization

### Brand Colors

The website uses a custom color palette defined in `tailwind.config.js`:

- **Primary**: Blue (#0ea5e9) - STYRCON brand color
- **Secondary**: Orange (#f97316) - Accent color
- **Neutral**: Slate grays for text and backgrounds

### Fonts

- **Primary**: Inter - Modern, readable sans-serif
- **Fallback**: System fonts for performance

## 🔍 SEO

### Technical SEO Features

- XML sitemap generation
- Robots.txt
- Structured data (JSON-LD) for:
  - Organization
  - Product
  - Website
- Open Graph meta tags
- Slovak language optimization

### Slovak Keywords

Primary focus keywords:
- styrcon
- paropriepustné dosky
- tepelná izolácia
- nehorľavá izolácia
- zateplenie budov
- sanačné zateplenie

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Semantic HTML structure
- Keyboard navigation support
- Screen reader optimized
- Color contrast compliance
- Focus indicators

## 📱 Browser Support

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Android Chrome)

## 🔒 Security

- Content Security Policy headers
- XSS protection
- CSRF protection for forms
- Secure headers (HSTS, X-Frame-Options)
- Input validation and sanitization

## 📊 Performance

Current Lighthouse scores (targets):
- **Performance**: ≥85
- **Accessibility**: ≥90
- **Best Practices**: ≥90
- **SEO**: ≥90

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is proprietary software owned by E-MA SK s.r.o.

## 📞 Contact

**E-MA SK s.r.o.**
- Website: [styrcon.sk](https://styrcon.sk)
- Email: info@e-ma-sk.com
- Phone: +421 XXX XXX XXX

**Manufacturer:** Styrcon s.r.o.

---

Built with ❤️ for Slovak construction industry