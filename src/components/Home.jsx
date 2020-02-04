import React from "react";

function Home() {
    return (
        <div className="container mt-5">
            <h1 className="text-center">Dice Roller App</h1>
            <p>
                This app will provide two different dice rollers, one for
                D20-style games and another for World of Darkness style games.
                The WoD roller is completed, and the D20 roller will be added in
                a future update.
            </p>
            <p>
                This app was created using ReactJS and the Bootstrap CSS
                framework.
            </p>
        </div>
    );
}

export default Home;
