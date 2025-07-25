import React, { useState } from 'react';
import './ProductGallery.css';

export const ProductGallery = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  const handlePrevImage = () => {
    setSelectedImage(prev => prev === 0 ? images.length - 1 : prev - 1);
  };

  const handleNextImage = () => {
    setSelectedImage(prev => prev === images.length - 1 ? 0 : prev + 1);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="product-gallery">
      {/* Imagem Principal */}
      <div className="product-gallery__main">
        <div className={`product-gallery__main-container ${isZoomed ? 'product-gallery__main-container--zoomed' : ''}`}>
          <img
            src={images[selectedImage]}
            alt={`${productName} - Imagem ${selectedImage + 1}`}
            className="product-gallery__main-image"
            onClick={toggleZoom}
          />
          
          {/* Botões de Navegação */}
          {images.length > 1 && (
            <>
              <button
                className="product-gallery__nav product-gallery__nav--prev"
                onClick={handlePrevImage}
                aria-label="Imagem anterior"
              >
                <span className="icon">‹</span>
              </button>
              <button
                className="product-gallery__nav product-gallery__nav--next"
                onClick={handleNextImage}
                aria-label="Próxima imagem"
              >
                <span className="icon">›</span>
              </button>
            </>
          )}

          {/* Indicador de Zoom */}
          <button
            className="product-gallery__zoom-toggle"
            onClick={toggleZoom}
            aria-label={isZoomed ? 'Diminuir zoom' : 'Aumentar zoom'}
          >
            <span className="icon">{isZoomed ? '🔍-' : '🔍+'}</span>
          </button>
        </div>

        {/* Indicadores */}
        {images.length > 1 && (
          <div className="product-gallery__indicators">
            {images.map((_, index) => (
              <button
                key={index}
                className={`product-gallery__indicator ${
                  index === selectedImage ? 'product-gallery__indicator--active' : ''
                }`}
                onClick={() => handleThumbnailClick(index)}
                aria-label={`Ver imagem ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="product-gallery__thumbnails">
          {images.map((image, index) => (
            <button
              key={index}
              className={`product-gallery__thumbnail ${
                index === selectedImage ? 'product-gallery__thumbnail--active' : ''
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img
                src={image}
                alt={`${productName} - Miniatura ${index + 1}`}
                className="product-gallery__thumbnail-image"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;