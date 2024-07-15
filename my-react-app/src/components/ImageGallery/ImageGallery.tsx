import { ImageGalleryProps } from "../App/App.type";
import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ images, onImageClick }: ImageGalleryProps) => {
  return (
    <ul>
      {images.map((photo) => (
        <ImageCard key={photo.id} photo={photo} onImageClick={onImageClick} />
      ))}
    </ul>
  );
};

export default ImageGallery;
