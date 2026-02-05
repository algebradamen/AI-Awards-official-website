# Historical Weather Data Norway (KlimaNorge)

An interactive web application for visualizing historical weather data in Norway from 1900 to the present day. This tool allows users to explore climate trends through heatmaps, charts, and station-specific data.

## Features

*   **Interactive Map**: Visualizes temperature, rainfall, and cloud cover using dynamic heatmaps overlaid on a Leaflet map.
*   **Time Travel**: Scrub through years (1900-2025) to see how the climate has changed over the last century.
*   **Data Analysis**: View graphs for specific weather stations or national averages, including trend lines to visualize climate change.
*   **Seasonal Filters**: Filter data by Winter, Spring, Summer, Autumn, or Annual average.
*   **Search**: Find specific weather stations or search by location name (Geocoding).
*   **Customization**: Toggle between Dark and Light themes.

## How to Run Locally

This application relies on loading external JSON data files (e.g., `weather_data_yearly_1900_2025.json`). Due to modern browser security policies (CORS), these files **cannot be loaded automatically** if you simply double-click `index.html` to open it (using the `file://` protocol).

To run the application correctly, please use one of the following methods:

### Method 1: Use a Local Web Server (Recommended)
This simulates a real server environment and allows the data to load automatically.

*   **Using VS Code (Visual Studio Code):**
    1.  Install the **Live Server** extension by Ritwick Dey.
    2.  Right-click `index.html` in the file explorer.
    3.  Select **Open with Live Server**.

*   **Using Python:**
    1.  Open a terminal or command prompt in the project folder.
    2.  Run the command: `python -m http.server`
    3.  Open your browser and navigate to `http://localhost:8000`.

*   **Using Node.js:**
    1.  Open a terminal in the project folder.
    2.  Run: `npx http-server`

### Method 2: Drag and Drop (No Server)
If you cannot run a local server and must open `index.html` directly:

1.  Double-click `index.html` to open it in your browser.
2.  You will see an alert or status message stating that auto-loading is blocked.
3.  Locate the data files in your file explorer (e.g., `weather_data_yearly_1900_2025.json`).
4.  **Drag and drop** the JSON file directly onto the web page window.
5.  The application will parse the file and load the visualization manually.

## Data Sources

*   **Weather Data**: Historical observations provided by the Norwegian Meteorological Institute (Frost API).
*   **Map Tiles**: Esri World Topo Map.

## Technologies Used

*   **Core**: HTML5, JavaScript (ES6+), CSS3
*   **Styling**: Tailwind CSS (via CDN)
*   **Mapping**: Leaflet.js (via CDN)
*   **Charts**: Chart.js (via CDN)
*   **Icons**: FontAwesome (via CDN)