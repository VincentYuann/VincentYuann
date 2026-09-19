from PIL import Image, ImageEnhance

def make_sumie_jpg(input_path, output_path):
    img = Image.open(input_path).convert('RGBA')
    # Create white background image
    bg = Image.new('RGB', img.size, (255, 255, 255))
    bg.paste(img, mask=img.split()[3])
    
    # Convert to grayscale
    gray = bg.convert('L')
    
    # Enhance contrast
    enhancer = ImageEnhance.Contrast(gray)
    contrast = enhancer.enhance(1.4)
    
    # Smooth paper highlight map
    pixels = contrast.load()
    w, h = contrast.size
    for x in range(w):
        for y in range(h):
            val = pixels[x, y]
            if val > 215:
                pixels[x, y] = 255
            elif val > 170:
                ratio = (val - 170) / 45.0
                pixels[x, y] = int(val + (255 - val) * ratio * 0.9)
            else:
                pixels[x, y] = int(val * 0.85)
                
    contrast.save(output_path, quality=95)
    print(f"Saved {output_path}")

make_sumie_jpg(r'public\images\waves\wave-cutout-great-left.png', r'public\images\sumie-wave-left.jpg')
make_sumie_jpg(r'public\images\waves\wave-cutout-mid-right.png', r'public\images\sumie-wave-right.jpg')
