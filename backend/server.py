from flask import Flask, send_file, abort
from flask_cors import CORS # Allows front-end access to Flask servers to avoid cross-domain issues
import rasterio # Read the GeoTIFF file
import mercantile # Convert boundaries to pixel coordinates
import numpy as np # deal with GeoTiff data, Handle invalid values 
from PIL import Image # transfer numpy array to image
import io # create png image
import os # get the path of the GeoTIFF file

app = Flask(__name__)
CORS(app)  # Enable CORS to allow front-end access

# Read the GeoTIFF file
TIFF_PATH = os.path.join(os.path.dirname(__file__), "snowdepth.tiff")
try:
    dataset = rasterio.open(TIFF_PATH)
    print(f"Successfully loaded TIFF file: {TIFF_PATH}")
    print(f"TIFF bounds: {dataset.bounds}")
    print(f"TIFF size: {dataset.width}x{dataset.height}")
except Exception as e:
    print(f"Error loading TIFF file: {e}")
    raise

def get_tile(z, x, y):
    """ Read the 256x256 PNG tiles corresponding to (z, x, y) from the GeoTIFF """
    try:
        # Get the boundary latitude and longitude of the tile
        bounds = mercantile.bounds(x, y, z)
        
        # Convert boundaries to pixel coordinates
        window = rasterio.windows.from_bounds(
            bounds.west, bounds.south, 
            bounds.east, bounds.north, 
            transform=dataset.transform
        )
        
        # Read and resample data to 256x256
        data = dataset.read(
            1,  
            window=window,
            out_shape=(256, 256)
        )
        
        # Handle invalid values
        data = np.nan_to_num(data)
        
        # Normalize data to 0-255
        if data.max() == data.min():
            normalized = np.zeros((256, 256), dtype=np.uint8)
        else:
            normalized = ((data - data.min()) * (255.0 / (data.max() - data.min()))).astype(np.uint8)
        
        # Create a high-quality PNG image
        img = Image.fromarray(normalized, mode='L')
        img_io = io.BytesIO()
        img.save(img_io, format='PNG', optimize=True)
        img_io.seek(0)
        
        return img_io
    except Exception as e:
        print(f"Error processing tile {z}/{x}/{y}: {e}")
        abort(404)

@app.route('/tiles/<int:z>/<int:x>/<int:y>')
def serve_tile(z, x, y):
    """Serve map tiles"""
    return send_file(get_tile(z, x, y), mimetype='image/png')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True) 