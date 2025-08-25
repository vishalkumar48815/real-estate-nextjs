'use client';

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel } from "antd";
import { BadgeCheck, MapPin, Ruler, Building2, Clock, Star } from "lucide-react";
import { Property } from "@/components/properties-card";
import dynamic from "next/dynamic";
import Image from "next/image";

const Map = dynamic(() => import("./map"), { ssr: false });

export default function PropertyDetails({ property }: { property: Property }) {
    return (
        <div className="max-w-[95%] mx-auto px-4 py-6 space-y-6">
            {/* Title and Location */}
            <div>
                <h1 className="text-2xl font-bold">{property.title}</h1>
                <p className="flex items-center text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4 mr-1" /> {property.location}
                </p>
            </div>

            {/* Image Carousel */}
            <Carousel autoplay className="rounded-xl overflow-hidden">
                {property.images.map((src, index) => (
                    <Image
                        key={index}
                        src={src}
                        className="w-full object-cover h-[400px]"
                        alt={`property image ${index + 1}`}
                    />
                ))}
            </Carousel>

            {/* Summary */}
            <div className="flex flex-wrap gap-4 text-base font-medium mt-4 text-neutral-600">
                <span className="flex items-center">
                    <span className="w-4 h-4 mr-1" /> {property.price} / mo
                </span>
                {property.area && <span className="flex items-center">
                    <Ruler className="w-4 h-4 mr-1" /> {property.area} sq.ft
                </span>}
                <span className="flex items-center">
                    <Building2 className="w-4 h-4 mr-1" /> {property.type}
                </span>
                <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" /> {property.postedOn}
                </span>
                <span className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" /> {property.rating} rating
                </span>
            </div>

            {/* Description */}
            <Card>
                <CardContent className="px-4">
                    <h1 className="text-xl font-semibold">Description:</h1>
                    <p className="text-sm leading-relaxed">{property.description}</p>
                </CardContent>
            </Card>

            {/* Features */}
            <div className="flex flex-wrap gap-2">
                <h1 className="text-xl font-semibold">Features:</h1>
                {property.features.map((feature, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                        {feature}
                    </span>
                ))}
            </div>

            {/* Map */}
            <div className="h-[300px] rounded-xl overflow-hidden">
                <Map {...property.locationCoords} />
            </div>

            {/* Contact Section */}
            <Card>
                <CardContent className="px-4">
                    <h2 className="text-lg font-semibold mb-2">Contact Owner</h2>
                    <p className="text-sm">{property.contact.name}</p>
                    <p className="text-sm text-muted-foreground">{property.contact.email}</p>
                    <Button className="mt-3">Send Message</Button>
                </CardContent>
            </Card>

            {/* Metadata */}
            <p className="text-xs text-muted-foreground">
                Posted on: {property.postedOn} | Verified <BadgeCheck className="w-4 h-4 inline" />
            </p>
        </div>
    );
}