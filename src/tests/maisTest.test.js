import React from 'react';
import { render, screen, waitFor, } from '@testing-library/react';
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
    const URL = 'https://swapi.dev/api/planets';

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
})