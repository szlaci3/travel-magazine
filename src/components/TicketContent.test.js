import React from 'react';
import ReactDOM from 'react-dom';
import TicketContent from './TicketContent';
import {screen, act} from '@testing-library/react';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('TicketContent', () => {
  it('can render a TicketContent', async () => {
    const article = {
      title: 'Amsterdam',
      type: 'Sight Seeing',
      reporter: '0',
      assignee: '0',
      duration: '14',
      description: 'One weekend, many places to visit.',
      id: 0,
      status: 0,
      index: 0,
    };

    const users = [
      {
        name: 'Laszlo Szalai',
        id: 0,
      },
    ];

    act(() => {
      ReactDOM.render(<TicketContent
        article={article}
        users={users}
        data={[]}
        loadData={() => {}}
      />, container);
    });
    const title = await screen.findByText(article.title);
    expect(title).toBeInTheDocument();
    screen.debug(title);
  });
});
