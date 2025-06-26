import LoadingOverlay from "../../components/ui/loading/LoadingOverlay.tsx";
import CardWithVariants from "../../components/ProductList/CardWithVariants.tsx";
import {useGetAllProductsQuery} from "../../services/apiProduct.ts";
import type {IProductItem} from "../../services/types.ts";
import SimpleCard from "../../components/ProductList/SimpleCard.tsx";

const ProductsListPage = () => {

    const { data: products, isLoading } = useGetAllProductsQuery();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {isLoading && <LoadingOverlay />}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.map((product: IProductItem) => (
                    product.variants?.length > 0
                        ? <CardWithVariants key={product.id} product={product} />
                        : <SimpleCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default ProductsListPage;