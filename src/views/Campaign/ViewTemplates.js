import React from "react";
import { Typography, Button } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import "./style.css";

class ViewTemplates extends React.Component {
  addTemplate = () => {
    this.props.changeCurrentComponent(2);
  };
  render() {
    return (
      <div>
        <div className="headerCampaignTemplate">
          <Typography variant="h3">Campaign Templates</Typography>
          <Button
            color="primary"
            startIcon={<AddCircleIcon />}
            variant="contained"
            onClick={this.addTemplate}
          >
            Add Template
          </Button>
        </div>
      </div>
    );
  }
}

export default ViewTemplates;
