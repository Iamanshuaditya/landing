"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { useRef } from "react";

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
      "Their MVP delivered our vision perfectly. From idea to launch in just 8 weeks.",
  },
  {
    name: "Marcus Reid",
    role: "Product Manager",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    content:
      "Exceptional team that understands startups. Built exactly what we needed to validate our market.",
  },
  {
    name: "Elena Rodriguez",
    role: "Tech Entrepreneur",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    content:
      "Fast, reliable, and innovative. They turned our concept into a working product seamlessly.",
  },
  {
    name: "David Kim",
    role: "CEO & Co-founder",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    content:
      "Outstanding MVP development. They helped us secure our first round of funding successfully.",
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
    <section className="relative py-32 max-w-7xl mx-auto overflow-hidden">
      <div className="container flex flex-col items-center gap-6">
        <h2 className="mb-2 ">Trusted by Innovators</h2>
        <p className="text-center ">
          From concept to launch, we build MVPs that validate ideas and drive growth.
        </p>
      </div>
      <div className="lg:container">
        <div className="mt-16 space-y-4 relative">
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
                  <Card className="max-w-96 p-6 select-none bg-white/80 dark:bg-black/60 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-md rounded-2xl">
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
                  <Card className="max-w-96 p-6 select-none bg-white/80 dark:bg-black/60 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-md rounded-2xl">
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
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export { TestimonialSection };