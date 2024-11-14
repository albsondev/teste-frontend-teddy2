import * as singleSpa from "single-spa";

import { DefaultButton } from "./shared/components/button/button";
import { DefaultInput } from "./shared/components/input/input";
import { PageContainer } from "./shared/components/page-container/page-container";

import { useCookies } from "react-cookie";

import "./shared/components/typograph.css";
import { useState } from "react";
import { UserDTO } from "./shared/interfaces/clients";

export default function Root(props) {
  const [cookies, setCookie] = useCookies<
    string,
    {
      clients_list: string;
    }
  >(["clients_list"], {
    doNotParse: true,
  });
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    const newClient: UserDTO = {
      id: Number((Math.random() * 150).toFixed(0)),
      name,
      companyValuation: "R$ 1.000,00",
      salary: "R$ 1.000,00",
    };
    await setCookie("clients_list", JSON.stringify(newClient));
    singleSpa.navigateToUrl("/home/raw-clients");
  };

  return (
    <PageContainer
      style={{
        gap: 20,
        width: "30%",
      }}
    >
      <h2 className="main_title">Olá, seja bem-vindo!</h2>
      <DefaultInput
        onChange={({ target: { value } }) => {
          setName(value);
        }}
        style={{
          minWidth: "21.875rem",
        }}
        placeholder="Digite o seu nome:"
      />
      <DefaultButton
        onClick={() => {
          handleSubmit();
        }}
        style={{
          minWidth: "21.875rem",
        }}
        btnType="borderless"
      >
        Entrar
      </DefaultButton>
    </PageContainer>
  );
}
