"""Builds the app icon + splash screen images for the Android APK (no extra libraries needed).
Run automatically by the GitHub Actions workflow. Output goes to the assets/ folder."""
import os, zlib, struct, math

def write_png(path, w, h, rows, alpha):
    def ch(t, d):
        x = struct.pack('>I', len(d)) + t + d
        return x + struct.pack('>I', zlib.crc32(t + d) & 0xffffffff)
    raw = b''.join(b'\x00' + bytes(r) for r in rows)
    ct = 6 if alpha else 2
    open(path, 'wb').write(b'\x89PNG\r\n\x1a\n' + ch(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, ct, 0, 0, 0))
                           + ch(b'IDAT', zlib.compress(raw, 6)) + ch(b'IEND', b''))

MINT, AMBER = (79, 214, 174), (240, 180, 85)

def art(x, y, size, scale):
    """Returns the ring/dot colour at a pixel, or None. scale shrinks the art (adaptive icons need a safe zone)."""
    c = size / 2
    d = math.hypot(x - c, y - c) / size / scale
    ang = (math.degrees(math.atan2(x - c, -(y - c))) + 360) % 360
    if 0.26 < d < 0.36 and ang < 290: return MINT
    if d < 0.13: return AMBER
    return None

def icon(size, scale, bg, alpha, path):
    rows = []
    for y in range(size):
        row = bytearray()
        for x in range(size):
            a = art(x, y, size, scale)
            if a: px = a + ((255,) if alpha else ())
            elif bg is None: px = (0, 0, 0, 0)
            else:
                k = (x + y) / (2 * size); px = (int(12 + 8 * k), int(40 + 30 * k), int(34 + 24 * k)) + ((255,) if alpha else ())
            row += bytes(px)
        rows.append(row)
    write_png(path, size, size, rows, alpha)

def splash(size, path):
    bg = (12, 18, 16); s = 560; x0 = (size - s) // 2
    plain = bytes(bg) * size
    rows = []
    for y in range(size):
        if y < x0 or y >= x0 + s: rows.append(plain); continue
        row = bytearray(bg * x0)
        for x in range(s):
            row += bytes(art(x, y - x0, s, 1) or bg)
        row += bytes(bg * (size - x0 - s))
        rows.append(row)
    write_png(path, size, size, rows, False)

os.makedirs('assets', exist_ok=True)
icon(1024, 1.0, 'full', False, 'assets/icon-only.png')                 # legacy / full icon
icon(1024, 0.8, None, True, 'assets/icon-foreground.png')              # adaptive icon: transparent, inside safe zone
icon_bg = [bytes((14, 38, 33)) * 1024 for _ in range(1024)]
write_png('assets/icon-background.png', 1024, 1024, icon_bg, False)    # adaptive icon: solid background
splash(2732, 'assets/splash.png')
splash(2732, 'assets/splash-dark.png')
print('assets ready')
