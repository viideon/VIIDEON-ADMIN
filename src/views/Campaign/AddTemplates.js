import React from "react";
import {
  Typography,
  Button,
  TextField,
  Tooltip,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

class AddTemplates extends React.Component {
  thumbnailImg;
  state = {
    steps: [],
    example: "",
    title: "",
    templateDescription: "",
    name: "",
    description: "",
    examples: [],
    thumbnailFile: "",
    thumbnailImgUrl: ""
  };
  componentDidMount() {
    this.thumbnailImg = this.refs.thumbnailImg;
  }
  addNewStep = () => {
    const step = {
      title: this.state.title,
      description: this.state.description,
      examples: this.state.examples
    };
    this.setState({ steps: [...this.state.steps, step] }, () => {
      this.setState({ title: "", description: "", examples: [] });
    });
  };
  onChangeText = e => {
    this.setState({ [e.target.name]: [e.target.value] });
  };
  viewTemplates = () => {
    this.props.changeCurrentComponent(1);
  };
  triggerThumbnailUpload = () => {
    this.refs.thumbnailUploadRef.click();
  };
  uploadThumbnail = e => {
    alert("File selected");
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
  render() {
    return (
      <>
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
        <div className="wrapperFormTemplate">
          <div className="addTemplateForm">
            <TextField
              label="Template Name"
              variant="outlined"
              margin="dense"
            />
            <TextField
              value={this.state.templateDescription}
              onChange={this.onChangeText}
              label="Description"
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
              <div className="previewThumbnail">
                <img
                  className="thumbnailImg"
                  alt="thumbnailImg"
                  ref="thumbnailImg"
                />
              </div>
            </div>
            <Typography variant="h5" className="headingTemplateStep">
              Add Steps to template
            </Typography>
            {this.state.steps.map((step, index) => (
              <div key={index} className="cardSteps">
                <h3>Step {index + 1}</h3>
                <h5>Title : {step.title}</h5>
                <h5>Description : {step.description}</h5>
                <span>Examples</span>
                <ul>
                  {step.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>
            ))}
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
              Next Step
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default AddTemplates;
