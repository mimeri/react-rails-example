import React from 'react';

export class FormLedger extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('props:', this.props);
        const { formStep, ledger, styleStep } = this.props;
    let stepDone = <li className="list-group-item d-flex justify-content-center">
      <span class="text-center text-success">Done</span>
    </li>;

    return (
      <div className="col-md-4 order-md-2 mb-4">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span>Steps</span>
        </h4>
        <ul className="list-group mb-3">
          {ledger.map( stepObj =>  
          <li key={stepObj.step} className={styleStep(formStep, stepObj.step)}>
            <div>
              <h6 className="my-0">{stepObj.title}</h6>
              <small className={formStep > stepObj.step ? "text-success" :"text-muted"}>{stepObj.description}</small>
            </div>
          </li>)}

          {formStep > 3 ? stepDone : null}
        </ul>
      </div>
    );
  }
}

export default FormLedger;