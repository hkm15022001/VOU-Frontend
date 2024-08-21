import "./profile.scss";
import React, { useEffect, useState } from 'react';
import Grid from "@mui/material/Grid";
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import { getEnterprise } from "../../api";

export default function Profile() {
    const [enterprises, setEnterprises] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getEnterprise()
            .then(response => {
                setEnterprises(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('error when call API:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="details" style={{ display: 'flex' }}>
            <div className="home_sidebar" style={{ width: '250px' }}>
                <Sidebar />
            </div>

            <div className="detail_page_main" style={{ flexGrow: 1 }}>
                <Navbar />
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={3}
                        sx={{
                            marginTop: "20vh",
                            width: "100%",
                            paddingX: 2 // Add some padding to avoid touching the edges
                        }}
                    >
                        <Grid item xs={12} md={8} lg={6}>
                            <ProfileCard
                                props={enterprises}
                            />
                        </Grid>
                    </Grid>
                )}
            </div>
        </div>
    );
}
