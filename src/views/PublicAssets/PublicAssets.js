import React from "react";
import {Storage} from "aws-amplify";
import GridItem from "components/Grid/GridItem.js";
import { toast } from "react-toastify";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Button , Grid } from "@material-ui/core";
import AddModal from "./AddModal";
import { primaryColor } from "../../assets/jss/material-dashboard-react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  addNewPublicAsset,
  getPublicMusicAsset,
} from "Redux/Actions/PublicAssets";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primaryColor[0],
    },
  },
});
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  cardHeaderContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addNewButton: {
    height: "40px",
    color: "white",
  },
};
class PublicAssets extends React.Component {
  state = {
    isAddModalOpen: false,
    title: "",
    file: null,
    url:"",
    assetUploading:false,
    backgroundMusicUrl:"",
    musicFile:null,
    musicFileSelected:false,
  };
  componentDidMount() {
    this.props.getPublicMusicAsset();
  }
  openAddModel = () => this.setState({ isAddModalOpen: true });
  closeAddModal = () => this.setState({ isAddModalOpen: false });
  inputChangeHandler = (evt) => {
    const { value, name, files } = evt.target;
    if (name === "file") {
      this.setState({ [name]: files[0] });
    } else {
      this.setState({ [name]: value });
    }
  };
  onSaveHander = async () => {
    if (this.state.title === "") {
      toast.error("Please add a title for music asset");
    } else if(this.state.file === null){
      toast.error("Please add a music file");
    } else {
      toast.info("Uploading music please wait");
      this.setState({ assetUploading: true });
      try {
        const data = await Storage.put(
          `${Date.now().toString()}_${this.state.file.name}`,
          this.state.file,
          {
            level: 'public'
          }
        );
        toast.info("Asset Uploaded");
        this.setState({
          backgroundMusicUrl: data.key,
          file: null,
          musicFileSelected: false,
          assetUploading: false,
          url: data.key,
          title:this.state.title
        });
        this.props.addNewPublicAsset({ asset:{ url: this.state.url, title: this.state.title } });
        this.setState({ isAddModalOpen: false,title:"",url:"" })
      } catch (_error) {
        toast.error(_error);
        this.setState({ assetUploading: false });
      }
    }
  }
  
  
  render() {
    const { isAddModalOpen, title, file } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader style={styles.cardHeaderContainer} color="primary">
                <h4 className={styles.cardTitleWhite}>Public Assets</h4>
                <Button
                  onClick={this.openAddModel}
                  style={styles.addNewButton}
                  variant="outlined"
                >
                  Add New
                </Button>
              </CardHeader>
              <CardBody>
                <Grid container>
                  {this.props.publicMusic &&
                    this.props.publicMusic.map((asset, i) => (
                      <Grid item md={4} lg={4} sm={6} key={i}>
                        <div className="pickerHeaderMusic">
                          <h5
                            className={
                              i === this.state.currenSelection
                                ? "selectedMusicHeading"
                                : "musicHeading"
                            }
                          >
                            {asset.title}
                          </h5>
                        </div>
                        <audio
                          src={asset.url}
                          controls
                          style={{ outline: "none" }}
                        />
                      </Grid>
                    ))}
                </Grid>
              </CardBody>
            </Card>
          </GridItem>
          <AddModal
            inputChangeHandler={this.inputChangeHandler}
            isOpen={isAddModalOpen}
            title={title}
            file={file}
            onSaveHander={this.onSaveHander}
            closeModal={this.closeAddModal}
          />
        </GridContainer>
      </ThemeProvider>
    );
  }
}
const mapStateToProps = state => {
  return {
    templates: state.Campaigns.templates,
    publicMusic:state.PublicAssets.publicAssets
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPublicMusicAsset: () => dispatch(getPublicMusicAsset()),
    addNewPublicAsset:(audioData)=>dispatch(addNewPublicAsset(audioData))
    
  }
}
// const mapStoreToProps = (store) => ({ Assets: store.PublicAssets });
export default connect(mapStateToProps, mapDispatchToProps)(PublicAssets);
