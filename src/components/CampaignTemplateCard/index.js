import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button
} from "@material-ui/core";

const CampaignTemplateCard = ({ template, openUpdateModal, handleDelete }) => {
  const edit = () => {
    openUpdateModal(template);
  };
  const imgUrl = template.thumbnailUrl ? template.thumbnailUrl : template.templateThumbnailUrl;
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Template Thumbnail"
          height="140"
          image={imgUrl}
        />
        <CardContent style={{ minHeight: "80px", maxHeight: "80px" }}>
          <Typography gutterBottom variant="h5" component="h2">
            {template.name}
          </Typography>
          {
            template.templateDescription &&
            <Typography variant="body2" color="textSecondary" component="p">
              {template.templateDescription.length > 65 ? template.templateDescription.substr(0, 65) + " ..." : template.templateDescription}
            </Typography>
          }
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={edit}>Edit</Button>
        <Button color="secondary" data-confirm="Are you sure to delete this item?" onClick={() => {window.confirm("Are you sure to delete?") && handleDelete(template)}}>Delete</Button>
      </CardActions>
    </Card>
  );
};

export default CampaignTemplateCard;
