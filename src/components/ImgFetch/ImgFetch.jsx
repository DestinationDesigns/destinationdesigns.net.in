import React, { useState, useEffect } from "react";

function ImgFetch({ src }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/image/${src}`)
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error("Image not found");
        }
      })
      .then((blob) => {
        const objectURL = URL.createObjectURL(blob);
        setImageSrc(objectURL);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [src]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {imageSrc && <img src={imageSrc} alt={src} />}
    </>
  );
}

export default ImgFetch;
