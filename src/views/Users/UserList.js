import React, { useState, useEffect} from "react";
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
import { userRemoveAction } from "../../Redux/Actions/Users";
import { primaryColor } from "../../assets/jss/material-dashboard-react";
import DeleteIcon from "@material-ui/icons/Delete";


const tableHead = ["Sr #","First Name", "Last Name", "Email", "User Name", "Avatar Url"];
const UsersList = (props) =>  {
  const [xPages, setPages] = useState(1)
  const [users, setUsers] = useState(props.Users.users)
  const classes = styles;
  
  useEffect(() => {
    props.getUsers(1, 10);
  }, []) 
  
  const updatePages = () => {
    if(users !== props.Users.users) {
      setUsers(props.Users.users)
      let pages = props.Users.pageCount / 10;
      if(pages % 1 !== 0){
        pages = parseInt(pages) + 1;
      }
      setPages(pages);
    }
  }
  
  // const onClick = (id)=>{
  //     console.log('component',id);
  //     userRemove(id);
  // }
  const mapUsers = () =>
    users?.map((user, index) => [
      index,
      user.firstName,
      user.lastName,
      user.email,
      user.userName,
      user.url,
      <button className="squareBtn red"
      onClick={()=>{
        props.userRemove(user._id)
      }}><DeleteIcon fontSize="small" htmlColor="#fff" /></button>,
    ]);
    
  const onPageChange = (...params) => {
    console.log(params)
    props.getUsers(params[1], 10)
  };



  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes?.cardTitleWhite}>Users</h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={tableHead}
              tableData={props.Users.users ? mapUsers() : []}
            />
          </CardBody>
          <GridItem xs={12} sm={12} md={12}>
            <div style={classes?.paginationContainer}>
              <ThemeProvider theme={theme}>
                <Pagination
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                  defaultPage={updatePages() && 1}
                  onChange={onPageChange}
                  count={
                    xPages
                  }
                />
              </ThemeProvider>
            </div>
          </GridItem>
        </Card>
      </GridItem>
    </GridContainer>
  )
}



const theme = createMuiTheme({
  palette: {
    primary: {
      main: primaryColor[0]
    }
  }
});

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
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
      lineHeight: "1"
    }
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "10px"
  }
};

const mapStoreToProps = store => ({ 
  Users: store.Users 
});

const mapDispatchToProps = dispatch => {
  return {
    getUsers: (pageNumber, pageSize) => dispatch(loadUserAction(pageNumber, pageSize)),
    userRemove: (id) => dispatch(userRemoveAction(id))
  }
}
export default connect(mapStoreToProps, mapDispatchToProps)(UsersList);
