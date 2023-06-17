import React from 'react';

function NavBar() {
  return (
    <>
        <div style={{
            textDecoration: 'none',
            display: "flex",
            justifyContent: 'space-around',
            fontSize: "2rem",
            color: 'white',
            fontFamily: "monospace"
        }}>
            <a href="/" style={{textDecoration: 'none', color: 'white'}}>Clientes</a> |
            <a href="/dependentes" style={{textDecoration: 'none', color: 'white'}}>Dependentes</a> |
            <a href="/acomodacoes" style={{textDecoration: 'none', color: 'white'}}>Acomodações</a> |
            <a href="/hospedagens" style={{textDecoration: 'none', color: 'white'}}>Hospedagens</a>
        </div>
        <hr style={{ borderColor: 'white' }} />
    </>
  );
}

export default NavBar;
