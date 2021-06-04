import React from "react";
import PropTypes from "prop-types";

const TextInputGroup = ({ fieldRows, handleChange }) => {
    return (
        <div>
            {fieldRows.map((fieldRow) => {
                return (
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor={fieldRow.left.key}>
                                {fieldRow.left.label}
                            </label>
                            <input
                                key={fieldRow.left.key}
                                type="text"
                                className="form-control"
                                key={fieldRow.left.key}
                                onChange={(e) =>
                                    handleChange(fieldRow.left.key, e)
                                }
                            />
                        </div>
                        {fieldRow.right ? (
                            <div className="col-md-6 mb-3">
                                <label htmlFor={fieldRow.right.key}>
                                    {fieldRow.right.label}
                                </label>
                                <input
                                    key={fieldRow.right.key}
                                    type="text"
                                    className="form-control"
                                    key={fieldRow.right.key}
                                    onChange={(e) =>
                                        handleChange(fieldRow.right.key, e)
                                    }
                                />
                            </div>
                        ) : (
                            <br className="mb-4" />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

TextInputGroup.propTypes = {
    fieldRows: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default TextInputGroup;
