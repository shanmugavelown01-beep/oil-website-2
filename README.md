# Levi - Premium Cooking Oils Website

A modern, responsive, and elegant website for Levi premium cooking oils brand featuring clean design, smooth animations, and professional branding.

## 🌿 Features

### Design & Aesthetics
- **Modern Clean Design**: Minimalist, professional interface with premium feel
- **Color Scheme**: White, green, and golden tones creating natural, organic aesthetic
- **Smooth Animations**: Oil-drop accents, floating elements, and transition effects
- **Organic Shapes**: Morphing backgrounds and flowing design elements
- **Rounded Sections**: Soft, welcoming borders throughout

### Website Sections

1. **Navigation Bar**
   - Fixed, sticky navigation with smooth scroll
   - Mobile hamburger menu for responsive design
   - Active link indicators

2. **Home Section**
   - Hero banner with compelling headline
   - Call-to-action button
   - Animated oil bottle and drop visuals

3. **About Section**
   - Brand story and mission
   - Key features (100% Natural, Cold-Pressed, Sustainably Sourced)
   - Animated organic shape backgrounds

4. **Our Oils Section**
   - Product cards for 5 premium oils:
     - Levi Groundnut Oil
     - Levi Coconut Oil
     - Levi Sesame Oil
     - Levi Sunflower Oil
     - Levi Castor Oil
   - Product descriptions with benefits
   - Pricing placeholders
   - "Add to Cart" functionality
   - Oil-drop accents on each product

5. **Health Benefits Section**
   - 6 key health benefit cards
   - Icons and descriptions
   - Heart health, brain function, energy, skin care, immunity, inflammation relief

6. **Packaging Section**
   - Sustainable packaging information
   - Features list
   - Animated bottle display mockups

7. **Gallery Section**
   - 6-item image gallery
   - Placeholder spaces for high-quality photos
   - Hover effects

8. **Contact Section**
   - Contact information (Email, Phone, Address)
   - Contact form with validation
   - Social media links
   - Newsletter signup area

9. **Footer**
   - Copyright information
   - Brand tagline

### Interactive Features

- **Smooth Navigation**: Scroll-to-section navigation with smooth behavior
- **Form Validation**: Contact form with email validation
- **Add to Cart**: Product cart functionality with feedback
- **Scroll Effects**: Parallax effects and reveal animations
- **Mobile Responsive**: Fully responsive design for all screen sizes
- **Keyboard Accessibility**: Escape key functionality
- **Hover Effects**: Interactive elements with visual feedback
- **Scroll to Top**: Floating button for quick navigation

### SEO Optimization

- Semantic HTML structure
- Meta descriptions and keywords
- Proper heading hierarchy
- Alt text placeholders for images
- Mobile-friendly design
- Fast loading with optimized CSS and JavaScript

## 📁 File Structure

```
oil website 2/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling and animations
├── script.js           # Interactive functionality
└── README.md           # This file
```

## 🚀 Getting Started

1. **Open in Browser**: Simply open `index.html` in any modern web browser
2. **No Dependencies**: Pure HTML, CSS, and JavaScript - no external libraries needed
3. **Live Server** (Optional): Use VS Code Live Server extension for development
   - Right-click `index.html` → "Open with Live Server"

## 💻 Browser Compatibility

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-green: #2d5016;
    --light-green: #4a7c2c;
    --golden: #d4a574;
    --primary-white: #ffffff;
    /* ... more variables */
}
```

### Fonts
Change font-family in the body selector:
```css
body {
    font-family: 'Your Font', sans-serif;
}
```

### Content
- Update product names and descriptions in `index.html`
- Modify prices in the price-section divs
- Edit contact information in the Contact section
- Update social media links

### Images
Replace placeholder divs with actual images:
```html
<!-- Replace this -->
<div class="gallery-placeholder">Image Title</div>

<!-- With this -->
<img src="path/to/image.jpg" alt="Image description">
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## ⚙️ Features Configuration

### Enable/Disable Features

- **Scroll to Top Button**: Already enabled, modify in `script.js`
- **Form Validation**: Active in Contact section
- **Mobile Menu**: Hamburger menu automatically appears on mobile
- **Animations**: All animations are CSS-based for performance

## 🔧 Development Tips

1. **Live Editing**: Changes to CSS/JS reflect immediately with Live Server
2. **Console Logs**: Open browser DevTools (F12) to see console messages
3. **Mobile Testing**: Use Chrome DevTools device emulation (Ctrl+Shift+M)
4. **Performance**: Check Lighthouse scores in DevTools

## 📊 SEO Best Practices Implemented

- ✓ Semantic HTML5 structure
- ✓ Mobile-first responsive design
- ✓ Fast CSS animations (GPU accelerated)
- ✓ Proper heading hierarchy
- ✓ Meta tags and descriptions
- ✓ Clean, descriptive content
- ✓ Fast page load times
- ✓ Accessibility features

## 🔒 Security Notes

- Form data is currently logged to console only (production ready with backend)
- No external scripts or tracking
- Safe for HTTPS deployment

## 📧 Next Steps

To make this production-ready:

1. **Replace Placeholders**:
   - Add real product images
   - Update gallery with high-quality photos
   - Add actual bottle mockups

2. **Backend Integration**:
   - Connect contact form to email service
   - Implement shopping cart backend
   - Add payment processing

3. **Analytics**:
   - Add Google Analytics
   - Track user behavior
   - Monitor conversions

4. **Performance**:
   - Optimize images
   - Minify CSS/JS
   - Add caching headers

5. **SEO**:
   - Create sitemap.xml
   - Add robots.txt
   - Submit to search engines

## 📝 License

Created for Levi Oils Brand - 2024

## 🤝 Support

For modifications and enhancements, ensure:
- Cross-browser testing
- Mobile responsiveness check
- Performance optimization
- SEO compliance

---

**Version**: 1.0  
**Last Updated**: December 2024  
**Status**: Production Ready
