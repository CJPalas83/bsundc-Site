/**
 * BRAND SETTINGS SEAM (F3)
 * 
 * This file centralizes the visual characteristics and configuration slots
 * that will define the brand's aesthetic once a brand reference is selected (A1).
 * Currently, it is pre-filled with the baseline values to match the existing look.
 * 
 * How to apply a new brand direction:
 * 1. Modify the font stacks (headingFont, bodyFont) below.
 * 2. Update the color mapping values or customize the CSS theme variables in globals.css.
 * 3. Change image aspect ratios, rounded corner radii, and transition durations.
 */

export const BRAND_SETTINGS = {
  // 1. Typography Selection
  typography: {
    headingFont: '"Calibri", "Segoe UI", Candara, Segoe, Optima, Arial, sans-serif',
    bodyFont: '"Calibri", "Segoe UI", Candara, Segoe, Optima, Arial, sans-serif',
    // Options for styling scale
    fluidScaleEnabled: true,
  },

  // 2. Color Scheme Ramps (referenced in globals.css token system)
  colors: {
    ink: "#2F2F2F",          // Core text color / main brand ink
    inkBody: "#4A4A4A",      // Main body text
    inkMuted: "#6B6B6B",     // Secondary/de-emphasized text
    accent: "#0F5E8A",       // Brand accent color
    accentLight: "#1679B0",  // Lighter hover accent
    surface: "#FFFFFF",      // Main background
    surfaceAlt: "#F7F7F7",   // Alternating section backgrounds
    surfaceFeature: "#F2F5F7", // Specialized block highlights
    borderLine: "rgba(26, 26, 26, 0.1)", // Default subtle border
  },

  // 3. Shape & Imagery Treatment
  shapes: {
    // Corner radii for components (corresponds to --radius-* variables)
    radiusCard: "0px",       // Square/minimal look for editorial feel
    radiusButton: "0px",     // Rectangular buttons
    radiusInput: "0px",      // Rectangular form fields
    
    // Grayscale transition overlay
    editorialImageGrayscale: true, // If true, images default to grayscale and fade-in color on hover
    editorialImageZoom: true,      // If true, zoom in slightly on hover
  },

  // 4. Motion & Animation Personality
  motion: {
    // Duration for micro-interactions (hovers, focus states)
    durationState: "200ms",
    
    // Duration for scroll-reveals and block-entrances
    durationReveal: "600ms",
    
    // Custom easing function
    easeDefault: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  }
};
