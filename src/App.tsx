import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router";
import DashboardHome from "./pages/Dashboard/DashboardHome.tsx";
import AdminLayout from "./layout/admin/AdminLayout.tsx";
import NotFound from "./pages/OtherPage/NotFound.tsx";
import CategoriesListPage from "./pages/Categories";
import UserLayout from "./layout/user/UserLayout.tsx";
import UserHomePage from "./pages/OtherPage/UserHomePage.tsx";
import CategoriesCreatePage from "./pages/Categories/create";
import CategoriesEditPage from "./pages/Categories/edit";
import LoginPage from "./pages/Account/login";
import RegistrationPage from "./pages/Account/register";
import RequireAdmin from "./components/ProtectedRoute/RequireAdmin.tsx";

const App: React.FC = () => {
    console.log("App rendered");

    return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<UserLayout />}>
                    <Route index element={<UserHomePage />} />

                    <Route path="login" element={<LoginPage />} />
                    <Route path="registration" element={<RegistrationPage />} />
                </Route>


                <Route path={"admin"} element={<RequireAdmin />}>
                    <Route element={<AdminLayout />}>
                        <Route path="home" element={<DashboardHome />}/>

                        <Route path="categories">
                            <Route index  element={<CategoriesListPage />} />
                            <Route path='create' element={<CategoriesCreatePage />} />
                            <Route path="edit/:slug" element={<CategoriesEditPage />} />
                        </Route>
                    </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    </>
  )
}

export default App
