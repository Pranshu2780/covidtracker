import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./Styles/Info.css"
function Info({ title, cases, total }) {
  return (
    <Card className="infoBox">
      <CardContent>

        <Typography className="infoBox_title" color="textSecondary">
          {title}
        </Typography>
        
        <h2 className="infoBox_cases"> Today's cases {cases} </h2>
        
        <Typography className="infoBox_total" color="textSecondary">
          {total} Total
        </Typography>
      
      </CardContent>
    </Card>
  );
}

export default Info;
