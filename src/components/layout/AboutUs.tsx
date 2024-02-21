import React from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

const AboutUs = () => {
  return (
    <Box className="container" my={5}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" color="#3D0071" gutterBottom>
            About Us
          </Typography>
          <Typography variant="subtitle1" align="center">
            Learn more about our company and team.
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={4} mt={4}>
        <Grid item md={6}>
          <Typography variant="h5" color="#97014C" gutterBottom>
            Our Mission
          </Typography>
          <Typography>
            Our mission is to provide the best services to our customers with a
            focus on reliability and innovation.
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography variant="h5" color="#97014C" gutterBottom>
            Our Vision
          </Typography>
          <Typography>
            Our vision is to become a leading company in our industry, known for
            our commitment to customer satisfaction and excellence in every
            aspect of our business.
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={4} mt={5}>
        {[
          {
            name: "John Doe",
            title: "CEO & Founder",
            img: "../../public/images/employees/m1.jpeg",
          },
          {
            name: "Jane Smith",
            title: "CTO",
            img: "../../public/images/employees/m2.jpeg",
          },
          {
            name: "Emily Johnson",
            title: "Lead Designer",
            img: "../../public/images/employees/m3.jpeg",
          },
        ].map((member, index) => (
          <Grid item lg={4} sm={6} key={index}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                image={member.img}
                alt={member.name}
                sx={{ width: "100%", height: 250, objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6">{member.name}</Typography>
                <Typography>{member.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AboutUs;
