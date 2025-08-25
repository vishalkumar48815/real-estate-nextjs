// app/listings/form/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ListingForm from "@/components/listing-form";
import { listings } from "@/lib/data/listings";
import { Property } from "@/components/properties-card";
import Logo from "@/components/Logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

  const handleSubmit = (formData: Property) => {
    if (isEdit) {
      toast.success("Listing updated successfully!");
    } else {
      toast.success("Listing created successfully!");
    }
    console.log("Form submitted:", formData);
  };

  return (
    <main className="py-6 lg:pt-30 lg:pb-10">
      <div className="flex flex-row justify-center">
        <Logo />
      </div>
      <Card className="max-w-xl text-center p-4" style={{ margin: "20px auto 40px auto" }}>
        <CardHeader>
          <CardTitle className="text-left text-xl font-semibold">Create a Listing</CardTitle>
          <CardDescription className="text-gray-400 text-left font-medium">You can list you property for Rent or Sale here.</CardDescription>
        </CardHeader>
        <CardContent>
          <ListingForm defaultData={form} onSubmit={handleSubmit} />
        </CardContent>
        {/* <BorderBeam duration={5} size={300} /> */}
      </Card>
    </main>
  );
}
