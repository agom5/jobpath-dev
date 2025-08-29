# JobPath - Modern Job Application Tracker

> **A production-ready, full-stack job tracking application built with React 19, TypeScript, Node.js, and MongoDB. Features real-time analytics, Cloudinary integration, and enterprise-grade security.**

[![Live URL](https://img.shields.io/badge/🌐_Live_Demo-jobpath.dev-blue?style=for-the-badge)](https://jobpath.dev)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/agom5/job-tracker-mern)

![JobPath Dashboard](https://res.cloudinary.com/dvtvvxjud/image/upload/v1756446627/jobpath-dashboard_b2ar1x.png)

## **Why JobPath?**

JobPath isn't just another job tracker, it's a **professional-grade application** that demonstrates modern full-stack development skills. Built with enterprise patterns, cloud integration, and user-centric design.

### **Live Features**

- 📊 **Real-time Analytics Dashboard** with interactive charts
- 🔐 **Multi-Auth System** (Email/Password + Google OAuth)
- ☁️ **Cloud Avatar System** with Cloudinary integration
- 🤖 **AI-Powered Summaries** with Google Gemini integration
- 🌙 **Advanced Theme System** (Light/Dark/System)
- 📱 **Fully Responsive** with mobile-first design
- 🔄 **Real-time Updates** with optimistic UI
- 🛡️ **Enterprise Security** with rate limiting and validation

## 🛠️ **Tech Stack**

### **Frontend**

```typescript
⚡ React 19        // Latest React with Concurrent Features
🔷 TypeScript      // Full type safety and developer experience
⚡ Vite           // Lightning-fast build tool
🎨 Tailwind CSS   // Utility-first styling
📊 Recharts       // Beautiful, responsive charts
🧭 React Router   // Modern routing with data loading
🎯 Lucide Icons   // Consistent, beautiful icons
```

### **Backend**

```javascript
🚀 Node.js + Express    // High-performance server
🍃 MongoDB + Mongoose   // Flexible, scalable database
🔐 JWT + Passport       // Secure authentication
🤖 Google Gemini AI     // AI-powered job summaries
🛡️ Helmet + CORS        // Security hardening
⚡ Rate Limiting        // API protection
☁️ Cloudinary          // Cloud asset management
```

### **DevOps & Production**

```bash
☁️ Vercel + Railway # Modern hosting platforms
🔒 Environment Vars # Secure configuration
📊 Health Checks    # Monitoring and uptime
```

## **Key Features**

### **📊 Analytics Dashboard**

- **Interactive Charts** - Track application trends over time
- **Status Overview** - Visual breakdown of application stages
- **Success Metrics** - Calculate interview and offer rates
- **Time Insights** - Average time between application stages

### **💼 Job Management**

- **Smart Forms** - Intelligent job application creation
- **AI Job Summaries** - Automatic job description summarization with Google Gemini
- **Status Tracking** - Applied → Interviewing → Offered → Rejected
- **Company Profiles** - Rich company information and notes
- **Search & Filter** - Find applications quickly
- **Bulk Operations** - Manage multiple applications

### **🤖 AI-Powered Features**

- **Smart Job Summaries** - Automatic summarization of lengthy job descriptions
- **Google Gemini Integration** - Advanced AI using Gemini 1.5 Flash model
- **Rate Limited API** - Production-ready with 10 requests/minute per user
- **Cost Optimized** - Efficient token usage with $300 free credits
- **Plain Text Output** - Clean, readable summaries without formatting artifacts
- **Error Handling** - Graceful fallbacks and user-friendly error messages

### **👤 User Experience**

- **Profile Customization** - Cloud-hosted avatar system
- **Theme Preferences** - System-aware dark/light modes
- **Responsive Design** - Perfect on mobile, tablet, desktop
- **Smooth Animations** - Polished micro-interactions
- **Loading States** - Clear feedback for all operations

### **🔐 Security & Performance**

- **Multi-Factor Auth** - Email/Password + Google OAuth
- **JWT Security** - Secure, stateless authentication
- **Rate Limiting** - API abuse prevention
- **Input Validation** - Comprehensive data sanitization
- **HTTPS Everywhere** - End-to-end encryption

## 🚀 **Quick Start**

### **1️⃣ Clone & Install**

```bash
# Clone the repository
git clone https://github.com/agom5/job-tracker-mern.git
cd job-tracker-mern

# Install dependencies
npm run install:all  # Installs both frontend and backend
```

### **2️⃣ Environment Setup**

```bash
# Backend configuration
cp backend/.env.example backend/.env
# Edit backend/.env with your MongoDB URI, JWT secrets, Google OAuth

# Frontend configuration
cp frontend/.env.example frontend/.env
# Edit frontend/.env with your API URL and Cloudinary config
```

### **3️⃣ Run Development**

```bash
# Start both servers concurrently
npm run dev

# Or start individually:
npm run dev:backend   # Backend on :5001
npm run dev:frontend  # Frontend on :5173
```

## 📱 **Screenshots**

<div align="center">

### **🎨 Beautiful Dashboard**

![Dashboard](https://res.cloudinary.com/dvtvvxjud/image/upload/v1756446627/jobpath-dashboard_b2ar1x.png)

### **🌙 Dark Mode Support**

![Dark Mode](https://res.cloudinary.com/dvtvvxjud/image/upload/v1756447027/jobpath-applications-dark_eqnxqm.png)

### **📱 Mobile Responsive**

![Mobile](https://res.cloudinary.com/dvtvvxjud/image/upload/v1756447027/jobpath-mobile-dark_hg81cm.png)

</div>

## 🏗️ **Architecture**

### **Frontend Architecture**

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication forms
│   ├── dashboard/      # Analytics and charts
│   ├── jobs/           # Job management
│   ├── layout/         # App structure
│   └── ui/             # Base UI components
├── hooks/              # Custom React hooks
├── utils/              # Helper functions
├── types/              # TypeScript definitions
└── styles/             # Global styles
```

### **Backend Architecture**

```
src/
├── config/             # Database and auth config
├── middleware/         # Express middleware
├── models/             # MongoDB schemas
├── routes/             # API endpoints
└── utils/              # Helper functions
```

## **Performance Metrics**

- ⚡ **Lighthouse Score**: 95+ Performance
- 🚀 **First Load**: < 2s on 3G
- 📱 **Mobile Score**: 100/100
- ♿ **Accessibility**: AA Compliant
- 🔍 **SEO Ready**: Meta tags and structure

## 🚀 **Deployment**

### **Production Deployment**

```bash
# Build for production
npm run build:prod

# Deploy frontend to Vercel
vercel --prod

# Deploy backend to Railway
railway up
```

### **Environment Variables**

<details>
<summary>📋 Click to view required environment variables</summary>

**Backend (.env)**

```bash
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-jwt-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GEMINI_API_KEY=your-google-gemini-api-key
CORS_ORIGIN=https://jobpath.dev
```

**Frontend (.env.production)**

```bash
VITE_API_URL=https://api.jobpath.dev/api/v1
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=avatar-preset
```

</details>

## 🧪 **API Documentation**

### **Authentication Endpoints**

```javascript
POST / api / v1 / auth / register; // User registration
POST / api / v1 / auth / login; // Email/password login
GET / api / v1 / auth / google; // Google OAuth
GET / api / v1 / auth / me; // Get current user
PUT / api / v1 / auth / profile; // Update profile
```

### **Job Management**

```javascript
GET    /api/v1/jobs            // List user's jobs
POST   /api/v1/jobs            // Create new job
GET    /api/v1/jobs/:id        // Get job details
PUT    /api/v1/jobs/:id        // Update job
DELETE /api/v1/jobs/:id        // Delete job
```

### **AI Features**

```javascript
POST / api / v1 / ai / summarize - job; // Generate AI job summary
// Body: { description: string, position?: string, company?: string }
// Returns: { summary: string }
// Rate Limited: 10 requests/minute per user
```

## **What Makes This Special**

### **Professional Development**

- **Enterprise Patterns** - Scalable architecture and code organization
- **Type Safety** - Full TypeScript implementation with strict typing
- **Testing Ready** - Structured for unit and integration tests
- **Documentation** - Comprehensive inline and API documentation

### **Modern Technologies**

- **React 19** - Latest React with Concurrent Features
- **Cloud Integration** - Cloudinary for asset management
- **Real-time Updates** - Optimistic UI patterns
- **Progressive Enhancement** - Works offline with service workers

### **Production Security**

- **Authentication** - Multiple auth strategies with session management
- **Authorization** - Role-based access control
- **Data Validation** - Comprehensive input sanitization
- **Security Headers** - Helmet.js protection suite

## **About the Developer**

**Alejandro Gomez** - Software Engineering student passionate about creating exceptional user experiences with modern web technologies.

- 📧 **Email**: [alexmoro597@gmail.com](mailto:alexmoro597@gmail.com)

## 🤝 **Contributing**

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<div align="center">

**⭐ Star this repository if you found it helpful!**

[![GitHub stars](https://img.shields.io/github/stars/agom5/jobpath-dev?style=social)](https://github.com/agom5/jobpath-dev)

_Built by Alejandro_

</div>
