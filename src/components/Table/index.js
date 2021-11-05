import React, { useState, useEffect, useCallback } from "react";
import { Container, ETable, Pagination, PaginationButton, PaginationItem } from './styles';
import api from '../../services/api';

function Table(){
  const [ events, setEvents ] = useState([]);
  const [ total, setTotal ] = useState(0);
  const [ limit, setLimit ] = useState(2);
  const [ pages, setPages ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);

  useEffect(()=>{
    async function loadProducts(){
      const response = await api.get(`/listEventos?page=${currentPage}&limit=${limit}`);
      setTotal(response.data.length);

      //Função para arredondar a divisão para cima.
      const totalPages = Math.ceil(total / limit);
      const arrayPages = [];
      for(let i=1; i<= totalPages; i++){
        arrayPages.push(i);
      }
      setPages(arrayPages);

      setEvents(response.data);
    }
    loadProducts();
  }, [total, limit, currentPage]);

  const limits = useCallback((e) => {
    setLimit(e.target.value);
    setCurrentPage(1);
  }, [])

  return <Container>
    <h1>Table of Events</h1>
    <select onChange={limits}>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="5">5</option>
    </select>
    <ETable>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {events.map((even)=>(
          <tr key={even.id}>
            <td>{even.id}</td>
            <td>{even.titulo}</td>
            <td>{even.descricao}</td>
            <td>{even.status}</td>
          </tr>
        ))}
      </tbody>
    </ETable>
    <Pagination>
          <div>Quantidade {total}</div>
          <PaginationButton>
            {currentPage > 1 &&
            <PaginationItem onClick={() => setCurrentPage(currentPage -1)}>Previous</PaginationItem>
            }
            {pages.map(page => (
              <PaginationItem 
              isSelect={page === currentPage}
              key={page} onClick={() => setCurrentPage(page)}>
                {page}
                {/* {console.log("pages:", page)} */}
              </PaginationItem>
            ))}
            {currentPage < pages.length &&
            <PaginationItem onClick={() => setCurrentPage(currentPage +1)}>Next</PaginationItem>
            }
          </PaginationButton>
    </Pagination>
  </Container>
}

export default Table;