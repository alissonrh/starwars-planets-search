import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';

/* const INITIAL_STATE = { nome: 'Xablau', idade: 100 }; */

function Provider({ children }) {
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
          setState(returnDele);
        })
        .catch((error) => {
          setState({
            error,
          });
        });
    };
    getPlanets();
  }, []);

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
