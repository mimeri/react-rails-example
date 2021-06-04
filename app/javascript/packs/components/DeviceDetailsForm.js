import React from "react";
import FormLedger from "./FormLedger";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import SelectorGroup from "./SelectorGroup";

export class DeviceDetailsForm extends React.Component {
    constructor(props) {
        super(props);
    }

    continue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    };

    render() {
        const { values } = this.props;
        const { handleChange, nextStep } = this.props;
        const { ledger, styleStep } = this.props;
        return (
            <div className="row">
                <div className="col-md-8">
                    <h4 className="mb-3">Estimate Price</h4>
                    <form
                        className="needs-validation"
                        noValidate=""
                        onSubmit={nextStep}
                    >
                        {console.log("he", values)}
                        <SelectorGroup
                            fieldRows={values.fieldRows}
                            handleChange={handleChange}
                        />

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

                        <hr className="mb-4" />
                        <h5 className="mb-3">
                            Your estimated price: {values.estimatedPrice} SEK{" "}
                        </h5>
                        <div className="row">
                            <button
                                className="btn btn-primary btn-lg btn-block"
                                type="button"
                                onClick={nextStep}
                            >
                                Next
                            </button>
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

export default DeviceDetailsForm;
