// components/listingForm.tsx
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import LocationPicker from "./location-picker";
import ImageUploader from "./image-uploader";
import { Property } from "./properties-card";
import { Col, Flex, Row, Select } from "antd";
import { getListingTypes } from "@/services/config";

interface ListingFormProps {
  defaultData?: Partial<Property>;
  onSubmit: (data: Property) => void;
}

interface listingTypes {
  id: number | string,
  name: string,
  type: string,
}

const ListingForm: React.FC<ListingFormProps> = ({ defaultData = {}, onSubmit }) => {
  const [formData, setFormData] = useState<Partial<Property>>(defaultData);
  const [listingTypes, setListingTypes] = useState<listingTypes[]>([]);

  useEffect(() => {
    getListingTypes()
      .then((data: listingTypes[]) => {
        const unique = [...new Map(data.map((item: listingTypes) => [item.name, item])).values()] as listingTypes[];
        setListingTypes(unique);
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (field: keyof Property, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLocationChange = (location: string, coords: { lat: number; lng: number }) => {
    setFormData((prev) => ({ ...prev, location, locationCoords: coords }));
  };

  const handleSubmit = () => {
    const completeData = {
      ...formData,
      postedOn: new Date().toISOString().split("T")[0],
    } as Property;
    console.log("formData: ", completeData);
    onSubmit(completeData);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Basic Information Row */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Flex gap="middle" vertical align="start">
            <label className="text-sm font-medium">Title</label>
            <Input
              placeholder="Title"
              value={formData.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </Flex>
        </Col>
        <Col xs={24} md={12}>
          <Flex gap="middle" vertical align="start">
            <label className="text-sm font-medium">Type</label>
            <Select
              showSearch
              className="w-full text-start p-4"
              placeholder="Search to Select"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label as string)
                  .toLowerCase()
                  .localeCompare((optionB?.label as string).toLowerCase())
              }
              options={listingTypes.map((item) => ({
                value: item.name,
                label: item.name,
              }))}
              onChange={(value: string) => handleChange("type", value)}
            />

          </Flex>
        </Col>
      </Row>

      {/* Purpose Row */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Flex gap="middle" vertical align="start">
            <label className="text-sm font-medium">Purpose</label>
            <Select
              showSearch
              className="w-full text-start"
              placeholder="Select purpose"
              optionFilterProp="label"
              options={[
                { label: "Rent", value: "rent" },
                { label: "Sale", value: "sale" }
              ]}
              onChange={(value) => handleChange("purpose", value)}
            />
          </Flex>
        </Col>
      </Row>

      {/* Property Details Row */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Flex gap="middle" vertical align="start">
            <label className="text-sm font-medium">Bedrooms</label>
            <Input type="number" min={1} placeholder="Beds" value={formData.beds || ""}
              onChange={(e) => handleChange("beds", e.target.value)}
            />
          </Flex>
        </Col>
        <Col xs={24} md={12}>
          <Flex gap="middle" vertical align="start">
            <label className="text-sm font-medium">Bathrooms</label>
            <Input type="number" min={1} placeholder="Baths" value={formData.baths || ""}
              onChange={(e) => handleChange("baths", e.target.value)}
            />
          </Flex>
        </Col>
      </Row>

      {/* Area and Price Row */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Flex gap="middle" vertical align="start">
            <label className="text-sm font-medium">Area</label>
            <Input type="number" min={1} placeholder="Area (sqft)" value={formData.area || ""}
              onChange={(e) => handleChange("area", e.target.value)}
            />
          </Flex>
        </Col>
        <Col xs={24} md={12}>
          <Flex gap="middle" vertical align="start">
            <label className="text-sm font-medium">Price</label>
            <Input type="number" min={1} placeholder="Price" value={formData.price || ""}
              onChange={(e) => handleChange("price", e.target.value)}
            />
          </Flex>
        </Col>
      </Row>

      {/* Description Row */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Flex gap="middle" vertical align="start">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Description"
              value={formData.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
            />
          </Flex>
        </Col>
      </Row>

      {/* Contact Information Row */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Flex gap="middle" vertical align="start">
            <label className="text-sm font-medium">Contact Name</label>
            <Input
              placeholder="Contact Name"
              value={formData.contact?.name || ""}
              onChange={(e) => handleChange("contact", { ...formData.contact, name: e.target.value })}
            />
          </Flex>
        </Col>
        <Col xs={24} md={12}>
          <Flex gap="middle" vertical align="start">
            <label className="text-sm font-medium">Contact Email</label>
            <Input
              placeholder="Contact Email"
              value={formData.contact?.email || ""}
              onChange={(e) => handleChange("contact", { ...formData.contact, email: e.target.value })}
            />
          </Flex>
        </Col>
      </Row>

      {/* Contact Phone Row */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Flex gap="middle" vertical align="start">
            <label className="text-sm font-medium">Contact Phone</label>
            <Input
              placeholder="Contact Phone"
              value={formData.contact?.phone || ""}
              onChange={(e) => handleChange("contact", { ...formData.contact, phone: e.target.value })}
            />
          </Flex>
        </Col>
      </Row>

      {/* Features Row */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Flex gap="middle" vertical align="start">
            <label className="text-sm font-medium">Features</label>
            <Input
              placeholder="Features (comma separated)"
              value={formData.features?.join(",") || ""}
              onChange={(e) => handleChange("features", e.target.value.split(",").map(f => f.trim()))}
            />
          </Flex>
        </Col>
      </Row>

      {/* Location Picker Row */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Flex gap="middle" vertical align="start">
            <label className="text-sm font-medium">Location</label>
            <LocationPicker
              onChange={() => handleLocationChange(formData.location || "", formData.locationCoords || { lng: 0, lat: 0 })}
              value={formData.locationCoords || { lng: 0, lat: 0 }}
            />
          </Flex>
        </Col>
      </Row>

      {/* Image Uploader Row - Separate Row */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Flex gap="middle" vertical align="start">
            <label className="text-sm font-medium">Property Images</label>
            <ImageUploader
              onChange={(imagesArray) => handleChange("images", imagesArray)}
              value={formData.images || []}
            />
          </Flex>
        </Col>
      </Row>

      {/* Submit Button Row */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Flex justify="center">
            <Button onClick={handleSubmit} className="px-8 py-2">
              create Listing
            </Button>
          </Flex>
        </Col>
      </Row>
    </div>
  );
};

export default ListingForm;
