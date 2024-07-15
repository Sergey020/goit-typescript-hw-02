import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Modal from "react-modal";
import { getPhotos } from "../apiServise/photos";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import { Photo } from "./App.type";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "70%",
    maxHeight: "70%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column" as React.CSSProperties["flexDirection"],
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

Modal.setAppElement("#root");

function App() {
  const [images, setImages] = useState<Photo[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    if (!query) return;
    const getImages = async () => {
      setIsLoading(true);
      try {
        const { total_pages, results } = await getPhotos(query, page);
        if (!results.length) return setIsEmpty(true);
        setImages((prevImages) => [...prevImages, ...results]);
        setShowBtn(page < total_pages);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("An unexpected error!"));
        }
      } finally {
        setIsLoading(false);
      }
    };
    getImages();
  }, [query, page]);

  const onHandleSubmit = (searchQuery: string) => {
    setImages([]);
    setPage(1);
    setIsLoading(false);
    setError(null);
    setIsEmpty(false);
    setShowBtn(false);
    setQuery(searchQuery);
  };

  const onHandleClick = () => {
    setPage(page + 1);
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={onHandleSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {!images.length &&
        !isEmpty &&
        !isLoading &&
        !error &&
        <p>Let’s begin search 🔎</p>}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {isEmpty && <p>Sorry. There are no images...😭</p>}
      {showBtn && !isLoading && <LoadMoreBtn onHandleClick={onHandleClick} />}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        imageUrl={selectedImage}
        customStyles={customStyles}
      />
    </>
  );
}

export default App;
