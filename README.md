# Slippy Map Server - Snowmap Interview Assignment
Being a developer at a startup means venturing into the unknown and learning quickly. This assessment is designed to evaluate your problem-solving skills when tackling an unfamiliar challenge.

## Overview
In this assessment, you will implement a simple service to extract map tiles from a geospatial raster dataset and serve them as PNG images. Tiles are generated based on coordinates (```x, y, z```)—representing horizontal index, vertical index, and zoom level, respectively. Your solution will process a provided GeoTIFF file and return 256x256 PNG tiles via a local web server. You may use any programming language of your choice.

### References
- [Tiled Web Maps (Wiki)](https://en.wikipedia.org/wiki/Tiled_web_map)
- [Slippy Map Tile Naming (OpenStreetMap)](https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames)

### Provided Resources
- A TIFF file as the source for tile generation: ```snowdepth.tiff```
- A mapbox implementation in ```mapbox/src/App.js``` with an Snowmap tile server

### Objective
1. Create a web service that extracts tiles from ```snowdepth.tiff``` based on tile coordinates(```x, y, z```)
2. Serve the tiles as PNG images over HTTP
3. Run the service on localhost - no deployment is required
4. Replace the tile layer in ```App.js``` with your own implementation

### Expectations
- Your implementation supports dynamic image generation - meaning it works with any given tiff file.
- You are encouraged to use any tools, libraries, or frameworks that help achieve the goal, make sure you includehow  references.
- The final solution should be well-structured and documented.
- You DO NOT need to deploy the server; running it on `localhost` is sufficient

## Getting Started with the enviroment

To set up the mapbox environment we have provided, run the following commands:
```
cd mapbox
npm install
npm start
```

Once the setup completes successfully, a map should appear in your browser. 

Your task is to replace the server that provides tiles on the map with your own localhost server URL.

## Deliverables
### Code Submission:

- Push your implementation to a public GitHub repository.
- Update this ```README.md``` with setup and usage instructions.

### Demo Video:

- Record a short video (screen recording) demonstrating your server in action.
- Upload it to a platform like YouTube (unlisted) or Google Drive and share the link.

### Submit your work:

- Email the GitHub repository link along with the demo video link.

## Candidate Submission
(Edit the sections below with your implementation details.)

### Setup & Usage

**Prerequisites** 

List any dependencies, software, or libraries required.

```
<your-libraries>
```

**Installation**

Step-by-step guide on how to install and set up the project.
```
git clone <your-repo-url>
cd <your-project-folder>
<installation-commands>
```

**Running the Server**

Instructions to start and test the Slippy Map Server.

```
<run-server-command>
```

## Implementation Details

This implementation uses Node.js with Express for the backend server and React with Mapbox for the frontend. The server processes GeoTIFF files and serves map tiles in real-time.

### Prerequisites 

**Backend Dependencies:**
```
Node.js 14+
npm
```

**Frontend Dependencies:**
```
Node.js 14+
npm
```

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <project-folder>
```

2. Set up the backend:
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

3. Set up the frontend:
```bash
cd mapbox
npm install
```

### Running the Server

1. Start the backend server:
```bash
# From the backend directory
npm start
```

2. Start the frontend development server:
```bash
# From another terminal, in the mapbox directory
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

### API Endpoints

The server provides the following endpoint:

- `GET /tiles/{z}/{x}/{y}` - Returns a 256x256 PNG tile for the specified coordinates
  - `z`: zoom level
  - `x`: tile x coordinate
  - `y`: tile y coordinate

### Architecture

The system consists of two main components:

1. **Backend Server (Node.js/Express)**
   - Handles tile requests
   - Processes GeoTIFF data using GDAL
   - Generates PNG tiles

2. **Frontend (React/Mapbox)**
   - Displays the interactive map
   - Requests tiles from the backend
   - Handles user interaction

### Libraries Used

- **Backend:**
  - Express: Web framework
  - @mapbox/node-gdal-async: GeoTIFF processing
  - sharp: Image processing
  - cors: Cross-origin resource sharing

- **Frontend:**
  - React: UI framework
  - Mapbox GL JS: Map rendering
  - Other dependencies as specified in package.json

### Notes

- The server is configured for development use only
- CORS is enabled for localhost development
- The tile server is optimized for the provided snowdepth.tiff file but can handle other GeoTIFF files
- Tile generation is done on-the-fly for maximum flexibility

Good luck, and happy coding! 🚀
