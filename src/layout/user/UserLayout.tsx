import {Link, Outlet, useNavigate} from "react-router";
import {Button} from "antd";
import {APP_ENV} from "../../env";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../store";
import { logout } from "../../store/authSlice";
import CartDrawer from "../../components/Cart/CartDrewer";
import {useCart} from "../../hooks/useCart.ts";
import { apiCart } from "../../services/apiCart.ts";
import {addItem} from "../../store/localCartSlice.ts";
// import {useGetCartQuery} from "../../services/apiCart.ts";

const UserLayout: React.FC = () => {

    const {user} = useAppSelector(state => state.auth);

    const { cart } = useCart(user!=null);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logoutHandler = async () => {
        // if (!serverCart?.items) return;

        const serverCart = [...cart];
        dispatch(logout());
        console.log('Server cart', serverCart);
        dispatch(apiCart.util.resetApiState());
        console.log('Server cart', serverCart);
        serverCart.forEach(item => {
            dispatch(addItem(item));
        });
        navigate('/')
    }

    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
            <header className="w-full py-4 px-6 bg-orange-500 text-white shadow-md flex justify-between">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-semibold">FoodDelivery</h1>
                    <Link to="/products/list/">Продукти</Link>
                </div>


                {user ? (
                    <div className="flex items-center gap-4">
                        <CartDrawer />

                        <Link to="/profile" className="flex items-center gap-2">
                            <img
                                src={user.image ? `${APP_ENV.IMAGES_50_URL}${user.image}` : '/images/user/default.png'}
                                alt={user.name}
                                className="w-10 h-10 rounded-full border-2 border-white object-cover"
                            />
                            <span className="font-medium">{user.name}</span>
                        </Link>

                        {user.role === "Admin" && (
                            <Link
                                to="/admin/home"
                                className="bg-white text-orange-500 px-3 py-1 rounded hover:bg-orange-100 transition"
                            >
                                Адмінка
                            </Link>
                        )}

                        <Button
                            onClick={() => logoutHandler()}
                            className="bg-white text-orange-500 border-none hover:bg-orange-100"
                        >
                            Вихід
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <CartDrawer />

                        <Link
                            to="login"
                            className="bg-white text-orange-500 px-4 py-2 rounded hover:bg-orange-100 transition"
                        >
                            Вхід
                        </Link>

                        <Link
                            to="registration"
                            className="bg-white text-orange-500 px-4 py-2 rounded hover:bg-orange-100 transition"
                        >
                            Реєстрація
                        </Link>
                    </div>
                )}

            </header>

            <main className="flex-1 p-6">
                <Outlet />
            </main>

            <footer className="w-full py-3 px-6 bg-gray-100 text-sm text-center dark:bg-gray-800 dark:text-gray-300">
                © 2025 FoodDelivery. Усі права захищено.
            </footer>
        </div>
    );
};

export default UserLayout;
