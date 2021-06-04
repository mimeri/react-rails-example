import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const SelectorGroup = ({ fieldRows, handleChange }) => {
    return (
        <div>
            {fieldRows.map((fieldRow) => {
                return (
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor={fieldRow.left.key}>
                                {fieldRow.left.label}
                            </label>
                            <Select
                                isMulti={fieldRow.left.isMulti}
                                key={fieldRow.left.key}
                                onChange={(e) =>
                                    handleChange(fieldRow.left.key, e)
                                }
                                options={fieldRow.left.options}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor={fieldRow.right.key}>
                                {fieldRow.right.label}
                            </label>
                            <Select
                                isMulti={fieldRow.right.isMulti}
                                key={fieldRow.right.key}
                                onChange={(e) =>
                                    handleChange(fieldRow.right.key, e)
                                }
                                options={fieldRow.right.options}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

SelectorGroup.propTypes = {
    fieldRows: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default SelectorGroup;
