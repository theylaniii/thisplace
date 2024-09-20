import React from 'react';
import Slider from 'react-slick'; // Importing the carousel component
import 'slick-carousel/slick/slick.css'; // Slick Carousel base styles
import 'slick-carousel/slick/slick-theme.css'; // Slick Carousel theme
import './sidepanel.css';

function SidePanel({ selectedMarker, onClose }) {
  if (!selectedMarker) return null;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true // Keep arrows for side navigation
  };

  // Function to format text with paragraph breaks and italics
  const formatTextWithItalics = (text) => {
    const italicFormatted = text.replace(/_(.*?)_/g, '<i>$1</i>'); // Replace _text_ with <i>text</i>
    return italicFormatted.split('\n\n').map((paragraph, index) => (
      <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
    ));
  };

  return (
    <div className="sidepanel"> 
      <button onClick={onClose} type="button">Close</button> {/* Added type="button" for closing side panel */}

      <h3>{selectedMarker.name}</h3> {/* Name (Title) */}
      
      <h4>{selectedMarker.description}</h4> {/* One-line Description */}

      {/* Image Carousel */}
      {selectedMarker.images && selectedMarker.images.length > 0 && (
        <Slider {...settings}>
          {selectedMarker.images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </Slider>
      )}

      {/* Audio Element */}
      {selectedMarker.audio && (
        <audio controls>
          <source src={selectedMarker.audio} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}

      {/* Render text with paragraph breaks and italics */}
      {selectedMarker.text && formatTextWithItalics(selectedMarker.text)}

    </div>
  );
}

export default SidePanel;
