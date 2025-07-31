import LoadingOverlay from "../../components/ui/loading/LoadingOverlay.tsx";
import CardWithVariants from "../../components/ProductList/CardWithVariants.tsx";
import {useGetAllIngredientsQuery, useGetAllSizesQuery, useSearchProductQuery} from "../../services/apiProduct.ts";
import type {IProductItem, IProductSearchParams} from "../../services/types.ts";
import SimpleCard from "../../components/ProductList/SimpleCard.tsx";
import {Col, Collapse, Row, Select, Slider, Typography} from "antd";
import {useGetAllCategoriesQuery} from "../../services/apiCategory.ts";
import {useNavigate, useSearchParams} from "react-router";

const { Panel } = Collapse;
const { Option } = Select;

const { Text } = Typography;

const ProductsListPage = () => {

    const [urlParams] = useSearchParams();
    const navigate = useNavigate();

    const searchParams = {
        name: urlParams.get("name") || "",
        productSizeId: urlParams.get("productSizeId") ? Number(urlParams.get("productSizeId")) : undefined,
        categoryId: urlParams.get("categoryId") ? Number(urlParams.get("categoryId")) : undefined,
        minPrice: urlParams.get("minPrice") ? Number(urlParams.get("minPrice")) : undefined,
        maxPrice: urlParams.get("maxPrice") ? Number(urlParams.get("maxPrice")) : undefined,
        prohibitedIngredientIds: urlParams.getAll("prohibitedIngredientIds")
            .map(Number)
            .filter(n => !isNaN(n)),
        page: urlParams.get("page") ? Number(urlParams.get("page")) : 1,
        itemPerPage: urlParams.get("itemPerPage") ? Number(urlParams.get("itemPerPage")) : 10,
    };

    const { data: products, isLoading } = useSearchProductQuery(searchParams);
    const { data: categories } = useGetAllCategoriesQuery();
    const { data: sizes } = useGetAllSizesQuery();
    const { data: ingredients } = useGetAllIngredientsQuery();

    const handleChange = <K extends keyof IProductSearchParams>(
        key: K,
        value: IProductSearchParams[K]
    ) => {
        const params = new URLSearchParams(location.search);

        if (Array.isArray(value)) {
            params.delete(key as string);
            value.forEach((val) => {
                if (val !== undefined && val !== null) {
                    params.append(key as string, val.toString());
                }
            });
        } else {
            if (value === undefined || value === null || value === "") {
                params.delete(key as string);
            } else {
                params.set(key as string, value.toString());
            }
        }

        params.set("page", "1");

        navigate(`/products/list?${params.toString()}`);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {isLoading && <LoadingOverlay />}

            <Collapse className="flex justify-center mb-8 !bg-white border-0 !border-white">
                <Panel key="1" header="Фільтри">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                            className={"h-8 w-32"}
                            onChange={value => handleChange("productSizeId", value)}
                            maxTagCount={1}
                        >
                            {sizes?.map(size => (
                                <Option key={size.id.toString()} value={size.id} >{size.name}</Option>
                            ))}
                        </Select>

                        <div className={"col-span-2"}>
                            <Text className={"flex justify-center"}>Ціна</Text>
                            <Row justify="space-between" style={{ marginTop: 8 }}>
                                <Col>
                                    <Text>{0} грн</Text>
                                </Col>
                                <Col>
                                    <Text>{1000} грн</Text>
                                </Col>
                            </Row>
                            <Slider
                                min={0}
                                max={1000}
                                onChange={value => {
                                    handleChange("minPrice", value[0]);
                                    handleChange("maxPrice", value[1]);
                                }}
                                style={{ marginTop: 8 }}

                                range
                            />
                        </div>

                        <Select
                            placeholder="Без таких інгредієнтів"
                            allowClear
                            mode="multiple"
                            className={"h-8 w-32"}
                            onChange={value => handleChange("prohibitedIngredientIds", value)}
                            maxTagCount={1}
                        >
                            {ingredients?.map(ingredient => (
                                <Option key={ingredient.id.toString()} value={ingredient.id} >{ingredient.name}</Option>
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