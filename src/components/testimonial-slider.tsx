'use client'

import { Marquee } from "@/components/magicui/marquee";
import { ShimmerButton } from "./magicui/shimmer-button";
import ReviewCard from "./review-card";
import { reviews } from "@/lib/data/testimonials";
import { BorderBeam } from "./magicui/border-beam";

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

export function TestimonialSlider() {
    return (
        <section className="bg-slate-100 rounded-xl py-8 my-8">
            <div className="flex flex-col justify-center items-center gap-4 mb-10">
                <ShimmerButton className="w-fit" shimmerColor="">
                    <span>Our User</span>
                    <BorderBeam duration={8} size={50} borderWidth={1.5} />

                </ShimmerButton>
                <h1 className="font-bold text-5xl md:text:2xl">What our Users are Saying</h1>
                <p className="text-neutral-400 text-lg">Here&apos;s what some of our users have to say about Trust Nest.</p>
            </div>
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden  max-w-5xl mx-auto rounded-xl py-5">
                <Marquee pauseOnHover className="[--duration:15s]">
                    {firstRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:20s]">
                    {secondRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
            </div>
        </section>
    );
}
