import React from 'react'
import styles from './ModalOverlay.module.css';

interface IModalOverlayProps {
    onClose: (() => void) | undefined;
}

function ModalOverlay({ onClose }: IModalOverlayProps) {

    const modalRef = React.useRef(null);

    React.useEffect(() => {

        const handleModalOverlayClick = (event: MouseEvent) => {
            event.preventDefault();
            
            if (event.target === modalRef.current && onClose) {
                onClose();
            }
        };

        document.body.addEventListener('click', handleModalOverlayClick);

        return () => {
            document.body.removeEventListener('click', handleModalOverlayClick);
        }

    }, [onClose])

    return (
        <div className={styles.modal_overlay_main_content} ref={modalRef}></div>
    )
}

export default ModalOverlay;