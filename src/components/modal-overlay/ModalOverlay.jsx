import React from 'react'
import styles from './ModalOverlay.module.css';

import { ModalOverlayType } from '../../utils/propTypes'

function ModalOverlay({onClose}) {

    const modalRef = React.useRef(null);

    React.useEffect(() => {

        const handleModalOverlayClick = (e) => {
            e.preventDefault();
            
            if (e.target === modalRef.current) {
                onClose();
            }
        };

        document.body.addEventListener('click', handleModalOverlayClick);

        return () => {
            document.body.removeEventListener('click', handleModalOverlayClick);
        }

    }, [onClose])

    return (
        <div className={styles.modal_overlay_main_content}  ref={modalRef}></div>
    )
}

ModalOverlay.propTypes = ModalOverlayType;

export default ModalOverlay;