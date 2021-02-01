import React from "react";

import GridItem from "components/Grid/GridItem.js";
import { toast, Flip } from "react-toastify";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Button , Grid } from "@material-ui/core";
import { config } from "../../lib/aws";
import AddModal from "./AddModal";
import { primaryColor } from "../../assets/jss/material-dashboard-react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  loadPublicAssetAction,
  addNewPublicAsset,
  getPublicMusicAsset,
} from "Redux/Actions/PublicAssets";

import AWS from "aws-sdk";
import S3FileUpload from "react-s3";
const s3 = new AWS.S3(config);
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
    assetUploading:false
  };
  componentDidMount() {
    // this.props.dispatch(loadPublicAssetAction());
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
  onSaveHander = () => {
    console.log("title is ",this.state.title)
    console.log("file is ",this.state.file)

    if (this.state.title === "") {
      toast.error("Please add a title for music asset");
    } else if(this.state.file === null){
      toast.error("Please add a music file");
    } else {
      toast.info("Uploading music please wait");
      this.setState({ assetUploading: true });
      const musicOptions = {
        Bucket: config.bucketName,
        ACL: config.ACL,
        Key: Date.now().toString() + this.state.file.name,
        Body: this.state.file,
      };
      s3.upload(musicOptions, (err, data) => {
        if (err) {
          toast.error(err);
          this.setState({ assetUploading: false });
          return;
        }
        toast.info("Asset Uploaded");
        this.setState({
          backgroundMusicUrl: data.Location,
          file: null,
          musicFileSelected: false,
          assetUploading: false,
          url:data.Location,
          title:this.state.title
        });
        console.log("music url is ",this.state.url,this.state.title)
        this.props.addNewPublicAsset({asset:{url:this.state.url,title:this.state.title}});
        this.setState({ isAddModalOpen: false,title:"",url:"" })
        // this.props.addMusicAsset({
        //   url: data.Location,
        //   title: this.state.musicTitle,
        // });
      });
    }
    // this.props.dispatch(addNewPublicAsset());
    
    
  }
  
  
  render() {
    const { templates , publicMusic} = this.props;
    console.log(this.props);
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
                <Table
                  tableHeaderColor="primary"
                  tableHead={[]}
                  tableData={[]}
                />
              </CardBody>
            </Card>
            {console.log("public music is ",this.props.publicMusic)}
            <Grid container>
                {this.props.publicMusic &&
                  this.props.publicMusic.map((asset, i) => (
                    <Grid item md={4} lg={4} sm={6} key={i}>
                      <div className="pickerHeaderMusic">
                        {/* <Radio
                          checked={i === this.state.currenSelection}
                          onChange={() => this.selectAsset(asset.url, i)}
                          value={i}
                          color="default"
                          size="small"
                        /> */}
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
const mapStoreToProps = (store) => ({ Assets: store.PublicAssets });
export default connect(mapStateToProps,mapDispatchToProps)(PublicAssets);
