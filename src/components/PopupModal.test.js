import React from 'react';
import ReactDOM from 'react-dom';
import PopupModal from './PopupModal';
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

describe('PopupModal', () => {
  it('can render a PopupModal', async () => {
    act(() => {
      ReactDOM.render(<PopupModal
        display={true}
        closePopup={() => {}}
      >
        <div>
          Some text
        </div>
      </PopupModal>, container);
    });
    const closeButton = await screen.findByText('×');
    expect(closeButton).toBeInTheDocument();
    screen.debug();
  });
});
