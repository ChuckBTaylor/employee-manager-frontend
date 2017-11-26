import React from 'react';

const ProjectCard = props => {

  const handleClick = () => {
    props.onSelectProject(props.project)
  }

  return (
  <li onClick={handleClick}>
    {props.project.name}
  </li>
  )
}

ProjectCard.defaultProps = {
  project: {}
}

export default ProjectCard
