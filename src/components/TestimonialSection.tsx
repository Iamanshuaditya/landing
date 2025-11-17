"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const testimonials1 = [
  {
    name: "Sarah Chen",
    role: "Startup Founder",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    content:
      "Their AI solution delivered our vision perfectly. From concept to deployment in just 8 weeks.",
  },
  {
    name: "Marcus Reid",
    role: "Product Manager",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    content:
      "Exceptional team that understands AI. Built exactly what we needed to revolutionize our industry.",
  },
  {
    name: "Elena Rodriguez",
    role: "Tech Entrepreneur",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    content:
      "Fast, reliable, and innovative. They turned our AI concept into an intelligent system seamlessly.",
  },
  {
    name: "David Kim",
    role: "CEO & Co-founder",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    content:
      "Outstanding AI solution development. They helped us secure our first round of funding successfully.",
  },
  {
    name: "Lisa Thompson",
    role: "Innovation Lead",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
    content:
      "Professional team with deep technical expertise. Delivered beyond our expectations consistently.",
  },
  {
    name: "Alex Martinez",
    role: "Startup CTO",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
    content:
      "Great communication and agile process. They made complex development feel simple and transparent.",
  },
];
const testimonials2 = [
  {
    name: "Rachel Foster",
    role: "Business Owner",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    content:
      "Transformed our business idea into reality. User-friendly MVP that our customers absolutely love.",
  },
  {
    name: "James Wilson",
    role: "Product Lead",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    content:
      "Incredible attention to detail. Built scalable architecture that grows with our expanding user base.",
  },
  {
    name: "Nina Patel",
    role: "Venture Partner",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    content:
      "Impressed by their speed and quality. Helped our portfolio company achieve product-market fit quickly.",
  },
  {
    name: "Tom Anderson",
    role: "Serial Founder",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    content:
      "Best MVP partner we've worked with. Technical excellence combined with business understanding perfectly.",
  },
  {
    name: "Grace Liu",
    role: "Head of Product",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
    content:
      "Seamless collaboration and delivery. They understand startup urgency and deliver results accordingly.",
  },
  {
    name: "Carlos Mendez",
    role: "Tech Founder",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
    content:
      "Exceptional MVP development team. Built our platform with modern tech stack and best practices.",
  },
];

const TestimonialSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const plugin1 = useRef(
    AutoScroll({
      startDelay: 500,
      speed: 0.7,
    })
  );

  const plugin2 = useRef(
    AutoScroll({
      startDelay: 500,
      speed: 0.7,
      direction: "backward",
    })
  );
  return (
    <section ref={ref} className="relative py-32 max-w-7xl mx-auto overflow-hidden">
      <motion.div
        className="container flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="mb-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
        >
          Trusted by AI Innovators
        </motion.h2>
        <motion.p
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          From concept to deployment, we build AI solutions that transform businesses and drive innovation.
        </motion.p>
      </motion.div>
      <div className="lg:container">
        <motion.div
          className="mt-16 space-y-4 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Left and right blur gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-background to-transparent z-10 pointer-events-none" />
          <Carousel
            opts={{
              loop: true,
            }}
            plugins={[plugin1.current]}
            onMouseLeave={() => plugin1.current.play()}
          >
            <CarouselContent>
              {testimonials1.map((testimonial, index) => (
                <CarouselItem key={index} className="basis-auto">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
                    transition={{
                      delay: 0.5 + index * 0.05,
                      duration: 0.4,
                    }}
                    whileHover={{ scale: 1.02, y: -3 }}
                    className="transition-all duration-300"
                  >
                    <Card className="max-w-96 p-6 select-none bg-white/80 dark:bg-black/60 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-md rounded-2xl hover:shadow-lg transition-shadow duration-300">
                      <div className="mb-4 flex gap-4 items-center">
                        <Avatar className="size-10 rounded-full ring-2 ring-[#6EE7B7]/60 shadow">
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                          />
                        </Avatar>
                        <div className="text-sm">
                          <p className="font-semibold text-neutral-900 dark:text-white">
                            {testimonial.name}
                          </p>
                          <p className="text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <q className="text-base text-neutral-700 dark:text-neutral-200 italic">
                        {testimonial.content}
                      </q>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <Carousel
            opts={{
              loop: true,
            }}
            plugins={[plugin2.current]}
            onMouseLeave={() => plugin2.current.play()}
          >
            <CarouselContent>
              {testimonials2.map((testimonial, index) => (
                <CarouselItem key={index} className="basis-auto">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
                    transition={{
                      delay: 0.6 + index * 0.05,
                      duration: 0.4,
                    }}
                    whileHover={{ scale: 1.02, y: -3 }}
                    className="transition-all duration-300"
                  >
                    <Card className="max-w-96 p-6 select-none bg-white/80 dark:bg-black/60 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-md rounded-2xl hover:shadow-lg transition-shadow duration-300">
                      <div className="mb-4 flex gap-4 items-center">
                        <Avatar className="size-10 rounded-full ring-2 ring-[#3B82F6]/60 shadow">
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                          />
                        </Avatar>
                        <div className="text-sm">
                          <p className="font-semibold text-neutral-900 dark:text-white">
                            {testimonial.name}
                          </p>
                          <p className="text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <q className="text-base text-neutral-700 dark:text-neutral-200 italic">
                        {testimonial.content}
                      </q>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export { TestimonialSection };