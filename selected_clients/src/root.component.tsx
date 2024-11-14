import {
  PageContainer,
  DefaultButton,
  FlexList,
  ClientCard,
} from "./shared/components";

import "./shared/components/typograph.css";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { UserDTO } from "./shared/interfaces/clients";

export default function Root(props) {
  const [clients, setClients] = useState<UserDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedClients, setSelectedClients] = useState<number[]>([]);

  const [cookies, setCookie] = useCookies<
    string,
    {
      selecteds_list: string;
    }
  >(["selecteds_list"], {
    doNotParse: true,
  });

  const handleSelect = (id: number) => {
    if (!!selectedClients.find((e) => e === id)) {
      setSelectedClients((old) => old.filter((e) => e !== id));
    } else {
      setSelectedClients((old) => old.concat(id));
    }
  };

  const handleSubmit = async () => {
    try {
      const newClients = clients.filter((item) => {
        if (selectedClients.findIndex((id) => id === item.id) === -1) {
          return item;
        }
      });
      setClients(newClients);
      setCookie("selecteds_list", newClients);
    } catch (error) {}
  };

  const loadData = async () => {
    setLoading(true);
    try {
      if ((await typeof cookies.selecteds_list) === "string") {
        setClients(await JSON.parse(cookies.selecteds_list));
      } else {
        setClients([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [cookies]);

  return (
    <PageContainer
      style={{
        width: "80%",
        height: "100%",
        margin: "0 10%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginTop: 40,
      }}
    >
      <strong className="page_title">Clientes selecionados:</strong>
      {loading ? (
        <div />
      ) : (
        <>
          <FlexList
            containerStyle={{
              display: "flex",
              width: "100%",
              flexWrap: "wrap",
              gap: "1.25rem",
              marginTop: 10,
            }}
            data={clients}
            renderItem={(item, index) => {
              return (
                <ClientCard
                  key={`selected_card_${index}`}
                  type="selected"
                  selected={
                    !!(selectedClients.findIndex((id) => id === item.id) !== -1)
                  }
                  onPlusClick={() => handleSelect(item.id)}
                  {...item}
                />
              );
            }}
          />
          <DefaultButton
            onClick={() => {
              handleSubmit();
            }}
            style={{
              marginTop: 20,
            }}
          >
            Limpar clientes selecionados
          </DefaultButton>
        </>
      )}
    </PageContainer>
  );
}
