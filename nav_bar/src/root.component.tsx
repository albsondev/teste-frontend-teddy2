import * as singleSpa from "single-spa";

import { useState } from "react";

import "./root.style.css";
import LogoPNG from "./assets/logo.png";

export default function Root(props) {
  const [selected, setSelected] = useState(
    document.URL.search("raw-clients") !== -1 ? 0 : 1
  );
  const [showFloat, setShowFloat] = useState<boolean | null>(null);

  const handleNav = async (index?: number) => {
    setSelected(index);
    switch (index) {
      case 0:
        singleSpa.navigateToUrl("/home/raw-clients");
        break;
      case 1:
        singleSpa.navigateToUrl("/home/selected-clients");
        break;

      default:
        singleSpa.navigateToUrl("/");
        break;
    }
  };

  return (
    <div className="header_wrapper">
      <div
        style={{
          pointerEvents: showFloat == false ? "none" : "all",
        }}
        className={`header_float_section ${
          showFloat !== null ? "animated" : ""
        } ${!!showFloat ? "hidden" : ""}`}
      >
        <a
          onClick={() => {
            handleNav(0);
          }}
          className={`header_section_title ${
            selected === 0 ? "header_section_active" : ""
          }`}
        >
          Clientes
        </a>
        <a
          onClick={() => {
            handleNav(1);
          }}
          className={`header_section_title ${
            selected === 1 ? "header_section_active" : ""
          }`}
        >
          Clientes selecionados
        </a>
        <a
          onClick={() => {
            handleNav();
          }}
          className="header_section_title"
        >
          Sair
        </a>
      </div>
      <section className="header_container">
        <img src={LogoPNG} />
        <div className="header_section">
          <a
            onClick={() => {
              handleNav(0);
            }}
            className={`header_section_title ${
              selected === 0 ? "header_section_active" : ""
            }`}
          >
            Clientes
          </a>
          <a
            onClick={() => {
              handleNav(1);
            }}
            className={`header_section_title ${
              selected === 1 ? "header_section_active" : ""
            }`}
          >
            Clientes selecionados
          </a>
          <a
            onClick={() => {
              handleNav();
            }}
            className="header_section_title"
          >
            Sair
          </a>
        </div>
        <div className="header_user_info">
          Olá
          <strong className="header_user_name">, Usuário!</strong>
        </div>
        <div
          onClick={() => {
            setShowFloat((old) => !old);
          }}
          className="hamburger_clickable"
        >
          <div className="hamburger_1" />
          <div className="hamburger_2" />
          <div className="hamburger_3" />
        </div>
      </section>
    </div>
  );
}
