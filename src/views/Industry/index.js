import React from "react";
import Industries from "./Industries";
import AddIndustry from "./Add";
import { getCampaignTemplates } from "../../Redux/Actions/Template";
import { connect } from "react-redux";

class Campaign extends React.Component {
  state = {
    currentComponent: 1
  };
  componentDidMount() {
    this.props.getCampaignTemplates();
  }
  changeCurrentComponent = current => {
    this.setState({ currentComponent: current });
  };
  renderComponent = () => {
    switch (this.state.currentComponent) {
      case 1:
        return (
          <Industries changeCurrentComponent={this.changeCurrentComponent} />
        );
      case 2:
        return (
          <AddIndustry changeCurrentComponent={this.changeCurrentComponent} />
        );
      default:
        return (
          <Industries changeCurrentComponent={this.changeCurrentComponent} />
        );
    }
  };
  render() {
    return <>{this.renderComponent()}</>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCampaignTemplates: () => dispatch(getCampaignTemplates())
  };
};
export default connect(null, mapDispatchToProps)(Campaign);
