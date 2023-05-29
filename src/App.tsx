import { useState } from "react";
import Modal from "./components/Modal";
import styles from './app.module.less';

function App() {
  const [open, setOpen] = useState(false);
  
  const openModal = () => setOpen(pre => !pre) 
  return (
    <>
      <div className={styles.container}>
        <button className={styles.button} onClick={()=> openModal()}>Modal</button>
        <Modal open={open} setOpen={setOpen} closable={true}>
          <p>1111</p>
          <p>1111</p>
          <p>1111</p>
        </Modal>
      </div>
    </>
  );
}

export default App;
