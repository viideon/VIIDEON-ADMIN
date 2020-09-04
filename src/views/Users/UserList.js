import React from "react";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Pagination } from "@material-ui/lab";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { connect } from "react-redux";
import { loadUserAction } from "../../Redux/Actions/Users";
import { primaryColor } from "../../assets/jss/material-dashboard-react";

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
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "10px",
  },
};

class UsersList extends React.Component {
  componentDidMount() {
    this.props.dispatch(loadUserAction(1));
  }
  tableHead = ["First Name", "Last Name", "Email", "User Name", "Avatar Url"];
  mapUsers = () =>
    this.props.Users.users.docs.map((user) => [
      user.firstName,
      user.lastName,
      user.email,
      user.userName,
      user.url,
    ]);
  onPageChange = (...params) => this.props.dispatch(loadUserAction(params[1]));

  render() {
    const classes = styles;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Users</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={this.tableHead}
                tableData={this.props.Users.users ? this.mapUsers() : []}
              />
            </CardBody>
            <GridItem xs={12} sm={12} md={12}>
              <div style={classes.paginationContainer}>
                <ThemeProvider theme={theme}>
                  <Pagination
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                    defaultPage={1}
                    page={this.props.Users.users && this.props.Users.users.page}
                    onChange={this.onPageChange}
                    count={
                      this.props.Users.users &&
                      this.props.Users.users.totalPages
                    }
                  />
                </ThemeProvider>
              </div>
            </GridItem>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}
const mapStoreToProps = (store) => ({ Users: store.Users });
export default connect(mapStoreToProps)(UsersList);
