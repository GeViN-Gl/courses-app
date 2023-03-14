import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CoursesProvider } from './helpers/context/courses.context';
import { AuthorsProvider } from './helpers/context/authors.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CoursesProvider>
      <AuthorsProvider>
        <App />
      </AuthorsProvider>
    </CoursesProvider>
  </React.StrictMode>
);

reportWebVitals();
