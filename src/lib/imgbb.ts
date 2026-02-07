const IMGBB_API_KEY = '8dc087e2ff84abdb4021d6eb977ba589';

export async function uploadToImgBB(file: File): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', IMGBB_API_KEY);

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    
    if (data.success) {
      return data.data.url;
    }
    
    console.error('ImgBB upload failed:', data);
    return null;
  } catch (error) {
    console.error('Error uploading to ImgBB:', error);
    return null;
  }
}

export async function uploadBase64ToImgBB(base64Image: string): Promise<string | null> {
  try {
    // Remove data URL prefix if present
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
    
    const formData = new FormData();
    formData.append('image', base64Data);
    formData.append('key', IMGBB_API_KEY);

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    
    if (data.success) {
      return data.data.url;
    }
    
    console.error('ImgBB upload failed:', data);
    return null;
  } catch (error) {
    console.error('Error uploading to ImgBB:', error);
    return null;
  }
}
