import React from "react";

function WODDiceResults(props) {
    // Only display table if there are results
    if (props.rolls.length > 0) {
        let titleText;
        let counter = 1;

        // Create proper header text
        if (props.numSuccesses > 1) {
            titleText = `${props.numSuccesses} Successes`;
        } else if (props.numSuccesses === 1) {
            titleText = "1 Success";
        } else {
            titleText = "No Successes";
        }

        // Loop through for each roll in results
        const tableRows = props.rolls.map(roll => {
            let rowData;

            // Check to see if current roll has a single result or is an array of results
            if (typeof roll === "object") {
                rowData = [];
                let rollClass;
                for (let i = 0; i < roll.length; i++) {
                    if (roll[i] >= props.dc) {
                        rollClass = "font-weight-bold text-success";
                    } else {
                        rollClass = "text-danger";
                    }

                    if (i > 0) {
                        rowData.push(
                            <span className={rollClass}>
                                {" "}
                                &raquo; {roll[i]}
                            </span>
                        );
                    } else {
                        rowData.push(
                            <span className={rollClass}>{roll[i]}</span>
                        );
                    }
                }
            } else {
                if (roll >= props.dc) {
                    rowData = (
                        <span className="font-weight-bold text-success">
                            {roll}
                        </span>
                    );
                } else {
                    rowData = <span className="text-danger">{roll}</span>;
                }
            }

            const row = (
                <tr>
                    <td>{counter}</td>
                    <td>{rowData}</td>
                </tr>
            );

            counter++;
            return row;
        });

        return (
            <div className="card mt-5 mb-4 w-50">
                <div className="card-body">
                    <h2 className="card-title text-center">{titleText}</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Die #</th>
                                <th scope="col">Roll Results</th>
                            </tr>
                        </thead>
                        <tbody>{tableRows}</tbody>
                    </table>
                </div>
            </div>
        );
    } else {
        return (
            <div className="mt-5">
                No results yet! Click Roll above to get started!
            </div>
        );
    }
}

export default WODDiceResults;
