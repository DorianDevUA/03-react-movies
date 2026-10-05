import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App/App';
import 'modern-normalize';
import './global.css';

const rootElement = document.getElementById('root');

// Якщо елемента немає в HTML, ми не ламаємо додаток, а виводимо зрозумілу помилку
if (!rootElement) {
  throw new Error(
    "Could not find the root element with id 'root'. Check index.html",
  );
}

// Тут TypeScript вже сам знає, що rootElement — це HTMLElement (бо null ми відсіяли вище)
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
