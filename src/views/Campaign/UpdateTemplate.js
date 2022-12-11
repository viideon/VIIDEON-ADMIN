import React from "react";
import AWS from "aws-sdk";
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
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";


import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import "./style.css";
import {Storage} from 'aws-amplify';

class UpdateTemplate extends React.Component {
  s3;
  state = {
    steps: [],
    example: "",
    title: "",
    templateDescription: "",
    name: "",
    description: "",
    industryId: "",
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
    editExampleIndex: 0,
    editStepDuration: 0,
    stpDuration: 0,
  };
  componentDidMount() {
    this.s3 = new AWS.S3(config);
    this.intitializeStateFromProps();
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.closeModalAfterUpdate &&
      nextProps.closeModalAfterUpdate !== this.props.closeModalAfterUpdate
    ) {
      this.props.handleClose();
    }
  }
  intitializeStateFromProps = () => {
    const { template } = this.props;
    this.setState({
      steps: template.steps,
      name: template.name,
      templateDescription: template.templateDescription,
      thumbnailImgUrl: template.templateThumbnailUrl,
      industryId: template.industryId
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
        editStepExample: "",
        editStepDuration: step.duration,
      })
    );
  };
  addNewStep = () => {
    const step = {
      title: this.state.title,
      description: this.state.description,
      examples: this.state.examples,
      duration: this.state.stpDuration
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
      examples: this.state.editStepExamples,
      duration: this.state.editStepDuration,
    };
    const steps = this.state.steps;
    steps[this.state.editIndex] = updatedStep;
    this.setState({
      steps: steps,
      stepEdit: false,
      editStepTitle: "",
      editStepDescription: "",
      editStepExamples: [],
      editStepDuration: 0,
    });
    toast.info("Edited");
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

  triggerThumbnailUpload = () => {
    this.refs.thumbnailUploadRef.click();
  };
  uploadThumbnail = async e => {
    if (e.target.files[0] !== null) {
      if (!e.target.files[0].name.match(/\.(jpg|jpeg|png)$/)) {
        toast.error("Please add valid image");
        return;
      }
      this.setState({ thumbnailUploading: true });
      try {
        const data = await Storage.put(
            `${Date.now().toString()}_${e.target.files[0].name}`,
            e.target.files[0],
            {
              level: 'public'
            }
        );
        this.setState({
          thumbnailUploading: false,
          thumbnailKey: data.key,
          thumbnailImgUrl:  await Storage.get(data.key, {level: 'public'}),
        });
        toast.info("Uploaded");
      } catch (_error) {
        toast.error(_error.message);
        this.setState({ thumbnailUploading: false });
      }
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
    const { name, steps, thumbnailKey, templateDescription, industryId } = this.state;
    if (!industryId) {
      return toast.error("Select Industry First!")
    } else if (name === "") {
      return toast.error("Template name is required");
    } else if (templateDescription === "") {
      return toast.error("Template description is required");
    } else if (thumbnailKey === "") {
      return toast.error("Template thumbnail is required");
    } else if (!steps.length) {
      return toast.error("You need to add atleast one step for campaign templates");
    } else {

      let duration = 0;
      steps.filter(step => {
        if(step.duration) duration = duration + Number(step.duration);
      })
      const template = {
        name: this.state.name,
        templateDescription: this.state.templateDescription,
        steps: this.state.steps,
        templateThumbnailUrl: this.state.thumbnailKey,
        totalSteps: this.state.steps.length,
        industryId: this.state.industryId,
        duration
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
  removeStep = index => {
    const steps = this.state.steps.filter((step, i) => i !== index);
    this.setState({ steps: steps });
    toast.info("Removed");
  };
  removeExample = index => {
    const examples = this.state.editStepExamples.filter(
      (example, i) => index !== i
    );
    this.setState({ editStepExamples: examples });
  };
  render() {
    const { open, handleClose, isTemplateUpdating, industries } = this.props;
    const { industryId } = this.state;
    return (
      <Modal open={open} onClose={handleClose} style={{ overflow: "auto" }}>
        <div className="wrapperCardUpdate">
          <Card style={{ width: "60%", padding: "0 5% 5% 5%" }}>
            {isTemplateUpdating && (
              <div className="progressIcon">
                <CircularProgress />
              </div>
            )}
            <div className="cardHeader">
              <h4 style={{ color: "#000" }}>Edit Template</h4>
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </div>

            <FormControl variant="outlined" fullWidth >
              <InputLabel id="selectIndustry">Select Industry</InputLabel>
              <Select
                labelId="selectIndustry"
                id="demo-simple-select"
                value={industryId}
                name="industryId"
                onChange={this.onChangeText}
              >
                { industries &&
                  industries.map((industry, index) => {
                    return <MenuItem key={index} value={industry._id} >{industry.name}</MenuItem>
                  })
                }
              </Select>
            </FormControl>

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
                  <div className="cardHeader">
                    <h3>Step {index + 1}</h3>
                    <Tooltip title="Remove step" placement="top">
                      <span
                        onClick={() => this.removeStep(index)}
                        className="removeIcon"
                      >
                        <CancelIcon />
                      </span>
                    </Tooltip>
                  </div>
                  <h5>Title : {step.title}</h5>
                  <h5>Description : {step.description}</h5>
                  <h5>Duration : {step.duration ? step.duration : 0} seconds </h5>
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
                  <TextField
                    label="Step Duration ( in Seconds )"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={this.state.editStepDuration}
                    name="editStepDuration"
                    onChange={this.onChangeText}
                  />
                  <p>Examples to explain the step</p>
                  <List>
                    {this.state.editStepExamples.map((example, index) => (
                      <ListItem key={index}>
                        <div className="exampleEdit">
                          <ListItemText secondary={`${example}`} />
                          <Tooltip title="Edit">
                            <span onClick={() => this.editExample(index)}>
                              <EditIcon />
                            </span>
                          </Tooltip>
                          <Tooltip title="Remove" placement="top">
                            <span
                              onClick={() => this.removeExample(index)}
                              className="removeIcon"
                            >
                              <CancelIcon />
                            </span>
                          </Tooltip>
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
                      placeholder="Press Enter to edit"
                    />
                  )}
                </div>
                <Button variant="contained" onClick={this.editStep}>
                  Update
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
                  <TextField
                    label="Step Duration ( in Seconds )"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={this.state.stpDuration}
                    name="stpDuration"
                    type="number"
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
                    placeholder="Press Enter after adding an example"
                  />
                </div>
                <Button variant="contained" onClick={this.addNewStep}>
                  Add step to template
                </Button>
              </>
            )}
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

const mapStateToProps = state => {
  return {
    industries: state.Campaigns.industries,
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
