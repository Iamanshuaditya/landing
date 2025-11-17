"use client";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils"
import { Marquee } from "@/components/magicui/marquee";

const IntegrationSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const logos = [
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/slack-icon.svg",
      name: "Slack",
      className: "invert dark:invert-0",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/notion-icon.svg",
      name: "Notion",
      className: "invert dark:invert-0",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/github-icon.svg",
      name: "Github",
      className: "invert dark:invert-0",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/google-icon.svg",
      name: "Google",
      className: "invert dark:invert-0",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/nike-icon.svg",
      name: "Nike",
      className: "invert dark:invert-0",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/sketch-icon.svg",
      name: "Sketch",
      className: "invert dark:invert-0",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-icon.svg",
      name: "Figma",
      className: "invert dark:invert-0",
    },
  ];

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 blur-3xl rounded-full opacity-30"></div>

      <div className="container mx-auto relative z-10">
      
        <motion.div
          className="text-center flex flex-col max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex w-fit mx-auto items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          >
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            Proven Technologies
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
              Built with cutting-edge
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              AI technologies
            </span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground/80 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Your AI solution will be built using industry-leading artificial intelligence technologies.
            <br className="hidden md:block" />
            Scalable, intelligent, and future-proof from day one.
          </motion.p>
        </motion.div>

        {/* Enhanced Marquee Section */}
        <div className="relative py-2">
          {/* Top gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background  z-10 pointer-events-none"></div>

          {/* First row */}
          <div className="mb-6">
            <Marquee pauseOnHover className="[--duration:25s]">
              {logos.map((logo, index) => (
                <div
                  key={`row1-${index}`}
                  className="group mx-4 flex items-center justify-center gap-3 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 px-6 py-4 hover:bg-card/80 hover:border-primary/30 transition-all duration-300 hover:scale-105"
                >
                  <div className="relative">
                    <img
                      src={logo.image}
                      alt={logo.name}
                      className={cn(
                        "size-6 transition-all duration-300 group-hover:scale-110",
                        logo?.className
                      )}
                    />
                    <div className="absolute inset-0 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
                  </div>
                  <p className="text-base font-medium text-foreground/90 group-hover:text-foreground transition-colors duration-300">
                    {logo.name}
                  </p>
                </div>
              ))}
            </Marquee>
          </div>

          {/* Second row (reverse) */}
          <div className="mb-6">
            <Marquee pauseOnHover reverse className="[--duration:30s]">
              {[...logos].reverse().map((logo, index) => (
                <div
                  key={`row2-${index}`}
                  className="group mx-4 flex items-center justify-center gap-3 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 px-6 py-4 hover:bg-card/80 hover:border-primary/30 transition-all duration-300 hover:scale-105"
                >
                  <div className="relative">
                    <img
                      src={logo.image}
                      alt={logo.name}
                      className={cn(
                        "size-6 transition-all duration-300 group-hover:scale-110",
                        logo?.className
                      )}
                    />
                    <div className="absolute inset-0 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
                  </div>
                  <p className="text-base font-medium text-foreground/90 group-hover:text-foreground transition-colors duration-300">
                    {logo.name}
                  </p>
                </div>
              ))}
            </Marquee>
          </div>

          {/* Third row */}
          <div className="mb-6">
            <Marquee pauseOnHover className="[--duration:35s]">
              {logos
                .slice(0, 4)
                .concat(logos.slice(0, 3))
                .map((logo, index) => (
                  <div
                    key={`row3-${index}`}
                    className="group mx-4 flex items-center justify-center gap-3 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 px-6 py-4 hover:bg-card/80 hover:border-primary/30 transition-all duration-300 hover:scale-105"
                  >
                    <div className="relative">
                      <img
                        src={logo.image}
                        alt={logo.name}
                        className={cn(
                          "size-6 transition-all duration-300 group-hover:scale-110",
                          logo?.className
                        )}
                      />
                      <div className="absolute inset-0 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
                    </div>
                    <p className="text-base font-medium text-foreground/90 group-hover:text-foreground transition-colors duration-300">
                      {logo.name}
                    </p>
                  </div>
                ))}
            </Marquee>
          </div>

          {/* Bottom gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background z-10 pointer-events-none"></div>
        </div>

        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-6 px-10 py-6 rounded-3xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 backdrop-blur-2xl border border-primary/30 shadow-2xl shadow-primary/10 hover:shadow-primary/20 transition-all duration-500"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-base font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Join 500+ companies that launched their AI solutions with us
            </span>
            <div className="flex -space-x-3">
              {["Felix", "Alex", "Sarah", "Michael"].map((seed, i) => (
                <motion.div
                  key={i}
                  className="w-10 h-10 rounded-full border-3 border-background shadow-xl shadow-primary/30 hover:scale-110 transition-transform duration-300 overflow-hidden"
                  initial={{ opacity: 0, scale: 0, x: -20 }}
                  animate={inView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0, x: -20 }}
                  transition={{
                    delay: 0.8 + i * 0.1,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                >
                  <img
                    src={`https://api.dicebear.com/9.x/notionists/svg?seed=${seed}`}
                    alt={`User ${seed}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-muted/80 to-muted border-3 border-background flex items-center justify-center shadow-xl shadow-muted/30 hover:scale-110 transition-transform duration-300"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{
                  delay: 1.2,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{ scale: 1.2, rotate: 90 }}
              >
                <span className="text-sm font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  +
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export { IntegrationSection };