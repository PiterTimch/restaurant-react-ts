import {useAppSelector} from "../../../store";
import {APP_ENV} from "../../../env";
import {Button} from "antd";

const ProfilePage : React.FC = () => {
    const {user} = useAppSelector(state => state.auth);

    return (
        <div className="grid lg:grid-cols-10 grid-cols-12 place-items-center">
            <div className="shadow lg:col-span-8 col-span-10 w-full col-start-2 lg:col-start-2">
                <div className="grid lg:grid-cols-5 grid-cols-1 gap-12">

                    <div className="flex justify-center">
                        <img
                            src={user.image ? `${APP_ENV.IMAGES_400_URL}${user.image}` : '/images/user/default.png'}
                            alt={user.name}
                            className="lg:w-[120px] w-[300px] object-cover rounded-full m-5"
                        />
                    </div>

                    <div className="col-span-2 grid grid-cols-1 ">
                        <div>
                            <p className="text-xs">Ім'я</p>
                            <p>{user!.name}</p>
                        </div>

                        <div>
                            <p className="text-xs">Роль</p>
                            <p>{user!.role}</p>
                        </div>

                        <Button>Змінити пароль</Button>
                        <Button>Видалити акаунт</Button>
                    </div>

                    <div className="col-span-2 grid grid-cols-1 ">
                        <div>
                            <p className="text-xs">Пошта</p>
                            <p>{user!.email}</p>
                        </div>

                        <div>
                            <p className="text-xs">Останя адреса:</p>
                            <p>{user!.role}</p>
                        </div>

                        <Button>Список замовлень</Button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProfilePage;