
import { useCallback } from 'react';

export function usePreserveImageUpload() {
  const saveImage = useCallback((file: File, aspectRatio?: number) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      if (event.target && typeof event.target.result === "string") {
        localStorage.setItem(
          "pendingUpload",
          JSON.stringify({
            name: file.name,
            type: file.type,
            size: file.size,
            aspectRatio: aspectRatio,
            data: event.target.result,
            lastSaved: Date.now(),
          })
        );
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const loadImage = useCallback(() => {
    const cached = localStorage.getItem("pendingUpload");
    if (!cached) return null;
    try {
      const obj = JSON.parse(cached);
      // Expire after 30 min
      if (Date.now() - obj.lastSaved > 1000 * 60 * 30) {
        localStorage.removeItem("pendingUpload");
        return null;
      }
      // reconstruct file
      const byteString = atob(obj.data.split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const file = new File([ab], obj.name, { type: obj.type });
      const preview = obj.data;
      return { file, preview, aspectRatio: obj.aspectRatio };
    } catch {
      return null;
    }
  }, []);

  const clearImage = useCallback(() => {
    localStorage.removeItem("pendingUpload");
  }, []);

  return { saveImage, loadImage, clearImage };
}
