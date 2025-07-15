import {Badge, Button, Drawer, List, Space, Image, Typography, Divider} from "antd";
import {useAppDispatch, useAppSelector} from "../../../store";
import {useState} from "react";
import type {ICartItem, ICreateUpdateCartItem, IRemoveCartItem} from "../../../services/types.ts";
import {APP_ENV} from "../../../env";
import {createUpdateCart} from "../../../store/cartSlice.ts";
import {useCreateUpdateCartMutation, useGetCartQuery, useRemoveCartItemMutation} from "../../../services/apiCart.ts";
import {useCreateOrderMutation} from "../../../services/apiOrder.ts";
import {useNavigate} from "react-router-dom";

const { Text } = Typography;

const CartDrawer: React.FC = () => {
    const [open, setOpen] = useState(false);

    const {items} = useAppSelector(state => state.cart);
    const {user} = useAppSelector(state => state.auth);

    const  dispatch = useAppDispatch();

    const [removeServerCartItem] = useRemoveCartItemMutation();
    const [createUpdateServerCart] = useCreateUpdateCartMutation();
    const {data: cart} = useGetCartQuery();

    const [createOrder] = useCreateOrderMutation();

    const navigate = useNavigate();

    const onFinish = async () => {
        console.log(cart);

        if (!cart) {
            return;
        }

        try {
            const result = await createOrder({ cartId: cart.id }).unwrap();

            items.forEach(item => {
                handleRemoveCart({id: item.productId!});
            })

            navigate(`/order/pre/${result.orderId}`);
        } catch (err) {
            console.error(err);
        }
    };


    const handleEditCart = (prop : ICreateUpdateCartItem) => {
        const newItems = items.map(item => {
            if (item.productId === prop.productId) {
                return {
                    ...item,
                    quantity: prop.quantity,
                };
            }
            return item;
        });

        if (user) {
            createUpdateServerCart(prop)
        }
        else {
            localStorage.setItem('cart', JSON.stringify(newItems));
        }

        dispatch(createUpdateCart(newItems));
    };

    const handleRemoveCart = (prop: IRemoveCartItem) => {
        console.log(prop)

        const newItems = items.filter(el  => el.productId != prop.id);

        if (user) {
            removeServerCartItem(prop);
        }
        else {
            localStorage.setItem('cart', JSON.stringify(newItems));
        }

        dispatch(createUpdateCart(newItems));
    }

    return (
        <>
            <Badge count={items?.reduce(function (acc, obj) { return acc + obj.quantity!; }, 0)} showZero>
                <Button onClick={() => setOpen(true)}>Кошик</Button>
            </Badge>

            <Drawer
                title="Ваш кошик"
                onClose={() => setOpen(false)}
                open={open}
                width={400}
            >

                <List
                    dataSource={items}
                    locale={{ emptyText: "Кошик порожній" }}
                    renderItem={(item: ICartItem) => (
                        <List.Item
                            actions={[
                                <Button
                                    danger
                                    onClick={() => handleRemoveCart({ id: item.productId! })}
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
                                                item.quantity! > 1 &&
                                                handleEditCart({ productId: item.productId!, quantity: item.quantity! - 1})
                                            }
                                        >
                                            -
                                        </Button>
                                        <Text>{item.quantity}</Text>
                                        <Button
                                            size="small"
                                            onClick={() =>
                                                handleEditCart({ productId: item.productId!, quantity: item.quantity! + 1})
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
                    <Button type="primary" onClick={onFinish} disabled={items.length === 0}>
                        Оформити
                    </Button>
                </div>
            </Drawer>
        </>
    );
};

export default CartDrawer;
