import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary"; 

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "sweetshop",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    public_id: `${Date.now()}-${file.originalname}`,
  }),
});


const upload = multer({ storage }); 
export default upload;
