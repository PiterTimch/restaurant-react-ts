import {Link, Outlet} from "react-router";
import {useGetCurrentUserQuery, useLogoutMutation} from "../../services/apiAccount.ts";
import {Button} from "antd";

const UserLayout: React.FC = () => {

    const { data: user } = useGetCurrentUserQuery();
    const [logout] = useLogoutMutation();

    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
            <header className="w-full py-4 px-6 bg-orange-500 text-white shadow-md flex justify-between">
                <h1 className="text-xl font-semibold">FoodDelivery</h1>
                {/*<Link to={"/admin/home"}>Адмінка</Link>*/}

                {user ? (
                    <div className="flex gap-4 items-center">
                        <Link to="/account">
                            <span>{user.name}</span>
                        </Link>

                        {user.role === "Admin" && <Link to="/admin/home">Адмінка</Link>}

                        <Button onClick={() => logout()}></Button>
                    </div>
                ) : (
                    <Link to="login">Вхід</Link>
                )}
            </header>

            <main className="flex-1 p-4 md:p-6">
                <Outlet />
            </main>

            <footer className="w-full py-3 px-6 bg-gray-100 text-sm text-center dark:bg-gray-800 dark:text-gray-300">
                © 2025 FoodDelivery. Усі права захищено.
            </footer>
        </div>
    );
};

export default UserLayout;
