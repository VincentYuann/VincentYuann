from PIL import Image
import os

img = Image.open(r'public\images\waves\all_waves_transparent.png')
w, h = img.size

# Wave 1: The large Great Wave cutout on left (spanning top-left to mid-left)
# In image (764x1024):
# Large wave 1 top: x: 0 to 500, y: 0 to 380
# Wave 2 mid-left: x: 0 to 450, y: 430 to 730
# Wave 3 top-right: x: 380 to 764, y: 70 to 220
# Wave 4 mid-right: x: 340 to 764, y: 340 to 510
# Wave 5 bottom-mid-right: x: 350 to 764, y: 600 to 760
# Wave 6 bottom-left stylized: x: 20 to 370, y: 770 to 950
# Wave 7 bottom-right boat: x: 440 to 740, y: 830 to 940

crops = {
    'wave-cutout-great-left.png': (0, 0, 500, 385),
    'wave-cutout-mid-left.png': (20, 435, 425, 730),
    'wave-cutout-top-right.png': (380, 70, 764, 220),
    'wave-cutout-mid-right.png': (340, 340, 764, 510),
    'wave-cutout-lower-right.png': (350, 600, 764, 760),
    'wave-cutout-stylized-ribbon.png': (20, 770, 370, 950),
    'wave-cutout-boat-curl.png': (440, 830, 740, 940)
}

output_dir = r'public\images\waves'

for name, box in crops.items():
    cropped = img.crop(box)
    # Auto-trim transparent borders
    bbox = cropped.getbbox()
    if bbox:
        trimmed = cropped.crop(bbox)
        # Add smooth 1px edge feathering if desired
        trimmed.save(os.path.join(output_dir, name))
        print(f"Saved {name}: size {trimmed.size}")

print("All wave cutouts extracted successfully.")
