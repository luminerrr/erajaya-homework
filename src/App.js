import React from 'react';
import Providers from './components/provider';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/homepage';
import ProductDetail from './pages/detail';
import Bucket from './pages/bucket';

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="home">
            <Route path="" element={<Homepage />} />
          </Route>
          <Route path="keranjang">
            <Route path="" element={<Bucket />} />
          </Route>
          <Route path=":id">
            <Route path="" element={<ProductDetail />} />
          </Route>
          <Route path="*" element={<Navigate to="home" replace />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
