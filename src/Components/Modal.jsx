
import { forwardRef , useImperativeHandle, useRef } from 'react';
import {createPortal} from 'react-dom' ;
import Button from './Button.jsx';
const Modal = forwardRef( function Modal({children , buttonCaption} , ref){
    const myRef = useRef() ;
    useImperativeHandle(ref , ()=>{
        return {
            open(){
                myRef.current.showModal() ;
            }
        }
    })
    return createPortal(
        <dialog ref={myRef} className='backdrop:bg-stone-900/90 p-4 rounded-md shadow-md ' >
            {children}
            <form action="" method='dialog' className='mt-4 text-right '>
                <Button>{buttonCaption}</Button>
            </form>
        </dialog>   
     , document.getElementById('modal-root'));
})

export default Modal ; 
