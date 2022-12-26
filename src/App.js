import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users/Users";
import Products from "./pages/Products/Products";
import AddUser from "./pages/Users/AddUser";
import EditUser from "./pages/Users/EditUser";
import AddProduct from "./pages/Products/AddProduct";
import EditProduct from "./pages/Products/EditProduct";
import IncomingGoods from "./pages/IncomingGoods/IncomingGoods";
import OutGoods from "./pages/OutGoods/OutGoods";
import AddIncoming from "./pages/IncomingGoods/AddIncomings";
import AddOutGoods from "./pages/OutGoods/AddOutGoods";

function App() {
  return (
    <div className="main__conten">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/barang-masuk" element={<IncomingGoods />} />
          <Route path="/barang-masuk/add" element={<AddIncoming />} />
          <Route path="/barang-keluar" element={<OutGoods />} />
          <Route path="/barang-keluar/add" element={<AddOutGoods />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
