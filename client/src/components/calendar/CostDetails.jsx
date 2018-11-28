import React from 'react';

class CostDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="costBoxMargin">
        <table>
        <tbody>
          <tr>
            <td align="left">{'$'+this.props.dailyRent}x{this.props.daysReserved}</td>
            <td align="right">{'$'+this.props.dailyRent*this.props.daysReserved}</td>
          </tr>
          <tr>
            <td align="left">Cleaning fee</td>
            <td align="right">{'$'+this.props.cleaningFees}</td>
          </tr>
          <tr>
            <td align="left">Service fee</td>
            <td align="right">{'$'+this.props.serviceFees}</td>
          </tr>
          <tr>
            <td align="left">Occupancy taxes and fees</td>
            <td align="right">{'$'+this.props.taxesAndFees}</td>
          </tr>
          <tr>
            <td align="left">Total</td>
            <td align="right">{'$'+parseInt(parseInt(this.props.dailyRent*this.props.daysReserved) + parseInt(this.props.cleaningFees) + parseInt(this.props.serviceFees) + parseInt(this.props.taxesAndFees))}</td>
          </tr>
          </tbody>
        </table>
      </div>
      </div>
    );
  }
}

export default CostDetails;