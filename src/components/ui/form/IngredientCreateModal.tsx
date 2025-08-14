import {Modal, Form, Input, Button, message} from "antd";
import {useCreateIngredientMutation} from "../../../services/apiProduct.ts";
import type {IIngredientCreate, ServerError} from "../../../services/types.ts";
import {useFormServerErrors} from "../../../utilities/useFormServerErrors.ts";
import ImageUploadFormItem from "./ImageUploadFormItem.tsx";

interface IngredientCreateModalProps {
    visible: boolean;
    onClose: () => void;
}

const IngredientCreateModal = ({visible, onClose}: IngredientCreateModalProps) => {
    const [ingredientForm] = Form.useForm<IIngredientCreate>();
    const [createIngredient, {isLoading}] = useCreateIngredientMutation();
    const setServerErrors = useFormServerErrors(ingredientForm);

    const handleFinish = async (values: IIngredientCreate) => {
        try {
            await createIngredient(values).unwrap();
            message.success("Інгредієнт створено успішно");
            ingredientForm.resetFields();
            onClose();
        } catch (e) {
            const error = e as ServerError;
            if (error?.status === 400 && error?.data?.errors) {
                setServerErrors(error.data.errors);
            } else {
                message.error("Помилка при створенні продукту");
            }
        }
    };

    return (
        <Modal
            title="Додати інгредієнт"
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form
                form={ingredientForm}
                layout="vertical"
                onFinish={handleFinish}
            >
                <Form.Item
                    name="name"
                    label="Назва інгредієнту"
                    rules={[{required: true, message: "Вкажіть назву інгредієнту"}]}
                >
                    <Input />
                </Form.Item>

                <ImageUploadFormItem name="imageFile" label="Фото" />

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isLoading} className="w-full">
                        Додати
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default IngredientCreateModal;
