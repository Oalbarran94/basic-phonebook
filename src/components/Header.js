import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
            <div className="container">
                <h1>
                    <Link to={'/'} className="text-light">CRUD - Simple PhoneBook</Link>
                </h1>
            </div>
        </nav>
     );
}
 
export default Header;