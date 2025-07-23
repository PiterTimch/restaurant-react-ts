import {useAppDispatch, useAppSelector} from "../../../store";
import {APP_ENV} from "../../../env";
import {Button, Form, type FormProps, Input} from "antd";
import {
    MailIcon,
    TimeIcon,
    UserIcon
} from "../../../icons";
import {useEditAccountMutation} from "../../../services/apiAccount.ts";
import LoadingOverlay from "../../../components/ui/loading/LoadingOverlay.tsx";
import {useNavigate} from "react-router";
import type {IUserEdit} from "../../../services/types.ts";
import ImageUploadFormItem from "../../../components/ui/form/ImageUploadFormItem.tsx";
import {logout} from "../../../store/authSlice.ts";

const EditProfilePage : React.FC = () => {
    const {user} = useAppSelector(state => state.auth);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [edit, {isLoading}] = useEditAccountMutation()

    const [form] = Form.useForm<IUserEdit>();

    const onFinish: FormProps<IUserEdit>['onFinish'] = async (values) => {
        try {
            await edit(values);
            dispatch(logout());
            navigate('/login');
        }
        catch (error) {
            console.error(error);
        }
    }

    if (isLoading) return <LoadingOverlay />;

    return (
        <div className="flex min-h-[500px] items-center justify-center">
            <div className="grid lg:grid-cols-12 grid-cols-12 place-items-center">
                <div className="min-h-[300px] shadow lg:col-span-10 col-span-10 w-full col-start-2 lg:col-start-2 px-10 place-content-center">

                    <Form
                        form={form}
                        initialValues={user}
                        onFinish={onFinish}
                        layout="horizontal"
                        className="grid lg:grid-cols-5 grid-cols-1 lg:gap-12 gap-y-5"
                    >
                        <div className="flex justify-center">
                            <ImageUploadFormItem name="image" label="" initialImage={`${APP_ENV.IMAGES_400_URL}${user.image}`} />
                        </div>

                        <div className="col-span-2 grid grid-cols-1 ">
                            <div className="lg:place-items-start mb-3 place-items-center">
                                <div className="flex gap-1">
                                    <UserIcon/>
                                    <p className="text-xs">Ім'я</p>
                                </div>
                                <Form.Item<IUserEdit>
                                    label=""
                                    name="firstName"
                                    rules={[{ required: true, message: "Вкажіть ім'я" }]}
                                    className="dark:text-white/90"
                                >
                                    <Input className="dark:bg-gray-700 dark:border-gray-600 dark:text-white/90" />
                                </Form.Item>
                            </div>

                            <div className="lg:place-items-start mb-3 place-items-center">
                                <div className="flex gap-1">
                                    <UserIcon/>
                                    <p className="text-xs">Прізвище</p>
                                </div>
                                <Form.Item<IUserEdit>
                                    label=""
                                    name="lastName"
                                    rules={[{ required: true, message: "Вкажіть прізвище" }]}
                                    className="dark:text-white/90"
                                >
                                    <Input className="dark:bg-gray-700 dark:border-gray-600 dark:text-white/90" />
                                </Form.Item>
                            </div>

                        </div>

                        <div className="col-span-2 grid grid-cols-1 ">
                            <div className="flex justify-center lg:justify-between">
                                <div className="lg:place-items-start mb-3 place-items-center">
                                    <div className="flex gap-1">
                                        <MailIcon/>
                                        <p className="text-xs">Пошта</p>
                                    </div>
                                    <Form.Item<IUserEdit>
                                        label="Пошта"
                                        name="email"
                                        rules={[{ required: true, message: "Вкажіть пошту" }]}
                                        className="dark:text-white/90"
                                    >
                                        <Input className="dark:bg-gray-700 dark:border-gray-600 dark:text-white/90" />
                                    </Form.Item>
                                </div>
                            </div>

                            <Button type="primary" htmlType="submit" className="dark:bg-blue-600 dark:border-blue-600 dark:hover:bg-blue-700">
                                Підтвердити
                            </Button>

                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default EditProfilePage;