import React from "react";
import DeviceDetailsForm from "./DeviceDetailsForm";
import PersonalDetailsForm from "./PersonalDetailsForm";
import ConfirmationForm from "./ConfirmationForm";

class SellDeviceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            // Form 1
            model: {
                key: "model",
                value: null,
                label: "Model",
                options: [
                    { value: "iphone 5", label: "iPhone 5" },
                    { value: "iphone 5s", label: "iPhone 5s" },
                    { value: "iphone 6", label: "iPhone 6" },
                    { value: "iphone 6s", label: "iPhone 6s" },
                    { value: "iphone 6splus", label: "iPhone 6+s" },
                    { value: "iPhone 7", label: "iPhone 7" },
                    { value: "iphone 7plus", label: "iPhone 7+" },
                    { value: "iPhone 8", label: "iPhone 8" },
                    { value: "iphone8plus", label: "iPhone 8+" },
                    { value: "iphonex", label: "iPhone X" },
                    { value: "iphonexr", label: "iPhone XR" },
                    { value: "galaxys6", label: "Galaxy S6" },
                    { value: "galaxys7", label: "Galaxy S7" },
                    { value: "galaxys7edge", label: "Galaxy S7 edge" },
                    { value: "galaxys8", label: "Galaxy S8" },
                    { value: "galaxys9", label: "Galaxy S9" },
                    { value: "galaxys10", label: "Galaxy S10" },
                    { value: "galaxys20", label: "Galaxy S20" },
                ],
            },
            color: {
                key: "color",
                value: null,
                label: "Color",
                options: [
                    { value: "black", label: "Black" },
                    { value: "white", label: "White" },
                    { value: "red", label: "Other" },
                ],
            },
            storage: {
                key: "storage",
                value: null,
                label: "Internal Storage",
                options: [
                    { value: "8", label: "8 GB" },
                    { value: "16", label: "16 GB" },
                    { value: "32", label: "32 GB" },
                    { value: "64", label: "64 GB" },
                    { value: "128", label: "128 GB" },
                ],
            },
            previousRepairs: {
                isMulti: true,
                key: "previousRepairs",
                value: [],
                label: "Previous Repairs",
                options: [
                    { value: "screen", label: "Screen" },
                    { value: "battery", label: "Battery" },
                    { value: "backside", label: "Backside" },
                    { value: "charging port", label: "Charging Port" },
                    { value: "other", label: "Other" },
                ],
            },
            wearLevel: {
                key: "wearLevel",
                value: 0,
                label: "How many scratches or dents are visable?",
                options: [
                    { value: 0, label: "Nothing" },
                    { value: 1, label: "Barely Notisable" },
                    { value: 2, label: "Notisable" },
                    { value: 3, label: "Very Notiable" },
                ],
            },
            isServiceProviderLocked: {
                key: "isServiceProviderLocked",
                value: false,
                label: "Is the device locked to a service provider?",
            },
            isCloudLocked: {
                key: "isCloudLocked",
                value: false,
                label: "Is the device iCloud locked?",
            },
            hasBootupDefect: {
                key: "hasBootupDefect",
                value: false,
                label: "Has the device issues starting?",
            },
            hasScreenDefect: {
                key: "hasScreenDefect",
                value: false,
                label: "Has the device screen any defects?",
            },

            estimatedPrice: 0,
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
            country: {
                key: "country",
                value: "",
                label: "Country",
            },
            clearingNumber: {
                key: "clearingNumber",
                value: "",
                label: "Clearing number",
            },
            accountNumber: {
                key: "accountNumber",
                value: "",
                label: "Account number",
            },
            // Form 3
            termsOfService:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            isDeviceResetted: {
                key: "isDeviceResetted",
                value: false,
                label: "I have ensured my device is factory resetted.",
            },
            isAcceptedTerms: {
                key: "isAcceptedTerms",
                value: false,
                label: "I accept the terms of service.",
            },
            ledger: [
                {
                    title: "1. Estimate Price",
                    description: "Provide device information",
                    step: 1,
                },
                {
                    title: "2. Your details",
                    description:
                        "So we can make a package label and give you money.",
                    step: 2,
                },
                {
                    title: "3. Confirm",
                    description:
                        "3-5 works days after receival your money is in the bank.",
                    step: 3,
                },
            ],
            formStep: 1,
        };
    }

    handleChange = (key, selectedOption) => {
        if (typeof selectedOption === "boolean") {
            console.log("selectedOption.value :", selectedOption.value);
            this.setState(
                { [key]: { ...this.state[key], value: selectedOption } },
                () => this.calcPrice()
            );
        } else if (Array.isArray(selectedOption)) {
            const newValues = selectedOption.map((el) => el.value);
            this.setState(
                { [key]: { ...this.state[key], value: newValues } },
                () => this.calcPrice()
            );
        } else if (selectedOption) {
            this.setState(
                { [key]: { ...this.state[key], value: selectedOption.value } },
                () => this.calcPrice()
            );
        }
    };

    nextStep = (event) => {
        const { formStep } = this.state;
        this.setState({ formStep: formStep + 1 });
    };

    prevStep = (event) => {
        const { formStep } = this.state;
        this.setState({ formStep: formStep - 1 });
    };

    calcPrice = () => {
        const {
            model,
            isServiceProviderLocked,
            wearLevel,
            isCloudLocked,
            hasBootupDefect,
            previousRepairs,
            hasScreenDefect,
            storage,
        } = this.state;

        const params = {
            model: model.value,
            serviceProviderLocked: isServiceProviderLocked.value,
            wearLevel: wearLevel.value,
            cloudLocked: isCloudLocked.value,
            bootupDefect: hasBootupDefect.value,
            screenDefect: hasScreenDefect.value,
            previousRepairs: previousRepairs.value.length,
        };

        let query = Object.keys(params)
            .map(
                (k) =>
                    encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
            )
            .join("&");

        let url = "/products/estimate_price?" + query;
        console.log("that the sheiet", url);

        fetch(url)
            .then((resp) => {
                console.log("response: ", resp);

                if (resp.ok) {
                    resp.json().then((result) => {
                        console.log("json", result);
                        this.setState({ estimatedPrice: result });
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    styleStep = (currStepNr, stepNr) => {
        let style =
            "list-group-item d-flex justify-content-between lh-condensed";
        style += currStepNr == stepNr ? " bg-light" : "";
        style += currStepNr > stepNr ? " text-success" : "";
        return style;
    };

    render() {
        const {
            // Form1
            model,
            storage,
            wearLevel,
            previousRepairs,
            isServiceProviderLocked,
            isCloudLocked,
            hasBootupDefect,
            hasScreenDefect,
            estimatedPrice,
            // Form2
            firstName,
            lastName,
            email,
            phoneNumber,
            adress,
            city,
            region,
            country,
            clearingNumber,
            accountNumber,
            // Form 3
            termsOfService,
            isDeviceResetted,
            isAcceptedTerms,

            formStep,
            ledger,
        } = this.state;

        const valuesForm1 = {
            fieldRows: [
                { left: model, right: storage },
                { left: wearLevel, right: previousRepairs },
            ],
            yesNoQuestions: [
                isServiceProviderLocked,
                isCloudLocked,
                hasBootupDefect,
                hasScreenDefect,
            ],
            estimatedPrice,
            formStep,
        };

        const valuesForm2 = {
            fieldRows: [
                { left: firstName, right: lastName },
                { left: email, right: phoneNumber },
                { left: adress, right: city },
                { left: region, right: country },
                { left: clearingNumber, right: accountNumber },
            ],
            formStep,
        };

        const valuesForm3 = {
            termsOfService,
            yesNoQuestions: [isAcceptedTerms, isDeviceResetted],
            formStep,
        };

        switch (formStep) {
            case 1:
                return (
                    <DeviceDetailsForm
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        styleStep={this.styleStep}
                        ledger={ledger}
                        values={valuesForm1}
                    />
                );
            case 2:
                return (
                    <PersonalDetailsForm
                        prevStep={this.prevStep}
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        styleStep={this.styleStep}
                        ledger={ledger}
                        values={valuesForm2}
                    />
                );
            case 3:
                return (
                    <ConfirmationForm
                        prevStep={this.prevStep}
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        styleStep={this.styleStep}
                        ledger={ledger}
                        values={valuesForm3}
                    />
                );
        }
    }
}

export default SellDeviceForm;
