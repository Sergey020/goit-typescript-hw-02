export interface Photo {
  id: string;
  likes: number;
  alt_description: string | null;
  urls: {
    regular: string;
    small: string;
  };
}

export interface ImageCardProps {
  photo: Photo;
  onImageClick: (url: string) => void;
}

export interface ImageGalleryProps {
  images: Photo[];
  onImageClick: (url: string) => void;
}

export interface ImageModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  customStyles: {
    content: React.CSSProperties;
    overlay: React.CSSProperties;
  };
  imageUrl: string | null;
}

export interface LoadMoreBtnProps {
  onHandleClick: () => void;
}

export interface SearchBarProps {
  onSubmit: (query: string) => void;
}
