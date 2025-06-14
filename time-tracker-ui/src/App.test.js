import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders home page by default', () => {
  render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
  );
  expect(screen.getByText(/Добро пожаловать в систему учета/i)).toBeInTheDocument(); // Заменить текст на актуальный из HomePage.js
});