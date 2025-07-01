import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router";
import DashboardHome from "./admin/pages/Dashboard/DashboardHome.tsx";
import AdminLayout from "./layout/admin/AdminLayout.tsx";
import NotFound from "./pages/OtherPage/NotFound.tsx";
import CategoriesListPage from "./admin/pages/Categories";
import UserLayout from "./layout/user/UserLayout.tsx";
import UserHomePage from "./pages/OtherPage/UserHomePage.tsx";
import CategoriesCreatePage from "./admin/pages/Categories/Create";
import CategoriesEditPage from "./admin/pages/Categories/Edit";
import LoginPage from "./pages/Account/Login";
import RegistrationPage from "./pages/Account/Register";
import RequireAdmin from "./components/ProtectedRoute/RequireAdmin.tsx";
import ProductsListPage from "./pages/Products";
import ProductItemPage from "./pages/Products/Item";
import ProductTablePage from "./admin/pages/Products/Table";
import ProductCreatePage from "./admin/pages/Products/Create";
import ForgotPasswordPage from "./pages/Account/ForgotPassword";
import ForgotSuccessPage from "./pages/Account/ForgotSuccess";
import {ResetPasswordPage} from "./pages/Account/ResetPassword";
import UserListPage from "./admin/pages/Users";

const App: React.FC = () => {
    console.log("App rendered");

    return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<UserLayout />}>
                    <Route index element={<UserHomePage />} />

                    <Route path="login" element={<LoginPage />} />
                    <Route path="forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="forgot-success" element={<ForgotSuccessPage />} />
                    <Route path="reset-password" element={<ResetPasswordPage />} />
                    <Route path="registration" element={<RegistrationPage />} />

                    <Route path="products">
                        <Route path="list" element={<ProductsListPage />}/>
                        <Route path="list/:slug" element={<ProductItemPage />}/>
                    </Route>
                </Route>


                <Route path={"admin"} element={<RequireAdmin />}>
                    <Route element={<AdminLayout />}>
                        <Route path="home" element={<DashboardHome />}/>

                        <Route path="categories">
                            <Route index element={<CategoriesListPage />} />
                            <Route path='create' element={<CategoriesCreatePage />} />
                            <Route path="edit/:slug" element={<CategoriesEditPage />} />
                        </Route>

                        <Route path="products">
                            <Route index element={<ProductTablePage />}></Route>
                            <Route path="create" element={<ProductCreatePage />}></Route>
                        </Route>

                        <Route path="users">
                            <Route index element={<UserListPage />}></Route>
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
