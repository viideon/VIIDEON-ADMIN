import React from "react";
import ViewTemplates from "./ViewTemplates";
import AddTemplates from "./AddTemplates";

class Campaign extends React.Component {
  state = {
    currentComponent: 1
  };
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
export default Campaign;
