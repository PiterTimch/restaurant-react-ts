import {useNavigate, useSearchParams} from "react-router";
import {
    type IValidateResetToken,
    useResetPasswordMutation,
    useValidateResetTokenQuery
} from "../../../services/apiAccount.ts";
import {Button, Form, Input, message} from "antd";
import LoadingOverlay from "../../../components/ui/loading/LoadingOverlay.tsx";
import type {ServerError} from "../../../services/types.ts";
import {useFormServerErrors} from "../../../utilities/useFormServerErrors.ts";
import {Link} from "react-router-dom";

interface INewPasswords {
    newPassword: string;
    confirmPassword: string
}

const ResetPasswordPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const token = decodeURIComponent(searchParams.get("token") ?? "");
    const email = decodeURIComponent(searchParams.get("email") ?? "");

    const { data , isLoading } = useValidateResetTokenQuery({ token, email });
    const [resetPassword] = useResetPasswordMutation();

    const [form] = Form.useForm<INewPasswords>();
    const navigate = useNavigate();

    const setServerErrors = useFormServerErrors(form);

    const onFinish = async (values: INewPasswords) => {
        if (values.newPassword !== values.confirmPassword) {
            form.setFields([
                {
                    name: "newPassword",
                    errors: ["Паролі не збігаються"]
                }
            ]);
            return;
        }

        try {
            await resetPassword({ newPassword: values.newPassword, token, email }).unwrap();
            console.log("Пароль успішно змінено");
            navigate("/login");
        } catch (err) {
            const serverError = err as ServerError;

            if (serverError?.status === 400 && serverError?.data?.errors) {
                setServerErrors(serverError.data.errors);
            } else {
                message.error("Сталася помилка");
            }
        }
    };

    if (isLoading) return <LoadingOverlay />;

    if (!(data as IValidateResetToken).isValid) {
        return (
            <div className="min-h-[600px] flex items-center justify-center bg-gray-50">
                <div className="rounded-lg border border-red-300 bg-red-50 p-6 shadow-md max-w-md w-full">
                    <div className="flex items-center mb-4">
                        <svg
                            className="w-6 h-6 text-red-600 mr-2"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856C18.07 19
              19 18.07 19 16.938V7.062C19 5.93 18.07 5 16.938 5H7.062
              C5.93 5 5 5.93 5 7.062v9.876C5 18.07 5.93 19 7.062 19z"
                            />
                        </svg>
                        <h2 className="text-lg font-semibold text-red-700">Недійсний токен</h2>
                    </div>
                    <p className="text-sm text-red-600">
                        Посилання для скидання паролю недійсне або вже використане.
                        Спробуйте ще раз надіслати запит на скидання паролю.
                    </p>
                    <div className="mt-4">
                        <Link
                            to={"/forgot-password"}
                            className="inline-block rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                        >
                            Запросити нове посилання
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[600px] flex items-center justify-center px-4 bg-gray-100">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-800 animate-fade-in">
                {isLoading && <LoadingOverlay />}

                <h2 className="text-2xl font-semibold text-center text-orange-500 mb-6">Скидання паролю</h2>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    className="space-y-4"
                >
                    <Form.Item<INewPasswords>
                        name="newPassword"
                        label={<span className="text-gray-700 dark:text-white font-medium">Новий пароль</span>}
                        rules={[{ required: true, message: 'Вкажіть новий пароль' }]}
                    >
                        <Input.Password className="rounded-lg py-2 px-4 dark:bg-gray-800 dark:text-white" />
                    </Form.Item>

                    <Form.Item<INewPasswords>
                        name="confirmPassword"
                        label={<span className="text-gray-700 dark:text-white font-medium">Повторіть пароль</span>}
                        rules={[{ required: true, message: 'Повторіть пароль' }]}
                    >
                        <Input.Password className="rounded-lg py-2 px-4 dark:bg-gray-800 dark:text-white" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            htmlType="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition"
                        >
                            Змінити пароль
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );

}

export default ResetPasswordPage;