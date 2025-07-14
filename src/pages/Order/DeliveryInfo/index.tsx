import React from 'react';
import {Form, Input, Select, Button, message} from 'antd';
import {useNavigate, useParams} from 'react-router-dom';
import type {FormProps} from 'antd';
import type { IDeliveryInfoCreate } from '../../../services/types';
import {
    useAddDeliveryToOrderMutation,
    useGetAllCitiesQuery,
    useGetAllPaymentTypesQuery,
    useGetAllPostDepartmentsQuery
} from "../../../services/apiOrder.ts";
import LoadingOverlay from "../../../components/ui/loading/LoadingOverlay.tsx";

const DeliveryInfoPage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const orderId = Number(id);

    const navigate = useNavigate();
    const [form] = Form.useForm<IDeliveryInfoCreate>();

    const {data: cities, isLoading: citiesLoading} = useGetAllCitiesQuery();
    const {data: postDepartments, isLoading: departmentsLoading} = useGetAllPostDepartmentsQuery();
    const {data: paymentTypes, isLoading: paymentsLoading} = useGetAllPaymentTypesQuery();

    const [addDelivery, {isLoading}] = useAddDeliveryToOrderMutation();

    const onFinish: FormProps<IDeliveryInfoCreate>['onFinish'] = async (values) => {
        try {
            await addDelivery({ ...values, orderId }).unwrap();
            message.success('Інформація про доставку додана успішно');
            navigate('/order/list');
        } catch(err) {
            console.log(err);
            message.error('Виникла помилка, перевірте форму');
        }
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            {(isLoading || citiesLoading || departmentsLoading || paymentsLoading) && <LoadingOverlay />}

            <div className="max-w-full overflow-x-auto">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90 mb-6">Оформити доставку</h1>
                <Form
                    form={form}
                    labelCol={{span: 6}}
                    wrapperCol={{span: 18}}
                    onFinish={onFinish}
                    layout="horizontal"
                    className="dark:text-white/90"
                >
                    <Form.Item<IDeliveryInfoCreate>
                        label="Ім'я отримувача"
                        name="recipientName"
                        rules={[{required: true, message: 'Вкажіть імʼя отримувача'}]}
                    >
                        <Input className="dark:bg-gray-700 dark:border-gray-600 dark:text-white/90" />
                    </Form.Item>

                    <Form.Item<IDeliveryInfoCreate>
                        label="Номер телефону"
                        name="phoneNumber"
                        rules={[{required: true, message: 'Вкажіть номер телефону'}]}
                    >
                        <Input className="dark:bg-gray-700 dark:border-gray-600 dark:text-white/90" />
                    </Form.Item>

                    <Form.Item<IDeliveryInfoCreate>
                        label="Місто"
                        name="cityId"
                        rules={[{required: true, message: 'Оберіть місто'}]}
                    >
                        <Select
                            loading={citiesLoading}
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white/90"
                            options={cities?.map(city => ({
                                label: city.name,
                                value: city.id
                            }))}
                        />
                    </Form.Item>

                    <Form.Item<IDeliveryInfoCreate>
                        label="Відділення"
                        name="postDepartmentId"
                        rules={[{required: true, message: 'Оберіть відділення'}]}
                    >
                        <Select
                            loading={departmentsLoading}
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white/90"
                            options={postDepartments?.map(dept => ({
                                label: dept.name,
                                value: dept.id
                            }))}
                        />
                    </Form.Item>

                    <Form.Item<IDeliveryInfoCreate>
                        label="Тип оплати"
                        name="paymentTypeId"
                        rules={[{required: true, message: 'Оберіть тип оплати'}]}
                    >
                        <Select
                            loading={paymentsLoading}
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white/90"
                            options={paymentTypes?.map(pay => ({
                                label: pay.name,
                                value: pay.id
                            }))}
                        />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="dark:bg-blue-600 dark:border-blue-600 dark:hover:bg-blue-700"
                        >
                            Додати доставку
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default DeliveryInfoPage;
