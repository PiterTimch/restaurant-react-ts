import {TableCell, TableRow} from "../index.tsx";
import {APP_ENV} from "../../../../env";
import {Button, Space} from "antd";
import {CloseCircleFilled, EditOutlined} from "@ant-design/icons";
import type {ICategoryItem} from "../../../../services/types.ts";
import {Link} from "react-router";

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
                    <Space size="middle">
                        <Link to={`/admin/categories/edit/${cat.slug}`}>
                            <Button icon={<EditOutlined />} />
                        </Link>

                        <Button danger icon={<CloseCircleFilled />} onClick={() => onDelete(cat.id)} />
                    </Space>
                </TableCell>
            </TableRow>
        </>
    );
}

export default CategoryTableItem;