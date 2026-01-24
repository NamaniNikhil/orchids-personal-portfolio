"use client";

import { Heart } from "lucide-react";
import content from "@/data/content.json";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="py-10 bg-[#030303] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-gray-500 text-sm flex items-center gap-2">
            Made with{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
            >
              <Heart size={14} className="text-emerald-500 fill-emerald-500" />
            </motion.span>{" "}
            by{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent font-medium">
              {content.personal.name}
            </span>
          </p>
          <p className="text-gray-600 text-sm" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
