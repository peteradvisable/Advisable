import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const arrowVariants = {
  initial: { x: 0 },
  hover: { x: -2 },
};

const lineVariants = {
  initial: { x: 0, pathLength: 0.8 },
  hover: { x: 2, pathLength: 1 },
};

export default function BackButton({ to, label = "Back", state, ...props }) {
  return (
    <motion.div
      aria-label={label}
      initial="initial"
      whileHover="hover"
      onClick={() => !to && window.history.back()}
      className="group w-[40px] min-w-[40px] h-[40px] rounded-full relative inline-flex cursor-pointer overflow-hidden"
      {...props}
    >
      {to ? (
        <Link
          to={to}
          state={state}
          className="top-0 left-0 absolute w-full h-full"
        />
      ) : null}
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        className="z-10"
      >
        <motion.path
          d="M25 20H14"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={lineVariants}
          className="stroke-neutral800"
        />
        <motion.path
          d="M20 15L15 20L20 25"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="red-500"
          variants={arrowVariants}
          className="stroke-neutral800"
        />
      </svg>
      <div className="absolute w-full h-full top-0 left-0 bg-white opacity-50 group-hover:opacity-60 transition-opacity" />
    </motion.div>
  );
}
