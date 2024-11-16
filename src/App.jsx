import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import Warehouses from "./pages/Warehouses/Warehouses";
import WarehouseDetails from "./pages/WarehouseDetails/WarehouseDetails";
import WarehouseEdit from "./pages/WarehouseEdit/WarehouseEdit";
import WarehouseAdd from "./pages/WarehouseAdd/WarehouseAdd";
import Inventory from "./pages/Inventory/Inventory";
import InventoryDetails from "./pages/InventoryDetails/InventoryDetails";
import InventoryEdit from "./pages/InventoryEdit/InventoryEdit";
import InventoryAdd from "./pages/InventoryAdd/InventoryAdd";
import Header from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <div className="app-body">
        <Header />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Navigate to="warehouses" />} />
            <Route path="warehouses" element={<Warehouses />} />
            <Route path="warehouses/:id" element={<WarehouseDetails />} />
            <Route path="warehouses/:id/edit" element={<WarehouseEdit />} />
            <Route path="warehouses/add" element={<WarehouseAdd />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="inventory/:id" element={<InventoryDetails />} />
            <Route path="inventory/:id/edit" element={<InventoryEdit />} />
            <Route path="inventory/add" element={<InventoryAdd />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>© InStock Inc. All Rights Reserved.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
