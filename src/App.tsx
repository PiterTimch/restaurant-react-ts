import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import {useAppDispatch, useAppSelector} from "./store";
// import {useCreateUpdateCartMutation, useGetCartItemsQuery, useRemoveCartItemMutation} from "./services/apiCart.ts";
// import type {ICartItem} from "./services/types.ts";
// import {createUpdateCart} from "./store/cartSlice.ts";

const DashboardHome = React.lazy(() => import("./admin/pages/Dashboard/DashboardHome.tsx"));
const AdminLayout = React.lazy(() => import("./layout/admin/AdminLayout.tsx"));
const NotFound = React.lazy(() => import("./pages/OtherPage/NotFound.tsx"));
const CategoriesListPage = React.lazy(() => import("./admin/pages/Categories"));
const UserLayout = React.lazy(() => import("./layout/user/UserLayout.tsx"));
const UserHomePage = React.lazy(() => import("./pages/OtherPage/UserHomePage.tsx"));
const CategoriesCreatePage = React.lazy(() => import("./admin/pages/Categories/Create"));
const CategoriesEditPage = React.lazy(() => import("./admin/pages/Categories/Edit"));
const LoginPage = React.lazy(() => import("./pages/Account/Login"));
const RegistrationPage = React.lazy(() => import("./pages/Account/Register"));
const RequireAdmin = React.lazy(() => import("./components/ProtectedRoute/RequireAdmin.tsx"));
const ProductsListPage = React.lazy(() => import("./pages/Products"));
const ProductItemPage = React.lazy(() => import("./pages/Products/Item"));
const ProductTablePage = React.lazy(() => import("./admin/pages/Products/Table"));
const ProductCreatePage = React.lazy(() => import("./admin/pages/Products/Create"));
const ForgotPasswordPage = React.lazy(() => import("./pages/Account/ForgotPassword"));
const ForgotSuccessPage = React.lazy(() => import("./pages/Account/ForgotSuccess"));
const ResetPasswordPage = React.lazy(() => import("./pages/Account/ResetPassword"));
const UserListPage = React.lazy(() => import("./admin/pages/Users"));
const UserEditPage = React.lazy(() => import("./admin/pages/Users/Edit"));

const App: React.FC = () => {

    const state = useAppSelector(state => state);

    console.log("State: ", state);
    /*
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.auth);
    const {items} = useAppSelector(state => state.cart);

    const { data: serverCart } = useGetCartItemsQuery();
    const [createUpdateServerCart] = useCreateUpdateCartMutation();
    const [removeServerCartItem] = useRemoveCartItemMutation();

    const [isCartSynced, setIsCartSynced] = useState(false);

    const loadUserCart = async () => {
        if (!serverCart?.items) return;

        const combinedMap = new Map<number, ICartItem>();

        const lcItems = JSON.parse(localStorage.getItem('cart')!);

        if (lcItems){
            for (const item of lcItems) {
                if (!item.productId) continue;
                combinedMap.set(item.productId, { ...item });
            }
        }

        for (const item of serverCart.items) {
            if (!item.productId) continue;

            if (!combinedMap.has(item.productId)) {
                combinedMap.set(item.productId, { ...item });
            }

            if (item.id) {
                await removeServerCartItem({ id: item.id });
            }
        }

        const newItems = Array.from(combinedMap.values());

        for (const item of newItems) {
            await createUpdateServerCart({
                productId: item.productId!,
                quantity: item.quantity!,
            });
        }

        dispatch(createUpdateCart(newItems));

        localStorage.removeItem('cart')
    };

    useEffect(() => {
        if (user && serverCart && !isCartSynced) {
            loadUserCart().then(() => setIsCartSynced(true));
        }

        if (!user) {
            localStorage.setItem('cart', JSON.stringify(items));
            setIsCartSynced(false);
        }
    }, [user, serverCart]);
*/
    return (
        <Router>
            <React.Suspense fallback={<div>Завантаження...</div>}>
                <Routes>
                    <Route path="/" element={<UserLayout />}>
                        <Route index element={<UserHomePage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="forgot-password" element={<ForgotPasswordPage />} />
                        <Route path="forgot-success" element={<ForgotSuccessPage />} />
                        <Route path="reset-password" element={<ResetPasswordPage />} />
                        <Route path="registration" element={<RegistrationPage />} />

                        <Route path="products">
                            <Route path="list" element={<ProductsListPage />} />
                            <Route path="list/:slug" element={<ProductItemPage />} />
                        </Route>
                    </Route>

                    <Route path="admin" element={<RequireAdmin />}>
                        <Route element={<AdminLayout />}>
                            <Route path="home" element={<DashboardHome />} />

                            <Route path="categories">
                                <Route index element={<CategoriesListPage />} />
                                <Route path="create" element={<CategoriesCreatePage />} />
                                <Route path="edit/:slug" element={<CategoriesEditPage />} />
                            </Route>

                            <Route path="products">
                                <Route index element={<ProductTablePage />} />
                                <Route path="create" element={<ProductCreatePage />} />
                            </Route>

                            <Route path="users">
                                <Route index element={<UserListPage />} />
                                <Route path="edit/:id" element={<UserEditPage />} />
                            </Route>
                        </Route>
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </React.Suspense>
        </Router>
    );
};

export default App;
