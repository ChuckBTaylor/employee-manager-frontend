import React from 'react';
import cuid from 'cuid';
import ProjectCard from './ProjectCard';

const ProjectList = props => {
  const projects = props.projects.map(project => (<ProjectCard key={cuid()} project={project} onSelectProject={props.onSelectProject} />))
  return (
  <div className="four wide column" >
    <h2>Active Projects</h2>
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
