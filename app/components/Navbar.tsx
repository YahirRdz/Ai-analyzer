import React from 'react';
import {Link} from "react-router";

const Navbar = () => {
    return (
        <div className="navbar">
            <Link href="/">
                <p className="text-2xl font-bold text-gradient"></p>
            </Link>
            <Link to="/upload" className="primary-button w-fit">
                Upload Resume Ratings
            </Link>
        </div>
    );
};

export default Navbar;