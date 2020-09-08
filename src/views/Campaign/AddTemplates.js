import React from "react";
import { Typography, Button } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

class AddTemplates extends React.Component {
  viewTemplates = () => {
    this.props.changeCurrentComponent(1);
  };
  render() {
    return (
      <div>
        <div className="headerCampaignTemplate">
          <Typography variant="h3">Add a new Template</Typography>
          <Button
            color="primary"
            startIcon={<AddCircleIcon />}
            variant="contained"
            onClick={this.viewTemplates}
          >
            View Templates
          </Button>
        </div>
      </div>
    );
  }
}

export default AddTemplates;
