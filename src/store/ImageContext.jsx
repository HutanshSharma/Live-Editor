import { createContext, useContext, useState } from "react";

const ImageContext = createContext();

export function ImageProvider({ children }) {
  const [images, setImages] = useState(() => {
      const storedImages = sessionStorage.getItem('images');
      return storedImages ? JSON.parse(storedImages) : {};
  });

  return (
    <ImageContext.Provider value={{ images, setImages }}>
      {children}
    </ImageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useImages() {
  return useContext(ImageContext);
}