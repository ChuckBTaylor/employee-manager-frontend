import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectList = props => {
  const projects = props.projects.map(project => (<ProjectCard key={project.id} project={project} onSelectProject={props.onSelectProject} />))
  return (
  <div className="four wide column" >
    <ul>
      {projects}
    </ul>
  </div>
  )
}

ProjectList.defaultProps = {
  projects: []
}

export default ProjectList
