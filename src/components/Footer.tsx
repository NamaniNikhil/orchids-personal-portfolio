"use client";

import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import content from "@/data/content.json";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="site-footer-inner"
        >
          <p>{content.personal.name}</p>
          <p>{content.personal.title}</p>
          <p>&copy; {new Date().getFullYear()}</p>
          <a href="#home" className="site-footer-top">Back to top <ArrowUp size={14} aria-hidden="true" /></a>
        </motion.div>
      </div>
    </footer>
  );
}
