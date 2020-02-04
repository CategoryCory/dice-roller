import React, { useState } from "react";
import WODDiceTable from "./WODDiceTable";
import WODDiceResults from "./WODDiceResults";

function WODRoller() {
    const initialData = {
        numDice: 1,
        successValue: 8,
        rerollAbove: 10,
        isNumDiceError: false,
        isSuccessValueError: false,
        isRerollAboveError: false,
        resultsRolls: [],
        numSuccesses: 0
    };

    const [diceInfo, setDiceInfo] = useState(initialData);

    const handleSubmit = () => {
        const errors = checkInputs();

        // Set error values for each input
        for (const [key, value] of Object.entries(errors)) {
            if (value !== diceInfo[key]) {
                setInputError(key, value);
            }
        }

        // If any errors exist, do not continue
        let errorsFound = false;
        Object.values(errors).forEach(value => {
            if (value === true) {
                errorsFound = true;
            }
        });
        if (errorsFound) return;

        const results = getResults();

        // Update state with results info
        setDiceInfo(prevState => {
            return {
                ...prevState,
                resultsRolls: results.rolls,
                numSuccesses: results.numSuccesses
            };
        });
    };

    const getResults = () => {
        const rollAgainValue = diceInfo.rerollAbove;
        const numRolls = diceInfo.numDice;
        const dc = diceInfo.successValue;
        const results = {};
        const rolls = [];
        let numSuccesses = 0;

        // Iterate through for each die roll
        for (let i = 0; i < numRolls; i++) {
            let currentRoll = singleRoll(1, 10);

            if (currentRoll < rollAgainValue) {
                if (currentRoll >= dc) numSuccesses++;
                rolls.push(currentRoll);
                continue;
            } else {
                const currentRollSet = [];

                if (currentRoll >= dc) numSuccesses++;

                // Get single roll
                currentRollSet.push(currentRoll);

                // Roll again while currentRoll >= rollAgainValue
                while (currentRoll >= rollAgainValue) {
                    currentRoll = singleRoll(1, 10);
                    if (currentRoll >= dc) numSuccesses++;
                    currentRollSet.push(currentRoll);
                }

                // Add values to rolls array
                rolls.push(currentRollSet);
            }
        }

        results.rolls = rolls;
        results.numSuccesses = numSuccesses;

        return results;
    };

    // Event handlers
    const handleInputChange = (e, key) => {
        const newValue = e.target.value;
        setDiceInfo(prevState => {
            return { ...prevState, [key]: newValue };
        });
    };

    const setInputError = (key, checkedValue) => {
        if (checkedValue !== diceInfo["key"]) {
            setDiceInfo(prevState => {
                return { ...prevState, [key]: checkedValue };
            });
        }
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
            2,
            10
        );

        return errors;
    };

    // Check if number is a valid integer within a specified range
    const validateNumber = (value, min, max = null) => {
        const convertedValue = Number(value);

        if (!Number.isInteger(convertedValue)) {
            return false;
        }

        if (max) {
            return convertedValue >= min && convertedValue <= max;
        } else {
            return convertedValue >= min;
        }
    };

    // Return a single integer between min and max
    const singleRoll = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // Reset form to original values and clear any errors
    const handleReset = () => {
        setDiceInfo(initialData);
    };

    return (
        <div className="container d-flex flex-column align-items-center mt-5">
            <h1 className="text-center mb-4">WoD Dice Roller</h1>
            <WODDiceTable
                numDice={diceInfo.numDice}
                successValue={diceInfo.successValue}
                rerollAbove={diceInfo.rerollAbove}
                isNumDiceError={diceInfo.isNumDiceError}
                isSuccessValueError={diceInfo.isSuccessValueError}
                isRerollAboveError={diceInfo.isRerollAboveError}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                onReset={handleReset}
            />
            <WODDiceResults
                rolls={diceInfo.resultsRolls}
                numSuccesses={diceInfo.numSuccesses}
                dc={diceInfo.successValue}
            />
        </div>
    );
}

export default WODRoller;
