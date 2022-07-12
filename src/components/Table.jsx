import React, { useContext, useState, useEffect } from 'react';
import context from '../context/myContext';

function Table() {
  const MENOS_UM = -1;
  const arrayColumn = ['population',
    'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  const date = useContext(context);

  const [searchText, setSearchText] = useState('');
  const [list, setFilter] = useState();
  const [filtersUsed, setFilters] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [selectColumn, setSelectColumn] = useState(arrayColumn);

  useEffect(() => {
    if (searchText === '') {
      setFilter(date);
    } else {
      setFilter(
        date.filter((e) => e.name.toLowerCase()
          .indexOf(searchText.toLowerCase()) > MENOS_UM),
      );
    }
  }, [MENOS_UM, date, searchText]);

  const handleClick = (listDate) => {
    switch (comparison) {
    case 'maior que':
      setFilter(listDate
        .filter((e) => Number(e[column]) > Number(value)));
      break;
    case 'menor que':
      setFilter(listDate
        .filter((e) => Number(e[column]) < Number(value)));
      break;
    default:
      setFilter(listDate
        .filter((e) => Number(e[column]) === Number(value)));
    }
    setFilters(
      [...filtersUsed, {
        column,
        comparison,
        value,
      }],
    );
    setSelectColumn([
      ...selectColumn.filter((e) => e !== column),
    ]);
  };

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
      <header>
        <label htmlFor="column">
          Column
          <select
            data-testid="column-filter"
            id="column"
            onChange={ (e) => setColumn(
              e.target.value,
            ) }
            value={ column }
          >

            {selectColumn.map((e3) => <option key={ e3 }>{e3}</option>)}

            {/*  {' '}
            {console.log('filtersUsed', filtersUsed)}
            {console.log('teste', arrayColumn.filter((e) => e !== filtersUsed
              .forEach((e2) => e2.column)))}
            { arrayColumn.filter((e) => e !== 'population')
              .map((e3) => <option key={ e3 }>{e3}</option>) }
 */}
          </select>

        </label>
        <label htmlFor="comparison">
          Comparison
          <select
            data-testid="comparison-filter"
            id="comparison"
            onChange={ (e) => setComparison(
              e.target.value,
            ) }
            value={ comparison }
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-filter"
              type="number"
              id="value"
              onChange={ (e) => setValue(
                e.target.value,
              ) }
              value={ value }
            />
          </label>
          <button
            data-testid="button-filter"
            type="button"
            onClick={ () => handleClick(list) }
          >
            Filter
          </button>

        </label>
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
