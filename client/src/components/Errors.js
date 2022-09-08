import React from "react";
import { Link } from "react-router-dom";

function Errors(props) {
    return (
        <div
            className="card border-0 justify-content-center align-items-center"
            style={{ height: "100vh" , backgroundColor: "transparent" }}
        >
            <div
                className="card p-5 shadow"
                style={{ backgroundColor: "#FEF2F0", color: "#242424" }}
            >
                <div className="text-center">
                    <h2 className="mb-2">Sorry You Should Login Or Sign-Up.</h2>
                    <div>
                        <Link
                            to="/"
                            className="btn mx-3"
                            style={{ backgroundColor: "#81b8a8", color: "#fff" }}
                        >
                            Sign up
                        </Link>
                        <Link
                            to="/login"
                            className="btn mx-3"
                            style={{ backgroundColor: "#326E62", color: "#fff" }}
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Errors;