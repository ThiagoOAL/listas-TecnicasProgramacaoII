import React, { useEffect, useState } from 'react';
import NavBar from '../navBar/navBar';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import api from '../../api';

const Hospedagens: React.FC = () => {

  const [currentId, setCurrentId] = useState();

  const [hospedagens, setHospedagens] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

      async function loadHospedagens() {
          const response = await api.get(`/acomodacao`);
          setHospedagens(response.data.data);
      }
      loadHospedagens();
  }, []);


  const deleteCliente = (id: any) => {
    api.delete(`/acomodacao/${id}`)
    window.location.reload()
    navigate('/hospedagens');
  }

  const getClientName = (id: any) => {
    api.get(`/cliente/${id}`).then(item => {
      return item.data.data["nome"]
    })
  }

  const getAcomodName = (id: any) => {
    api.get(`/acomodacoes/${id}`)
  }

  return (
    <>
        <NavBar />

        <div style={{
          overflow: "hidden",
          width: "100%",
          height: "100vh",
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
                {hospedagens ? (
                  hospedagens.map(item =>
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
                          - Id do Cliente: {item["clienteId"]} <br /> 
                          - Id da Acomodação: {item["acomodacoIdAcomodacao"]}

                          <div>
                            <button
                              style={{
                                color: "red",
                                fontSize: "3rem",
                                backgroundColor: 'aqua',
                                border: "none",
                                cursor: "pointer"
                              }}
                              onClick={() => {
                                deleteCliente(item["id"]);
                              }}
                            >
                              &#128465;
                            </button>
                          </div>
                        </li>
                      </React.Fragment>
                  )
                ) : (
                  <p>Não existem usuários</p>
                )}
            </ul>

            <Link to={"/cadHosp"}>
              <input type="button" value="Criar Hospedagem" style={{
                position: 'fixed',
                left: '30px',
                top: '870px',

                width: '300px',
                height: '50px',
                borderRadius: '50px',
                border: 'none',
                fontSize: '1.8rem',

                cursor: 'pointer'
              }} />
            </Link>
        </div>

    </>
  );
}

export default Hospedagens;
