import { useEffect, useState } from "react";
import "./modal-frame.style.css";

interface FormModalProps {
  isOpen: boolean;
  handleModal(): void;
  title: string;
  children: React.ReactNode;
}

export function ModalFrame({
  isOpen,
  handleModal,
  title = "",
  children,
}: FormModalProps) {
  const [isClosed, setIsClosed] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsClosed(false);
    } else {
      setTimeout(() => {
        setIsClosed(true);
      }, 300);
    }
  }, [isOpen]);

  return (
    <div
      style={{
        display: isClosed ? "none" : "flex",
      }}
      className="modal_wrapper"
    >
      <div
        onClick={() => handleModal()}
        className={`modal_backdrop ${!isOpen ? "closed" : ""}`}
      />
      <div className={`modal_container ${!isOpen ? "closed" : ""}`}>
        <div className="modal_top">
          <strong>{title}</strong>
          <div onClick={() => handleModal()} className="cross_clickable">
            <div className="cross_1" />
            <div className="cross_2" />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
