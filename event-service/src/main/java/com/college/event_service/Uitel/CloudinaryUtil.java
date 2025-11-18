package com.college.event_service.Uitel;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;

@Component
public class CloudinaryUtil {

    private final Cloudinary cloudinary;

    public CloudinaryUtil(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadImage(byte[] fileBytes, String folder) throws IOException {
        Map result = cloudinary.uploader().upload(
                fileBytes,
                ObjectUtils.asMap("folder", folder)
        );
        return result.get("secure_url").toString();
    }

    public String extractPublicId(String imageUrl) {
        try {
            if (imageUrl == null || imageUrl.isBlank()) return null;

            String noParams = imageUrl.split("\\?")[0];
            String[] parts = noParams.split("/upload/");

            if (parts.length < 2) return null;

            String path = parts[1];
            return path.substring(0, path.lastIndexOf('.'));

        } catch (Exception e) {
            return null;
        }
    }

    public boolean deleteImage(String imageUrl) {
        try {
            String publicId = extractPublicId(imageUrl);
            if (publicId == null) return false;

            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            System.out.println("🗑️ Deleted Cloudinary Image: " + publicId);
            return true;

        } catch (Exception e) {
            System.err.println("❌ Cloudinary delete failed: " + e.getMessage());
            return false;
        }
    }
}

