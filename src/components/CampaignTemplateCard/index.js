import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from "@material-ui/core";

const CampaignTemplateCard = ({ template }) => {
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
      <CardActions></CardActions>
    </Card>
  );
};

export default CampaignTemplateCard;
