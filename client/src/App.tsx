import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/Home.tsx';
import ErrorPage from '@/pages/Error.tsx';
import VisualizeNode from '@/pages/VisualizeNode.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/visualize" element={<VisualizeNode />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
