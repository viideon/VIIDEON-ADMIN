import React from "react";
import Card from "../../components/Card/Card";
import * as Yup from "yup";
import { Formik } from "formik";
import Typography from "@material-ui/core/Typography/Typography";
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Button,
} from "@material-ui/core";
import { connect } from "react-redux";
import {Auth} from "aws-amplify";
import { toast } from "react-toastify";
import { loginAction } from "../../Redux/Actions/Authentication";
import { primaryColor } from "../../assets/jss/material-dashboard-react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primaryColor[0],
    },
  },
});
const styles = {
  cardStyles: {
    width: "40%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "50px",
    padding: "20px",
  },
};

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Enter Password")
    .min(6, "Password must be 6 characters long"),
  email: Yup.string().required("Enter Email").email("Enter Correct Email"),
});

class SignIn extends React.Component {
  submitHandler = async (values) => {
    try {
      const user = await Auth.signIn(values.email, values.password);
      console.log('User signed in', {user});
      const { dispatch } = this.props;
      dispatch(loginAction(user));
    } catch (error) {
      console.error('Error signing in', {error});
      toast.error("There was an error signing in to your account. Please try again later.");
    }
  };
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Card style={styles.cardStyles}>
            <Typography
              variant="h3"
              color="primary"
              style={{ textAlign: "center" }}
            >
              Viideon
            </Typography>
            <Formik
              onSubmit={this.submitHandler}
              initialValues={{
                password: "",
                email: "",
              }}
              validationSchema={validationSchema}
            >
              {(formik) => (
                <form
                  onSubmit={formik.handleSubmit}
                  style={{ padding: "10px" }}
                >
                  <div style={{ marginBottom: "30px" }}>
                    <FormControl fullWidth={true}>
                      <InputLabel htmlFor="email">Email</InputLabel>
                      <Input
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="email"
                        aria-describedby="email-helper-text"
                      />
                      <FormHelperText error={true} id="email-helper-text">
                        {formik.touched.email ? formik.errors.email : null}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <div style={{ marginBottom: "30px" }}>
                    <FormControl fullWidth={true}>
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <Input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="password"
                        type="password"
                        id="password"
                        aria-describedby="password-helper-text"
                      />
                      <FormHelperText error={true} id="password-helper-text">
                        {formik.touched.password
                          ? formik.errors.password
                          : null}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      fullWidth={true}
                      disabled={this.props.Authentication.isLoading}
                    >
                      LOGIN
                    </Button>
                  </div>
                </form>
              )}
            </Formik>
          </Card>
        </div>
      </ThemeProvider>
    );
  }
}
const mapStateToProps = (store) => ({
  Authentication: store.Authentication,
});
export default connect(mapStateToProps)(SignIn);
