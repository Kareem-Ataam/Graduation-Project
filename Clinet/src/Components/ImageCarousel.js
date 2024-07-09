import React, { useState } from 'react';

export default function ImageCarousel({ images, handleDeleteImage }){

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = (e) => {
        e.preventDefault();
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = (e) => {
        e.preventDefault();
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="carousel">
            {images.length > 0 && (
                <>
                    <button onClick={prevSlide} className="carousel-button prev">&lt;</button>
                    <img src={images[currentIndex].url} alt={`Slide ${currentIndex}`} className="carousel-image" />
                    <button onClick={nextSlide} className="carousel-button next">&gt;</button>
                    <button
                        onClick={(e) =>{e.preventDefault(); handleDeleteImage(images[currentIndex].url);} }
                        className="carousel-delete"
                    >
                        X
                    </button>
                </>
            )}
        </div>
    );
};
