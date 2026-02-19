# Vivek College Bijnor - Advertisement Website

A professional college advertisement website with 3D graphics, built with Python Flask, HTML, and modern CSS/JavaScript.

## Features

- **3D Background** - Three.js animated geometric shapes (torus knot, icosahedron, octahedron)
- **3D CSS Effects** - Perspective transforms on gallery images and flip cards on courses
- **3 College Images** - Campus gallery with 3D perspective cards
- **3 Courses** - D.E.D Special Education, Children Disabilities, DLED (flip cards)

## Quick Start

```bash
cd pro
pip install -r requirements.txt
python app.py
```

Open http://127.0.0.1:5001 in your browser.

## Replacing Placeholder Images

Replace the SVG placeholders in `static/images/` with your actual college photos:
- `college1.svg` → Main Building (or rename to `college1.jpg` and update HTML)
- `college2.svg` → Campus Facilities  
- `college3.svg` → Learning Environment

Supported formats: JPG, PNG, SVG, WebP
