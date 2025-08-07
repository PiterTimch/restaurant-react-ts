import { useSearchProductQuery } from "../../../services/apiProduct";
import {useParams} from "react-router";
import type {IProductItem} from "../../../services/types.ts";
import LoadingOverlay from "../../../components/ui/loading/LoadingOverlay.tsx";
import { useGetAllCategoriesQuery } from "../../../services/apiCategory";
import BredCrumbBlock from "../../../components/ui/bredCrumb/BredCrumbBlock.tsx";
import CardWithVariants from "../../../components/ProductList/CardWithVariants.tsx";
import SimpleCard from "../../../components/ProductList/SimpleCard.tsx";

const CategoryProductsPage = () => {

    const slug = useParams().categorySlug;

    const { data: categories } = useGetAllCategoriesQuery();

    const category = categories?.find(cat => cat.slug === slug);

    const { data: products, isLoading } = useSearchProductQuery({categoryId: category?.id});


    return (
        <div className="max-w-7xl mx-auto px-4">
            {isLoading && <LoadingOverlay />}

            <div >
                <BredCrumbBlock />
            </div>

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

export default CategoryProductsPage;
