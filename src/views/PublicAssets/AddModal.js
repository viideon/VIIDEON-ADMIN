import React from "react";
import { Modal, TextField, Button, IconButton } from "@material-ui/core";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader";
import { Close } from "@material-ui/icons";

const styles = {
  bodyContainer: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "10%",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardContainer: {
    width: "50%",
  },
  saveButtonContainer: {
    display: "flex",
    marginTop: "20px",
    justifyContent: "flex-end",
  },
};

export default function (props) {
  const body = (
    <div style={styles.bodyContainer}>
      <Card style={styles.cardContainer}>
        <CardHeader style={{ paddingTop: 0 }}>
          <div style={styles.cardHeader}>
            <h4>Add New Asset</h4>
            <IconButton onClick={props.closeModal}>
              <Close />
            </IconButton>
          </div>
        </CardHeader>
        <CardBody>
          <form>
            <TextField
              fullWidth={true}
              style={{ marginBottom: "10px" }}
              label="Title"
              variant="outlined"
              value={props.title}
              name="title"
              onChange={props.inputChangeHandler}
            />

            <input
              accept="audio/*"
              style={{ display: "none" }}
              id="contained-button-file"
              multiple
              type="file"
              name="file"
              onChange={props.inputChangeHandler}
            />
            {props.file && <p>{props.file.name}</p>}
            <label htmlFor="contained-button-file">
              <Button
                fullWidth={true}
                variant="contained"
                color="primary"
                component="span"
              >
                Select File
              </Button>
            </label>
          </form>
          <div style={styles.saveButtonContainer}>
            <Button onClick={props.onSaveHander} size="large">
              Save
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
  return (
    <Modal style={{ overflow: "auto" }} open={props.isOpen}>
      {body}
    </Modal>
  );
}
