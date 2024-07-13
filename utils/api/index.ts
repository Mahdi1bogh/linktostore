import { createClient } from '../supabase/client';
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient();

export async function uploadImages(imgs: any, storeId: any) {
  if (!imgs || imgs.length === 0) {
    return null; // No images to upload
  }

  const uploadedImageUrls = [];

  for (const img of imgs) {
    try {
      // Log the original image size

      // Log the compressed image size

      // Upload the compressed image
      const { data, error } = await supabase.storage
        .from('imgs-bucket')
        .upload('public/' + storeId + '/' + uuidv4() + '.jpg', img, {
          upsert: false,
          cacheControl: '3600',
        });

      if (error) {
        console.error('Error uploading image:', error);
        continue;
      }

      const imageUrl = data?.path;
      console.log('img url ', imageUrl);
      uploadedImageUrls.push(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  if (uploadedImageUrls.length === 0) {
    return null; // No successful uploads
  }

  return uploadedImageUrls;
}
