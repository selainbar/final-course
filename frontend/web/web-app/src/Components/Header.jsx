import React from 'react';
import { useNavigate } from 'react-router-dom';
const Header = ({isUserLoggedIn}) => {

    const navigate = useNavigate();

    const handleClick = () => {

        console.log('clicked');
        navigate('/SignUp');
    
    }
    return (
        <header style={{ position: 'fixed', top: 0, width: '100%', height: '10vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
                <button onClick={handleClick}>Sign Up</button>
            </div>
            <div>
                <h1>Welcome to Game on!</h1>
            </div>
            <div></div>
        </header>
    );
};

export default Header;