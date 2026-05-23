"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import EditorialImage from "./EditorialImage";
import Overline from "./Overline";

interface CollectionItem {
  image: string;
  overline: string;
  title: string;
  description: string;
  href?: string;
}

const collections: CollectionItem[] = [
  {
    image: "/images/webp_1200/tts-chrome.webp",
    overline: "Shower Systems",
    title: "Tap-to-Shower Collection",
    description:
      "Complete kits, tap-only options, upgrade sets, and water heaters.",
    href: "/tap-to-shower",
  },
  {
    image: "/images/carousel/duet.png",
    overline: "Smart Technology",
    title: "DUET Collection",
    description:
      "Intelligent sensor taps that unite soap and water in a single gesture.",
  },
  {
    image: "/images/carousel/s2.png",
    overline: "Residential",
    title: "S2 Collection",
    description:
      "A harmonious balance of form and function for residential bathrooms.",
  },
  {
    image: "/images/carousel/sus.png",
    overline: "Stainless Steel",
    title: "SUS Collection",
    description:
      "Crafted from premium 304 stainless steel — enduring elegance.",
  },
  {
    image: "/images/carousel/line.png",
    overline: "Minimalist",
    title: "LINE Collection - Taps",
    description:
      "Reduced to its essence — clean geometric taps, every line deliberate.",
  },
  {
    image: "/images/carousel/self-closing-taps.png",
    overline: "Flush Valve Collection",
    title: "Self Closing Tap",
    description:
      "Water-saving, high durability, efficient management.",
  },
  {
    image: "/images/carousel/sensor.png",
    overline: "Sensor Products",
    title: "Sensor Product Collection",
    description:
      "Touchless technology for hospitals, commercial spaces, and public restrooms.",
  },
  {
    image: "/images/carousel/kitchen-products.png",
    overline: "Kitchen Collection",
    title: "Kitchen Products Collection",
    description:
      "A curated array of sinks, faucets, and accessories for the modern kitchen.",
  },
  {
    image: "/images/carousel/bathroom.png",
    overline: "Bathroom Ceramics",
    title: "Bathroom Collection",
    description:
      "Rimless toilets, sculptural washbasins, and wall-hung urinals.",
  }, 
  {
    image: "/images/carousel/furniture.png",
    overline: "Furniture",
    title: "Furniture Collection",
    description:
      "Vanity units and storage designed to complement our fixture lines.",
  },
  {
    image: "/images/carousel/bidet.png",
    overline: "Hygiene",
    title: "Bidet Spray Collection",
    description:
      "Precision-engineered bidet systems for comfort and personal hygiene.",
  },
  {
    image: "/images/carousel/fittings.png",
    overline: "Fittings",
    title: "Fittings Collection",
    description:
      "Angle valves, drainage systems, and concealed fittings — the invisible backbone.",
  },
];


const CARD_WIDTH = 340;
const CARD_GAP = 24;

// We duplicate items for seamless looping
const duplicated = [...collections, ...collections];
const SINGLE_SET_WIDTH = collections.length * (CARD_WIDTH + CARD_GAP);
const SCROLL_SPEED = 100; // pixels per second — slow, cinematic
const DURATION = SINGLE_SET_WIDTH / SCROLL_SPEED;

export default function CollectionCarousel() {
  const controls = useAnimationControls();
  const [isHovered, setIsHovered] = useState(false);
  const progressRef = useRef(0); // 0 to 1 representing position through one set

  // Start or resume the continuous scroll
  useEffect(() => {
    if (isHovered) {
      // Pause: stop at current position
      controls.stop();
      return;
    }

    // Resume from where we left off
    const remainingFraction = 1 - progressRef.current;
    const remainingDuration = remainingFraction * DURATION;

    controls.start({
      x: -SINGLE_SET_WIDTH,
      transition: {
        duration: remainingDuration,
        ease: "linear",
        from: -(progressRef.current * SINGLE_SET_WIDTH),
      },
    }).then(() => {
      // When one full cycle completes, reset and loop
      if (!isHovered) {
        progressRef.current = 0;
        controls.set({ x: 0 });
        // Trigger re-render to restart
        controls.start({
          x: -SINGLE_SET_WIDTH,
          transition: {
            duration: DURATION,
            ease: "linear",
            repeat: Infinity,
          },
        });
      }
    });

    return () => {
      controls.stop();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered]);

  // Track progress so we can resume from the right spot
  const handleMouseEnter = () => {
    // Capture where we are right now
    const track = document.getElementById("carousel-track");
    if (track) {
      const style = getComputedStyle(track);
      const matrix = new DOMMatrix(style.transform);
      const currentX = Math.abs(matrix.m41);
      progressRef.current = (currentX % SINGLE_SET_WIDTH) / SINGLE_SET_WIDTH;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Carousel track */}
      <div className="overflow-hidden">
        <motion.div
          id="carousel-track"
          animate={controls}
          className="flex"
          style={{ gap: CARD_GAP }}
        >
          {duplicated.map((item, i) => {
            const Content = (
              <div
                className="shrink-0 group cursor-pointer"
                style={{ width: CARD_WIDTH }}
              >
                {/* Image */}
                <div className="border-t border-text-main/15 pt-6 mb-5">
                  <EditorialImage
                    src={item.image}
                    alt={item.title}
                    aspect="4/5"
                    className="shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-shadow duration-700 group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.14)]"
                  />
                </div>

                {/* Content */}
                <Overline className="mb-2">
                  {item.overline}
                </Overline>

                <h3 className="font-heading text-lg md:text-xl text-text-main mb-1.5 transition-colors duration-500 group-hover:text-accent">
                  {item.title}
                </h3>

                <p className="font-body text-xs text-text-body leading-relaxed">
                  {item.description}
                </p>

              </div>
            );

            return item.href ? (
              <a key={`${item.title}-${i}`} href={item.href}>
                {Content}
              </a>
            ) : (
              <React.Fragment key={`${item.title}-${i}`}>
                {Content}
              </React.Fragment>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
