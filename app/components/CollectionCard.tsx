"use client";

import React from "react";
import { motion } from "framer-motion";
import EditorialImage from "./EditorialImage";
import Overline from "./Overline";

interface CollectionCardProps {
  image: string;
  overline: string;
  title: string;
  description: string;
  index?: number;
}

export default function CollectionCard({
  image,
  overline,
  title,
  description,
  index = 0,
}: CollectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group border-t border-text-main/15 pt-6 md:pt-8 cursor-pointer"
    >
      {/* Image */}
      <EditorialImage
        src={image}
        alt={title}
        aspect="4/5"
        className="mb-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-shadow duration-300 group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.14)]"
      />

      {/* Content */}
      <Overline className="mb-3">
        {overline}
      </Overline>

      <h3 className="font-heading text-xl md:text-2xl text-text-main mb-2 transition-colors duration-200 group-hover:text-accent">
        {title}
      </h3>

      <p className="font-body text-sm text-text-body leading-relaxed">
        {description}
      </p>

    </motion.div>
  );
}
