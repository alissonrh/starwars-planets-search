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
    </>
  );
}

export default Header;
