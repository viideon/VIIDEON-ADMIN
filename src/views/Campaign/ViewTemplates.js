import React from "react";
import { Typography, Button, Grid } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CampaignTemplateCard from "../../components/CampaignTemplateCard";
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
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <CampaignTemplateCard />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ViewTemplates;
