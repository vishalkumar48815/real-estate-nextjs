// app/listings/form/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ListingForm from "@/components/listing-form";
import { listings } from "@/lib/data/listings";
import { Property } from "@/components/properties-card";

export default function ListingFormPage() {
  const searchParams = useSearchParams();
  const listingId = searchParams.get("id");
  const isEdit = Boolean(listingId);

  const [form, setForm] = useState<Property>({
    id: "",
    title: "",
    location: "",
    contact: {
        name: "",
        email: "",
        phone: ""
    },
    description: "",
    features: [],
    postedOn: "",
    locationCoords: {
        lng: 0,
        lat: 0 
    },
    images: [],
    heroImage: "",
    beds: 0,
    baths: 0,
    type: "",
    purpose: "",
    price: "",
    rating: "",
    area: 0
  });

  useEffect(() => {
    if (isEdit) {
      const existing = listings.find((l) => l.id === listingId);
      if (existing) {
        setForm(existing);
      } else {
        toast.error("Listing not found.");
      }
    }
  }, [isEdit, listingId]);

  const handleSubmit = () => {
    if (isEdit) {
      toast.success("Listing updated successfully!");
    } else {
      toast.success("Listing created successfully!");
    }
    console.log("Form submitted:", form);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 py-6 lg:pt-30 lg:pb-10">
      <ListingForm
        defaultData={form}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
