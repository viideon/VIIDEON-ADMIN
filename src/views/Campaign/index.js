import React from "react";
import ViewTemplates from "./ViewTemplates";
import AddTemplates from "./AddTemplates";
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
          <ViewTemplates changeCurrentComponent={this.changeCurrentComponent} />
        );
      case 2:
        return (
          <AddTemplates changeCurrentComponent={this.changeCurrentComponent} />
        );
      default:
        return (
          <ViewTemplates changeCurrentComponent={this.changeCurrentComponent} />
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
