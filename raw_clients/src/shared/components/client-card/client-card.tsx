import EditIcon from "../../assets/edit.svg";
import TrashIcon from "../../assets/trash.svg";

import "./client-card.style.css";
import "../typograph.css";
import { stringFormat } from "../../../utils/string-format";

interface ClientCardProps {
  name: string;
  companyValuation: number | string;
  salary: number | string;
  type?: "selected";
  selected?: boolean;

  onEditClick?(): void;
  onPlusClick?(selected?: boolean): void;
  onTrashClick?(): void;
}

export function ClientCard({
  companyValuation,
  name,
  salary,
  type,
  selected,

  onEditClick = () => {},
  onPlusClick = () => {},
  onTrashClick = () => {},
}: ClientCardProps) {
  return (
    <div className={`client_card_wrapper ${selected ? "selected" : ""}`}>
      <strong>{stringFormat(name, 20)}</strong>
      <span className="field_text">Salário: {salary}</span>
      <span className="field_text">Empresa: {companyValuation}</span>
      <div
        className={`client_card_row ${type === "selected" ? "selected" : ""}`}
      >
        {type === "selected" ? (
          <div
            onClick={() => onPlusClick(selected)}
            className="client_card_clickable"
          >
            <div className="red_line" />
          </div>
        ) : (
          <>
            <div
              onClick={() => {
                onPlusClick(selected);
              }}
              className="client_card_clickable"
            >
              {selected ? (
                <div className="red_line" />
              ) : (
                <>
                  <div className="plus_1" />
                  <div className="plus_2" />
                </>
              )}
            </div>
            <div
              onClick={() => {
                onEditClick();
              }}
              className="client_card_clickable"
            >
              <img src={EditIcon} />
            </div>
            <div
              onClick={() => {
                onTrashClick();
              }}
              className="client_card_clickable"
            >
              <img src={TrashIcon} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
