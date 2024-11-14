import { useState } from "react";
import { DefaultButton, DefaultInput } from "../../shared/components/index";
import { ModalFrame } from "../modal-frame/modal-frame";
import { moneyMask } from "../../utils/money-mask";
import { UserDTO } from "../../shared/interfaces/clients";

interface CreateModalProps {
  isOpen: boolean;

  handleModal(concluded?: true): void;
  createAction(newClient: UserDTO): void;
}

export function CreateModal({
  isOpen,
  handleModal,
  createAction,
}: CreateModalProps) {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [companyValuation, setCompanyValuation] = useState("");

  const handleSubmit = () => {
    createAction({
      id: Number((Math.random() * 150).toFixed(0)),
      name,
      // @ts-ignore
      companyValuation,
      // @ts-ignore
      salary,
    });
  };

  return (
    <ModalFrame
      isOpen={isOpen}
      handleModal={handleModal}
      title="Criar cliente:"
    >
      <DefaultInput
        style={{
          padding: "10px 12px",
          fontSize: "1rem",
        }}
        onChange={({ target: { value } }) => setName(value)}
        placeholderSize="lg"
        placeholder="Digite o nome:"
      />
      <DefaultInput
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
        disabled={
          !(
            String(salary).replace(/[^0-9]/g, "").length >= 5 &&
            String(companyValuation).replace(/[^0-9]/g, "").length >= 4 &&
            name.length !== 0
          )
        }
        style={{
          marginTop: 5,
          padding: "12px 0",
          fontSize: "0.875rem",
        }}
        btnType="borderless"
      >
        Criar cliente
      </DefaultButton>
    </ModalFrame>
  );
}
