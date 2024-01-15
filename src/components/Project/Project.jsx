import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import ImgFetch from "../ImgFetch/ImgFetch";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";

import "./Project.css";

function Project() {
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [projectPath, setProjectPath] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/project/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Project not found");
        }
      })
      .then((data) => {
        setImages(data.imageFiles);
        setProjectPath(data.projectPath);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="image-grid">
        {images.map((image, index) => (
          <ImgFetch key={index} src={`projects/${projectPath}/${image}`} />
        ))}
      </div>
      <Header dark={true} />
      <Navbar dark={true} />
    </>
  );
}

export default Project;