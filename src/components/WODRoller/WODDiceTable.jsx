import React from "react";

function WODDiceTable(props) {
    return (
        <form>
            <div
                id="numDiceAlert"
                className={`alert alert-danger ${
                    props.isNumDiceError ? "" : "d-none"
                }`}
                role="alert"
            >
                The minimum number of dice is 1.
            </div>
            <div className="form-group mb-3">
                <label htmlFor="numDice">
                    How many dice would you like to roll (minimum 1)?
                </label>
                <input
                    type="number"
                    className="form-control"
                    min="1"
                    value={props.numDice}
                    onChange={(e) => props.onInputChange(e, "numDice")}
                />
            </div>
            <div
                id="successValueAlert"
                className={`alert alert-danger ${
                    props.isSuccessValueError ? "" : "d-none"
                }`}
                role="alert"
            >
                The DC must be a number between 1 and 10.
            </div>
            <div className="form-group mb-3">
                <label htmlFor="successValue">What is the DC?</label>
                <input
                    type="number"
                    className="form-control"
                    min="1"
                    max="10"
                    value={props.successValue}
                    onChange={(e) => props.onInputChange(e, "successValue")}
                />
            </div>
            <div
                id="rerollAboveAlert"
                className={`alert alert-danger ${
                    props.isRerollAboveError ? "" : "d-none"
                }`}
                role="alert"
            >
                The reroll value must be a number between 1 and 10.
            </div>
            <div className="form-group mb-3">
                <label htmlFor="rerollAbove">
                    Automatically reroll any results above...
                </label>
                <input
                    type="number"
                    className="form-control"
                    min="2"
                    max="10"
                    value={props.rerollAbove}
                    onChange={(e) => props.onInputChange(e, "rerollAbove")}
                />
            </div>

            <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                onClick={(e) => {
                    e.preventDefault();
                    props.onSubmit();
                }}
            >
                Roll!
            </button>
            <button
                type="reset"
                className="btn btn-secondary btn-lg btn-block"
                onClick={props.onReset}
            >
                Reset
            </button>
        </form>
    );
}

export default WODDiceTable;
