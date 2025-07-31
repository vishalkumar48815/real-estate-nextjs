import { Card, CardContent } from "@/components/ui/card";
import { FaBed, FaBath } from "react-icons/fa";
import PropertyImageBadge from "./property-image-badge";
import { Lens } from "./magicui/lens";
import Link from "next/link";

export type Property = {
  id: string | number;
  title: string;
  heroImage: string;
  images: string[];
  beds: number | string;
  baths: number | string;
  type: string;
  rating?: string | number
  location: string;
  purpose: string;
  area?: number | string;
  price: string;
  postedOn: string;
  locationCoords: {
    lat: number;
    lng: number;
  };
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  features: string[];
  description: string;
};

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link href={`/listings/${property.id}`}>
      <Card className="rounded-xl py-0 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <Lens
          zoomFactor={2}
          lensSize={100}
          isStatic={false}
          ariaLabel="Zoom Area"
        >
          <PropertyImageBadge image={property.heroImage} purpose={property.purpose} />
        </Lens>
        <CardContent className="p-4">
          <div className="text-lg font-semibold mb-1 overflow-ellipsis overflow-hidden whitespace-nowrap">{property.title}</div>
          <div className="text-sm text-gray-600 flex gap-2 items-center mb-1">
            <FaBed className="text-gray-500" /> {property.beds} bed
            <FaBath className="text-gray-500 ml-2" /> {property.baths} bath
          </div>
          <div className="flex justify-between">
            <div className="text-sm text-gray-500 mb-1">{property.type}</div>
            <div className="text-sm text-gray-500 mb-1">{property.price}</div>
          </div>
          <div className="text-sm text-gray-500">{property.location}</div>
        </CardContent>
      </Card>
    </Link>
  );
}
