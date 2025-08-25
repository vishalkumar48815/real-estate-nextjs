// services/listing.ts
import { Property } from '@/components/properties-card';
import axios from '@/lib/axios';

const getAllListings = async () => {
  return axios.get('/listings');
};

const getListingById = async (id: string) => {
  return axios.get(`/listings/${id}`);
};

const addNewListing = async (listingData: Property) => {
  return axios.post('/listings', listingData);
};

const deleteListing = async (id: string) => {
    return axios.delete(`/listings/${id}`);
}

const updateListing = async (id: string, listingData: Property) => {
    return axios.put(`/listings/${id}`, listingData);
}

export { getAllListings, getListingById, addNewListing, deleteListing, updateListing };
