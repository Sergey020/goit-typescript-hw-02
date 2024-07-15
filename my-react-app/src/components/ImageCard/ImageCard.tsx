import { ImageCardProps } from "../App/App.type";
import style from "./ImageCard.module.css";

const ImageCard = ({ photo, onImageClick }: ImageCardProps) => {
  return (
    <li className={style.item}>
      <img
        src={photo.urls.small}
        alt={photo.alt_description || "Image"}
        onClick={() => onImageClick(photo.urls.regular)}
      />
    </li>
  );
};

export default ImageCard;
