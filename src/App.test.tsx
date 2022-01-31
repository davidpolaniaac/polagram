import { render, screen } from '@testing-library/react';

import App from './App';
import React from 'react';
import { createBrowserHistory } from 'history';
import { identity } from 'lodash';

const history = createBrowserHistory();


test('renders learn react link', () => {
  render(<App history={history} loadInitialData={identity}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
