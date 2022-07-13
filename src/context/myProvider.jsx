import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
  const MENOS_UM = -1;
  const [state, setState] = useState();

  const deleteKey = (data) => {
    data.forEach((element) => {
      delete element.residents;
    });
    return data;
  };

  useEffect(() => {
    const getPlanets = () => {
      fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((response) => response.json())
        .then((data) => {
          const returnDele = deleteKey(data.results);
          const sortDate = returnDele.sort((a, b) => {
            if (a.name < b.name) return MENOS_UM;
            if (a.name > b.name) return 1;
            return 0;
          });
          setState(sortDate);
        })
        .catch((error) => {
          setState({
            error,
          });
        });
    };
    getPlanets();
  }, []);

  /* const contextValue {
    state: date,
  } */

  return (
    <MyContext.Provider value={ state }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
