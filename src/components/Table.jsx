import React, { useContext } from 'react';
import context from '../context/myContext';

function Table() {
  const { list } = useContext(context);
  console.log(list);

  return (
    <table className="table-auto border-2 border-zinc-900">
      <thead className="bg-zinc-900 text-amarelo-sw">
        <tr>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Rotation Period</th>
          <th className="px-4 py-2">Orbital Period</th>
          <th className="px-4 py-2">Diameter</th>
          <th className="px-4 py-2">Climate</th>
          <th className="px-4 py-2">Gravity</th>
          <th className="px-4 py-2">Terrain</th>
          <th className="px-4 py-2">Surface Water</th>
          <th className="px-4 py-2">Population</th>
          <th className="px-4 py-2">Films</th>
        </tr>
      </thead>
      {list && (
        <tbody>
          {list.map((e) => (
            <tr key={ e.name } className="bg-zinc-800  text-amber-200">
              <td
                data-testid="planet-name"
                className="px-4 py-2 text-center"
              >
                {e.name}

              </td>
              <td className="px-4 py-2 text-center">{e.rotation_period}</td>
              <td className="px-4 py-2 text-center">{e.orbital_period}</td>
              <td className="px-4 py-2 text-center">{e.diameter}</td>
              <td className="px-4 py-2 text-center">{e.climate}</td>
              <td className="px-4 py-2 text-center">{e.gravity}</td>
              <td className="px-4 py-2 text-center">{e.terrain}</td>
              <td className="px-4 py-2 text-center">{e.surface_water}</td>
              <td className="px-4 py-2 text-center">{e.population}</td>
              <td className="px-4 py-2 text-center">
                {e.films.map((film, i) => <p key={ i }>{film}</p>)}
              </td>
            </tr>
          ))}
        </tbody>)}
    </table>
  );
}

export default Table;
