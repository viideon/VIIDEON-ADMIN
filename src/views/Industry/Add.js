import React from "react";
import AWS from "aws-sdk";
import { connect } from "react-redux";
import {
  Typography,
  Button,
  TextField,
  Tooltip,
  CircularProgress
} from "@material-ui/core";
import Colors from "../../constants/colors";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { toast } from "react-toastify";
import { config } from "../../lib/aws";
import { addCampaignIndustry } from "../../Redux/Actions/Industry";
import "./style.css";

class AddTemplates extends React.Component {
  s3;
  state = {
    title: "",
    name: "",
    description: "",
    thumbnailUploading: false,
    thumbnailUrl: ""
  };
  componentDidMount() {
    this.s3 = new AWS.S3(config);
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.redirectAfterSave &&
      nextProps.redirectAfterSave !== this.props.redirectAfterSave
    ) {
      this.viewTemplates();
    }
  }
  onChangeText = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  viewTemplates = () => {
    this.props.changeCurrentComponent(1);
  };
  uploadThumbnail = e => {
    if (e.target.files[0] !== null) {
      if (!e.target.files[0].name.match(/\.(jpg|jpeg|png)$/)) {
        toast.error("Please add valid image");
        return;
      }
      const thumbnailOptions = {
        Bucket: config.bucketName,
        ACL: config.ACL,
        Key: Date.now().toString() + e.target.files[0].name,
        Body: e.target.files[0]
      };
      this.setState({ thumbnailUploading: true });
      this.s3.upload(thumbnailOptions, (err, data) => {
        if (err) {
          toast.error(err.message);
          this.setState({ thumbnailUploading: false });
          return;
        }
        this.setState({
          thumbnailUploading: false,
          thumbnailUrl: data.Location
        });
        toast.info("Uploaded");
      });
    } else {
      toast.error("error in selecting file");
    }
  };
  saveTemplate = () => {
    const { name, thumbnailUrl, description } = this.state;
    if (name === "") {
      return toast.error("Industry name is required");
    } else if (description === "") {
      return toast.error("Industry description is required");
    } else if (thumbnailUrl === "") {
      return toast.error("Industry thumbnail is required");
    } else {
      const industry = {
        name,
        description,
        styles: [],
        thumbnailUrl,
      };
      this.props.addCampaignIndustry(industry);
    }
  };
  render() {
    const { isLoading } = this.props;
    return (
      <>
        <div className="headerCampaignTemplate">
          <Typography variant="h3">Add an Industry</Typography>
          <Button
            color="primary"
            startIcon={<VisibilityIcon />}
            variant="contained"
            onClick={this.viewTemplates}
          >
            View Industries
          </Button>
        </div>
        {isLoading && (
          <div className="progressIcon">
            <CircularProgress />
          </div>
        )}
        <div className="wrapperFormTemplate">
          <div className="addTemplateForm">
            <TextField
              label="Industry Name"
              variant="outlined"
              margin="dense"
              name="name"
              onChange={this.onChangeText}
            />
            <TextField
              value={this.state.description}
              onChange={this.onChangeText}
              label="Description"
              name="description"
              variant="outlined"
              fullWidth
              margin="dense"
            />
            <div>
              <input
                type="file"
                ref={ref => {this.thumbnailRef = ref}}
                accept="image/*"
                style={{ display: "none" }}
                onChange={this.uploadThumbnail}
              />
              <div className="wrapperUploadBtn">
                <Tooltip title="Add a thumbnail to present the Industry" placement="top">
                  <Button
                    color="primary"
                    startIcon={<AddCircleIcon />}
                    variant="outlined"
                    size="small"
                    style={{ backgroundColor: "#cdcdcd", marginTop: "10px" }}
                    onClick={() => this.thumbnailRef.click()}
                  >
                    Upload Thumbnail
                  </Button>
                </Tooltip>
                {this.state.thumbnailUploading && (
                  <span>
                    <CircularProgress size={20} />
                  </span>
                )}
              </div>
              {this.state.thumbnailUrl && (
                <div className="previewThumbnail">
                  <img
                    className="thumbnailImg"
                    alt="thumbnailImg"
                    src={this.state.thumbnailUrl}
                  />
                </div>
              )}
            </div>
            <div className="wrapperSaveTemplateBtn">
              <Button onClick={this.saveTemplate} style={{backgroundColor: Colors.themeBlue,color: Colors.white}}>
                Save Industry
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const cardStyle = {
  marginBottom: "5px"
};
const mapStateToProps = state => {
  return {
    isTemplateSaved: state.Campaigns.isTemplateSaved,
    redirectAfterSave: state.Campaigns.redirectAfterSave
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCampaignIndustry: industry => dispatch(addCampaignIndustry(industry))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddTemplates);
