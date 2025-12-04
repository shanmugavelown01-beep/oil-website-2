/* ============================================
   LEVI PREMIUM OILS - ANIMATIONS REFERENCE
   ============================================ */

/*
This file documents all animations used in the website
for easy reference, modification, and understanding.
*/

/* ============================================
   ANIMATION TIMING FUNCTIONS
   ============================================ */

/*
- ease: Slow start, fast middle, slow end (default)
- ease-in: Slow start
- ease-out: Slow end
- ease-in-out: Slow both ends
- linear: Constant speed
- cubic-bezier(0.4, 0, 0.2, 1): Custom timing
*/

/* ============================================
   LOGO ANIMATIONS
   ============================================ */

/*
NAME: float
DURATION: 3s
TIMING: ease-in-out infinite
ELEMENT: .logo-icon
EFFECT: Makes the logo float up and down continuously
*/
@keyframes float {
    0%, 100% { 
        transform: translateY(0px); 
    }
    50% { 
        transform: translateY(-10px); 
    }
}

/* Usage in CSS:
.logo-icon {
    animation: float 3s ease-in-out infinite;
} */

/* ============================================
   ENTRANCE ANIMATIONS
   ============================================ */

/*
NAME: slideInLeft
DURATION: 0.8s
ELEMENT: .hero-content and others
EFFECT: Slides content in from left with fade
*/
@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/*
NAME: slideInRight
DURATION: 0.8s
ELEMENT: .hero-visual
EFFECT: Slides content in from right with fade
*/
@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/*
NAME: slideUp
DURATION: 0.8s
ELEMENT: .oil-bottle-mockup
EFFECT: Slides up from bottom with fade
*/
@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/*
NAME: fadeInUp
DURATION: 0.6s
ELEMENT: .oil-card, .benefit-card, .gallery-item
EFFECT: Fades in while sliding up (staggered delays)
STAGGER: 0.1s between each element
*/
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Usage with stagger delay:
.oil-card:nth-child(1) { animation-delay: 0.1s; }
.oil-card:nth-child(2) { animation-delay: 0.2s; }
.oil-card:nth-child(3) { animation-delay: 0.3s; }
etc... */

/* ============================================
   FLOATING & MOVEMENT ANIMATIONS
   ============================================ */

/*
NAME: dropFloat
DURATION: 4s
TIMING: ease-in-out infinite
ELEMENT: .oil-drop-large, .oil-drop-accent
EFFECT: Smooth floating motion with slight vertical movement
*/
@keyframes dropFloat {
    0%, 100% {
        transform: rotate(-45deg) translateY(0);
    }
    50% {
        transform: rotate(-45deg) translateY(-30px);
    }
}

/* Alternative for oil drops without rotation:
@keyframes dropFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-30px); }
}
*/

/*
NAME: bottleSwing
DURATION: 3s
TIMING: ease-in-out infinite
ELEMENT: .bottle (multiple with staggered delays)
EFFECT: Gentle swinging motion for bottles
STAGGER: 0.3s between each bottle
*/
@keyframes bottleSwing {
    0%, 100% {
        transform: rotateZ(-5deg) translateY(0);
    }
    50% {
        transform: rotateZ(5deg) translateY(-10px);
    }
}

/* Usage with stagger:
.bottle-1 { animation: bottleSwing 3s ease-in-out infinite; }
.bottle-2 { animation: bottleSwing 3s ease-in-out infinite 0.3s; }
.bottle-3 { animation: bottleSwing 3s ease-in-out infinite 0.6s; }
*/

/* ============================================
   SHAPE TRANSFORMATIONS
   ============================================ */

/*
NAME: shapeShift
DURATION: 6s
TIMING: ease-in-out infinite
ELEMENT: .organic-shape
EFFECT: Morphs shape by changing border-radius and rotating
Creates organic, flowing movement
STAGGER: 2s between shapes for async effect
*/
@keyframes shapeShift {
    0%, 100% {
        border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
        transform: rotate(0deg);
    }
    50% {
        border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
        transform: rotate(180deg);
    }
}

/* Usage:
.shape-1 {
    animation: shapeShift 6s ease-in-out infinite;
    animation-delay: 0s;
}
.shape-2 {
    animation: shapeShift 6s ease-in-out infinite;
    animation-delay: 2s;
}
*/

/* ============================================
   HOVER STATE ANIMATIONS
   ============================================ */

/*
Hover animations are NOT keyframe-based but use transitions
They're triggered by :hover pseudo-class
*/

/* Example: Card hover effect
.oil-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.oil-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
}
*/

/* Example: Button hover
.cta-button {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(45, 80, 22, 0.3);
}
*/

/* ============================================
   ANIMATION PERFORMANCE NOTES
   ============================================ */

/*
GPU ACCELERATED PROPERTIES (Smooth, performant):
- transform: translate(), rotate(), scale()
- opacity

AVOID ANIMATING (CPU intensive, causes jank):
- width, height, margin, padding
- top, left, right, bottom (use transform instead)
- background-color (use opacity + background-image)
- border-width

OPTIMIZATION TIPS:
1. Use will-change sparingly:
   .animating-element { will-change: transform; }

2. Use backface-visibility for 3D performance:
   .element { backface-visibility: hidden; }

3. Use transform instead of position changes:
   Instead of: left: 10px;
   Use: transform: translateX(10px);

4. Composite animations:
   Element receives multiple animations together
   Better than separate animations on different elements
*/

/* ============================================
   ANIMATION TIMING PRESETS
   ============================================ */

