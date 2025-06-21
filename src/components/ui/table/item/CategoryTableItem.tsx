import {TableCell, TableRow} from "../index.tsx";
import {APP_ENV} from "../../../../env";
import {Button} from "antd";
import {CloseCircleFilled} from "@ant-design/icons";
import type {ICategoryItem} from "../../../../services/types.ts";

interface CategoryTableItemProps {
    cat: ICategoryItem;
    onDelete: (id: number) => void;
}

const CategoryTableItem: React.FC<CategoryTableItemProps> = ({
                                                                 cat,  onDelete
                                     }) => {
    return(
        <>
            <TableRow key={cat.id}>
                <TableCell className="py-3 font-medium text-gray-800 dark:text-white/90">
                    {cat.name}
                </TableCell>

                <TableCell className="py-3 text-gray-500 dark:text-gray-400">
                    {cat.slug}
                </TableCell>

                <TableCell className="py-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                        <img
                            src={`${APP_ENV.IMAGES_100_URL}${cat.image}`}
                            alt={cat.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </TableCell>

                <TableCell className="py-3">
                    <Button onClick={() => onDelete(cat.id)}>
                        <CloseCircleFilled className="text-xl" />
                    </Button>
                </TableCell>
            </TableRow>
        </>
    );
}

export default CategoryTableItem;