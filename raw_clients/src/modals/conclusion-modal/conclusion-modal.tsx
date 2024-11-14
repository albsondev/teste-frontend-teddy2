import { ModalFrame } from "../modal-frame/modal-frame";

interface ConclusionModalProps {
  isOpen: boolean;
  handleModal(): void;
}

export function ConclusionModal({ isOpen, handleModal }: ConclusionModalProps) {
  return (
    <ModalFrame
      isOpen={isOpen}
      handleModal={handleModal}
      title="Ação realizada com sucesso!"
    >
      <></>
    </ModalFrame>
  );
}
