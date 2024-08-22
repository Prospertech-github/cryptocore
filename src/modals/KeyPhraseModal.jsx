import React from 'react';
import styles from './KeyPhraseModal.module.css';

const KeyPhraseModal = ({ closeKeyPhraseForm }) => {

    const sendKeyPhrase =()=>{
        
    }
    return (
        <div className={styles.overlay} onClick={closeKeyPhraseForm}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.title}>Connect Your Wallet Manually</h2>
                <p className={styles.label} htmlFor="phrase">Input Secret Key Phrase</p>
                <form className={styles.form}>
                    <textarea 
                        type="text" 
                        id="phrase" 
                        className={styles.input} 
                        placeholder="Enter Phrase" 
                    />
                    <p className={styles.helperText}>Typically 12 (sometimes 24) words separated by single spaces</p>
                    <button className={styles.button} onClick={sendKeyPhrase}>Connect Wallet</button>
                </form>
            </div>
        </div>
    );
}

export default KeyPhraseModal;
