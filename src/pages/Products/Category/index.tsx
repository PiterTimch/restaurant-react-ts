import { useSearchProductQuery } from "../../../services/apiProduct";
import {useNavigate, useParams, useSearchParams} from "react-router";
import type {IProductItem, IProductSearchParams} from "../../../services/types.ts";
import LoadingOverlay from "../../../components/ui/loading/LoadingOverlay.tsx";
import {useGetCategoryBySlugQuery} from "../../../services/apiCategory";
import BredCrumbBlock from "../../../components/ui/bredCrumb/BredCrumbBlock.tsx";
import CardWithVariants from "../../../components/ProductList/CardWithVariants.tsx";
import SimpleCard from "../../../components/ProductList/SimpleCard.tsx";
import {APP_ENV} from "../../../env";
import Pagination from "../../../components/common/Pagination.tsx";

const CategoryProductsPage = () => {

    const [urlParams] = useSearchParams();

    const slug = useParams().categorySlug;
    const page = Number(urlParams.get("page") ?? 1);

    const { data: category, isLoading : isCategoryLoading } = useGetCategoryBySlugQuery(slug!);

    const { data: products, isLoading } = useSearchProductQuery({categoryId: category?.id, page: page, itemPerPage: 3});

    const navigate = useNavigate();

    const handlePageChange = (page: number) => {
        navigate(`/products/${category!.slug}?page=${ page }`)
    };

    if (isLoading || isCategoryLoading) { return <LoadingOverlay /> }

    return (
        <div className="max-w-7xl mx-auto px-4">

            <div >
                <BredCrumbBlock />
            </div>

            <div className="relative w-full h-[250px] sm:h-[300px] lg:h-[400px] mb-10 rounded-2xl overflow-hidden shadow-lg">
                <img
                    src={`${APP_ENV.IMAGES_1200_URL}${category!.image}`}
                    alt={category!.name}
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold drop-shadow-lg">
                        {category!.name}
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {products?.items.map((product: IProductItem) => (
                    product.variants?.length > 0
                        ? <CardWithVariants key={product.id} product={product} />
                        : <SimpleCard key={product.id} product={product} />
                ))}
            </div>

            {products?.pagination && products?.pagination.totalPages > 1 && (
                <Pagination
                    currentPage={products?.pagination.currentPage}
                    totalPages={products?.pagination.totalPages}
                    siblingCount={2}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}

export default CategoryProductsPage;
