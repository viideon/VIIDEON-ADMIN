import React from "react";
import {
  Modal,
  TextField,
  Tooltip,
  Button,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  IconButton
} from "@material-ui/core";
import { connect } from "react-redux";
import Colors from "../../constants/colors";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { toast } from "react-toastify";
import { config } from "../../lib/aws";
import { addCampaignTemplate } from "../../Redux/Actions/Template";
import { Close } from "@material-ui/icons";
import "./style.css";

class UpdateTemplate extends React.Component {
  state = {
    steps: [],
    example: "",
    title: "",
    templateDescription: "",
    name: "",
    description: "",
    examples: [],
    thumbnailUploading: false,
    thumbnailImgUrl: "",
    stepEdit: false,
    editIndex: 0
  };
  componentDidMount() {
    this.intitializeStateFromProps();
  }
  intitializeStateFromProps = () => {
    const { template } = this.props;
    this.setState({
      steps: template.steps,
      name: template.name,
      templateDescription: template.templateDescription,
      thumbnailImgUrl: template.templateThumbnailUrl
    });
  };
  onStepEdit = index => {
    this.setState({ stepEdit: true, editIndex: index });
  };
  addNewStep = () => {
    const step = {
      title: this.state.title,
      description: this.state.description,
      examples: this.state.examples
    };
    if (step.title === "" || step.description === "") {
      toast.info("Please fill the field to add a step to template");
    } else {
      this.setState({ steps: [...this.state.steps, step] }, () => {
        this.setState({ title: "", description: "", examples: [] });
      });
    }
  };
  triggerThumbnailUpload = () => {
    this.refs.thumbnailUploadRef.click();
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
          thumbnailImgUrl: data.Location
        });
        toast.info("Uploaded");
      });
    } else {
      toast.error("error in selecting file");
    }
  };
  onExampleChange = e => {
    this.setState({ example: e.target.value });
  };
  onEnterPressed = e => {
    if (e.key === "Enter") {
      this.setState({
        examples: [...this.state.examples, this.state.example],
        example: ""
      });
    }
  };
  saveTemplate = () => {
    const { name, steps, thumbnailImgUrl, templateDescription } = this.state;
    if (name === "") {
      return toast.error("Template name is required");
    } else if (templateDescription === "") {
      return toast.error("Template description is required");
    } else if (thumbnailImgUrl === "") {
      return toast.error("Template thumbnail is required");
    } else if (!steps.length) {
      return toast.error(
        "You need to add atleast one step for campaign templates"
      );
    } else {
      const template = {
        name: this.state.name,
        templateDescription: this.state.templateDescription,
        steps: this.state.steps,
        templateThumbnailUrl: this.state.thumbnailImgUrl,
        totalSteps: this.state.steps.length
      };
      this.props.addCampaignTemplate(template);
    }
  };
  render() {
    const { open, handleClose } = this.props;
    return (
      <Modal open={open} onClose={handleClose} style={{ overflow: "auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Card style={{ width: "60%", padding: "0 5% 5% 5%" }}>
            <div style={cardHeader}>
              <h4 style={{ color: "#000" }}>Edit Template</h4>
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </div>
            <TextField
              label="Template Name"
              variant="outlined"
              margin="dense"
              name="name"
              value={this.state.name}
              onChange={this.onChangeText}
            />
            <TextField
              value={this.state.templateDescription}
              onChange={this.onChangeText}
              label="Description"
              name="templateDescription"
              variant="outlined"
              fullWidth
              margin="dense"
            />
            <div>
              <input
                type="file"
                ref="thumbnailUploadRef"
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
                    onClick={this.triggerThumbnailUpload}
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
              {this.state.thumbnailImgUrl && (
                <div className="previewThumbnail">
                  <img
                    className="thumbnailImg"
                    alt="thumbnailImg"
                    src={this.state.thumbnailImgUrl}
                  />
                </div>
              )}
            </div>
            <Typography variant="h5" className="headingTemplateStep">
              Add Steps to template
            </Typography>
            {this.state.steps.map((step, index) => (
              <Card key={index} style={cardStyle}>
                <CardContent>
                  <h3>Step {index + 1}</h3>
                  <h5>Title : {step.title}</h5>
                  <h5>Description : {step.description}</h5>
                  <span>Examples</span>
                  <ul>
                    {step.examples.map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                  <Button onClick={() => this.onStepEdit(index)}>Edit</Button>
                </CardContent>
              </Card>
            ))}
            {this.state.stepEdit && (
              <>
                <div className="wrapperStepDetails">
                  <TextField
                    label="Step Title"
                    variant="outlined"
                    margin="dense"
                    value={this.state.title}
                    name="title"
                    onChange={this.onChangeText}
                  />
                  <TextField
                    label="Step Description"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={this.state.description}
                    name="description"
                    onChange={this.onChangeText}
                  />
                  <p>Examples to explain the step</p>
                  <List>
                    {this.state.examples.map((example, index) => (
                      <ListItem key={index}>
                        <ListItemText secondary={`${example}`} />
                      </ListItem>
                    ))}
                  </List>
                  <TextField
                    label="Add Example"
                    variant="outlined"
                    fullWidth
                    value={this.state.example}
                    type="text"
                    margin="dense"
                    onChange={this.onExampleChange}
                    onKeyDown={this.onEnterPressed}
                  />
                </div>
                <Button variant="contained" onClick={this.onStepEdit}>
                  Update Step
                </Button>
              </>
            )}
            {!this.state.stepEdit && (
              <>
                <div className="wrapperStepDetails">
                  <TextField
                    label="Step Title"
                    variant="outlined"
                    margin="dense"
                    value={this.state.title}
                    name="title"
                    onChange={this.onChangeText}
                  />
                  <TextField
                    label="Step Description"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={this.state.description}
                    name="description"
                    onChange={this.onChangeText}
                  />
                  <p>Examples to explain the step</p>
                  <List>
                    {this.state.examples.map((example, index) => (
                      <ListItem key={index}>
                        <ListItemText secondary={`${example}`} />
                      </ListItem>
                    ))}
                  </List>
                  <TextField
                    label="Add Example"
                    variant="outlined"
                    fullWidth
                    value={this.state.example}
                    type="text"
                    margin="dense"
                    onChange={this.onExampleChange}
                    onKeyDown={this.onEnterPressed}
                  />
                </div>
                <Button variant="contained" onClick={this.addNewStep}>
                  Add step to template
                </Button>
              </>
            )}
            <div className="wrapperSaveTemplateBtn">
              <Button
                style={{ backgroundColor: Colors.themeBlue }}
                onClick={this.saveTemplate}
              >
                Update Template
              </Button>
            </div>
          </Card>
        </div>
      </Modal>
    );
  }
}
const cardStyle = {
  marginBottom: "5px"
};
const cardHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const mapStateToProps = state => {
  return {
    isTemplateSaved: state.Campaigns.isTemplateSaved,
    redirectAfterSave: state.Campaigns.redirectAfterSave
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCampaignTemplate: template => dispatch(addCampaignTemplate(template))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateTemplate);
