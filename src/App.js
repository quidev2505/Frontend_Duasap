
import './App.scss';
import Home from './components/partials/Home';
import Checkout from './components/partials/Checkout';
import Footer from './components/partials/Footer';
import CheckAdmin from './components/partials/CheckAdmin';
import Adminpage from './components/partials/Adminpage'
import Report from './components/partials/Report'
import ProtectRoutes from './ProtectRoutes'
import { Routes, Route } from 'react-router-dom'
import PageNotFound from './components/partials/PageNotFound';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin-duasap" element={<CheckAdmin />} />
        <Route element={<ProtectRoutes />}>
          <Route path="/admin-page" element={<Adminpage />} />
          <Route path="/report" element={<Report/>} />
        </Route>
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
      <Footer />
    </>


  );
}

export default App;
