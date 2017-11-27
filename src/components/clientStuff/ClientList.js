import React from 'react';
import ClientCard from './ClientCard';

const ClientList = (props) => {

  const clients = props.clients.map(client => <ClientCard onSelectClient={props.onSelectClient} key={client.id} client={client} /> )

  return (
  <div className='four wide column'>
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
