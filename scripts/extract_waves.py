import os
from PIL import Image
from collections import deque

input_path = r'C:\Users\litej\.gemini\antigravity\brain\57d1f0a1-25a2-466d-b3a7-c597e7c70f2d\.user_uploaded\media_1789794949101.jpg'
output_dir = r'public\images\waves'
os.makedirs(output_dir, exist_ok=True)

img = Image.open(input_path).convert('RGB')
w, h = img.size
pixels = img.load()

def is_checkerboard(r, g, b):
    # The checkerboard is grey (185-235) with almost no color difference (|r-g| <= 10 and |g-b| <= 10)
    diff = max(abs(r - g), abs(g - b), abs(r - b))
    avg = (r + g + b) / 3.0
    return diff <= 12 and 175 <= avg <= 245

# Floodfill from edges to find all external background pixels
visited = [[False]*h for _ in range(w)]
bg_mask = [[False]*h for _ in range(w)]

queue = deque()

# Add all border pixels that match checkerboard
for x in range(w):
    for y in [0, h-1]:
        if is_checkerboard(*pixels[x, y]):
            visited[x][y] = True
            bg_mask[x][y] = True
            queue.append((x, y))

for y in range(h):
    for x in [0, w-1]:
        if not visited[x][y] and is_checkerboard(*pixels[x, y]):
            visited[x][y] = True
            bg_mask[x][y] = True
            queue.append((x, y))

# Also add interior known empty spots if needed
for x in range(w):
    for y in range(h):
        if not visited[x][y] and is_checkerboard(*pixels[x, y]):
            # Check if neighboring pixels are also checkerboard
            pass

while queue:
    cx, cy = queue.popleft()
    for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]:
        nx, ny = cx + dx, cy + dy
        if 0 <= nx < w and 0 <= ny < h and not visited[nx][ny]:
            visited[nx][ny] = True
            if is_checkerboard(*pixels[nx, ny]):
                bg_mask[nx][ny] = True
                queue.append((nx, ny))

# Also check any other isolated checkerboard pockets
for x in range(w):
    for y in range(h):
        if not bg_mask[x][y] and is_checkerboard(*pixels[x, y]):
            # Expand pocket
            bg_mask[x][y] = True

# Create full transparent RGBA image
rgba_img = Image.new('RGBA', (w, h), (0, 0, 0, 0))
rgba_pixels = rgba_img.load()

for x in range(w):
    for y in range(h):
        r, g, b = pixels[x, y]
        if bg_mask[x][y]:
            rgba_pixels[x, y] = (0, 0, 0, 0)
        else:
            rgba_pixels[x, y] = (r, g, b, 255)

rgba_img.save(os.path.join(output_dir, 'all_waves_transparent.png'))
print("Successfully generated all_waves_transparent.png")
