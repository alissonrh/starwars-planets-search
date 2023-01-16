import React, { useContext } from 'react';
import context from '../context/myContext';

function Table() {
  const { list } = useContext(context);
  console.log(list);

  return (
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
        </tr>
      </thead>
      {list && (
        <tbody>
          {list.map((e) => (
            <tr key={ e.name }>
              <td data-testid="planet-name">{e.name}</td>
              <td>{e.rotation_period}</td>
              <td>{e.orbital_period}</td>
              <td>{e.diameter}</td>
              <td>{e.climate}</td>
              <td>{e.gravity}</td>
              <td>{e.terrain}</td>
              <td>{e.surface_water}</td>
              <td>{e.population}</td>
              <td>
                {e.films.map((film, i) => <p key={ i }>{film}</p>)}
              </td>
            </tr>
          ))}
        </tbody>)}
    </table>
  );
}

export default Table;
