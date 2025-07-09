import { Badge, Button, Divider, Drawer, Image, List, Space, Typography } from "antd";
import { useMemo, useState } from "react";
import {
    useCreateUpdateCartMutation,
    useGetCartItemsQuery,
    useRemoveCartItemMutation
} from "../../../services/apiCart";
import type { ICartItem } from "../../../services/types.ts";
import { APP_ENV } from "../../../env/index.ts";

const { Text, Title } = Typography;

const CartDrawer: React.FC = () => {
    const [open, setOpen] = useState(false);

    const { data: cartItems, isLoading, isError } = useGetCartItemsQuery();
    const [createUpdateItem] = useCreateUpdateCartMutation();
    const [removeItem] = useRemoveCartItemMutation();

    const totalPrice = useMemo(() => {
        console.log(cartItems)
        if (cartItems)
            return cartItems.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, [cartItems]);

    return (
        <>
            <Badge count={cartItems?.items.length} showZero>
                <Button onClick={() => setOpen(true)}>Кошик</Button>
            </Badge>

            <Drawer
                title="Ваш кошик"
                onClose={() => setOpen(false)}
                open={open}
                width={400}
            >
                {isLoading && <Text>Завантаження...</Text>}
                {isError && <Text type="danger">Помилка завантаження кошика</Text>}

                {!isLoading && !isError && (
                    <>
                        <List
                            dataSource={cartItems?.items}
                            locale={{ emptyText: "Кошик порожній" }}
                            renderItem={(item: ICartItem) => (
                                <List.Item
                                    actions={[
                                        <Button
                                            danger
                                            onClick={() => removeItem({ id: item.id })}
                                        >
                                            Видалити
                                        </Button>
                                    ]}
                                >
                                    <Space align="start">
                                        <Image
                                            src={`${APP_ENV.IMAGES_200_URL}${item.imageName}`}
                                            width={64}
                                            height={64}
                                            preview={false}
                                        />
                                        <div>
                                            <Text strong>
                                                {item.name}
                                            </Text>
                                            <br />
                                            <Text type="secondary">{item.categoryName}</Text>
                                            <br />
                                            <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "8px 0" }}>
                                                <Button
                                                    size="small"
                                                    onClick={() =>
                                                        item.quantity > 1 &&
                                                        createUpdateItem({ ...item, quantity: item.quantity - 1 })
                                                    }
                                                >
                                                    -
                                                </Button>
                                                <Text>{item.quantity}</Text>
                                                <Button
                                                    size="small"
                                                    onClick={() =>
                                                        createUpdateItem({ ...item, quantity: item.quantity + 1 })
                                                    }
                                                >
                                                    +
                                                </Button>
                                            </div>
                                            <Text>Ціна: {item.price} ₴</Text>
                                        </div>
                                    </Space>
                                </List.Item>
                            )}
                        />

                        <Divider />
                        <div
                            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                        >
                            <Title level={5}>Сума: {totalPrice} грн</Title>
                            <Button type="primary" disabled={cartItems?.items.length === 0}>
                                Оформити замовлення
                            </Button>
                        </div>
                    </>
                )}
            </Drawer>
        </>
    );
};

export default CartDrawer;
