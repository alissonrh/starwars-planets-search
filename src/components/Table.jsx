/* eslint-disable max-lines */
import React, { useContext, useState, useEffect } from 'react';
import context from '../context/myContext';

function Table() {
  const MENOS_UM = -1;
  const arrayColumn = ['population',
    'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  const order = {
    column: '',
    sort: '',
  };

  const date = useContext(context);

  const [searchText, setSearchText] = useState('');
  const [list, setFilter] = useState();
  const [filtersUsed, setFilters] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [selectColumn, setSelectColumn] = useState(arrayColumn);
  const [columnSort, setColumnSort] = useState(order);

  const filtering = () => {
    let filterArray = [...date];
    filtersUsed.forEach((element) => {
      if (element.comparison === 'maior que') {
        filterArray = filterArray
          .filter((e) => Number(e[element.column]) > Number(element.value));
      }
      if (element.comparison === 'menor que') {
        filterArray = filterArray
          .filter((e) => Number(e[element.column]) < Number(element.value));
      }
      if (element.comparison === 'igual a') {
        filterArray = filterArray
          .filter((e) => Number(e[element.column]) === Number(element.value));
      }
    });
    setFilter(filterArray);
  };

  useEffect(() => {
    if (searchText === '' && filtersUsed.length === 0) {
      setFilter(date);
    }
    if (searchText !== '') {
      setFilter(
        date.filter((e) => e.name.toLowerCase()
          .indexOf(searchText.toLowerCase()) > MENOS_UM),
      );
    }
    if (filtersUsed.length !== 0) {
      filtering();
    }
  }, [searchText, filtersUsed, date]);

  const handleClick = () => {
    setFilters(
      [...filtersUsed, {
        column,
        comparison,
        value,
      }],
    );
    const columnFiltered = selectColumn.filter((e) => e !== column);
    setSelectColumn([
      ...columnFiltered,
    ]);
    setColumn(columnFiltered[0]);
  };

  const handleClickFilter = (eColumn) => {
    setFilters(
      filtersUsed.filter((e) => e.column !== eColumn),
    );
  };

  const handleClickOrderFilter = () => {
    const sortedArray = [...list];
    if (columnSort.sort === 'ASC') {
      sortedArray.sort((a, b) => {
        if (a[columnSort.column] === 'unknown') return 1;
        if (b[columnSort.column] === 'unknown') return MENOS_UM;
        return a[columnSort.column] - b[columnSort.column];
      });
    } else {
      sortedArray.sort((a, b) => {
        if (a[columnSort.column] === 'unknown') return 1;
        if (b[columnSort.column] === 'unknown') return MENOS_UM;
        return b[columnSort.column] - a[columnSort.column];
      });
    }
    setFilter(sortedArray);
  };

  return (
    <>
      <header>
        <label htmlFor="textFilter">
          Pesquisar por nome:
          <input
            id="textFilter"
            type="text"
            value={ searchText }
            data-testid="name-filter"
            onChange={ (e) => setSearchText(e.target.value) }
          />
        </label>

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
        </label>

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
          onClick={ () => handleClick() }
        >
          Filter
        </button>
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ () => setFilters([]) }
        >
          Delet Filters
        </button>
      </header>
      { filtersUsed.map((e) => (
        <span
          data-testid="filter"
          key={ e.column }
        >
          {e.column}
          {' '}
          {e.comparison}
          {' '}
          {e.value}
          <button
            type="button"
            onClick={ () => handleClickFilter(e.column) }
          >
            X
          </button>
        </span>
      ))}
      Order
      <select
        data-testid="column-sort"
        onChange={ (e) => setColumnSort(
          { ...columnSort,
            column: e.target.value,
          },
        ) }
        value={ columnSort.column }
      >
        {selectColumn.map((e) => <option key={ e }>{e}</option>)}
      </select>
      <div
        onChange={ (e) => setColumnSort(
          { ...columnSort,
            sort: e.target.value,
          },

        ) }
        value={ columnSort.sort }
      >
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          value="ASC"
          name="sort"
        />
        {' '}
        ASC
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          value="DESC"
          name="sort"
        />
        {' '}
        DESC
      </div>
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ handleClickOrderFilter }
      >
        Ordernar
      </button>
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
      </table>
    </>
  );
}

export default Table;
