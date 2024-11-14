import React, { useEffect } from "react";
import {
  PageContainer,
  DefaultButton,
  FlexList,
  NumberedPager,
  ClientCard,
} from "./shared/components";

import { CLIENTS_MOCK } from "./shared/mocks/clients.mock";

import { useState } from "react";

import "./shared/components/typograph.css";
import "./root.style.css";
import {
  ConclusionModal,
  CreateModal,
  EditModal,
  ExcludeModal,
} from "./modals";
import { UserDTO } from "./shared/interfaces/clients";
import { useCookies } from "react-cookie";

// const PageContainer = React.lazy(() => import("componentsIntro/PageContainer"));

const SELECTABLE_LIMITS = [16, 12, 8, 4];

export default function Root(props) {
  const [cookies, setCookie] = useCookies<
    string,
    {
      clients_list: string;
      selecteds_list: string;
    }
  >(["clients_list", "selecteds_list"], {
    doNotParse: true,
  });

  const [limit, setLimit] = useState(16);

  const [clients, setClients] = useState<UserDTO[]>(CLIENTS_MOCK);
  const [savedClients, setSavedClients] = useState<UserDTO[]>([]);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [trashModalOpen, setTrashModalOpen] = useState(false);
  const [conclusionModalOpen, setConclusionModalOpen] = useState(false);

  const [selectedClient, setSelectedClient] = useState<UserDTO>({} as UserDTO);

  const loadData = async () => {
    try {
      const created =
        (await typeof cookies.clients_list) === "string" &&
        (await cookies.clients_list.length) > 0
          ? JSON.parse(await cookies.clients_list)
          : undefined;

      if (!!created) {
        setClients((old) => {
          return [created, ...old];
        });
        setCookie("clients_list", "");
      }

      const saved =
        (await typeof cookies.selecteds_list) === "string"
          ? JSON.parse(await cookies.selecteds_list)
          : [];
      console.log("asdasd", saved);
      if (saved.length > 0) {
        setSavedClients([...(JSON.parse(saved) as UserDTO[])]);
      } else {
        setSavedClients([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect = async (selected: UserDTO, unselect?: boolean) => {
    const prevSelecteds: UserDTO[] =
      (await typeof cookies.selecteds_list) === "string"
        ? await JSON.parse(cookies.selecteds_list)
        : [];

    if (unselect) {
      await setCookie(
        "selecteds_list",
        JSON.stringify(prevSelecteds.filter(({ id }) => id !== selected.id))
      );
      setSavedClients(prevSelecteds.filter(({ id }) => id !== selected.id));
    } else {
      await setCookie(
        "selecteds_list",
        JSON.stringify([selected, ...prevSelecteds])
      );
      setSavedClients([selected, ...prevSelecteds]);
    }
  };

  const handleModal = (type: "create" | "edit" | "trash" | "conclusion") => {
    switch (type) {
      case "create":
        setCreateModalOpen((old) => !old);
        break;
      case "edit":
        setEditModalOpen((old) => !old);
        break;
      case "trash":
        setTrashModalOpen((old) => !old);
        break;
      default:
        setConclusionModalOpen((old) => !old);
        break;
    }
  };

  const handleLimit = (val) => {
    setLimit(val);
  };

  const excludeClientAction = (id: number) => {
    setClients((old) => old.filter((__, index) => index !== id));
  };

  const editClientAction = (props: UserDTO) => {
    setClients((old) =>
      old.map((item, index) => {
        if (index === props.id) {
          return props;
        } else {
          return item;
        }
      })
    );
  };

  const createClientAction = (newClient: UserDTO) => {
    setClients((old) => [newClient, ...old]);
  };

  useEffect(() => {
    loadData();
  }, [cookies]);

  return (
    <>
      <React.Suspense fallback="Carregando...">
        <PageContainer
          style={{
            width: "80%",
            height: "100%",
            margin: "0 10%",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            marginTop: 22,
          }}
        >
          <div className="top_wrapper">
            <span className="info_title">
              <strong>{clients.length} </strong>
              clientes encontrados:
            </span>
            <div className="select_wrapper">
              <span>Clientes por página:</span>
              <select
                className="limit_select"
                onChange={({ target: { value } }) => {
                  handleLimit(value);
                }}
              >
                {SELECTABLE_LIMITS.map((val, index) => (
                  <option
                    key={`select_option_${index}`}
                    value={val}
                    selected={val === limit}
                  >
                    {val}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <FlexList
            containerStyle={{
              display: "flex",
              width: "100%",
              flexWrap: "wrap",
              gap: "1.25rem",
            }}
            data={clients}
            renderItem={(item, index) => {
              return (
                <ClientCard
                  key={`client_card_${index}`}
                  selected={
                    savedClients.findIndex(({ id }) => id === item.id) !== -1
                  }
                  onPlusClick={(unselect) => {
                    handleSelect(item, unselect);
                  }}
                  onEditClick={() => {
                    setSelectedClient({
                      ...item,
                      id: index,
                    });
                    handleModal("edit");
                  }}
                  onTrashClick={() => {
                    setSelectedClient({
                      ...item,
                      id: index,
                    });
                    handleModal("trash");
                  }}
                  {...item}
                />
              );
            }}
          />
          <DefaultButton
            onClick={() => handleModal("create")}
            style={{
              marginTop: 20,
            }}
          >
            Criar cliente
          </DefaultButton>
          <NumberedPager pages={Number((256 / limit).toFixed(0))} />
        </PageContainer>
      </React.Suspense>
      <ConclusionModal
        isOpen={conclusionModalOpen}
        handleModal={() => handleModal("conclusion")}
      />
      <CreateModal
        isOpen={createModalOpen}
        handleModal={(concluded?: true) => {
          if (createModalOpen === true && concluded) {
            setTimeout(() => handleModal("conclusion"), 300);
          }
          handleModal("create");
        }}
        createAction={createClientAction}
      />
      <EditModal
        isOpen={editModalOpen}
        client={selectedClient}
        handleModal={(concluded?: true) => {
          if (editModalOpen === true && concluded) {
            setTimeout(() => handleModal("conclusion"), 300);
          }
          handleModal("edit");
        }}
        editAction={editClientAction}
      />
      <ExcludeModal
        isOpen={trashModalOpen}
        handleModal={(concluded?: true) => {
          if (trashModalOpen === true && concluded) {
            setTimeout(() => handleModal("conclusion"), 300);
          }
          handleModal("trash");
        }}
        client={selectedClient}
        excludeAction={excludeClientAction}
      />
    </>
  );
}
