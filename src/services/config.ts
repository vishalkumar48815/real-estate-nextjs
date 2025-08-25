import axios from '@/lib/axios';

const getListingTypes = async () => {
    const response = await axios.get('/config/listing-types');
    return response.data;
}

export { getListingTypes };