import React from "react";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Button } from "@material-ui/core";
import AddModal from "./AddModal";
import { primaryColor } from "../../assets/jss/material-dashboard-react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  loadPublicAssetAction,
  addNewPublicAsset,
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
  };
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
  onSaveHander = () => this.props.dispatch(addNewPublicAsset());
  componentDidMount() {
    this.props.dispatch(loadPublicAssetAction());
  }
  render() {
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
const mapStoreToProps = (store) => ({ Assets: store.PublicAssets });
export default connect(mapStoreToProps)(PublicAssets);
