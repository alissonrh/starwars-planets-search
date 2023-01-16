import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
  const MENOS_UM = -1;
  const [data, setData] = useState([]);
  const [list, setList] = useState();
  /*   const [searchText, setSearchText] = useState(''); */

  const deleteKey = (fetchApi) => {
    fetchApi.forEach((element) => {
      delete element.residents;
    });
    return fetchApi;
  };

  useEffect(() => {
    const getPlanets = () => {
      fetch('https://swapi.dev/api/planets')
        .then((response) => response.json())
        .then((fetchApi) => {
          const returnFetchApi = deleteKey(fetchApi.results);
          const sortFetchApi = returnFetchApi.sort((a, b) => {
            if (a.name < b.name) return MENOS_UM;
            if (a.name > b.name) return 1;
            return 0;
          });
          sortFetchApi.forEach((planet) => {
            planet.films.forEach(async (link, i) => {
              await fetch(link)
                .then((response) => response.json())
                .then((film) => {
                  planet.films[i] = film.title;
                })
                .catch((error) => {
                  console.log('Error:', error);
                });
            });
          });
          setData(sortFetchApi);
        })
        .catch((error) => {
          setData({
            error,
          });
        });
    };
    getPlanets();
  }, []);

  const contextValue = {
    data,
    setData,
    list,
    setList,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
