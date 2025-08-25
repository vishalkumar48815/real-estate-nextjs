import axios from "axios";

const uploadListingImage = async (listingImageData : { file: string; name: string; type: string }) => {
    console.log("listingImageData: ", listingImageData)
    return axios.post("/api/upload/image", listingImageData)
}


const deleteListingImage = async (imageUrl: string) => {
    return axios.delete("/api/upload/image", { data: { url: imageUrl } });
};

export { uploadListingImage, deleteListingImage}
