import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import userPic from '/Images/man2.jpg';
import './UserDetails.scss';
function UserDetails({ user }) {
    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item>
              <Avatar
                alt={user.username}
                src={userPic}
                sx={{ width: 80, height: 80 }}
              />
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="h6">
                    <strong>Username:</strong> {user.username}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    <strong>Name:</strong> {user.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    <strong>Email:</strong> {user.email}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    <strong>Phone:</strong> {user.phone}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    <strong>Role:</strong> {user.role}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    <strong>Status:</strong> {user.status}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
}

export default UserDetails;
