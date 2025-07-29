import LoadingOverlay from "../../components/ui/loading/LoadingOverlay.tsx";
import CardWithVariants from "../../components/ProductList/CardWithVariants.tsx";
import {useGetAllSizesQuery, useSearchProductQuery} from "../../services/apiProduct.ts";
import type {IProductItem, IProductSearchParams} from "../../services/types.ts";
import SimpleCard from "../../components/ProductList/SimpleCard.tsx";
import {useState} from "react";
import {Collapse, Select} from "antd";
import {useGetAllCategoriesQuery} from "../../services/apiCategory.ts";

const { Panel } = Collapse;
const { Option } = Select;

const ProductsListPage = () => {

    const parseQueryParams = (): IProductSearchParams => {
        const params = new URLSearchParams(location.search);

        const searchParams: IProductSearchParams = {
            name: params.get("name") || "",
            productSizeId: Number(params.get("productSizeId")) || undefined,
            categoryId: Number(params.get("categoryId")) || undefined,
            minPrice: Number(params.get("minPrice")) || undefined,
            maxPrice: Number(params.get("maxPrice")) || undefined,
            prohibitedIngredientIds: params.getAll("prohibitedIngredientIds")
                .map(Number)
                .filter(n => !isNaN(n)),
            page: Number(params.get("page")) || 1,
            itemPerPage: Number(params.get("itemPerPage")) || 10,
        };

        return searchParams
    };

    const [searchParams, setSearchParams] = useState<IProductSearchParams>(parseQueryParams());

    const { data: products, isLoading } = useSearchProductQuery(searchParams);
    const { data: categories } = useGetAllCategoriesQuery();
    const { data: sizes } = useGetAllSizesQuery();

    const handleChange = <K extends keyof IProductSearchParams>(key: K, value: IProductSearchParams[K]) => {
        setSearchParams((prev) => ({
            ...prev,
            [key]: value,
            page: 1,
        }));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {isLoading && <LoadingOverlay />}

            <Collapse className="flex justify-center mb-8 !bg-white border-0 !border-white">
                <Panel key="1" header="Фільтри">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select
                            placeholder="Категорія"
                            allowClear
                            onChange={value => handleChange("categoryId", value)}
                        >
                            {categories?.map(cat => (
                                <Option key={cat.id.toString()} value={cat.id} >{cat.name}</Option>
                            ))}
                        </Select>

                        <Select
                            placeholder="Розмір"
                            allowClear
                            mode="multiple"
                            onChange={value => handleChange("productSizeId", value)}
                        >
                            {sizes?.map(size => (
                                <Option key={size.id.toString()} value={size.id} >{size.name}</Option>
                            ))}
                        </Select>
                    </div>
                </Panel>
            </Collapse>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.items.map((product: IProductItem) => (
                    product.variants?.length > 0
                        ? <CardWithVariants key={product.id} product={product} />
                        : <SimpleCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default ProductsListPage;