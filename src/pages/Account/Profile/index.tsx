import {useAppSelector} from "../../../store";
import {APP_ENV} from "../../../env";
import {Button} from "antd";
import {
    CheckLineIcon,
    MailIcon,
    TimeIcon,
    UserIcon
} from "../../../icons";

const ProfilePage : React.FC = () => {
    const {user} = useAppSelector(state => state.auth);

    return (
        <div className="flex min-h-[500px] items-center justify-center">
            <div className="grid lg:grid-cols-12 grid-cols-12 place-items-center">
                <div className="min-h-[300px] shadow lg:col-span-10 col-span-10 w-full col-start-2 lg:col-start-2 px-10 place-content-center">
                    <div className="grid lg:grid-cols-5 grid-cols-1 lg:gap-12 gap-y-5">

                        <div className="flex justify-center">
                            <img
                                src={user.image ? `${APP_ENV.IMAGES_400_URL}${user.image}` : '/images/user/default.png'}
                                alt={user.name}
                                className="lg:w-[180px] w-[300px] object-cover rounded-full m-5"
                            />
                        </div>

                        <div className="col-span-2 grid grid-cols-1 ">
                            <div className="lg:place-items-start mb-3 place-items-center">
                                <div className="flex gap-1">
                                    <UserIcon/>
                                    <p className="text-xs">Ім'я</p>
                                </div>
                                <p className="text-2xl">{user!.name}</p>
                            </div>

                            <div className="lg:place-items-start mb-3 place-items-center">
                                <div className="flex gap-1">
                                    <CheckLineIcon/>
                                    <p className="text-xs">Роль</p>
                                </div>
                                <p className="text-xl">{user!.role}</p>
                            </div>

                            <div className="flex justify-center lg:justify-start mb-3">
                                <Button
                                    type="primary"
                                    className=" !bg-yellow-400 !text-black hover:!bg-yellow-600 hover:!text-white w-[140px]"
                                >Змінити пароль</Button>
                            </div>

                            <div className="flex justify-center lg:justify-start mb-3">
                                <Button
                                    type="primary"
                                    className="!bg-red-400 !text-black hover:!bg-red-600 hover:!text-white w-[140px]"
                                >Видалити акаунт</Button>
                            </div>
                        </div>

                        <div className="col-span-2 grid grid-cols-1 ">
                            <div className="lg:place-items-start mb-3 place-items-center">
                                <div className="flex gap-1">
                                    <MailIcon/>
                                    <p className="text-xs">Пошта</p>
                                </div>
                                <p className="text-xl">{user!.email}</p>
                            </div>

                            <div className="lg:place-items-start mb-3 place-items-center">
                                <div className="flex gap-1">
                                    <TimeIcon/>
                                    <p className="text-xs">Остання адреса</p>
                                </div>
                                <p className="text-xl">{user!.role}</p>
                            </div>

                            <div className="flex justify-center lg:justify-start mb-5">
                                <Button
                                    type="primary"
                                    className="!bg-green-300 !text-black hover:!bg-green-600 hover:!text-white w-[140px]"
                                >Список замовлень</Button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;