import React, { useEffect, useState } from 'react';
import NavBar from '../navBar/navBar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import api from '../../api';
import "../../index.css"

const Dependentes: React.FC = () => {
  
  
  const [editModalDependente, setModalEditDependente] = useState(false);

  const [currentId, setCurrentId] = useState();

  const [dependentes, setDependentes] = useState([]);

  useEffect(() => {

      async function loadDependentes() {
          const response = await api.get(`/dependentes`);
          setDependentes(response.data.data);
      }
      loadDependentes();
  }, []);


  const deleteDependente = (id: any) => {
    api.delete(`/dependente/${id}`)
    window.location.reload()
  } 

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    await api.put(`/dependente/${currentId}`, {
      nome: data.nome,
      nome_social: data.nome_social,
      cpf: data.cpf,
      clienteId: data.clienteId
    });   
    setModalEditDependente(false);
    window.location.reload()
  };

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
                {dependentes ? (
                  dependentes.map(item =>
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
                          - Nome: {item["nome"]} <br /> - Nome Social: {item["nome_social"]} <br /> - CPF: {item["cpf"]} <br /> - Id do Titular: {item["clienteId"]}
                          <div>
                            <button
                              style={{
                                fontSize: "3rem",
                                backgroundColor: 'aqua',
                                border: "none",
                                cursor: "pointer"
                              }}
                              onClick={() => {
                                setModalEditDependente(true); 
                                setCurrentId(item["id"]);
                              }}
                            >
                              &#9998;
                            </button>

                            <button
                              style={{
                                fontSize: "3rem",
                                backgroundColor: 'aqua',
                                border: "none",
                                cursor: "pointer",
                                color: "red"
                              }}
                              onClick={() => {
                                deleteDependente(item["id"]);
                              }}
                            >
                              &#128465;
                            </button>
                          </div>
                        </li>
                      </React.Fragment>
                  )
                ) : 
                  <p>Não existem dependentes</p>
                }
            </ul>
            {editModalDependente ? 
              <div style={{ 
                width: "50%",
                height: "50vh",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                backgroundColor: "white",
                border: "1px solid black",
                position: 'absolute'
              }}>
                <div style={{
                  display: "flex",
                  alignItems: 'center',
                  flexDirection: 'column'
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: 'center'
                  }}>
                    <h1>Editar Cliente</h1>
                    <div style={{paddingLeft: "50px"}}>
                      <button onClick={() => setModalEditDependente(false)}
                      style={{
                        cursor: "pointer",
                      }}
                      >X</button>
                    </div>
                  </div>
                  
                  <div>
                    <form action="" onSubmit={handleSubmit(onSubmit)}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '25px',
                        width: '100%',
                        height: '35vh',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    >
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                fontSize: '2rem',
                                fontFamily: 'monospace'
                            }}>
                                <label htmlFor="nome">Alterar Nome</label>
                                <input type="text" style={{ fontSize: '30px' }} required={true} {...register("nome")} />
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                fontSize: '2rem',
                                fontFamily: 'monospace'
                            }}>
                                <label htmlFor="nome_social">Alterar Nome Social</label>
                                <input type="text" style={{ fontSize: '30px' }}  required={true}  {...register("nome_social")}  />
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                fontSize: '2rem',
                                fontFamily: 'monospace'
                            }}>
                                <label htmlFor="cpf">Alterar CPF</label>
                                <input type="text" style={{ fontSize: '30px' }} required={true}  {...register("cpf")}  />
                            </div>
                            <div>
                                <button type="submit" style={{
                                    width: '100px',
                                    height: '40px',
                                    backgroundColor: 'black',
                                    color: 'white',
                                    fontSize: '1rem',
                                    borderRadius: '10px',
                                    cursor: 'pointer'
                                }}>Enviar</button>
                            </div>
                        </form>
                  </div>
                </div>
              </div> 
              : null
            }

            <Link to={"/cadDep"}>
              <input type="button" value="Criar Dependente" style={{
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

export default Dependentes;
