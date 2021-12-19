import { useNavigate, useParams } from "react-router";
import { CloseIcon } from "../../assets/icons";
import Modal from "react-modal";

import SinglePostCard from "./SinglePostCard";

const PostModal = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  function closeModal() {
    navigate(-1);
  }

  const customStyles = {
    overlay: { zIndex: 200, backgroundColor: "rgba(0, 0, 0, 0.5)" },
    content: {
      display: "flex",
      alignItems: "center",
      justifyItems: "center",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      maxWidth: 935,
      position: "absolute",
      backgroundColor: "transparent",
      padding: 30,
      margin: 0,
      border: "none",
      width: "100%",
      overflow: "hidden",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <>
      <Modal
        isOpen
        ariaHideApp={false}
        style={customStyles}
        onRequestClose={closeModal}
      >
        <SinglePostCard postId={postId} closeModal={closeModal} />
      </Modal>
      <button onClick={closeModal} className="fixed p-2 right-4 top-16 z-1000">
        <CloseIcon />
      </button>
    </>
  );
};

export default PostModal;
