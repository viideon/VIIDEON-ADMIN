import React from "react";
import AWS from "aws-sdk";
import {
  Modal,
  TextField,
  Tooltip,
  Button,
  Card,
  CircularProgress,
  IconButton
} from "@material-ui/core";
import { connect } from "react-redux";
import Colors from "../../constants/colors";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { toast } from "react-toastify";
import { config } from "../../lib/aws";
import { updateIndustry } from "../../Redux/Actions/Industry";
import { Close } from "@material-ui/icons";

import "./style.css";

class UpdateIndustry extends React.Component {
  s3;
  thumbnailRef;
  state = {
    title: "",
    name: "",
    description: "",
    thumbnailUploading: false,
    thumbnailUrl: "",
  };
  componentDidMount() {
    this.s3 = new AWS.S3(config);
    this.intitializeStateFromProps();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.closeModalAfterUpdate &&nextProps.closeModalAfterUpdate !== this.props.closeModalAfterUpdate) {
      this.props.handleClose();
    }
  }
  intitializeStateFromProps = () => {
    const { industry } = this.props;
    this.setState({
      name: industry.name,
      description: industry.description,
      thumbnailUrl: industry.thumbnailUrl
    });
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
  onChangeText = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateIndustry = () => {
    const { name, thumbnailUrl, description } = this.state;
    if (name === "") {
      return toast.error("Industry name is required");
    } else if (description === "") {
      return toast.error("Industry description is required");
    } else if (thumbnailUrl === "") {
      return toast.error("Industry thumbnail is required");
    } else {
      const industry = {
        _id: this.props.industry._id,
        name,
        description,
        thumbnailUrl,
      };
      this.props.updateIndustry(industry._id,industry);
    }
  };
  render() {
    const { open, handleClose, loading } = this.props;
    return (
      <Modal open={open} onClose={handleClose} style={{ overflow: "auto" }}>
        <div className="wrapperCardUpdate">
          <Card style={{ width: "60%", padding: "0 5% 5% 5%" }}>
            {loading && (
              <div className="progressIcon">
                <CircularProgress />
              </div>
            )}
            <div className="cardHeader">
              <h4 style={{ color: "#000" }}>Edit Industry</h4>
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </div>
            <TextField
              label="Industry Name"
              variant="outlined"
              margin="dense"
              name="name"
              value={this.state.name}
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
                ref={ref => { this.thumbnailRef = ref}}
                accept="image/*"
                style={{ display: "none" }}
                onChange={this.uploadThumbnail}
              />
              <div className="wrapperUploadBtn">
                <Tooltip
                  title="Add a thumbnail to present the template"
                  placement="top"
                >
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
              <Button
                style={{
                  backgroundColor: Colors.red,
                  marginRight: "5px",
                  color: Colors.white
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                style={{
                  backgroundColor: Colors.themeBlue,
                  color: Colors.white
                }}
                onClick={this.updateIndustry}
              >
                Update Industry
              </Button>
            </div>
          </Card>
        </div>
      </Modal>
    );
  }
}
const cardStyle = {
  marginBottom: "10px",
  boxShadow: "0 0 4px #505050"
};

const mapStateToProps = state => {
  return {
    loading: state.Campaigns.loading,
    closeModalAfterUpdate: state.Campaigns.closeModalAfterUpdate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateIndustry: (id, industry) => dispatch(updateIndustry(id, industry))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateIndustry);
