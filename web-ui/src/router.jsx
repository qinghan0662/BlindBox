import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import BlindBoxList from './pages/BlindBoxList.jsx';
import BlindBoxDetail from './pages/BlindBoxDetail.jsx';
import OrderList from './pages/OrderList.jsx';
import ShowList from './pages/ShowList.jsx';
import Login from './pages/Login.jsx';
import BlindBoxManage from './pages/BlindBoxManage.jsx';
import ShowPublish from './pages/ShowPublish.jsx';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blindboxes" element={<BlindBoxList />} />
        <Route path="/blindbox/:id" element={<BlindBoxDetail />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/shows" element={<ShowList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blindbox-manage" element={<BlindBoxManage />} />
        <Route path="/show-publish" element={<ShowPublish />} />
      </Routes>
    </BrowserRouter>
  );
}
