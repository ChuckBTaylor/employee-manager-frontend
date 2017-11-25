import React from 'react';
import ServiceCard from './ServiceCard';

const ServiceList = (props) => {

  const services = props.services.map(service => <ServiceCard onSelectService={props.onSelectService} key={service.cuid} service={service} /> )

  return (
  <div className='four wide column'>
    <ul>
      {services}
    </ul>
  </div>
  )
}

ServiceList.defaultProps = {
  services: []
}

export default ServiceList
