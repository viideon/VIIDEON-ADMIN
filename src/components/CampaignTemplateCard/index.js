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

const CampaignTemplateCard = ({ template, openUpdateModal }) => {
  const edit = () => {
    openUpdateModal(template);
  };
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Template Thumbnail"
          height="140"
          image={template.templateThumbnailUrl}
        />
        <CardContent style={{ minHeight: "80px", maxHeight: "80px" }}>
          <Typography gutterBottom variant="h5" component="h2">
            {template.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {template.templateDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={edit}>Edit</Button>
      </CardActions>
    </Card>
  );
};

export default CampaignTemplateCard;
