"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const HeroSearchBar = () => {
  const [location, setLocation] = useState("");
  const router = useRouter();
  const [purpose, setPurpose] = useState<string | undefined>("");
  const [propertyType, setPropertyType] = useState<string | undefined>("");
  const propertyTypes = [ "Room", "1BHK", "2BHK", "3BHK", "4BHK", "PG", "Office Space", "Shop", "Sharing"] as string[];

  const handleSearch = () => {
    const query: Record<string, string> = {};
    if (location) query.location = location;
    if (purpose) query.purpose = purpose;
    if (propertyType) query.type = propertyType;
  
    // example: /search?location=Chandigarh&purpose=Rent
    const queryString = new URLSearchParams(query).toString();
    router.push(`/properties?${queryString}`);
  };

  const clearPurpose = () => setPurpose(undefined);
  const clearPropertyType = () => setPropertyType(undefined);
  

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-3 max-w-4xl mx-auto p-4">
      <Input
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full md:w-64 bg-white"
      />

      <Select value={purpose} onValueChange={(value) => setPurpose(value)}>
        <SelectTrigger className="w-full md:w-32 bg-white">
          <SelectValue placeholder="Purpose" className="bg-white" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Rent">Rent</SelectItem>
          <SelectItem value="Sale">Sale</SelectItem>
        </SelectContent>
      </Select>
      {purpose && (
        <Button className="bg-white" variant="outline" size="icon" onClick={clearPurpose} title="Clear selection">
          ✕
        </Button>
      )}

      <Select value={propertyType} onValueChange={(value) => setPropertyType(value)}>
        <SelectTrigger className="w-full md:w-40 bg-white">
          <SelectValue className="bg-white" placeholder="Property Type"  />
        </SelectTrigger>
        <SelectContent>
          {propertyTypes.map((type: string) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {propertyType && (
        <Button className="bg-white" variant="outline" size="icon" onClick={clearPropertyType} title="Clear selection">
          ✕
        </Button>
      )}

      <Button onClick={handleSearch} className="w-full md:w-auto">Search</Button>
    </div>
  );
};

export default HeroSearchBar;
