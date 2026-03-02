import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/Home.tsx';
import ErrorPage from '@/pages/Error.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
