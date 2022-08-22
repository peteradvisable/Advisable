import React from "react";
import { motion } from "framer-motion";
import GridLines from "src/components/GridLines";

export default function Hero() {
  return (
    <div className="mb-4 hero">
      <div className="relative z-10 py-24 px-5 mx-auto lg:px-10 max-w-[1300px]">
        <GridLines color="#e4cfff" highlight="#B98CDD" />
        <div className="relative z-10 max-w-[560px]">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0, duration: 0.8 }}
            className="mb-4 font-serif text-5xl font-bold text-blue900 tracking-[-0.02em]"
          >
            Discover the best of{" "}
            <span className="font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
              SaaS Marketing
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05, duration: 1 }}
            className="text-xl leading-relaxed text-blue900 max-w-[600px]"
          >
            Find out what's working for leading marketers and connect with them
            for mentorship & fractional support
          </motion.p>
        </div>
      </div>
    </div>
  );
}