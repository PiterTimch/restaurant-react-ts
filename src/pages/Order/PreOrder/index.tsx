import { useParams } from "react-router-dom";
import { useGetByIdQuery } from "../../../services/apiOrder.ts";
import LoadingOverlay from "../../../components/ui/loading/LoadingOverlay.tsx";
import { APP_ENV } from "../../../env";
import { Collapse, Button, Badge } from "antd";
import { Link } from "react-router-dom";

const { Panel } = Collapse;

const PreOrderPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const orderId = Number(id);

    const { data: order, isLoading, error } = useGetByIdQuery(orderId);

    if (isLoading) return <LoadingOverlay />;

    if (error || !order) {
        return (
            <div className="container py-10 text-lg leading-relaxed">
                <h2 className="text-2xl font-semibold mb-6">Деталі замовлення</h2>
                <p className="text-red-500">Помилка завантаження замовлення або замовлення не знайдено.</p>
            </div>
        );
    }

    return (
        <div className="container py-10 text-lg leading-relaxed">
            <h2 className="text-2xl font-semibold mb-6">Замовлення #{order.id}</h2>

            <div className="flex justify-between items-center mb-4">
                <div className="text-gray-500 text-sm">
                    Створено: {new Date(order.dateCreated).toLocaleString()}
                </div>
                <Badge
                    className="text-base"
                    status="processing"
                    color="blue"
                    text={order.status}
                />
            </div>

            <Collapse
                accordion
                expandIconPosition="right"
                defaultActiveKey={order.id.toString()}
                className="bg-white dark:bg-gray-800"
            >
                <Panel header={`Товари в замовленні`} key={order.id.toString()}>
                    <ul className="divide-y">
                        {order.orderItems.map((item, idx) => (
                            <li
                                key={idx}
                                className="flex items-center py-4 px-2 text-base"
                            >
                                {item.productImage && (
                                    <img
                                        src={`${APP_ENV.IMAGES_800_URL}${item.productImage}`}
                                        alt={item.productName}
                                        className="w-14 h-14 object-cover rounded mr-4"
                                    />
                                )}
                                <div className="flex-grow">
                                    <div className="flex items-center gap-2">
                                        <strong>{item.productName}</strong>
                                    </div>
                                    <div className="text-gray-500 text-sm">
                                        Кількість: {item.count} × {item.priceBuy} грн
                                    </div>
                                </div>
                                <div className="font-semibold whitespace-nowrap pl-4">
                                    {item.count * item.priceBuy} грн
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="text-right pt-4 text-lg font-semibold border-t mt-4">
                        Загальна сума: {order.totalPrice} грн
                    </div>
                </Panel>
            </Collapse>

            <Link to={`/order/delivery/${order.id.toString()}`}>
                <Button type="primary" size="large">
                    Оформити
                </Button>
            </Link>
        </div>
    );
};

export default PreOrderPage;
