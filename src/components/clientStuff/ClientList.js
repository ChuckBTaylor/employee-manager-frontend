import React from 'react';
import cuid from 'cuid';
import ClientCard from './ClientCard';

const ClientList = (props) => {

  const clients = props.clients.map(client => <ClientCard key={cuid()} onSelectClient={props.onSelectClient} client={client} /> )

  return (
  <div className='four wide column'>
    <h2>Active Clients</h2>
    <ul>
      {clients}
    </ul>
  </div>
  )
}

ClientList.defaultProps = {
  clients: []
}

export default ClientList
