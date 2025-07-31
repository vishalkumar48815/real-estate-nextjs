'use client';

import PropertyDetails from "@/components/property-details";
import { properties } from "@/lib/data/properties";
import { useParams } from "next/navigation";


  
  const ListingDetails =  () => {
    const params = useParams()
    const property = properties.find(p => p.id === params.id);
  
    if (!property) return <div>Property not found</div>;
  
    return (
      <section className="py-6 lg:pt-30 lg:pb-10">
        <PropertyDetails property={property} />
      </section>
    );
  };
  
  export default ListingDetails;
  