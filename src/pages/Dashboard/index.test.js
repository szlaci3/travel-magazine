import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './index';
import {screen, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/* eslint-disable capitalized-comments */

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('Dashboard', () => {
  it('can render the Dashboard and open the Add Article box', async () => {
    act(() => {
      ReactDOM.render(<Dashboard />, container);
    });
    const addArticleBtn = screen.getByText(/add article/i);
    expect(addArticleBtn).toBeInTheDocument();
    // screen.debug(addArticleBtn);

    await userEvent.click(addArticleBtn);
    const combos = screen.getAllByRole('combobox');
    expect(combos).toHaveLength(3);
    // screen.debug(combos[0]);
  });

  // it('can load Tickets in the Dashboard', async () => {
  //   await act(async () => {
  //     ReactDOM.render(<Dashboard />, container);
  //   });
  //   const firstTicket = await screen.findByTestId('0_0');
  //   expect(firstTicket).toBeInTheDocument();
  //   screen.debug(firstTicket);
  // });
});
