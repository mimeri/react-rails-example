import React from "react";
import FormLedger from "./FormLedger";
import TextInputGroup from "./TextInputGroup";

export class PersonalDetailsForm extends React.Component {
    constructor(props) {
        super(props);
    }

    continue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    };

    render() {
        const { values } = this.props;
        const { handleChange, prevStep, nextStep } = this.props;
        const { ledger, styleStep } = this.props;
        return (
            <div className="row">
                <div className="col-md-8">
                    <h4 className="mb-3">Personal Details</h4>
                    <form
                        className="needs-validation"
                        noValidate=""
                        onSubmit={nextStep}
                    >
                        <TextInputGroup
                            fieldRows={values.fieldRows}
                            handleChange={handleChange}
                        />

                        <hr className="mb-4" />

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <button
                                    className="btn btn-secondary btn-lg btn-block"
                                    type="button"
                                    onClick={prevStep}
                                >
                                    Back
                                </button>
                            </div>
                            <div className="col-md-6 mb-3">
                                <button
                                    className="btn btn-primary btn-lg btn-block"
                                    type="button"
                                    onClick={nextStep}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <FormLedger
                    formStep={values.formStep}
                    ledger={ledger}
                    styleStep={styleStep}
                />
            </div>
        );
    }
}

export default PersonalDetailsForm;
