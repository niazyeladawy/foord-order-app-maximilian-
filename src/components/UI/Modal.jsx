import React from 'react'
import styles from './Modal.module.css'
import ReactDOM from 'react-dom';
 
const Backdrop = ({onHideCart}) => {
    return <div onClick={onHideCart} className={styles.backdrop}></div>
}

const ModalOverlay = (props) => {
    return (
        <div className={styles.modal}>
            <div className={styles.content}>{props.children}</div>
        </div>)
}



const Modal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onHideCart={props.onHideCart}/> ,document.getElementById('overlays'))}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,document.getElementById('overlays'))}
        </>
    )
}

export default Modal