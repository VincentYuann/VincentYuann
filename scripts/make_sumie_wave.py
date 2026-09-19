from PIL import Image, ImageEnhance, ImageOps

# Load great wave image
img = Image.open(r'public\images\great-wave-kanagawa.jpg').convert('L') # grayscale

# Apply curves / levels to make it authentic Sumi-e ink wash (black ink on clean paper)
# Invert slightly or map white background to pure white (255)
# Enhance contrast
enhancer = ImageEnhance.Contrast(img)
img_contrast = enhancer.enhance(1.4)

# Rescale pixel values: map top 20% luminance to 255 (pure paper background)
pixels = img_contrast.load()
w, h = img_contrast.size

# Find paper background brightness
for x in range(w):
    for y in range(h):
        val = pixels[x, y]
        if val > 210:
            pixels[x, y] = 255
        elif val > 160:
            # Gentle curve to 255
            ratio = (val - 160) / 50.0
            pixels[x, y] = int(val + (255 - val) * ratio * 0.85)
        else:
            # Deepen rich ink tones
            pixels[x, y] = int(val * 0.85)

# Save high-definition Sumi-e wave banner
img_contrast.save(r'public\images\sumie-ocean-waves-backdrop.jpg', quality=95)
print("Saved sumie-ocean-waves-backdrop.jpg successfully")
