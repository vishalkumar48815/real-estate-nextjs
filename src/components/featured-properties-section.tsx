"use client"

import { useState } from "react";
import { Bookmark, ListFilter } from "lucide-react";
import PropertyCard from "./properties-card";
import { Button } from "./ui/button";
import PaginationComponent from "./pagination-component";
import { properties } from "@/lib/data/properties";

const itemsPerPage = 8;

export default function FeaturedProperties() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const currentProperties = properties.slice(start, start + itemsPerPage);

  return (
    <section className="py-2 max-w-8xl mx-auto">
      <div className="flex items-center justify-between px-4 py-2 md:px-6">
        <h2 className="text-2xl font-semibold my-4">Featured Properties</h2>

        <div className="flex gap-2 items-center">
          <Button title="Saved" variant="outline">
            <Bookmark className="w-5 h-5 cursor-pointer" />
          </Button>
          <Button title="Filters" variant="outline">
            <ListFilter className="w-5 h-5 cursor-pointer" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProperties.map((property, index) => (
          <PropertyCard key={index} property={property} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
}
