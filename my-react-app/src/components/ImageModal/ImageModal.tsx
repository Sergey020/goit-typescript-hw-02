import Modal from "react-modal";
import { ImageModalProps } from "../App/App.type";

Modal.setAppElement("#root");

const ImageModal = ({
  modalIsOpen,
  closeModal,
  customStyles,
  imageUrl,
}: ImageModalProps) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Image Modal"
      style={customStyles}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="Large View" />
      ) : (
        <p>No image available!</p>)
      }
    </Modal>
  );
};

export default ImageModal;
