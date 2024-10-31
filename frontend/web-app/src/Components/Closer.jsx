
import React from 'react'
import { FaInstagram, FaEnvelope } from 'react-icons/fa';

function Closer() {

    return (
        <div style={{ position: 'fixed', bottom: 0, width: '100%', height: '10%' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <FaInstagram onClick={() => window.open('https://www.instagram.com/sela_inbar')}> My instagram</FaInstagram>.
                <FaEnvelope onClick={() => window.open('mailto:selainbar14@gmail.com')}>Send me and email</FaEnvelope>
            </div>
        </div>
    );
}

export default Closer;
