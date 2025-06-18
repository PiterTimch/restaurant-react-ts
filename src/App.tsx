import './App.css'
import {useGetAllCategoriesQuery} from "./services/apiCategory.ts";

const App: React.FC = () => {
    const {data: categories, isLoading} = useGetAllCategoriesQuery();

    console.log(categories);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
    <>
        <h1 className={"text-3xl font-bold underline"}>Hello world</h1>

        <table className="mt-5 w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
            <tr>
                <th className="px-4 py-2 border-b border-gray-300 text-left">ID</th>
                <th className="px-4 py-2 border-b border-gray-300 text-left">Name</th>
                <th className="px-4 py-2 border-b border-gray-300 text-left">Slug</th>
                <th className="px-4 py-2 border-b border-gray-300 text-left">Image</th>
            </tr>
            </thead>
            <tbody>
            {categories && categories.map(cat => (
                <tr key={cat.id} className="even:bg-gray-50 hover:bg-blue-50 transition-colors">
                    <td className="px-4 py-2 border-b border-gray-200">{cat.id}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{cat.name}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{cat.slug}</td>
                    <td className="px-4 py-2 border-b border-gray-200">
                        <img src={cat.image} alt={cat.name} className="w-12 h-12 object-cover rounded" />
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </>
  )
}

export default App
