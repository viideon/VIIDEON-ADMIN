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
import { updateTemplate } from "../../Redux/Actions/Template";
import { Close } from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";
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
    editIndex: 0,
    editStepTitle: "",
    editStepDescription: "",
    editStepExamples: [],
    editStepExample: "",
    isEditExample: false,
    editExampleIndex: 0
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
    toast.info("Editor opened at the end of screen");
    const step = this.state.steps[index];
    this.setState({ stepEdit: true, editIndex: index }, () =>
      this.setState({
        editStepTitle: step.title,
        editStepDescription: step.description,
        editStepExamples: step.examples,
        editStepExample: ""
      })
    );
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
  editStep = () => {
    const updatedStep = {
      title: this.state.editStepTitle,
      description: this.state.editStepDescription,
      examples: this.state.editStepExamples
    };
    const steps = this.state.steps;
    steps[this.state.editIndex] = updatedStep;
    this.setState({
      steps: steps,
      stepEdit: false,
      editStepTitle: "",
      editStepDescription: "",
      editStepExamples: []
    });
    toast.info("Step Edited");
  };
  onEnterToAddExample = e => {
    if (e.key === "Enter") {
      this.setState({
        editStepExamples: [
          ...this.state.editStepExamples,
          this.state.editStepExample
        ]
      });
    }
  };
  onEnterToEditExample = e => {
    if (e.key === "Enter") {
      const editStepExamples = this.state.editStepExamples;
      editStepExamples[
        this.state.editExampleIndex
      ] = this.state.editStepExample;
      this.setState({
        editStepExamples: editStepExamples,
        editStepExample: "",
        isEditExample: false
      });
    }
  };
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.closeModalAfterUpdate &&
      nextProps.closeModalAfterUpdate !== this.props.closeModalAfterUpdate
    ) {
      this.props.handleClose();
    }
  }
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
  onChangeText = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onEnterPressed = e => {
    if (e.key === "Enter") {
      this.setState({
        examples: [...this.state.examples, this.state.example],
        example: ""
      });
    }
  };
  updateTemplate = () => {
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
      const queryObject = {
        id: this.props.template._id,
        template
      };
      this.props.updateTemplate(queryObject);
    }
  };
  editExample = index => {
    const example = this.state.steps[this.state.editIndex].examples[index];
    this.setState({
      isEditExample: true,
      editExampleIndex: index,
      editStepExample: example
    });
  };
  render() {
    const { open, handleClose, isTemplateUpdating } = this.props;
    return (
      <Modal open={open} onClose={handleClose} style={{ overflow: "auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Card style={{ width: "60%", padding: "0 5% 5% 5%" }}>
            {isTemplateUpdating && (
              <div className="progressIcon">
                <CircularProgress />
              </div>
            )}
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
                  <Button
                    onClick={() => this.onStepEdit(index)}
                    style={{ backgroundColor: Colors.lightGrey }}
                  >
                    Edit
                  </Button>
                </CardContent>
              </Card>
            ))}
            {this.state.stepEdit && (
              <>
                <div className="wrapperStepDetails">
                  <Typography variant="h6" gutterBottom>
                    Editor
                  </Typography>
                  <TextField
                    label="Step Title"
                    variant="outlined"
                    margin="dense"
                    value={this.state.editStepTitle}
                    name="editStepTitle"
                    onChange={this.onChangeText}
                  />
                  <TextField
                    label="Step Description"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={this.state.editStepDescription}
                    name="editStepDescription"
                    onChange={this.onChangeText}
                  />
                  <p>Examples to explain the step</p>
                  <List>
                    {this.state.editStepExamples.map((example, index) => (
                      <ListItem key={index}>
                        <div className="exampleEdit">
                          <ListItemText secondary={`${example}`} />
                          <span onClick={() => this.editExample(index)}>
                            <EditIcon />
                          </span>
                        </div>
                      </ListItem>
                    ))}
                  </List>
                  {this.state.isEditExample && (
                    <TextField
                      label="Edit Example"
                      variant="outlined"
                      fullWidth
                      value={this.state.editStepExample}
                      type="text"
                      name="editStepExample"
                      margin="dense"
                      onChange={this.onChangeText}
                      onKeyDown={this.onEnterToEditExample}
                    />
                  )}
                  {!this.state.isEditExample && (
                    <TextField
                      label="Add Example"
                      variant="outlined"
                      name="editStepExample"
                      fullWidth
                      value={this.state.editStepExample}
                      type="text"
                      margin="dense"
                      onChange={this.onChangeText}
                      onKeyDown={this.onEnterToAddExample}
                    />
                  )}
                </div>
                <Button variant="contained" onClick={this.editStep}>
                  Edit Step
                </Button>
              </>
            )}
            {!this.state.stepEdit && (
              <>
                <div className="wrapperStepDetails">
                  <Typography variant="h6" gutterBottom>
                    Editor
                  </Typography>
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
                    name="example"
                    onChange={this.onChangeText}
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
                onClick={this.updateTemplate}
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
  marginBottom: "10px",
  boxShadow: "0 0 4px #505050"
};
const cardHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const mapStateToProps = state => {
  return {
    isTemplateUpdating: state.Campaigns.isTemplateUpdating,
    closeModalAfterUpdate: state.Campaigns.closeModalAfterUpdate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateTemplate: template => dispatch(updateTemplate(template))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateTemplate);
