import React from "react";
import { Typography, Button, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CampaignTemplateCard from "../../components/CampaignTemplateCard";
import Update from "./Edit";
import { getIndustries, deleteIndustry} from '../../Redux/Actions/Industry'
import "./style.css";

class ViewTemplates extends React.Component {
  state = {
    updateModal: false,
    industy: null
  };
  componentDidMount() {
    this.props.getIndustries();
  }
  openUpdateModal = industry => {
    this.setState({ industry }, () =>
      this.setState({ updateModal: true })
    );
  };
  closeUpdateModal = () => {
    this.setState({ updateModal: false });
  };
  addTemplate = () => {
    this.props.changeCurrentComponent(2);
  };

  handleDelete = (industry) => {
    this.props.deleteIndustry(industry?._id)
  }

  render() {
    const { industries } = this.props;
    const { industry, updateModal } = this.state;
    return (
      <div>
        {updateModal && (
          <Update
            open={updateModal}
            handleClose={this.closeUpdateModal}
            industry={industry}
          />
        )}
        <div className="headerCampaignTemplate">
          <Typography variant="h3">Industries</Typography>
          <Button
            color="primary"
            startIcon={<AddCircleIcon />}
            variant="contained"
            onClick={this.addTemplate}
          >
            Add Industry
          </Button>
        </div>
        <Grid container spacing={1}>
          {industries &&
            industries.map(industry => (
              <Grid item xs={12} sm={6} md={3} lg={3} key={industry?._id}>
                <CampaignTemplateCard
                  template={industry}
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
    industries: state.Campaigns.industries
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getIndustries : (id) => dispatch(getIndustries()),
    deleteIndustry : (id) => dispatch(deleteIndustry(id)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewTemplates);
