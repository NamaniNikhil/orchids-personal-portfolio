"use client";

import { useState } from "react";
import { Mail, Send, MapPin, Github, Linkedin, Twitter, Download, CheckCircle, X, MessageSquare } from "lucide-react";
import content from "@/data/content.json";
import { motion, AnimatePresence } from "framer-motion";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setFormData({ name: "", email: "", message: "" });
    setShowSuccess(true);
  };

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
  };

  return (
    <section id="contact" className="py-28 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/10 via-emerald-500/5 to-transparent rounded-full blur-[180px]" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-gradient-to-tl from-sky-500/8 to-transparent rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-full border border-cyan-500/20 mb-6">
              <MessageSquare size={16} className="text-cyan-400" />
              <span className="text-sm bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent font-medium">Let&apos;s Connect</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Get In <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? Feel free to reach out!
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <RevealOnScroll x={-50} y={0} delay={0.1}>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">
                Let&apos;s work together
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                I&apos;m always interested in hearing about new projects and opportunities.
                Whether you have a question or just want to say hi, feel free to drop me a message!
              </p>

              <div className="space-y-4 mb-8">
                <motion.a
                  href={`mailto:${content.personal.email}`}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="flex items-center gap-4 p-5 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group"
                >
                  <div className="p-3.5 bg-gradient-to-br from-cyan-500/20 to-emerald-500/10 rounded-xl group-hover:from-cyan-500/30 group-hover:to-emerald-500/20 transition-colors">
                    <Mail size={22} className="text-cyan-400" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-0.5">Email</p>
                    <p className="text-white font-medium">{content.personal.email}</p>
                  </div>
                </motion.a>

                <motion.div 
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="flex items-center gap-4 p-5 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl border border-white/10"
                >
                  <div className="p-3.5 bg-gradient-to-br from-sky-500/20 to-cyan-500/10 rounded-xl">
                    <MapPin size={22} className="text-sky-400" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-0.5">Location</p>
                    <p className="text-white font-medium">{content.personal.location}</p>
                  </div>
                </motion.div>
              </div>

              <div className="flex items-center gap-3 mb-8">
                {Object.entries(content.social)
                  .filter(([platform]) => platform !== "email")
                  .map(([platform, url], index) => {
                    const Icon = socialIcons[platform as keyof typeof socialIcons];
                    if (!Icon) return null;
                    return (
                      <motion.a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-4 text-gray-400 hover:text-white bg-white/5 rounded-xl border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#050505]"
                        aria-label={`Visit my ${platform} profile (opens in new tab)`}
                      >
                        <Icon size={22} aria-hidden="true" />
                      </motion.a>
                    );
                  })}
              </div>

              {content.personal.resume && (
                <motion.a
                  href={content.personal.resume}
                  download
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#050505]"
                >
                  <Download size={18} aria-hidden="true" />
                  Download Resume
                </motion.a>
              )}
            </div>
          </RevealOnScroll>

          <RevealOnScroll x={50} y={0} delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-5 py-4 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all duration-300"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-5 py-4 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-5 py-4 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all duration-300 resize-none"
                  placeholder="Your message..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#050505]"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Message <Send size={18} aria-hidden="true" />
                  </>
                )}
              </motion.button>
            </form>
          </RevealOnScroll>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-[#0a0a0a] rounded-3xl border border-white/10 p-8 max-w-md w-full text-center shadow-2xl shadow-cyan-500/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowSuccess(false)}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-lg"
                aria-label="Close"
              >
                <X size={20} aria-hidden="true" />
              </button>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 15, stiffness: 300, delay: 0.1 }}
                className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle size={40} className="text-cyan-400" aria-hidden="true" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-gray-400 mb-8">
                Thank you for reaching out. I&apos;ll get back to you as soon as possible.
              </p>
              <motion.button
                onClick={() => setShowSuccess(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
