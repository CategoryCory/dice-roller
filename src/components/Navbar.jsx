import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Dice Roller
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarsExample07"
                    aria-controls="navbarsExample07"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample07">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link" to="/wod-roller">
                            WoD Dice Roller
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
