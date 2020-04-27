import React, { Component } from "react";
import PropTypes from "prop-types";

class ResultTable extends Component {
    tableData = () => {
        const resultSet = [...this.props.resultSet];
        resultSet.sort((a, b) => {
            if (a.dieType === b.dieType) {
                return b.currentRoll - a.currentRoll;
            }
            return a.dieType < b.dieType ? 1 : -1;
        });
        let tableRows = resultSet.map((res, index) => (
            <tr key={index}>
                <td>{res.dieType}</td>
                <td>{res.currentRoll}</td>
            </tr>
        ));
        return <tbody>{tableRows}</tbody>;
    };

    render() {
        if (this.props.resultSet.length === 0) {
            return <h4 className="border rounded p-3">No results to show.</h4>;
        } else {
            return (
                <table className="table table-sm">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Die Type</th>
                            <th scope="col">Result</th>
                        </tr>
                    </thead>
                    {this.tableData()}
                </table>
            );
        }
    }
}

ResultTable.propTypes = {
    resultSet: PropTypes.array.isRequired,
};

export default ResultTable;
