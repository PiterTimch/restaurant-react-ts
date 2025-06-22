import {useNavigate} from "react-router";
import {Button, Form, type FormProps, Input, message} from "antd";
import type {ILogin, ServerError} from "../../../services/types.ts";
import {useFormServerErrors} from "../../../utilities/useFormServerErrors.ts";
import LoadingOverlay from "../../../components/ui/loading/LoadingOverlay.tsx";
import {useLoginMutation} from "../../../services/apiAccount.ts";

const LoginPage: React.FC = () => {

    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation();

    const [form] = Form.useForm<ILogin>();
    const setServerErrors = useFormServerErrors(form);

    const onFinish: FormProps<ILogin>['onFinish'] = async (values) => {
        try {
            await login(values).unwrap();
            navigate('/');
        } catch (error) {
            const serverError = error as ServerError;

            if (serverError?.status === 400 && serverError?.data?.errors) {
                setServerErrors(serverError.data.errors);
            } else {
                message.error("Сталася помилка при створенні категорії");
            }
        }
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            {isLoading && <LoadingOverlay />}
            <div className="max-w-full overflow-x-auto">
                <h1>Вхід</h1>
                <Form
                    form={form}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    onFinish={onFinish}
                    layout="horizontal"
                >
                    <Form.Item<ILogin>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Вкажіть email' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<ILogin>
                        label="Пароль"
                        name="password"
                        rules={[{ required: true, message: 'Вкажіть пароль' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Увійти
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </div>
    );
}

export default LoginPage;