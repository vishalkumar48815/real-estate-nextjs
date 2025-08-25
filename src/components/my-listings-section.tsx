"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { listings } from "@/lib/data/listings";
import PaginationComponent from "./pagination-component";
import { Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "sonner";

const itemsPerPage = 6;

export default function MyListingsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [listingData, setListingData] = useState(listings);

    const totalPages = Math.ceil(listingData.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const currentProperties = listingData.slice(start, start + itemsPerPage);

    const handleDelete = (id: string) => {
        setListingData((prev) => prev.filter((item) => item.id !== id));
        toast.success("Listing deleted successfully");
    };

    return (
        <section className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Listings</h2>
                <Button>
                    <Link href="/listings/form">+ Add New Listing</Link>
                </Button>
            </div>

            {currentProperties.length === 0 ? (
                <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                        No listings found.
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentProperties.map((property) => (
                        <Card key={property.id} className="overflow-hidden p-0 gap-1">
                            <div className="relative w-full h-48">
                                <Image
                                    src={property.heroImage}
                                    alt={property.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <CardContent className="p-4 space-y-2">
                                <h2 className="font-semibold text-lg mb-0">{property.title}</h2>
                                <p className="text-muted-foreground text-sm">
                                    {property.location}
                                </p>
                                <div className="flex flex-wrap items-center gap-2 text-sm">
                                    <Badge variant="outline">{property.type}</Badge>
                                    <Badge variant="secondary">{property.purpose}</Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-primary font-semibold text-base">
                                        {property.price}
                                    </p>
                                    <div className="text-xs text-muted-foreground">
                                        Posted on: {property.postedOn}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2 mt-2">
                                        <Link href={`/listings/${property.id}`}>
                                            <Button variant="outline" size="sm">
                                                View
                                            </Button>
                                        </Link>
                                        <Link href={`/listings/form?id=${property.id}`}>
                                            <Button variant="default" size="sm">
                                                Edit
                                            </Button>
                                        </Link>
                                    </div>
                                    <Popconfirm
                                        title="Are you sure you want to delete this listing?"
                                        onConfirm={() => handleDelete(property.id)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button variant="outline" size="sm">
                                            <DeleteOutlined />
                                        </Button>
                                    </Popconfirm>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

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
