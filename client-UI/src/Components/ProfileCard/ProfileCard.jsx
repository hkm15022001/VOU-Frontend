import React, { useState } from 'react';
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Grid, Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import EditEnterpriseDialog from './EditEnterpriseDialog';

const styles = {
    card: {
        maxWidth: "100%",
        width: "90%",
        margin: "0 auto",
        boxShadow: "0 4px 20px 0 rgba(0,0,0,0.1)",
        borderRadius: "16px",
    },
    details: {
        padding: "1rem",
        borderTop: "1px solid #e1e1e1",
        display: "flex",
        alignItems: "center",
    },
    value: {
        padding: "1rem",
        borderTop: "1px solid #e1e1e1",
        color: "#899499",
        textAlign: "right"
    },
    icon: {
        marginRight: "0.5rem",
        color: "#6c757d",
    },
};

export default function ProfileCard({ props, onUpdate }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleUpdate = (updatedData) => {
        onUpdate(updatedData);
        handleClose();
    };

    return (
        <Card style={styles.card}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                {/* CARD HEADER START */}
                <Grid item sx={{ p: "2rem 0rem", textAlign: "center", bgcolor: "#f8f9fa", width: "100%", borderRadius: "16px 16px 0 0" }}>
                    {/* PROFILE PHOTO */}
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        badgeContent={
                            <PhotoCameraIcon
                                sx={{
                                    border: "5px solid white",
                                    backgroundColor: "#ff558f",
                                    borderRadius: "50%",
                                    padding: ".2rem",
                                    width: 35,
                                    height: 35
                                }}
                            />
                        }
                    >
                        <Avatar
                            sx={{ width: 120, height: 120, mb: 2, boxShadow: "0 4px 10px 0 rgba(0,0,0,0.1)" }}
                            src="https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/pass/best-face-oil.png"
                        />
                    </Badge>

                    {/* DESCRIPTION */}
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>{props.name}</Typography>
                    <Typography variant="subtitle1" color="text.secondary">{props.field}</Typography>
                </Grid>
                {/* CARD HEADER END */}

                {/* DETAILS AND VALUES */}
                <Box sx={{ width: '100%', p: 2 }}>
                    <Grid container>
                        <Grid item xs={12} sm={6} style={styles.details}>
                            <LocationOnIcon style={styles.icon} />
                            <Typography>Location</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography style={styles.value}>{props.location}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={6} style={styles.details}>
                            <GpsFixedIcon style={styles.icon} />
                            <Typography>GPS</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography style={styles.value}>{props.gps}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={6} style={styles.details}>
                            <WorkIcon style={styles.icon} />
                            <Typography>Field</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography style={styles.value}>{props.field}</Typography>
                        </Grid>
                    </Grid>
                </Box>

                {/* BUTTON */}
                <Grid item sx={{ width: "100%", textAlign: "center", p: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={handleOpen}
                        sx={{ 
                            width: "90%", 
                            p: 1.5, 
                            my: 2, 
                            borderRadius: "25px",
                            textTransform: "none",
                            fontSize: "1rem",
                            boxShadow: "0 4px 10px 0 rgba(0,0,0,0.1)",
                            '&:hover': {
                                boxShadow: "0 6px 15px 0 rgba(0,0,0,0.15)",
                            }
                        }}
                    >
                        Edit Profile
                    </Button>
                </Grid>
            </Grid>
            <EditEnterpriseDialog
                open={open}
                handleClose={handleClose}
                data={props}
                onUpdate={handleUpdate}
            />
        </Card>
    );
}