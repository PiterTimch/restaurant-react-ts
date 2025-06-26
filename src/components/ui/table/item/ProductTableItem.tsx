import { TableCell, TableRow } from "../index.tsx";
import { APP_ENV } from "../../../../env";
import { Button, Space, Image, Tag } from "antd";
import { CloseCircleFilled, EditOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import type { IProductItem, IProductVariant } from "../../../../services/types.ts";
import { useState } from "react";

interface ProductTableItemProps {
    prod: IProductItem;
}

const CategoryTableItem: React.FC<ProductTableItemProps> = ({ prod }) => {
    const [open, setOpen] = useState(false);
    const hasVariants = prod.variants && prod.variants.length > 0;

    const renderImage = (src?: string) => (
        src ? (
            <Image
                src={`${APP_ENV.IMAGES_100_URL}${src}`}
                alt=""
                width={50}
                height={50}
                style={{ objectFit: 'cover', borderRadius: 6 }}
                preview={false}
            />
        ) : (
            <div className="h-[50px] w-[50px] bg-gray-200 rounded-md" />
        )
    );

    return (
        <>
            <TableRow key={prod.id}>
                <TableCell className="py-3 font-medium">
                    <div className="flex gap-2">
                        {hasVariants && (
                            <Button
                                icon={open ? <UpOutlined /> : <DownOutlined />}
                                onClick={() => setOpen(!open)}
                                className="border-0"
                            >
                                Варіанти
                            </Button>
                        )}

                        <span>{prod.name}</span>
                    </div>
                </TableCell>

                <TableCell className="py-3 text-gray-500">{prod.slug}</TableCell>
                <TableCell className="py-3 text-gray-500">{prod.price}</TableCell>
                <TableCell className="py-3 text-gray-500">{prod.category.name}</TableCell>
                <TableCell className="py-3">{renderImage(prod.productImages?.[0]?.name)}</TableCell>

                <TableCell className="py-3">
                    {!hasVariants && (
                        <Space size="middle">
                            <Button icon={<EditOutlined />} />
                            <Button danger icon={<CloseCircleFilled />} />
                        </Space>
                    )}
                </TableCell>
            </TableRow>

            {hasVariants && open && (
                prod.variants.map((variant: IProductVariant) => (
                    <TableRow key={variant.id}>
                        <TableCell className="py-3 text-gray-600">
                            <Tag color="blue">Розмір: {variant.productSize.name}</Tag>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell className="py-3">{variant.price}</TableCell>
                        <TableCell></TableCell>
                        <TableCell>{renderImage(variant.productImages?.[0]?.name)}</TableCell>
                        <TableCell className="py-3">
                            <Space size="middle">
                                <Button icon={<EditOutlined />} />
                                <Button danger icon={<CloseCircleFilled />} />
                            </Space>
                        </TableCell>
                    </TableRow>
                ))
            )}
        </>
    );
};

export default CategoryTableItem;
