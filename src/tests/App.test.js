import React from 'react';
import { render, screen, } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData'
import userEvent from '@testing-library/user-event';


describe('cobertura de testes do projeto StarWars', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(testData),
      }));
    render(<App />)
  });
  afterEach(() => jest.clearAllMocks());

  test('verifica se a API foi chamada', () => {
    const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

    expect(fetch).toBeCalled();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toBeCalledWith(URL);
  })

  test('Testa inputs', () => {

    expect(screen.getByTestId('name-filter')).toBeInTheDocument();
    expect(screen.getByTestId('column-filter')).toBeInTheDocument();
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument();
    expect(screen.getByTestId('value-filter')).toBeInTheDocument();
    expect(screen.getByTestId('button-filter')).toBeInTheDocument();
  });

  test('verifica o tamanho da tabebela', () => {
    const thead = document.getElementsByTagName('th')
    expect(thead).toHaveLength(13)
  })

  test('verifica se filtar planetas com a letra "a" dó eles aparecem', () => {
    const inputText = screen.getByRole('textbox', { name: /pesquisar por nome:/i })
    userEvent.type(inputText, 'a')

    expect(document.getElementsByTagName('tr')).toHaveLength(8);

  });

  test('verifica se ao realizar uma filtragem em sequencia e depois o campo de input remove o filtro por inteiro', () => {
    const inputText = screen.getByRole('textbox', { name: /pesquisar por nome:/i })
    
    userEvent.type(inputText, 'a')
    expect(document.getElementsByTagName('tr')).toHaveLength(8);

    userEvent.type(inputText, 'al')
    expect(document.getElementsByTagName('tr')).toHaveLength(1);

    userEvent.clear(inputText)
    expect(document.getElementsByTagName('tr')).toHaveLength(11);
  })

  test('verifica se o operador "menor que" funciona', () => {
   const comparison = screen.getByRole('combobox', {
      name: /comparison/i
    })
    userEvent.selectOptions(comparison, 'menor que')

    const btnValueEl = screen.getByTestId('button-filter')
    userEvent.click(btnValueEl);

    const rowsEl = screen.getAllByRole('row');
    expect(rowsEl).toHaveLength(1);
    
  })

  test('verifica se o operador "maior que" funciona', () => {
    const comparison = screen.getByRole('combobox', {
       name: /comparison/i
     })
     userEvent.selectOptions(comparison, 'maior que')
 
     const btnValueEl = screen.getByTestId('button-filter')
     userEvent.click(btnValueEl);
 
     const rowsEl = screen.getAllByRole('row');
     expect(rowsEl).toHaveLength(9);
     
   })


  test('verifica se o operador "igual a" funciona', () => {
    const comparisonEl = screen.getByRole('combobox', {
      name: /comparison/i
    })
    userEvent.selectOptions(comparisonEl, 'igual a')

    const inputValueEl = screen.getByRole('spinbutton', {
      name: /valor:/i
    })
    userEvent.type(inputValueEl, '200000');

    const btnValueEl = screen.getByTestId('button-filter')
    userEvent.click(btnValueEl);

    const rowsEl = screen.getAllByRole('row');
    expect(rowsEl).toHaveLength(2);
  })

  test('Verifica se a tabela foi atualizada com as informações filtrada com 2 filtros', () => {

    const columnEl = screen.getByRole('combobox', {
      name: /column/i
    })
    userEvent.selectOptions(columnEl, 'rotation_period')

    const comparisonEl = screen.getByRole('combobox', {
      name: /comparison/i
    })
    userEvent.selectOptions(comparisonEl, 'maior que')

    const inputValueEl = screen.getByRole('spinbutton', {
      name: /valor:/i
    })
    userEvent.type(inputValueEl, '20');

    const btnValueEl = screen.getByTestId('button-filter')
    userEvent.click(btnValueEl);

    const rowsEl = screen.getAllByRole('row');
    expect(rowsEl).toHaveLength(9);

    userEvent.selectOptions(columnEl, 'orbital_period')
    userEvent.selectOptions(comparisonEl, 'menor que')
    userEvent.clear(inputValueEl)
    userEvent.type(inputValueEl, '400');
    userEvent.click(btnValueEl);
    expect(document.getElementsByTagName('tr')).toHaveLength(6);
  })

  test('Verifica se a tabela foi atualizada com as informações filtrada com 2 filtros', () => {

    const columnEl = screen.getByRole('combobox', {
      name: /column/i
    })
    userEvent.selectOptions(columnEl, 'rotation_period')

    const comparisonEl = screen.getByRole('combobox', {
      name: /comparison/i
    })
    userEvent.selectOptions(comparisonEl, 'maior que')

    const inputValueEl = screen.getByRole('spinbutton', {
      name: /valor:/i
    })
    userEvent.type(inputValueEl, '20');

    const btnValueEl = screen.getByTestId('button-filter')
    userEvent.click(btnValueEl);

    const rowsEl = screen.getAllByRole('row');
    expect(rowsEl).toHaveLength(9);

    userEvent.selectOptions(columnEl, 'orbital_period')
    userEvent.selectOptions(comparisonEl, 'menor que')
    userEvent.clear(inputValueEl)
    userEvent.type(inputValueEl, '400');
    userEvent.click(btnValueEl);
    expect(document.getElementsByTagName('tr')).toHaveLength(6);
    userEvent.click(screen.getAllByRole('button', {  name: /x/i})[0])
    expect(document.getElementsByTagName('tr')).toHaveLength(6);
  })
})


