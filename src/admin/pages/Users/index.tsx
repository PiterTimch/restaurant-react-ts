import {Link} from "react-router";
import {BoxIcon} from "../../../icons";
import {Table, TableBody, TableCell, TableHeader, TableRow} from "../../../components/ui/table";
import {useGetAllUsersQuery} from "../../../services/apiUser.ts";
import LoadingOverlay from "../../../components/ui/loading/LoadingOverlay.tsx";
import UserTableItem from "../../../components/ui/table/item/UserTableItem.tsx";

const UserListPage: React.FC = () => {

    const { data: users, isLoading, isError } = useGetAllUsersQuery();

    if (isLoading) return <LoadingOverlay />;
    if (isError) return <p className="text-gray-600 dark:text-gray-400">Something went wrong.</p>;

    return (
        <>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
                <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        Categories
                    </h3>

                    <div className="flex items-center gap-3">
                        <button className="btn dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600">Filter</button>
                        <button className="btn dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600">See all</button>
                    </div>
                </div>

                <Link
                    to="#"
                    className="inline-flex items-center
                gap-2 px-4 py-2 bg-white text-black text-sm
                font-medium rounded-lg shadow-md
                hover:bg-green-400 transition mb-3 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                    <BoxIcon className="text-black dark:text-gray-300 w-5 h-5" />
                    Створити
                </Link>

                <div className="max-w-full overflow-x-auto">
                    <Table>
                        <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                            <TableRow>
                                <TableCell isHeader className="py-3 text-start text-gray-800 dark:text-white/90">Id</TableCell>
                                <TableCell isHeader className="py-3 text-start text-gray-800 dark:text-white/90">Full Name</TableCell>
                                <TableCell isHeader className="py-3 text-start text-gray-800 dark:text-white/90">Email</TableCell>
                                <TableCell isHeader className="py-3 text-start text-gray-800 dark:text-white/90">Login types</TableCell>
                                <TableCell isHeader className="py-3 text-start text-gray-800 dark:text-white/90">Image</TableCell>
                                <TableCell isHeader className="py-3 text-start text-gray-800 dark:text-white/90">Action</TableCell>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {users?.map((user) => (
                                <UserTableItem user={user} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default UserListPage;