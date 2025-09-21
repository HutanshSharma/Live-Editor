// store/ImageContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const ImageContext = createContext();

export function ImageProvider({ children }) {
  const [images, setImages] = useState(() => {
      const storedImages = sessionStorage.getItem('images');
      return storedImages ? JSON.parse(storedImages) : {};
  });

  useEffect(() => {
    sessionStorage.setItem('images', JSON.stringify(images));
  }, [images]);

  return (
    <ImageContext.Provider value={{ images, setImages }}>
      {children}
    </ImageContext.Provider>
  );
}

export function useImages() {
  return useContext(ImageContext);
}