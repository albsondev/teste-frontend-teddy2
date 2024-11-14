import { DefaultButton } from "../../shared/components";
import { ClientProps } from "../../shared/interfaces/clients/index";
import { ModalFrame } from "../modal-frame/modal-frame";

interface ExcludeModalProps {
  isOpen: boolean;
  client: ClientProps;

  handleModal(concluded?: true): void;
  excludeAction(id: number): void;
}

export function ExcludeModal({
  isOpen,
  handleModal,
  client,
  excludeAction,
}: ExcludeModalProps) {
  const handleAction = () => {};

  return (
    <ModalFrame
      isOpen={isOpen}
      handleModal={handleModal}
      title="Excluir cliente:"
    >
      <span>Você está prestes a excluir o cliente: {client?.name}</span>
      <DefaultButton
        onClick={() => {
          handleModal(true);
          handleAction();
          excludeAction(client.id);
        }}
        style={{
          marginTop: 5,
          padding: "12px 0",
          fontSize: "0.875rem",
        }}
        btnType="borderless"
      >
        Excluir cliente
      </DefaultButton>
    </ModalFrame>
  );
}
