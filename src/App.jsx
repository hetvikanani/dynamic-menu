import { Routes, Route } from 'react-router-dom';
import { MenuPage } from './pages';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<MenuPage />} />
    </Routes>
  );
}
