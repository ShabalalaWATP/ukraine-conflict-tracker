# Ukraine Conflict Tracker

A real-time web application that monitors and visualises potential conflict areas in Ukraine by tracking fire detections from NASA FIRMS satellite data and correlating them with explosion reports from news sources. This is my first project deployed to Azure Cloud Services.

## 🚀 Live Demo

[View Live Application](https://ukraine-conflict-tracker.azurestaticapps.net) *(Azure deployment pending)*

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

- **Frontend:** React.js with Vite
- **Mapping:** Leaflet & React-Leaflet
- **Styling:** Custom CSS with Ukrainian flag colour scheme
- **APIs:** 
  - NASA FIRMS (Fire Information for Resource Management System)
  - NewsAPI for real-time news data
- **Cloud Services:** Azure Static Web Apps
- **CI/CD:** GitHub Actions for automatic deployment

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

## 🌐 Azure Deployment

This application is deployed using **Azure Static Web Apps** with the following architecture:

- **Hosting:** Azure Static Web Apps (Free tier)  
- **CDN:** Azure Content Delivery Network for global distribution  
- **SSL:** Automatic HTTPS certificate provisioning  
- **CI/CD:** GitHub Actions workflow for automatic deployment on push

### 🚀 Deployment Steps

1. Create an Azure Static Web App in the Azure Portal
2. Connect it to your GitHub repository
3. Configure build settings:
   - **App location:** `/`
   - **API location:** *(leave empty)*
   - **Output location:** `dist`
4. Azure automatically creates a GitHub Actions workflow
5. Every push to the `main` branch triggers automatic deployment

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
