# Ukraine Conflict Tracker

A real-time web application that monitors and visualises potential conflict areas in Ukraine by tracking fire detections from NASA FIRMS satellite data and correlating them with explosion reports from news sources. This is my first project deployed to Azure Cloud Services.

## 🚀 Live Azure Deployment

https://gentle-ground-0a21d8503.6.azurestaticapps.net/

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/e7f33a30-b2a7-45e4-bac0-dc43496c06f0)
![image](https://github.com/user-attachments/assets/9b874aa2-a8d5-4944-93b7-505551064f65)


## 🎯 Project Overview

This project was developed as part of **JHUB Module 9** to demonstrate cloud deployment capabilities and API integration. The application provides:

- **Real-time satellite fire detection** data from NASA FIRMS
- **Latest news monitoring** for conflict-related reports
- **Interactive map visualisation** of fire detections across Ukraine
- **Customisable news search** with date range filtering
- **Responsive design** for all device sizes

## 🛠️ Technologies Used

### Frontend
- React.js with Vite
- **Leaflet & React-Leaflet** - Interactive mapping
- **CSS3** - Custom styling with Ukrainian flag colour scheme

### Backend & APIs
- **Azure Functions** - Serverless API proxy for secure key management
- **NASA FIRMS API** - Satellite fire detection data
- **NewsAPI** - Real-time news aggregation

### Cloud Infrastructure
- **Azure Static Web Apps** - Hosting and serverless functions
- **GitHub Actions** - CI/CD pipeline for automated deployment
- **Azure CDN** - Global content delivery

## 📋 Features

### Fire Detection Mapping
- Interactive map showing satellite-detected fires
- Colour-coded confidence levels (high/nominal)
- Click on markers for detailed information
- Date selection to view historical data
- Real-time fire count display

### News Integration
- Customisable keyword search
- Pre-defined search categories (Conflict, Humanitarian, Infrastructure, etc.)
- Date range filtering
- Direct links to full articles
- Relevance-based sorting

### User Interface
- Dark theme with Ukrainian blue and yellow accents
- Fully responsive design
- Loading animations
- Error handling with fallback data
- Smooth transitions and hover effects

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- API keys for NASA FIRMS and NewsAPI
- An Azure account if setting up in the Cloud

### 🖥️ Local Installation

1. **Clone the repository:**

```bash
git clone https://github.com/ShabalalaWATP/ukraine-conflict-tracker.git
cd ukraine-conflict-tracker
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create a `.env` file in the root directory:**

```env
VITE_NASA_FIRMS_API_KEY=your_nasa_firms_api_key
VITE_NEWS_API_KEY=your_newsapi_key
```

4. **Start the development server:**

```bash
npm run dev
```

5. **Open the app:**

Open [http://localhost:5173](http://localhost:5173) in your browser.

6. **Build for production:**

```bash
npm run build
```

### ☁️ Azure Deployment

This application is deployed using **Azure Static Web Apps** with the following architecture:

- **Hosting:** Azure Static Web Apps (Free tier)  
- **CDN:** Azure Content Delivery Network for global distribution  
- **SSL:** Automatic HTTPS certificate provisioning  
- **CI/CD:** GitHub Actions workflow for automatic deployment on push

### 🚀 Deployment Steps

#### Step 1: Fork this repository
   - **1. Go to [https:](https://github.com/ShabalalaWATP/ukraine-conflict-tracker/)
   - **2. Click the fork button (top right corner)
   - **3. Select you're own GitHub account as the destination
   - **4. Wait for GitHub to create your copy
#### Step 2: Create an Azure Static Web App 
   - **1. Go to Azure Portal
   - **2. Click "+ Create a resource"
   - **3. Search for "Static Web App" → Click "Create"
#### Step 3: Fill in the configuration steps:
   - **1. Subscription: Your Azure subscription
   - **2. Resource Group: Create new or select exisiting
   - **3. Name: Choose a unique name (e.g., "your-ukraine-tracker")
   - **4. Plan Type: Free
   - **5. Region: Select closest to you
   - **6. Source: GitHub
   - **7. Click: "Sign in with GitHub" and authorise Azure
#### Step 4: Configure build settings:
   - **1. Organisation: Your GitHub username
   - **2. Repository: ukraine-conflict-tracker (YOUR fork not mine)
   - **3. Branch: main
   - **4. Build preset: React
   - **5. App location: /
   - **6. Api location: api
   - **7. Output location: dist
   - **8. Click: "Review + create" → "Create"
#### Step 5: Wait for Azure to create workflow file:
   - **1. Azure will automatically create a Pull Request in your GitHub repo
   - **2. This adds a .github/workflows/azure-static-web-apps-xxxx.yml file
   - **3. Check that this file contains: api_location: "api"
   - **4. If it shows api_location: "" you must edit it to api_location: "api"
   - **5. The Pull Request will auto-merge and trigger first deployment
#### Step 6: Add API Keys to Azure:
   - **1. Wait for deployment to complete (2 minutes odd)
   - **2. Go to your new Static Web App in Azure Portal
   - **3. Navigate to Settings → Environment variables
   - **4. Click: Add application setting and add these exactly: 
   - **5. NEWS_API_KEY = Your NewsAPIKey
   - **6. FIRMS_API_KEY = Your NASA FIRMS API Key
   - **7. Click: Save
   - **8. Click: "Review + create" → "Create"
#### Step 7: Verify Deployment
   - **1. Go to your GitHub fork → Actions tab
   - **2. You should see a workflow running (triggered by Azure)
   - **3. Once it shows ✅ green checkmark, your app is live!
   - **4. Find your URL in Azure Portal → Your Static Web App → Overview → URLv 
   - **5. Visit your site: https://[your-app-name].azurestaticapps.net

---

## 📊 API Integration

### NASA FIRMS API

- **Endpoint:** `https://firms.modaps.eosdis.nasa.gov/api/area/csv`  
- Provides satellite fire detection data
- Supports multiple satellites (MODIS, VIIRS)
- Returns data in CSV format including fire locations and intensity

### NewsAPI

- **Endpoint:** `https://newsapi.org/v2/everything`  
- Searches for Ukraine-related news articles
- Supports keyword and date filtering
- Returns JSON-formatted article metadata

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, open an issue first to discuss what you'd like to change.

### 🔧 How to Contribute

```bash
# Fork the repository
# Create your feature branch
git checkout -b feature/AmazingFeature

# Commit your changes
git commit -m "Add some AmazingFeature"

# Push to your branch
git push origin feature/AmazingFeature

# Open a Pull Request
```

---

## 📄 Licence

This project is licensed under the **MIT License** – see the `LICENSE` file for details.

---

## 🙏 Acknowledgements

- [NASA FIRMS](https://firms.modaps.eosdis.nasa.gov/) for satellite fire detection data  
- [NewsAPI](https://newsapi.org/) for news aggregation  
- **JHUB Coding Scheme** for the project opportunity  
- [Azure](https://azure.microsoft.com/) for cloud hosting  
- [OpenStreetMap](https://www.openstreetmap.org/) contributors for map data

---

## 👤 Author

**Alex Orr**  
GitHub: [@ShabalalaWATP](https://github.com/ShabalalaWATP)  
Project created as part of **JHUB Module 9 – Cloud Deployment Challenge**

---

## 📝 Project Status

This is my first cloud deployment project, demonstrating:

- API integration and data visualisation  
- Responsive web design  
- Cloud deployment workflows  
- Real-world data application

### 🔮 Future Enhancements

- Integrating additional data sources  
- Enabling historical data analysis  
- Export functionality (CSV/JSON)  
- Mobile app version
