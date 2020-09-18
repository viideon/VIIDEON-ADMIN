import React from "react";
import { Typography, Button, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CampaignTemplateCard from "../../components/CampaignTemplateCard";
import UpdateTemplate from "./UpdateTemplate";
import { deleteTemplate } from '../../Redux/Actions/Template';
import "./style.css";

class ViewTemplates extends React.Component {
  state = {
    updateModal: false,
    template: null
  };
  openUpdateModal = template => {
    this.setState({ template: template }, () =>
      this.setState({ updateModal: true })
    );
  };
  closeUpdateModal = () => {
    this.setState({ updateModal: false });
  };
  addTemplate = () => {
    this.props.changeCurrentComponent(2);
  };

  handleDelete = (template) => {
    this.props.deleteTemplate(template?._id)
  }

  render() {
    const { templates } = this.props;
    const { template, updateModal } = this.state;
    return (
      <div>
        {updateModal && (
          <UpdateTemplate
            open={updateModal}
            handleClose={this.closeUpdateModal}
            template={template}
          />
        )}
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
          {templates &&
            templates.map(template => (
              <Grid item xs={12} sm={6} md={3} lg={3} key={template._id}>
                <CampaignTemplateCard
                  template={template}
                  openUpdateModal={this.openUpdateModal}
                  handleDelete={this.handleDelete}
                />
              </Grid>
            ))}
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    templates: state.Campaigns.templates
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteTemplate : (id) => dispatch(deleteTemplate(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewTemplates);
