import { useEffect, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import ModalOverlay from '../modal-overlay/ModalOverlay'
import { IModalProps } from '../../utils/types';

function Modal({ onClose, header, children }: PropsWithChildren<IModalProps>) {

    useEffect(() => {

        const handleModalEscapeKey = (event: KeyboardEvent) => {
            event.preventDefault();
            
            if (event.key === 'Escape' && onClose) {
                onClose();
            }
        }

        document.body.addEventListener('keydown', handleModalEscapeKey)

        return () => {
            document.body.removeEventListener('keydown', handleModalEscapeKey);
        }

    }, [onClose])

    const modalRoot: Element | null = document.querySelector("#react-modals");

    const modalContent = 
    (
        <>
            <div className={styles.modal}>
                <div className={styles.modal_header}>
                <div className={styles.modal_title}>
                    <p className="text text_type_main-large">{header}</p>
                </div>
                <div className={styles.modal_close_btn}>
                    <CloseIcon type="primary" onClick={onClose} />
                </div>
                </div>
                {children}
            </div>
            <ModalOverlay onClose={() => onClose ? onClose() : () => { }}></ModalOverlay>
        </>
    );

    return modalRoot ? createPortal(
        modalContent, modalRoot
    ) : null;
    
}

export default Modal;