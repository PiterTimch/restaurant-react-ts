import React from "react";
import { Modal } from "antd";

interface ConfirmDialogProps {
    open: boolean;
    title?: string;
    description?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
                                                         open,
                                                         title = "Підтвердьте дію",
                                                         description = "Ви впевнені, що хочете видалити цей елемент?",
                                                         onConfirm,
                                                         onCancel,
                                                     }) => {
    return (
        <Modal
            open={open}
            title={title}
            onOk={onConfirm}
            onCancel={onCancel}
            okText="Так"
            cancelText="Ні"
            centered
        >
            <p>{description}</p>
        </Modal>
    );
};

export default ConfirmDialog;
