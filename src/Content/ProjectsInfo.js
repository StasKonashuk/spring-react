import React, { useEffect, useState } from 'react';
import Projects from './Projects';
import style from './Content.module.css';
import AtticProjects from './AtticProjects';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsThunk } from '../redux/projects/projects-thunk-creator';

const ProjectsInfo = () => {
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(getProjectsThunk());
  }, [dispatch]);

  const [value, setValue] = useState('');

  const projects = useSelector(state => state.projects.projects.projects);

  const searchHandler = val => {
    setValue(val);
  };

  const onBlurHandler = () => {
    setValue('');
  };

  const filterdProjects = projects.filter(proj => {
    return (
      proj.title.toLowerCase().includes(value.toLowerCase()) ||
      proj.project_info.toLowerCase().includes(value.toLowerCase())
    );
  });

  return (
    <div className={style.contentContainer}>
      <form className={style.projectsForm}>
        <input
          placeholder="Find your project"
          type="text"
          value={value}
          className={style.projInput}
          onChange={e => searchHandler(e.target.value)}
          onBlur={() => onBlurHandler()}
        />
      </form>
      <Projects projects={filterdProjects} />
      <AtticProjects />
    </div>
  );
};

export default ProjectsInfo;