/*
FAST: 0.2s - 0.3s (UI feedback, hover states)
NORMAL: 0.6s - 0.8s (Page entrance, section reveals)
SLOW: 2s - 4s (Background elements, continuous loops)

COMMON TIMINGS USED IN LEVI WEBSITE:
- 0.3s: Transitions and hover effects
- 0.6s: Card reveals (fadeInUp)
- 0.8s: Hero section entrances
- 2s - 4s: Continuous floating effects (dropFloat, float)
- 6s: Background shape shifts
- 3s: Bottle swinging
*/

/* ============================================
   CSS CUBIC-BEZIER CURVES
   ============================================ */

/*
EASING USED IN LEVI:
cubic-bezier(0.4, 0, 0.2, 1) - smooth, natural easing
cubic-bezier(0.25, 0.46, 0.45, 0.94) - ease-out
cubic-bezier(0.55, 0.055, 0.675, 0.19) - ease-in

These create smooth, professional-looking animations
that feel natural to the user.
*/

/* ============================================
   ANIMATION DELAYS IN LEVI
   ============================================ */

/*
STAGGER PATTERN:
Used to create sequential reveal effects

Oil Cards (5 products):
- Card 1: 0.1s
- Card 2: 0.2s
- Card 3: 0.3s
- Card 4: 0.4s
- Card 5: 0.5s

Benefit Cards (6 items):
- Card 1: 0.1s
- Card 2: 0.2s
- ...continuing in 0.1s increments

Gallery Items (6 images):
- Item 1: 0.1s
- Item 2: 0.2s
- ...continuing in 0.1s increments

This creates a cascading effect where each element
appears in sequence, enhancing visual interest.

Delay in CSS:
.element:nth-child(1) { animation-delay: 0.1s; }
.element:nth-child(2) { animation-delay: 0.2s; }
*/

/* ============================================
   RESPONSIVE ANIMATION ADJUSTMENTS
   ============================================ */

/*
For mobile devices (< 768px):
--transition: all 0.2s ease;

This faster transition time makes animations feel
snappier on slower mobile devices.

MOBILE ANIMATION CONSIDERATIONS:
1. Reduce animation duration for better UX
2. Disable parallax (can cause jank on mobile)
3. Simpler entrance animations
4. Shorter stagger delays
5. Disable continuous animations if performance drops
*/

/* ============================================
   ANIMATION USAGE EXAMPLES
   ============================================ */

/*
EXAMPLE 1: Simple fade-in on scroll
const element = document.querySelector('.card');
element.style.animation = 'fadeInUp 0.6s ease-out forwards';

EXAMPLE 2: Animated button click
button.addEventListener('click', function() {
    this.style.animation = 'pulse 0.5s ease-in-out';
});

EXAMPLE 3: Parallax scroll effect
window.addEventListener('scroll', function() {
    const offset = window.scrollY * 0.5;
    element.style.transform = `translateY(${offset}px)`;
});

EXAMPLE 4: Hover animation trigger
element.addEventListener('mouseenter', function() {
    this.style.animation = 'bounce 0.5s ease-out';
});
*/

/* ============================================
   ANIMATION DEBUGGING TIPS
   ============================================ */

/*
CHROME DEVTOOLS METHOD:
1. Right-click element → Inspect
2. Go to Animations tab
3. Hover over animation to preview
4. Adjust timing in real-time
5. Export modified code

FIREFOX DEVTOOLS METHOD:
1. Right-click element → Inspect Element
2. Go to Inspector tab
3. Check Animations section
4. View animation details

VISUAL DEBUGGING:
- Slow down animations: Ctrl+Shift+P → Slow down animations
- Add borders to see movement: outline: 2px solid red;
- Use background colors to isolate elements
- Check console for JavaScript errors
*/

/* ============================================
   CUSTOM ANIMATION TEMPLATE
   ============================================ */

/*
To create new animations, follow this template:

@keyframes animationName {
    0% { 
        // Starting state
        opacity: 0;
        transform: translateY(20px);
    }
    50% { 
        // Optional middle state
        opacity: 0.5;
    }
    100% { 
        // Ending state
        opacity: 1;
        transform: translateY(0);
    }
}

Usage:
.element {
    animation: animationName 0.6s ease-out forwards;
}

Tips:
- Use 0% and 100% (or from/to)
- Keep animations under 1 second for UI elements
- 2-4 seconds for background elements
- Always specify timing function for consistency
- Use forwards to keep end state
*/

/* ============================================
   ACCESSIBILITY CONSIDERATIONS
   ============================================ */

/*
REDUCED MOTION PREFERENCE:
Some users prefer minimal animations (accessibility setting)

Respect user preferences:
@media (prefers-reduced-motion: reduce) {
    * {
        animation: none !important;
        transition: none !important;
    }
}

This respects the user's system accessibility settings
*/

/* ============================================
   RECOMMENDED ADDITIONS
   ============================================ */

/*
Could add these animations for enhancement:

1. PULSE effect for CTAs:
@keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(45, 80, 22, 0.7); }
    50% { box-shadow: 0 0 0 10px rgba(45, 80, 22, 0); }
}

2. BOUNCE effect for buttons:
@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

3. SPIN effect for loading:
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

4. GRADIENT SHIFT for backgrounds:
@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

5. SCALE PULSE for emphasis:
@keyframes scalePulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}
*/

/* ============================================
   END OF ANIMATION REFERENCE
   ============================================ */

/*
For questions or modifications:
1. Check the animations tab in DevTools
2. Experiment with different timing values
3. Test on multiple devices
4. Monitor performance impact
5. Keep animation principles consistent

Happy animating! 🎬
*/
