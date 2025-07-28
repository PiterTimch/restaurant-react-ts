import LoadingOverlay from "../../components/ui/loading/LoadingOverlay.tsx";
import CardWithVariants from "../../components/ProductList/CardWithVariants.tsx";
import {useSearchProductQuery} from "../../services/apiProduct.ts";
import type {IProductItem, IProductSearchParams} from "../../services/types.ts";
import SimpleCard from "../../components/ProductList/SimpleCard.tsx";
import {useState} from "react";

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

    const [searchParams] = useState<IProductSearchParams>(parseQueryParams());

    const { data: products, isLoading } = useSearchProductQuery(searchParams);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {isLoading && <LoadingOverlay />}

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