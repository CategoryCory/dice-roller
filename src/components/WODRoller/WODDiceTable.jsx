import React, { useState } from "react";

function WODDiceTable() {
    const [diceInfo, setDiceInfo] = useState({
        numDice: 1,
        successValue: 1,
        rerollAbove: 10,
        isNumDiceError: false,
        isSuccessValueError: false,
        isRerollAboveError: false
    });

    const handleInputChange = (e, key) => {
        const newValue = e.target.value;
        setDiceInfo(prevState => {
            return { ...prevState, [key]: newValue };
        });
    };

    const handleSubmit = () => {
        const errors = checkInputs();
        for (const [key, value] of Object.entries(errors)) {
            if (value !== diceInfo[key]) {
                setInputError(key, value);
            }
        }
    };

    const resetForm = () => {
        const originalData = {
            numDice: 1,
            successValue: 1,
            rerollAbove: 10,
            isNumDiceError: false,
            isSuccessValueError: false,
            isRerollAboveError: false
        };
        setDiceInfo(originalData);
    };

    const checkInputs = () => {
        const errors = {};

        // The number of dice must be at least one
        errors.isNumDiceError = !validateNumber(diceInfo.numDice, 1);

        // The success value must be a number between one and ten
        errors.isSuccessValueError = !validateNumber(
            diceInfo.successValue,
            1,
            10
        );

        // The reroll number must be a number between one and ten
        errors.isRerollAboveError = !validateNumber(
            diceInfo.rerollAbove,
            1,
            10
        );

        return errors;
    };

    const setInputError = (key, checkedValue) => {
        if (checkedValue !== diceInfo["key"]) {
            setDiceInfo(prevState => {
                return { ...prevState, [key]: checkedValue };
            });
        }
    };

    const validateNumber = (value, min, max = null) => {
        const convertedValue = Number(value);

        if (!Number.isInteger(convertedValue)) {
            console.log("not numeric");
            return false;
        }

        if (max) {
            return convertedValue >= min && convertedValue <= max;
        } else {
            return convertedValue >= min;
        }
    };

    return (
        <form className="w-50">
            <div
                id="numDiceAlert"
                className={`alert alert-danger ${
                    diceInfo.isNumDiceError ? "" : "d-none"
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
                    id="numDice"
                    className="form-control"
                    min="1"
                    value={diceInfo.numDice}
                    onChange={e => handleInputChange(e, "numDice")}
                />
            </div>
            <div
                id="successValueAlert"
                className={`alert alert-danger ${
                    diceInfo.isSuccessValueError ? "" : "d-none"
                }`}
                role="alert"
            >
                The DC must be a number between 1 and 10.
            </div>
            <div className="form-group mb-3">
                <label htmlFor="successValue">What is the DC?</label>
                <input
                    type="number"
                    id="successValue"
                    className="form-control"
                    min="1"
                    max="10"
                    value={diceInfo.successValue}
                    onChange={e => handleInputChange(e, "successValue")}
                />
            </div>
            <div
                id="rerollAboveAlert"
                className={`alert alert-danger ${
                    diceInfo.isRerollAboveError ? "" : "d-none"
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
                    id="rerollAbove"
                    className="form-control"
                    min="1"
                    max="10"
                    value={diceInfo.rerollAbove}
                    onChange={e => handleInputChange(e, "rerollAbove")}
                />
            </div>

            <button
                id="rollDice"
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                onClick={e => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                Roll!
            </button>
            <button
                id="resetForm"
                type="reset"
                className="btn btn-secondary btn-lg btn-block"
                onClick={e => {
                    resetForm();
                }}
            >
                Reset
            </button>
        </form>
    );
}

export default WODDiceTable;
