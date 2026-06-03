from PIL import Image, ImageDraw, ImageFont
import os

def get_system_font_or_default(size=60):
    font_paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/Library/Fonts/Arial Bold.ttf",
        "C:\\Windows\\Fonts\\arialbd.ttf"
    ]
    for path in font_paths:
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()

def create_placeholder(filename, text, bg_color):
    width = 800
    height = 400
    image = Image.new('RGB', (width, height), color = bg_color)
    draw = ImageDraw.Draw(image)

    font = get_system_font_or_default(60)

    # Determine text size using textbbox
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    # Calculate x, y position of the text
    x = (width - text_width) / 2
    y = (height - text_height) / 2

    # Draw text
    draw.text((x, y), text, fill=(255, 255, 255), font=font)

    # Save image
    directory = os.path.dirname(filename)
    if directory:
        os.makedirs(directory, exist_ok=True)
    image.save(filename)
    print(f"Created {filename}")

if __name__ == "__main__":
    create_placeholder('public/muktavidya-preview.png', 'MuktaVidya', (30, 41, 59)) # slate-800
    create_placeholder('public/circuitjs-preview.png', 'CircuitJS', (15, 23, 42)) # slate-900
    create_placeholder('public/lecture-notes-preview.png', 'Lecture Notes', (56, 189, 248)) # sky-400
