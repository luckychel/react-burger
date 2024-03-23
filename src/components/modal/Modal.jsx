import React from 'react'
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { ModalType } from '../../utils/propTypes'

import ModalOverlay from '../modal-overlay/ModalOverlay'

function Modal ({onClose, header, children})  {

    React.useEffect(() => {

        const handleModalEscapeKey = (event) => {
            event.preventDefault();
            
            if (event.key === 'Escape') {
                onClose();
            }
        }

        document.body.addEventListener('keydown', handleModalEscapeKey)

        return () => {
            document.body.removeEventListener('keydown', handleModalEscapeKey);
        }

    }, [onClose])

    return createPortal(
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
              <ModalOverlay onClose={onClose}></ModalOverlay>
            </>
        ),
        document.getElementById("react-modals")
    );
}

Modal.propTypes = ModalType;

export default Modal;