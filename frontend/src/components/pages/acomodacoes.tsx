import React, { useEffect, useState } from 'react';
import NavBar from '../navBar/navBar';
import api from '../../api';

const Acomodacoes: React.FC = () => {

  const [acomodacoes, setAcomodacoes] = useState([]);

  useEffect(() => {
      async function loadAcomocadoes() {
          const response = await api.get(`/acomodacoes`);
          setAcomodacoes(response.data.data);
          console.log(response.data.data);
      }
      loadAcomocadoes();
  }, []);

  return (
    <>
        <NavBar />

        <div style={{
          overflow: "hidden",
          width: "100%",
          height: "170vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          position: 'relative',
          backgroundColor: 'aqua'
        }}>
            <ul style={{
              width: "50%",
              paddingTop: "100px"
            }}>
                {acomodacoes ? (
                  acomodacoes.map(item =>
                      <React.Fragment key={item}>
                        <li
                          style={{
                            borderBottom: "1px solid blue",
                            fontSize: "1.7rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            fontFamily: "monospace"
                          }}
                        >
                          - id: {item["id_acomodacao"]} <br /> 
                          - Nome Acomodação: {item["nome_acomodaçao"]} <br /> 
                          - Cama Solteiro: {item["cama_solteiro"]} <br /> 
                          - Cama Casal: {item["cama_casal"]} <br /> 
                          - Suite: {item["suite"]} <br /> 
                          - Garagem: {item["garagem"]} <br /> 
                          - Climatização: {item["climatizacao"]} 
                        </li>
                      </React.Fragment>
                  )
                ) : (
                  <p>Não existem acomodações</p>
                )}
            </ul>
        </div>

    </>
  );
}

export default Acomodacoes;
