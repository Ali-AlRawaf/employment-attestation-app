import { Attest } from "./Attest"
import { ConnectApp } from "./ConnectApp"
import React, { useState } from 'react';
import SearchComponent from './components/search/search';
import ItemList from './components/attestations/attestations';
import { EMPLOYEE_ATTESTATIONS, client } from './api/eas_api';
import { useQuery } from '@apollo/client';

export default function App() {
  const [address, setAddress] = useState("");

  const { data } = useQuery(EMPLOYEE_ATTESTATIONS, {
    variables: {
      where: {
        recipient: {
          equals: address
        }
      },
      schemaNamesWhere: {
        // place holder - would have employment history schema
        schemaId: {
          equals: "0x4915a98a3dc10c71027c01e59cb39415d4c04fdcdde539d6d04fc812af86d8dd"
        }
      }
    }, client
  })

  const handleSearch = (searchTerm) => {
    setAddress(searchTerm)
  };
  return (
    <div className="App">
      <ConnectApp />
      <SearchComponent onSearch={handleSearch} />
      {data && <ItemList items={data.attestations} />}
    </div>
    //<Attest/>
  )
}