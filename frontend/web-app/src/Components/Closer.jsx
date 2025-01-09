
import React from 'react'
import { FaInstagram, FaEnvelope } from 'react-icons/fa';

function Closer() {

    return (
        <div style={{ position: 'fixed', bottom: 0, width: '100%', height: '20%' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <FaInstagram size={50} onClick={() => window.open('https://www.instagram.com/sela_inbar')}> My instagram</FaInstagram>.
                <FaEnvelope size={50} onClick={() => window.open('mailto:selainbar14@gmail.com')}>Send me an email</FaEnvelope>
            </div>
        </div>
    );
}

export default Closer;
