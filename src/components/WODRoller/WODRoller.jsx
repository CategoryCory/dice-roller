import React from "react";
import WODDiceTable from "./WODDiceTable";

function WODRoller() {
    return (
        <div className="container d-flex flex-column align-items-center mt-5">
            <h1 className="text-center mb-4">WoD Dice Roller</h1>
            <WODDiceTable />
        </div>
    );
}

export default WODRoller;
