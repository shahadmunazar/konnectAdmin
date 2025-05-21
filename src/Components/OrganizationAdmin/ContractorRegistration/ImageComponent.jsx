import React from 'react';
import { Image, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ImageComponent = ({
  src,
  alt,
  width,
  height,
  caption,
  rounded,
  border,
  fluid,
  className,
  style,
}) => {
  // Default styles for the image
  const imageStyles = {
    width: width || 'auto',
    height: height || 'auto',
    ...style,
  };

  // Base image element using React Bootstrap's Image component
  const imageElement = (
    <Image
      src={src}
      alt={alt || 'Image'}
      fluid={fluid}
      rounded={rounded}
      className={`${border ? 'border' : ''} ${className || ''}`}
      style={imageStyles}
    />
  );

  // If a caption is provided, wrap the image in a Card component
  if (caption) {
    return (
      <Card className="shadow-sm border-0">
        <Card.Body className="p-0">
          {imageElement}
          <Card.Text className="text-center mt-2 text-muted">{caption}</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  // Otherwise, return just the image
  return imageElement;
};

// PropTypes for type checking
ImageComponent.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  caption: PropTypes.string,
  rounded: PropTypes.bool,
  border: PropTypes.bool,
  fluid: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

// Default props
ImageComponent.defaultProps = {
  alt: 'Image',
  width: 'auto',
  height: 'auto',
  caption: '',
  rounded: false,
  border: false,
  fluid: true,
  className: '',
  style: {},
};

export default ImageComponent;