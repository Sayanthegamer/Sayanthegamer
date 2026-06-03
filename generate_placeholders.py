from PIL import Image, ImageDraw, ImageFont

def create_placeholder(filename, text, bg_color):
    width = 800
    height = 400
    image = Image.new('RGB', (width, height), color = bg_color)
    draw = ImageDraw.Draw(image)

    # Try to load a font, if not available, default will be used (which is tiny)
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 60)
    except IOError:
        font = ImageFont.load_default()

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
    image.save(filename)
    print(f"Created {filename}")

create_placeholder('public/muktavidya-preview.png', 'MuktaVidya', (30, 41, 59)) # slate-800
create_placeholder('public/circuitjs-preview.png', 'CircuitJS', (15, 23, 42)) # slate-900
create_placeholder('public/lecture-notes-preview.png', 'Lecture Notes', (56, 189, 248)) # sky-400
