import React from "react";
import TextInputGroup from "./TextInputGroup";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

export class SendDeviceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Form 2
            firstName: {
                key: "firstName",
                value: "",
                label: "First name",
            },
            lastName: {
                key: "lastName",
                value: "",
                label: "Last name",
            },
            email: {
                key: "email",
                value: "",
                label: "E-mail",
            },
            phoneNumber: {
                key: "phoneNumber",
                value: "",
                label: "Phone Number",
            },
            adress: {
                key: "adress",
                value: "",
                label: "Address",
            },
            city: {
                key: "city",
                value: "",
                label: "City",
            },
            region: {
                key: "region",
                value: "",
                label: "Region",
            },
            region: {
                key: "region",
                value: "",
                label: "Region",
            },
            deviceCode: {
                key: "deviceCode",
                value: "",
                label: "Device Code",
            },
            color: {
                key: "color",
                value: "",
                label: "Color on Device",
            },
            otherInfo: {
                key: "otherInfo",
                value: "",
                label: "Other Information",
            },
            hasAcceptedTerms: {
                key: "hasAcceptedTerms",
                value: false,
                label: "I accept the terms of service.",
            },
            ledger: [
                {
                    title: "Provide Personal information",
                    description: "Provide device information",
                    step: 1,
                },
                {
                    title: "Send in your device",
                    description: "Use the postage label we sent to your email",
                    step: 2,
                },
            ],
        };
    }

    continue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    };

    handleChange = (key, selectedOption) => {
        if (typeof selectedOption === "boolean") {
            console.log("selectedOption.value :", selectedOption.value);
            this.setState({
                [key]: { ...this.state[key], value: selectedOption },
            });
        } else if (Array.isArray(selectedOption)) {
            const newValues = selectedOption.map((el) => el.value);
            this.setState({ [key]: { ...this.state[key], value: newValues } });
        } else if (selectedOption) {
            this.setState({
                [key]: { ...this.state[key], value: selectedOption.value },
            });
        }
    };

    render() {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            adress,
            city,
            region,
            deviceCode,
            otherInfo,
            color,
            hasAcceptedTerms,
        } = this.state;

        const values = {
            fieldRows: [
                { left: firstName, right: lastName },
                { left: email, right: phoneNumber },
                { left: adress, right: city },
                { left: region, right: null },
                { left: deviceCode, right: otherInfo },
                { left: color, right: null },
            ],
            yesNoQuestions: [hasAcceptedTerms],
        };

        return (
            <div className="row">
                <div className="col-md-8">
                    <h4 className="mb-3">Personal Details</h4>
                    <form
                        className="needs-validation"
                        noValidate=""
                        onSubmit={() => {
                            console.log("SUBMITTING ");
                        }}
                    >
                        <TextInputGroup
                            fieldRows={values.fieldRows}
                            handleChange={this.handleChange}
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

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <button
                                    className="btn btn-secondary btn-lg btn-block"
                                    type="button"
                                    onClick={() => {
                                        console.log("BACK HAS BEEN CLICKED");
                                    }}
                                >
                                    Back
                                </button>
                            </div>
                            <div className="col-md-6 mb-3">
                                <button
                                    disabled={!hasAcceptedTerms.value}
                                    className="btn btn-success btn-lg btn-block"
                                    type="button"
                                    onClick={() => {
                                        console.log("NEXT HAS BEEN CLICKED");
                                    }}
                                >
                                    Send Package Label
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                {console.log(this.props.repair.name)}
                <div className="col-md-4">
                    <h4 className="mb-3">Your Choice</h4>
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">
                                {this.props.repair.name}
                            </h4>
                            <h6 className="card-subtitle mb-2 text-muted">
                                Screen Replacement{" "}
                            </h6>
                            <p className="card-text">Price: 1190 inkl. moms.</p>
                            <p>Expected Time: 2-4 days</p>
                            <h4>Information</h4>
                            <p>
                                {" "}
                                When you have accepted the terms of serivce and
                                placed the order a mail with the post label will
                                be send to you.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SendDeviceForm;
