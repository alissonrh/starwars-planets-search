import React, { useContext, useState, useEffect } from 'react';
import context from '../context/myContext';

function Table() {
  const MENOS_UM = -1;
  const date = useContext(context);
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState();

  useEffect(() => {
    if (searchText === '') {
      setList(date);
    } else {
      setList(
        date.filter((e) => e.name.toLowerCase()
          .indexOf(searchText.toLowerCase()) > MENOS_UM),
      );
    }
  }, [MENOS_UM, date, searchText]);

  /*   data.filter((e) => {
    if (e.name.indexOf('') > 1) {
      return true;
    } else {
      return false
    } */

  return (
    <>
      <header>
        <input
          type="text"
          value={ searchText }
          data-testid="name-filter"
          onChange={ (e) => setSearchText(e.target.value) }
        />

      </header>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        {list !== undefined && (
          <tbody>
            {list.map((e) => (
              <tr key={ e.name }>
                <td>{e.name}</td>
                <td>{e.rotation_period}</td>
                <td>{e.orbital_period}</td>
                <td>{e.diameter}</td>
                <td>{e.climate}</td>
                <td>{e.gravity}</td>
                <td>{e.terrain}</td>
                <td>{e.surface_water}</td>
                <td>{e.population}</td>
                <td>
                  {e.films.map((e2, index) => (
                    <p key={ index }>{e2}</p>
                  ))}
                </td>
                <td>{e.created}</td>
                <td>{e.edited}</td>
                <td>{e.url}</td>
              </tr>
            ))}
          </tbody>)}
        {/*   <tbody>
      {state.map((e) => (
        <tr key={ e.name }>
          <td>{e.rotation_period}</td>
          <td>{e.orbital_period}</td>
          <td>{e.diameter}</td>
          <td>{e.clumate}</td>
          <td>{e.gravity}</td>
          <td>{e.terrain}</td>
          <td>{e.surface_water}</td>
          <td>{e.population}</td>
          <td>
            {e.films.map((e2, index) => (
              <p key={ index }>{e2}</p>
            ))}
          </td>
          <td>{e.created}</td>
          <td>{e.edited}</td>
          <td>{e.url}</td>
        </tr>
      ))}
    </tbody> */}
      </table>

    </>
  );
}

export default Table;
