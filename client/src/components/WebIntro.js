import React from "react";
import logo from "./img/logo.png";

function WebIntro(props) {
    return (
        <div
            className="card d-flex m-3 mt-5 pb-5 border-0 shadow"
            style={{ width: "90%", backgroundColor: "#FEF2F0" }}
        >
            <div className="bg-white mb-3 py-5 text-center">
                <img src={logo} alt="logo" style={{ width: "200px" }} />
            </div>
            <h1 className="text-center mb-3" style={{ color: "#326E62" }}>
                Planted
            </h1>
            <div
                className="p-5"
                style={{
                    backgroundColor: "#fff",
                }}
            >
                <p style={{ color: "#242424" }}>
                    Most people buy plants for their houses for decorations or other
                    reasons, but almost 80% fail to keep them alive and healthy for
                    longer. The{" "}
                    <span className="h5" style={{ color: "#326E62", fontWeight: "bold" }}>
                        Planted
                    </span>{" "}
                    application helps these junior gardeners by providing plant task
                    tracker feature to track their plant care tasks at a specific time. It
                    also offers a chat feature with agricultural comunity to ask about
                    their plants' issues.
                </p>
            </div>
            <div className="m-5">
                <h5 style={{ color: "#326E62" }}>Developed by</h5>
                <ul>
                    <li>Arwa AlZanbaki</li>
                    <li>Abir Zaher</li>
                    <li>Randa AlDossary</li>
                    <li>Raghad AlJabr</li>
                    <li>Norah AlGhomayjan</li>
                </ul>
            </div>
        </div>
    );

}

export default WebIntro;