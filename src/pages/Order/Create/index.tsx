import {useCart} from "../../../hooks/useCart.ts";
import {useAppSelector} from "../../../store";
import {Collapse, Form, Input} from "antd";
import {APP_ENV} from "../../../env";
import {useState} from "react";
import {
    useCreateOrderMutation,
    useGetAllCitiesQuery,
    useGetAllPaymentTypesQuery,
    useGetAllPostDepartmentsQuery
} from "../../../services/apiOrder.ts";
import {useNavigate} from "react-router";

const { Panel } = Collapse;

import { Select } from "antd";
import type {IDeliveryInfoCreate} from "../../../services/types.ts";

const CreateOrderPage : React.FC = () => {

    const {user} = useAppSelector(state => state.auth);
    const {cart} = useCart(user != null);

    const [form] = Form.useForm<IDeliveryInfoCreate>();

    const [citySearch, setCitySearch] = useState<string>("");
    const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | null>(null);
    const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(null);

    const { data: cities } = useGetAllCitiesQuery({ itemPerPage: 10, name: citySearch });
    const { data: departments } = useGetAllPostDepartmentsQuery(
        selectedCityId !== null
            ? { itemPerPage: 10, cityName: citySearch }
            : { itemPerPage: 0, cityName: "" }
    );
    const { data: paymentTypes } = useGetAllPaymentTypesQuery();
    const [createOrder, { isError }] = useCreateOrderMutation();

    const navigate = useNavigate();

    const handleSubmit = async (values: IDeliveryInfoCreate) => {


        try {
            await createOrder({
                recipientName: values.recipientName,
                phoneNumber: values.phoneNumber,
                cityId: selectedCityId,
                postDepartmentId: selectedDepartmentId,
                paymentTypeId: selectedPaymentId,
            }).unwrap();

            form.resetFields();

            navigate('/');
        } catch(err) {
            console.log('Creating order error', err);
        }
    };

    const handleCitySearch = (values: string) =>
    {
        console.log(values)
        setCitySearch(values);
        console.log(citySearch);
        console.log(cities);
    }

    return(
        <>
            <Collapse
                accordion
                expandIconPosition="right"
                defaultActiveKey={cart.length > 0 ? [cart.length] : []}
                className="bg-white dark:bg-gray-800"
            >
                <Panel header={`Товари в замовленні`} key={cart.length}>
                    <ul className="divide-y">
                        {cart.map((item, idx) => (
                            <li
                                key={idx}
                                className="flex items-center py-4 px-2 text-base"
                            >
                                {item.imageName && (
                                    <img
                                        src={`${APP_ENV.IMAGES_800_URL}${item.imageName}`}
                                        alt={item.imageName}
                                        className="w-14 h-14 object-cover rounded mr-4"
                                    />
                                )}
                                <div className="flex-grow">
                                    <div className="flex items-center gap-2">
                                        <strong>{item.name}</strong>
                                    </div>
                                    <div className="text-gray-500 text-sm">
                                        Кількість: {item.quantity} × {item.price} грн
                                    </div>
                                </div>
                                <div className="font-semibold whitespace-nowrap pl-4">
                                    {item.quantity! * item.price!} грн
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="text-right pt-4 text-lg font-semibold border-t mt-4">
                        Загальна сума: {cart.reduce((sum, item) => {
                            return sum + (item.quantity! * item.price!);
                        }, 0)} грн
                    </div>
                </Panel>
            </Collapse>

            <Form form={form} layout={"vertical"} className="mt-6" onFinish={handleSubmit} initialValues={{
                recipientName: user.name ?? ""
            }}>
                <Form.Item
                label="ПІБ отримувача"
                name="recipientName"
                rules={[{ required: true, message: "Введіть ПІБ отримувача" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Номер телефону"
                    name="phoneNumber"
                    rules={[{ required: true, message: "Введіть номер телефону" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Місто" required>
                    <Select
                        showSearch
                        filterOption={false}
                        placeholder="Оберіть місто"
                        onSearch={handleCitySearch}
                        onSelect={(value, option) => {
                            setSelectedCityId(value);
                            setCitySearch(option.title);
                            setSelectedDepartmentId(null);
                        }}
                        options={
                            cities?.map((city) => ({
                                value: city.id,
                                label: city.name,
                                title: city.name,
                            })) ?? []
                        }
                    />
                </Form.Item>

                <Form.Item label="Відділення" required>
                    <Select
                        disabled={!selectedCityId}
                        placeholder="Оберіть відділення"
                        onSelect={(value) => setSelectedDepartmentId(value)}
                        options={
                            departments?.map((dep) => ({
                                value: dep.id,
                                label: dep.name,
                            })) ?? []
                        }
                    />
                </Form.Item>

                <Form.Item label="Тип оплати" required>
                    <Select
                        placeholder="Оберіть тип оплати"
                        onSelect={(value) => setSelectedPaymentId(value)}
                        options={
                            paymentTypes?.map((type) => ({
                                value: type.id,
                                label: type.name,
                            })) ?? []
                        }
                    />
                </Form.Item>

                {isError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                        Помилка створення. Перевірте усі поля
                    </div>
                )}

                <Form.Item>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Оформити замовлення
                    </button>
                </Form.Item>
            </Form>
        </>
    );
}

export default CreateOrderPage;