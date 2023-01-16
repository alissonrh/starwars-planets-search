/* eslint-disable max-lines */
import React, { useEffect, useContext, useState } from 'react';
import context from '../context/myContext';

function Header() {
  const MENOS_UM = -1;
  const arrayColumn = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  const order = {
    column: '',
    sort: '',
  };
  const { data, setList } = useContext(context);

  const [searchText, setSearchText] = useState('');
  const [filtersUsed, setFilters] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [selectColumn, setSelectColumn] = useState(arrayColumn);
  const [columnSort, setColumnSort] = useState(order);

  const filtering = () => {
    let filterArray = [...data];
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
    setList(filterArray);
  };

  useEffect(() => {
    if (searchText === '') {
      setList(data);
    }
    if (searchText !== '') {
      setList(
        data.filter((e) => e.name.toLowerCase()
          .indexOf(searchText.toLowerCase()) > MENOS_UM),
      );
    }
    if (filtersUsed.length !== 0) {
      filtering();
    }
  }, [searchText, filtersUsed, data]);

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
    const sortedArray = [...data];
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
    setList(sortedArray);
  };

  return (
    <header className="bg-gray-700 p-4 text-white">
      <div
        className="bg-gray-700 p-4 h-20 flex justify-between items-center"
      >
        <label htmlFor="textFilter">
          Pesquisar por nome:
          <input
            className="shadow-md appearance-none border border-yellow-400
          rounded w-full py-2 px-3 text-white
           mt-1.5 mb-3 leading-tight bg-slate-700 focus:outline-none focus:shadow-outline
           focus:border focus:border-yellow-400"
            id="textFilter"
            type="text"
            value={ searchText }
            data-testid="name-filter"
            onChange={ (e) => setSearchText(e.target.value) }
          />
        </label>

        <label htmlFor="column">
          Column:
          <select
            className="shadow-md border border-yellow-400
          rounded w-full py-2 px-3
           mt-1.5 mb-3 leading-tight bg-slate-700 focus:outline-none focus:shadow-outline
          focus:border focus:border-yellow-400"
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
          Comparison:
          <select
            className="shadow-md border border-yellow-400
          rounded w-full py-2 px-3 mt-1.5 mb-3 leading-tight bg-slate-700
          focus:outline-none focus:shadow-outline
          focus:border focus:border-verde-claro"
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
            className="shadow-md appearance-none border border-yellow-400
          rounded w-full py-2 px-3 text-white
           mt-1.5 mb-3 leading-tight bg-slate-700 focus:outline-none focus:shadow-outline
           focus:border focus:border-yellow-400"
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
          className="my-3 bg-yellow-400 text-white p-1.5
          h-16 text-center rounded text-black w-16"
          data-testid="button-filter"
          type="button"
          onClick={ () => handleClick() }
        >
          Filter
        </button>
      </div>
      {filtersUsed?.map((e) => (
        <p
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
        </p>
      ))}
      <div
        className="bg-gray-700 p-4 h-20 flex justify-between items-center ml-48 mr-48"
      >
        <label htmlFor="order">
          Order
          <select
            className="shadow-md border border-yellow-400
      rounded w-full py-2 px-3 bg-slate-700
      text-white mt-1.5 mb-3 leading-tight
      focus:outline-none focus:shadow-outline
      focus:border focus:border-verde-claro"
            id="order"
          >
            {(e) => setColumnSort(
              {
                ...columnSort,
                column: e.target.value,
              },
            )}
            value =
            {' '}
            {columnSort.column}
            {selectColumn.map((e) => <option key={ e }>{e}</option>)}
          </select>
        </label>

        <div
          className="flex flex-col"
          onChange={ (e) => setColumnSort(
            {
              ...columnSort,
              sort: e.target.value,
            },
          ) }
          value={ columnSort.sort }
        >
          <div>
            <input
              type="radio"
              data-testid="column-sort-input-asc"
              value="ASC"
              name="sort"
            />
            {' '}
            ASC
          </div>
          <div>
            <input
              type="radio"
              data-testid="column-sort-input-desc"
              value="DESC"
              name="sort"
            />
            {' '}
            DESC
          </div>

        </div>
        <button
          className="my-3 bg-yellow-400 text-white p-1.5
        h-16 text-center rounded text-black"
          data-testid="column-sort-button"
          type="button"
          onClick={ handleClickOrderFilter }
        >
          Ordernar
        </button>
        <button
          className="my-3 bg-yellow-400 text-white p-1.5
        h-16 text-center rounded text-black"
          data-testid="button-remove-filters"
          type="button"
          onClick={ () => setFilters([]) }
        >
          Delet Filters
        </button>
      </div>

    </header>
  );
}

export default Header;
