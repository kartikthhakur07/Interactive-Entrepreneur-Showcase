"""
Generate authentic executive badge assets for Ratan Tata:
- card-front.png
- card-back.png
- band.png
"""
import urllib.request
import io
from PIL import Image, ImageDraw, ImageFont

def generate():
    # 1. Download Ratan Tata photo
    photo_url = "https://upload.wikimedia.org/wikipedia/commons/2/2b/Ratan_Naval_Tata_in_2011.jpg"
    try:
        req = urllib.request.Request(photo_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            photo_data = resp.read()
        portrait = Image.open(io.BytesIO(photo_data)).convert("RGBA")
    except Exception as e:
        print("Fallback photo due to:", e)
        portrait = Image.new("RGBA", (360, 420), color=(30, 45, 75, 255))

    # --- CARD FRONT (600 x 920) ---
    W, H = 600, 920
    front = Image.new("RGBA", (W, H), (14, 20, 36, 255))
    draw = ImageDraw.Draw(front)

    # Outer border / bevel
    draw.rounded_rectangle([15, 15, W - 15, H - 15], radius=24, outline=(212, 175, 55, 255), width=3)
    draw.rounded_rectangle([22, 22, W - 22, H - 22], radius=18, outline=(40, 55, 85, 255), width=1)

    # Top punch hole for lanyard clip
    draw.rounded_rectangle([W//2 - 45, 28, W//2 + 45, 42], radius=7, fill=(8, 12, 22, 255), outline=(60, 80, 110, 255), width=2)

    # Header section
    draw.rectangle([25, 56, W - 25, 125], fill=(20, 30, 52, 255))
    draw.line([25, 125, W - 25, 125], fill=(212, 175, 55, 200), width=2)
    
    # Header texts
    draw.text((W//2, 75), "TATA SONS PRIVATE LIMITED", fill=(212, 175, 55, 255), anchor="mm")
    draw.text((W//2, 102), "EXECUTIVE CREDENTIAL", fill=(148, 163, 184, 255), anchor="mm")

    # Portrait processing (320 x 380)
    PW, PH = 320, 380
    portrait_resized = portrait.resize((PW, PH), Image.Resampling.LANCZOS)
    
    # Mask rounded corners
    mask = Image.new("L", (PW, PH), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([0, 0, PW, PH], radius=16, fill=255)

    px, py = (W - PW)//2, 150
    # Gold rim around photo
    draw.rounded_rectangle([px - 4, py - 4, px + PW + 4, py + PH + 4], radius=20, outline=(212, 175, 55, 255), width=3)
    front.paste(portrait_resized, (px, py), mask)

    # Name and Title
    draw.text((W//2, 570), "RATAN N. TATA", fill=(255, 255, 255, 255), anchor="mm")
    draw.text((W//2, 605), "CHAIRMAN EMERITUS", fill=(212, 175, 55, 255), anchor="mm")
    draw.text((W//2, 635), "Tata Group • Tenure: 1991 – 2012", fill=(180, 195, 215, 255), anchor="mm")

    # Chip / Hologram and ID Bar
    draw.rounded_rectangle([50, 675, W - 50, 785], radius=12, fill=(20, 28, 48, 255), outline=(50, 68, 100, 255), width=1)
    
    # Microchip graphic
    chip_x, chip_y = 75, 700
    draw.rounded_rectangle([chip_x, chip_y, chip_x + 65, chip_y + 50], radius=8, fill=(212, 175, 55, 220), outline=(245, 215, 110, 255), width=2)
    draw.line([chip_x + 22, chip_y, chip_x + 22, chip_y + 50], fill=(160, 125, 30, 255), width=2)
    draw.line([chip_x + 44, chip_y, chip_x + 44, chip_y + 50], fill=(160, 125, 30, 255), width=2)
    draw.line([chip_x, chip_y + 25, chip_x + 65, chip_y + 25], fill=(160, 125, 30, 255), width=2)

    # Details text
    draw.text((170, 715), "BADGE ID: TS-1937-2024", fill=(240, 245, 255, 255))
    draw.text((170, 742), "STATUS: PERMANENT TRUSTEE", fill=(56, 189, 248, 255))

    # Bottom bar & motto
    draw.line([30, 825, W - 30, 825], fill=(50, 65, 95, 255), width=1)
    draw.text((W//2, 855), "LEADERSHIP WITH TRUST", fill=(212, 175, 55, 255), anchor="mm")
    draw.text((W//2, 882), "Bombay House • 24 Homi Mody Street, Mumbai", fill=(120, 140, 170, 255), anchor="mm")

    front.save("card-front.png", "PNG")
    print("Saved card-front.png")

    # --- CARD BACK (600 x 920) ---
    back = Image.new("RGBA", (W, H), (12, 17, 30, 255))
    bdraw = ImageDraw.Draw(back)

    # Border
    bdraw.rounded_rectangle([15, 15, W - 15, H - 15], radius=24, outline=(212, 175, 55, 255), width=3)
    bdraw.rounded_rectangle([22, 22, W - 22, H - 22], radius=18, outline=(40, 55, 85, 255), width=1)

    # Punch hole
    bdraw.rounded_rectangle([W//2 - 45, 28, W//2 + 45, 42], radius=7, fill=(8, 12, 22, 255), outline=(60, 80, 110, 255), width=2)

    # Magnetic Stripe
    bdraw.rectangle([25, 70, W - 25, 140], fill=(25, 32, 45, 255))
    bdraw.line([25, 140, W - 25, 140], fill=(212, 175, 55, 180), width=2)

    # Back Title
    bdraw.text((W//2, 175), "TATA CODE OF CONDUCT", fill=(212, 175, 55, 255), anchor="mm")
    bdraw.text((W//2, 205), "Pillars of Institutional Governance", fill=(148, 163, 184, 255), anchor="mm")

    # Values box
    values = [
        "• INTEGRITY: Honest, ethical, and fair conduct above all.",
        "• RESPONSIBILITY: Society is not merely a stakeholder, but our raison d'être.",
        "• EXCELLENCE: Delivering quality and technological self-reliance.",
        "• PIONEERING: Courage to take audacious, nation-building bets.",
        "• UNITY: One cohesive federation bound by shared public trust."
    ]
    vy = 245
    for val in values:
        bdraw.text((50, vy), val, fill=(210, 220, 235, 255))
        vy += 42

    # Philanthropic Note
    bdraw.rounded_rectangle([50, 485, W - 50, 610], radius=12, fill=(18, 25, 42, 255), outline=(50, 68, 100, 255), width=1)
    bdraw.text((W//2, 515), "INSTITUTIONAL PHILANTHROPY", fill=(56, 189, 248, 255), anchor="mm")
    bdraw.text((W//2, 550), ">65% of Tata Sons equity capital is held by", fill=(200, 210, 225, 255), anchor="mm")
    bdraw.text((W//2, 575), "philanthropic trusts dedicated to healthcare, education & science.", fill=(160, 175, 195, 255), anchor="mm")

    # Barcode simulation
    bx = 60
    bdraw.rectangle([50, 640, W - 50, 740], fill=(240, 245, 250, 255))
    for i in range(50, W - 50, 6):
        w = 2 if (i % 4 == 0 or i % 9 == 0) else 4
        bdraw.rectangle([i, 655, i + w, 715], fill=(20, 25, 35, 255))
    bdraw.text((W//2, 730), "*TS-1937-2024-OFFICIAL*", fill=(20, 25, 35, 255), anchor="mm")

    # Signature and footer
    bdraw.text((W//2, 790), "Ratan N. Tata", fill=(212, 175, 55, 255), anchor="mm")
    bdraw.line([W//2 - 90, 810, W//2 + 90, 810], fill=(120, 140, 170, 255), width=1)
    bdraw.text((W//2, 828), "Authorized Signatory • Tata Sons & Tata Trusts", fill=(148, 163, 184, 255), anchor="mm")

    bdraw.text((W//2, 875), "Property of Tata Sons • Return to Bombay House", fill=(100, 115, 140, 255), anchor="mm")

    back.save("card-back.png", "PNG")
    print("Saved card-back.png")

    # --- STRAP / BAND IMAGE (120 x 800) ---
    BW, BH = 120, 800
    strap = Image.new("RGBA", (BW, BH), (10, 15, 26, 255))
    sdraw = ImageDraw.Draw(strap)

    # Woven stripe texture
    for y in range(0, BH, 4):
        sdraw.line([0, y, BW, y], fill=(16, 24, 40, 255), width=1)
    
    # Outer gold borders
    sdraw.line([8, 0, 8, BH], fill=(212, 175, 55, 255), width=3)
    sdraw.line([BW - 9, 0, BW - 9, BH], fill=(212, 175, 55, 255), width=3)

    # Vertical repeated text: create rotated text chunks
    txt_img = Image.new("RGBA", (400, 40), (0, 0, 0, 0))
    tdraw = ImageDraw.Draw(txt_img)
    tdraw.text((200, 20), "TATA  ★  LEADERSHIP WITH TRUST  ★  ", fill=(212, 175, 55, 255), anchor="mm")
    rot_txt = txt_img.rotate(90, expand=True)

    # Paste rotated text along strap
    strap.paste(rot_txt, (BW//2 - rot_txt.width//2, 50), rot_txt)
    strap.paste(rot_txt, (BW//2 - rot_txt.width//2, 450), rot_txt)

    strap.save("band.png", "PNG")
    print("Saved band.png")

if __name__ == "__main__":
    generate()
