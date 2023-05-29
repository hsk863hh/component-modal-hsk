import {
  useRef,
  useEffect,
  useCallback,
  CSSProperties,
  ReactNode,
} from "react";
import styled from "styled-components";
import styles from "./index.module.less";
import { MdClose } from "react-icons/md";

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

interface ModalProps {
  open: boolean;
  setOpen: (v: boolean | ((pre: boolean) => boolean)) => void;
  title?: string;
  afterClose?: () => void;
  bodyStyle?: CSSProperties; // todo
  cancelButtonProps?: any; // todo
  cancelText?: string;
  okText?: string;
  className?: string;
  closable?: boolean;
  closeIcon?: ReactNode; // todo
  confirmLoading?: boolean; // todo
  destroyOnClose?: boolean; // todo
  focusTriggerAfterClose?: boolean; // todo
  footer?: ReactNode;
  forceRender?: boolean; // todo
  getContainer?: HTMLElement | (() => HTMLElement) | false; // todo
  keyboard?: boolean;
  mask?: boolean;
  maskCloseable?: boolean;
  maskStyle?: CSSProperties;
  modalRender?: (node: ReactNode) => ReactNode; // todo
  okButtonProps?: any; // todo
  style?: CSSProperties; // todo
  width?: string | number;
  wrapClassName?: string;
  zIndex?: number;
  onCancel?: () => void;
  onOk?: () => void;
  afterOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = (props) => {
  const {
    children,
    open,
    setOpen,
    title,
    afterClose,
    cancelText = "取消",
    okText = "确定",
    closable,
    footer,
    keyboard,
    mask,
    maskCloseable,
    maskStyle,
    width,
    wrapClassName,
    zIndex,
    onCancel,
    onOk
  } = props;

  const onClose = () => {
    setOpen((pre) => !pre);
    onCancel?.();
    afterClose?.();
  };

  const handleOk = () => {
    onClose?.()
    onOk?.()
  }

  const maskClick = () => {
    if (maskCloseable) onClose();
  };

  useEffect(() => {
    const handlerKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    if (keyboard) {
      window.addEventListener("keydown", handlerKeyDown);
    }
    return window.removeEventListener("keydown", handlerKeyDown);
    
  }, [keyboard]);

  return (
    <>
      {open ? (
        <>
          {mask ? (
            <div
              className={`${styles.background} ${maskStyle ? maskStyle : ""}`}
              onClick={maskClick}
            ></div>
          ) : null}
          <div
            className={`${styles.modalWrapper} ${
              wrapClassName ? wrapClassName : ""
            }`}
            style={{
              width: `${width}px`,
              zIndex
            }}
          >
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>{title}</div>
              <div className={styles.modalBody}>{children}</div>
              {footer ? (
                footer
              ) : footer === null ? null : (
                <div className={styles.modalFooter}>
                  <button onClick={onClose}>{cancelText}</button>
                  <button onClick={handleOk}>{okText}</button>
                </div>
              )}
            </div>
            {closable ? (
              <CloseModalButton aria-label="Close modal" onClick={onClose} />
            ) : null}
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;

Modal.defaultProps = {
  keyboard: true,
  mask: true,
  maskCloseable: true,
  okText: "确认",
  cancelText: "取消",
  zIndex: 1000
};
