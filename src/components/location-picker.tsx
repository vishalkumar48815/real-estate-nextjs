import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

interface AutoLocationPickerProps {
  value: { lat: number; lng: number } | null;
  onChange: (coords: { lat: number; lng: number }) => void;
}

export default function LocationPicker({ onChange }: AutoLocationPickerProps) {
  const [address, setAddress] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (address.length > 3) {
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`)
          .then((res) => res.json())
          .then((data) => {
            if (data?.[0]) {
              const lat = parseFloat(data[0].lat);
              const lng = parseFloat(data[0].lon);
              onChange({ lat, lng });
            }
          });
      }
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [address, onChange]);

  return (
      <Input
        placeholder="Search for a location"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
  );
}
