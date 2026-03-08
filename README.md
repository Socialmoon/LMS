<p align="center">
  <img src="./public/logo.png" alt="SocialMoon LMS Logo" width="180" />
</p>

<h1 align="center">SocialMoon LMS</h1>

<p align="center">A private Learning Management System built and maintained by <strong>SocialMoon</strong>.</p>

> **Private Project** — This repository is proprietary to SocialMoon. Unauthorized use, distribution, or reproduction is not permitted.

---

## Features

### Student Dashboard
- Course enrollment and progress tracking
- Quiz participation and certificate generation
- Payment processing for courses
- Discussion forums and announcements
- Bookmark management and notifications

### Instructor Dashboard
- Course creation and management
- Student analytics and performance tracking
- Marketplace integration for course sales

### Admin Dashboard
- User management (students, instructors)
- Course and payment oversight
- Marketplace administration

### Payment Integration
- Stripe payment processing
- PayPal integration
- Razorpay support for international payments

## Tech Stack

- **Frontend**: Next.js 13, React 18, Tailwind CSS
- **Payment Gateways**: Stripe, PayPal, Razorpay
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <internal-repo-url>
cd next-lms
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables file (`.env.local`):
```env
STRIPE_PUBLIC_KEY=your_stripe_public_key
PAYPAL_CLIENT_ID=your_paypal_client_id
RAZORPAY_KEY_ID=your_razorpay_key_id
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
├── components/          # Reusable React components
│   ├── Header.js
│   ├── Sidebar.js
│   └── PaymentModal.js
├── pages/               # Next.js pages and API routes
│   ├── _app.js
│   ├── index.js
│   ├── login.js
│   ├── admin/
│   ├── instructor/
│   ├── student/
│   └── api/
├── styles/
│   └── globals.css
├── public/              # Static assets
│   └── logo.png         # SocialMoon LMS logo
├── next.config.js
├── package.json
├── postcss.config.js
└── tailwind.config.js
```

## License

This is a private project owned by **SocialMoon**. All rights reserved.
