import { useEffect, useState } from "react";
import { DefaultButton, DefaultInput } from "../../shared/components/index";
import { ModalFrame } from "../modal-frame/modal-frame";
import { moneyMask } from "../../utils/money-mask";
import { UserDTO } from "../../shared/interfaces/clients";

interface FormModalProps {
  isOpen: boolean;
  client: UserDTO;

  handleModal(concluded?: true): void;
  editAction(newClient: UserDTO): void;
}

export function EditModal({
  isOpen,
  client,
  handleModal,
  editAction,
}: FormModalProps) {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [companyValuation, setCompanyValuation] = useState("");

  const handleSubmit = () => {
    editAction({
      ...client,
      name,
      // @ts-ignore
      salary,
      // @ts-ignore
      companyValuation,
    });
    setName("");
    setSalary("");
    setCompanyValuation("");
  };

  useEffect(() => {
    setName(client.name);
    setSalary(String(client.salary));
    setCompanyValuation(String(client.companyValuation));
  }, [client]);

  return (
    <ModalFrame
      isOpen={isOpen}
      handleModal={handleModal}
      title="Editar cliente:"
    >
      <DefaultInput
        defaultValue={client.name}
        style={{
          padding: "10px 12px",
          fontSize: "1rem",
        }}
        value={name}
        onChange={({ target: { value } }) => setName(value)}
        placeholderSize="lg"
        placeholder="Digite o nome:"
      />
      <DefaultInput
        defaultValue={client.salary}
        style={{
          padding: "10px 12px",
          fontSize: "1rem",
        }}
        value={salary}
        onChange={({ target: { value } }) =>
          setSalary(moneyMask(value.replace(/[^0-9]/g, "")))
        }
        placeholderSize="lg"
        placeholder="Digite o salário:"
      />
      <DefaultInput
        defaultValue={client.companyValuation}
        style={{
          padding: "10px 12px",
          fontSize: "1rem",
        }}
        value={companyValuation}
        onChange={({ target: { value } }) =>
          setCompanyValuation(moneyMask(value.replace(/[^0-9]/g, "")))
        }
        placeholderSize="lg"
        placeholder="Digite o valor da empresa:"
      />
      <DefaultButton
        onClick={() => {
          handleModal(true);
          handleSubmit();
        }}
        disabled={salary.length <= 4 && companyValuation.length <= 4}
        style={{
          marginTop: 5,
          padding: "12px 0",
          fontSize: "0.875rem",
        }}
        btnType="borderless"
      >
        Editar cliente
      </DefaultButton>
    </ModalFrame>
  );
}
