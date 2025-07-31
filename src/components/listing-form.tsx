// components/listingForm.tsx
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import LocationPicker from "./location-picker";
import ImageUploader from "./image-uploader";
import { Property } from "./properties-card";

interface ListingFormProps {
  defaultData?: Partial<Property>;
  onSubmit: (data: Property) => void;
}

const ListingForm: React.FC<ListingFormProps> = ({ defaultData = {}, onSubmit }) => {
  const [formData, setFormData] = useState<Partial<Property>>(defaultData);

  const handleChange = (field: keyof Property, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLocationChange = (location: string, coords: { lat: number; lng: number }) => {
    setFormData((prev) => ({ ...prev, location, locationCoords: coords }));
  };

  const handleImageChange = (images: string[], heroImage: string) => {
    setFormData((prev) => ({ ...prev, images, heroImage }));
  };

  const handleSubmit = () => {
    const completeData = {
      ...formData,
      postedOn: new Date().toISOString().split("T")[0],
    } as Property;
    console.log(completeData);
    onSubmit(completeData);
  };

  return (
    <div className="space-y-4">
      <Input placeholder="Title" value={formData.title || ""} onChange={(e) => handleChange("title", e.target.value)} />
      <Input placeholder="Type" value={formData.type || ""} onChange={(e) => handleChange("type", e.target.value)} />
      <Input placeholder="Purpose (e.g. For Rent, For Sale)" value={formData.purpose || ""} onChange={(e) => handleChange("purpose", e.target.value)} />
      <Input placeholder="Beds" value={formData.beds || ""} onChange={(e) => handleChange("beds", e.target.value)} />
      <Input placeholder="Baths" value={formData.baths || ""} onChange={(e) => handleChange("baths", e.target.value)} />
      <Input placeholder="Area (sqft)" value={formData.area || ""} onChange={(e) => handleChange("area", e.target.value)} />
      <Input placeholder="Price" value={formData.price || ""} onChange={(e) => handleChange("price", e.target.value)} />

      <Textarea placeholder="Description" value={formData.description || ""} onChange={(e) => handleChange("description", e.target.value)} />

      <Input placeholder="Contact Name" value={formData.contact?.name || ""} onChange={(e) => handleChange("contact", { ...formData.contact, name: e.target.value })} />
      <Input placeholder="Contact Email" value={formData.contact?.email || ""} onChange={(e) => handleChange("contact", { ...formData.contact, email: e.target.value })} />
      <Input placeholder="Contact Phone" value={formData.contact?.phone || ""} onChange={(e) => handleChange("contact", { ...formData.contact, phone: e.target.value })} />

      <Input placeholder="Features (comma separated)" value={formData.features?.join(", ") || ""} onChange={(e) => handleChange("features", e.target.value.split(",").map(f => f.trim()))} />

      <LocationPicker onChange={() => handleLocationChange(formData.location || "", formData.locationCoords || {lng: 0, lat: 0})} value={formData.locationCoords || {lng: 0, lat: 0}} />

      <ImageUploader onHeroImageChange={() => handleImageChange(formData.images || [], formData.heroImage || "")}  />

      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default ListingForm;
