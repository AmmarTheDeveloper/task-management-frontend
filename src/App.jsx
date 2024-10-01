import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import "./App.css";
import { Login } from "@/components/Auth/Login/Login";
import { ProtectAuthPage } from "./components/ProtectedRoute";
import { Register } from "./components/Auth/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Layout from "./components/Layout/Layout";
import NotFound from "./components/NotFound";
import { TaskList } from "./components/Dashboard/TaskList";
import AddTask from "./components/Dashboard/AddTask";
import UpdateTask from "./components/Dashboard/updateTask";
import { TaskReport } from "./components/Dashboard/TaskReport";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/login" />} />
          <Route
            path="login"
            element={
              <ProtectAuthPage>
                <Login />
              </ProtectAuthPage>
            }
          />
          <Route
            path="register"
            element={
              <ProtectAuthPage>
                <Register />
              </ProtectAuthPage>
            }
          />
          <Route path="dashboard" element={<Outlet />}>
            {/* <Route index element={<Dashboard />} /> */}
            <Route index element={<Navigate to="tasks" />} />
            <Route path="tasks" element={<TaskList />} />
            <Route path="task/add" element={<AddTask />} />
            <Route path="task/update/:id" element={<UpdateTask />} />
            <Route path="task/report" element={<TaskReport />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
