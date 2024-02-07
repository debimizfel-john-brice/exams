import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Layout/App/App';
import { BrowserRouter } from 'react-router-dom';
import { ReactNotifications } from 'react-notifications-component';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <ReactNotifications />
    <App />
  </BrowserRouter>
);
