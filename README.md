# Valentine's Day Letter 💕

A beautiful, interactive Valentine's Day letter with animations, sound, and photo gallery.

## Folder Structure

```
valentine/
├── index.html          (Main HTML file)
├── css/
│   └── style.css       (All styling)
├── js/
│   └── script.js       (All JavaScript logic)
├── images/             (Your photo folder)
│   ├── photo1.jpg
│   ├── photo2.jpg
│   └── photo3.jpg
└── README.md           (This file)
```

## How to Use

1. **Open the Letter**: Simply open `index.html` in a web browser
2. **Add Pre-loaded Photos**: Place your photos in the `images/` folder with names like `photo1.jpg`, `photo2.jpg`, etc.
3. **Upload More Photos**: Click "📷 Add Photos" button to upload additional photos
4. **Play Music**: Click the 🎵 button in the bottom-right to play background music
5. **Send Love**: Click "Click to Send Love! 💖" for a spectacular animation burst
6. **View Photos**: Click any photo to view it in full screen

## Features

✨ **Visual Effects**:
- Floating hearts and twinkling stars in background
- Cursor glow effect
- Confetti burst animation
- Ripple effects on buttons
- 3D parallax envelope
- Smooth text animations

🎵 **Audio**:
- Procedurally generated romantic background music
- Toggle on/off with the music button

📸 **Photo Gallery**:
- Pre-load photos from the `images` folder
- Upload additional photos
- Click to view full-size in lightbox
- Delete user-uploaded photos
- Reset gallery (removes user uploads, keeps originals)

## Customization

### Edit the Letter
Open `index.html` and modify the text in the `<div class="letter-body">` section.

### Add Pre-loaded Photos
1. Place your images in the `images/` folder
2. Open `js/script.js`
3. Update the `initialPhotos` array with your photo names and captions:

```javascript
const initialPhotos = [
    {
        id: 1,
        src: 'images/photo1.jpg',
        caption: 'Your caption here',
        isInitial: true
    },
    // ... add more
];
```

### Change Colors
Open `css/style.css` and modify the color values. Main colors:
- Primary Red: `#ff6b6b`
- Dark Red: `#e63946`
- Background Gradient: `#667eea` to `#764ba2`

### Adjust Animations
All animations are defined in `css/style.css`. You can modify:
- Animation duration
- Delays
- Easing functions
- Opacity and transform values

## Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## Notes

- Photos are stored in browser's localStorage for user uploads
- Music requires user interaction to start (browser autoplay policy)
- All data is saved locally in the browser
- "Reset Gallery" only removes user-uploaded photos, keeps original ones

Enjoy! 💕
