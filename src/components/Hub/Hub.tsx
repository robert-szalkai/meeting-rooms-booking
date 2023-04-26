import React from "react";

const Hub = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <a href="http://localhost:3000/selection">
                <button
                    style={{
                        fontSize: "3rem",
                        width: "15rem",
                        height: "10rem",
                        marginRight: "2rem",
                        backgroundColor: "green",
                    }}
                >
                    Room Selection
                </button>
            </a>
            <a href="http://localhost:3000/admin">
                <button
                    style={{
                        fontSize: "3rem",
                        width: "15rem",
                        height: "10rem",
                        margin: "0 2rem",
                        backgroundColor: "yellow",
                    }}
                >
                    Admin
                </button>
            </a>
            <a href="http://localhost:3000/charts">
                <button
                    style={{
                        fontSize: "3rem",
                        width: "15rem",
                        height: "10rem",
                        marginLeft: "2rem",
                        backgroundColor: "red",
                    }}
                >
                Charts
                </button>
            </a>
        </div>
    );
};

export default Hub;
