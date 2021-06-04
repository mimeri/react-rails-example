import React from "react";
import FormLedger from "./FormLedger";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import SelectorGroup from "./SelectorGroup";

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
        const isAcceptTerm = values.yesNoQuestions[0].value;
        const isDevReset = values.yesNoQuestions[1].value;
        return (
            <div className="row">
                <div className="col-md-8">
                    <h4 className="mb-3">Confirmation</h4>
                    <form
                        className="needs-validation"
                        noValidate=""
                        onSubmit={nextStep}
                    >
                        <div className="row">
                            <div className="col-md-8 mb-3">
                                <p>{values.termsOfService}</p>
                            </div>
                        </div>

                        <hr className="mb-4" />

                        {values.yesNoQuestions.map((q) => {
                            return (
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        {q.label}
                                    </div>
                                    <div className="col-md-6 mb-3 text-center">
                                        <BootstrapSwitchButton
                                            onstyle="secondary"
                                            checked={q.value}
                                            onlabel="Yes"
                                            offlabel="No"
                                            onChange={(checked) =>
                                                handleChange(q.key, checked)
                                            }
                                            key={q.key}
                                        />
                                    </div>
                                </div>
                            );
                        })}
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
                                    className="btn btn-success btn-lg btn-block"
                                    type="button"
                                    onClick={nextStep}
                                    disabled={!(isDevReset && isAcceptTerm)}
                                >
                                    Confirm
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
