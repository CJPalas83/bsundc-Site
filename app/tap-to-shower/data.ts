export interface SpecItem {
  label: string;
  value: string;
}

export interface SpecGroup {
  title: string;
  items: SpecItem[];
}

export interface ProductVariant {
  name: string;
  warranty?: string;
  specs: SpecGroup[];
  features?: string[];
  image?: string;
  heroImage?: string;
}

export interface CollectionProduct {
  id: string;
  name: string;
  code: string;
  warranty?: string;
  description: string;
  image: string;
  heroImage?: string;
  ctaText: string;
  detailsPath: string;

  // Detailed specs for PDP
  heroDescription?: string;
  specGroups?: SpecGroup[];
  variants?: ProductVariant[];
  compliance?: string[];
  options?: {
    title: string;
    items: string[];
  };
}

export const ttsCollections: CollectionProduct[] = [
  {
    id: "complete-kit",
    name: "Complete Tap-to-Shower™ Kit",
    code: "TTS-K",
    warranty: "Tap warranty: 3 years; heater warranty: contact for details",
    description: "The all-in-one package — tap, water heater, and connection set bundled together, ideal for a full cold-to-hot bathroom upgrade in one purchase.",
    heroDescription: "Our flagship bundle provides everything needed for a complete professional installation. Engineered for performance, designed for elegance.",
    image: "/images/shower.png",
    heroImage: "/images/shower.png",
    ctaText: "View Complete Kit",
    detailsPath: "/tap-to-shower/complete-kit",
    specGroups: [
      {
        title: "Tap-to-Shower Faucet",
        items: [
          { label: "Finishes", value: "Chrome, Matt Black, Brushed SS" },
          { label: "Body", value: "Brass HP59" },
          { label: "Handle", value: "Zinc" },
          { label: "Cartridge", value: "Single Lever Ceramic" },
          { label: "Diverter", value: "3-Way" },
          { label: "Overhead Shower", value: "6\" (150×150 mm)" },
          { label: "Hand Shower", value: "1 function" },
          { label: "Hose", value: "1.5m" },
          { label: "Pipe", value: "Height Adjustable" },
        ]
      },
      {
        title: "Instant Water Heater (3.5kW)",
        items: [
          { label: "Mount", value: "Wall Hung" },
          { label: "Color", value: "White / Black" },
          { label: "Voltage", value: "220–240V, 50/60 Hz" },
          { label: "Heating Element", value: "Cast Aluminum" },
          { label: "Display", value: "Digital LED" },
        ]
      },
      {
        title: "Connection Set & Pack",
        items: [
          { label: "Push Connectors", value: "2× Push Connectors" },
          { label: "Tube", value: "6m PEX tube (cuttable)" },
          { label: "Safety", value: "Flow Restrictor, Safety Valve" },
          { label: "Mounting", value: "2× Wall Brackets, 2× Self-Adhesive Patches" },
          { label: "Hardware", value: "2× Stainless Steel Screw Set" },
          { label: "Instructions", value: "Included" },
        ]
      }
    ]
  },
  {
    id: "tap-only",
    name: "Tap-to-Shower™ Tap Only",
    code: "TTS",
    warranty: "3-Year Limited Warranty",
    description: "Just the shower column, sold separately with a range of configuration options including overhead shower sizes, hand shower, hose type, and extension pipes.",
    heroDescription: "Professional grade shower column featuring precision-engineered brass body and versatile configuration options to match any bathroom aesthetic.",
    image: "/images/carousel/shower-product.png",
    heroImage: "/images/shower.png",
    ctaText: "Explore Configurations",
    detailsPath: "/tap-to-shower/tap-only",
    specGroups: [
      {
        title: "Core Specifications",
        items: [
          { label: "Finishes", value: "Chrome, Matt Black, Brushed SS" },
          { label: "Body", value: "Brass HP59" },
          { label: "Handle", value: "Zinc" },
          { label: "Cartridge", value: "Single Lever Ceramic" },
          { label: "Diverter", value: "3-Way" },
          { label: "Overhead Shower", value: "6\" (150×150 mm)" },
          { label: "Hand Shower", value: "1 function" },
          { label: "Hose", value: "1.5m" },
        ]
      }
    ],
    options: {
      title: "Configuration Options",
      items: [
        "Material: Stainless Steel 304",
        "Overhead Shower 6\" (Ø150mm)",
        "Overhead Shower 8\" (200×200mm)",
        "Overhead Shower 8\" (Ø200mm)",
        "Overhead Shower Rectangular",
        "Hand Shower 3-function",
        "PVC Shower Hose",
        "Height Extension Pipe 300mm",
        "Upgrade Kit + Connection Set"
      ]
    },
    compliance: [
      "Chrome Surface: pass 24h Acid Salt Spray Test",
      "WRAS",
      "LEED",
      "WELS 3 Ticks"
    ]
  },
  {
    id: "connection-set",
    name: "Tap-to-Shower™ Connection Set",
    code: "TF01-C",
    warranty: "3-Year Limited Warranty",
    description: "The essential plumbing hardware — PEX tube, push connectors, flow restrictor, safety valve, and brackets. Available in multiple finishes.",
    heroDescription: "High-performance plumbing hardware engineered for durability and ease of installation. Compatible with all Tap-to-Shower heaters.",
    image: "/images/carousel/fittings.png",
    heroImage: "/images/shower.png",
    ctaText: "View Hardware Specs",
    detailsPath: "/tap-to-shower/connection-set",
    specGroups: [
      {
        title: "Push Connectors (×2)",
        items: [
          { label: "Thread", value: "G½\" × 3/8\"" },
          { label: "Safety", value: "Safety Lock" },
          { label: "Max Pressure", value: "0.5 MPa @ 65 °C" },
          { label: "Burst Pressure", value: "3.0 MPa" },
        ]
      },
      {
        title: "PEX Tube",
        items: [
          { label: "Length", value: "6m (cuttable)" },
          { label: "Size", value: "3/8\"" },
          { label: "Color", value: "White" },
          { label: "Max Pressure", value: "0.5 MPa @ 65 °C" },
          { label: "Burst Pressure", value: "3 MPa" },
        ]
      },
      {
        title: "Included Components",
        items: [
          { label: "Flow Control", value: "Flow Restrictor" },
          { label: "Safety", value: "Safety Valve" },
          { label: "Brackets", value: "2× Wall Brackets" },
          { label: "Adhesive", value: "Double-Sided Adhesive Patches" },
          { label: "Hardware", value: "Stainless Steel Screw Set" },
        ]
      }
    ],
    options: {
      title: "Color Options",
      items: ["Neutral", "Grey", "Black"]
    }
  },
  {
    id: "instant-heater",
    name: "Instant Water Heater",
    code: "IWH",
    description: "Standalone heater unit sold without accessories. Available in two distinct models with professional-grade heating elements.",
    heroDescription: "Powerful, efficient, and safe. Our instant water heaters deliver consistent temperature control in a compact, elegant form factor.",
    image: "/images/carousel/s2.png",
    heroImage: "/images/shower.png",
    ctaText: "Compare Models",
    detailsPath: "/tap-to-shower/instant-heater",
    variants: [
      {
        name: "Model A — ABS",
        image: "/images/carousel/s2.png",
        heroImage: "/images/shower.png",
        specs: [
          {
            title: "Performance & Power",
            items: [
              { label: "Power", value: "3.5kW (opt. 4.5/5.5kW)" },
              { label: "Temp Range", value: "30–55 °C" },
              { label: "Auto Shut-Off", value: "65 °C" },
              { label: "Water Pressure", value: "0.02–0.6 MPa" },
              { label: "Water Flow", value: "2–6 L/min" },
            ]
          },
          {
            title: "Construction",
            items: [
              { label: "Material", value: "ABS" },
              { label: "Color", value: "White / Black" },
              { label: "Heating Element", value: "Cast Aluminum" },
              { label: "Waterproof", value: "IP25" },
              { label: "Dimensions", value: "400×100×225 mm" },
            ]
          },
          {
            title: "Certification",
            items: [
              { label: "Certified", value: "CB IEC 60335 (water heater)" },
            ]
          }
        ]
      },
      {
        name: "Model B — Tempered Glass",
        image: "/images/carousel/s2.png",
        heroImage: "/images/shower.png",
        specs: [
          {
            title: "Performance & Power",
            items: [
              { label: "Power", value: "3.5kW (opt. 4.5/6kW)" },
              { label: "Temp Range", value: "30–55 °C" },
              { label: "Auto Shut-Off", value: "65 °C" },
              { label: "Water Pressure", value: "0.1–0.6 MPa" },
              { label: "Water Flow", value: "2–6 L/min" },
            ]
          },
          {
            title: "Construction",
            items: [
              { label: "Front Panel", value: "Tempered Glass" },
              { label: "Color", value: "Silver Grey (W/G/B options)" },
              { label: "Heating Element", value: "Stainless Steel 304" },
              { label: "Waterproof", value: "IPX4" },
              { label: "Dimensions", value: "226.5×73.5×361.5 mm" },
            ]
          },
          {
            title: "Certification",
            items: [
              { label: "Certified", value: "CE & CB IEC 60335 (water heater)" },
            ]
          }
        ]
      }
    ]
  },
  {
    id: "upgrade-kit",
    name: "Upgrade Kit",
    code: "TTS-UK",
    warranty: "Heater warranty: contact for details",
    description: "Water heater and connection set without the tap. Ideal for those who already have a compatible shower column.",
    heroDescription: "The essential upgrade package combining our high-performance water heater with specialized connection hardware.",
    image: "/images/hero.png",
    heroImage: "/images/shower.png",
    ctaText: "View Upgrade Kit",
    detailsPath: "/tap-to-shower/upgrade-kit",
    specGroups: [
      {
        title: "Instant Water Heater 3.5kW",
        items: [
          { label: "Mount", value: "Wall Hung" },
          { label: "Color", value: "White / Black" },
          { label: "Voltage", value: "220 – 240V, 50/60 Hz" },
          { label: "Heating Element", value: "Cast Aluminum" },
          { label: "Display", value: "Digital LED Display" },
          { label: "Temp Range", value: "30 – 55 °C" },
          { label: "Protection", value: "Current Leakage Protection" },
          { label: "Waterproof", value: "IPX4" },
          { label: "Auto Shut-Off", value: "60 °C" },
          { label: "Circuit Breaker", value: "Min. 20A" },
          { label: "Certification", value: "CE and CB IEC 60335 (water heater)" },
        ]
      },
      {
        title: "Connection Set",
        items: [
          { label: "Tube", value: "6m white PEX tube (cuttable)" },
          { label: "Wall Brackets", value: "2× included" },
          { label: "Adhesives", value: "2× Double-Sided Self-Adhesive Patches" },
          { label: "Hardware", value: "2× Stainless Steel Screw Set" },
          { label: "Connectors", value: "2× Push Connectors" },
          { label: "Flow Control", value: "Flow Restrictor" },
          { label: "Safety Valve", value: "Included" },
          { label: "Instructions", value: "Installation Instruction" },
        ]
      }
    ],
    options: {
      title: "Configuration Options",
      items: [
        "Instant Water Heater 4.5kW",
        "Instant Water Heater 5.5kW"
      ]
    }
  }
];
