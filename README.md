# 🚀 YC ATLAS Frontend - AI-Powered YC Startup Search

## 🔎 Explore YC Startups Instantly: [YC ATLAS](https://yc-atlas.lovable.app/)

Use **[YC ATLAS](https://yc-atlas.lovable.app/)** to **search, filter, and explore** Y Combinator startups with AI-powered insights. This intuitive frontend makes finding relevant YC companies faster and more efficient.

---

## 📌 Overview

YC ATLAS Frontend is the **React-based** user interface for **YC ATLAS** – an open-source deep research tool designed to help users discover **Y Combinator startups** by technology domains, mission statements, and business models.

### 🔥 Why Use YC ATLAS Frontend?
✅ **AI-Powered Search** – Smart, contextual searches powered by LLMs.  
✅ **Fast & Responsive UI** – Built with **React, TypeScript, and Tailwind CSS**.  
✅ **Detailed YC Company Profiles** – See company insights, founders, and social links.  
✅ **Advanced Search Modes** – Quick Search and Deep Research modes.  
✅ **Mobile-Optimized** – Works seamlessly across all devices.  

---

## 🚀 Key Features

### 🔍 AI-Enhanced Search
- **Quick Search** – Instantly find YC startups by name, industry, or location.
- **Deep Research** – Multi-query search powered by LLMs for comprehensive results.
- **Interactive Filters** – Refine searches by YC batch, domain, and more.

### 🏢 Company Profiles
- **In-Depth Insights** – Learn about YC startups, their founders, and business models.
- **AI-Powered Summaries** – Auto-generated key takeaways for each company.
- **Social Links** – Direct access to startup websites and social media pages.

### 🎨 Modern UI & UX
- **Tailwind CSS** – A utility-first CSS framework for sleek, responsive designs.
- **shadcn/ui Components** – High-quality UI elements built on Radix UI.
- **Smooth Animations** – Enhanced user experience with fluid transitions.

---

## 🛠️ Technology Stack

| Tech            | Description |
|----------------|-------------|
| **React**      | UI Library for building fast, interactive applications |
| **TypeScript** | Type-safe JavaScript for robust development |
| **React Router** | Client-side routing for seamless navigation |
| **React Query** | Optimized data fetching and state management |
| **Tailwind CSS** | Rapid UI development with a utility-first approach |
| **Lucide React** | Beautiful open-source icons |
| **React Markdown** | Render markdown for rich content support |

---

## ⚡ Installation & Setup

### 📌 Prerequisites
- **Node.js** (v16+ recommended)
- **npm** or **yarn** installed
- **Backend API** running ([YC ATLAS Backend](https://github.com/piyushk6626/YC-ATLAS-Backend))

### 🔧 Install Dependencies
```bash
# Clone the repository
git clone https://github.com/piyushk6626/YC-ATLAS-Frontend.git
cd YC-ATLAS-Frontend

# Install dependencies
npm install
```

### 🔑 Environment Variables
```bash
cp .env.example .env
# Configure your API URL in .env:
# VITE_API_URL=http://localhost:8000
```

### ▶️ Running the Application
```bash
npm run dev
```
🔹 App will be available at **http://localhost:5173**

### 🚀 Build for Production
```bash
npm run build
```

### 🔄 Preview Production Build
```bash
npm run preview
```

---

## 📂 Project Structure

```
YC-ATLAS-Frontend/
├── public/           # Static assets
├── src/              # Source code
│   ├── components/   # Reusable UI components
│   │   └── ui/       # shadcn/ui components
│   ├── hooks/        # Custom React hooks
│   ├── pages/        # Page components
│   ├── services/     # API service layer
│   ├── types/        # TypeScript type definitions
│   ├── App.tsx       # Main application component
│   └── main.tsx      # Entry point
├── tailwind.config.js # Tailwind configuration
├── tsconfig.json     # TypeScript settings
└── vite.config.ts    # Vite settings
```

---

## 🔗 API Integration

### 🏢 Search YC Startups
```typescript
import axios from 'axios';

const response = await axios.post(`${import.meta.env.VITE_API_URL}/search_companies`, {
  query: "AI startups"
});

console.log(response.data);
```

### 🔎 Get Company Details
```typescript
const response = await axios.get(`${import.meta.env.VITE_API_URL}/company/company_id_here`);
console.log(response.data);
```

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:
1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/your-feature`)
3. **Commit your changes** (`git commit -m 'Add your feature'`)
4. **Push to GitHub** (`git push origin feature/your-feature`)
5. **Open a Pull Request**

---

## 🔗 Related Repositories

- [YC-ATLAS Backend](https://github.com/piyushk6626/YC-ATLAS-Backend) - FastAPI backend powering the search
- [YC-ATLAS Scraping](https://github.com/piyushk6626/YC-ATLAS-Scraping) - YC data collection & processing

---

## 📜 License

YC ATLAS Frontend is licensed under the **MIT License** – see the LICENSE file for details.

---

## 📞 Contact & Support

- **Creator:** [Piyush Kulkarni](https://github.com/piyushk6626)
- **Website:** [codefatherai.webflow.io](https://codefatherai.webflow.io/)
- **LinkedIn:** [piyush-kulkarni-ai](https://www.linkedin.com/in/piyush-kulkarni-ai/)

---

## 🌟 Why Use YC ATLAS?
✅ **AI-Powered Search via YC ATLAS** – Find startups instantly.  
✅ **All-in-One Search & Analysis Tool** – Discover YC companies in-depth.  
✅ **SEO-Optimized** – Enhances discoverability of YC startups.  
✅ **Modern UI & Performance** – Built with the latest frontend tech.  

🚀 Try it now: **[YC ATLAS](https://yc-atlas.lovable.app/)**  

🔗 **[Star This Repo on GitHub!](https://github.com/your-repo-link)** 🌟

