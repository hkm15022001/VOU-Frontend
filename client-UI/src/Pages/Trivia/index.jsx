import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Box
} from '@mui/material';
import { styled } from '@mui/system';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { getAllTurns, playEvent } from '../../api';
const StyledCard = styled(Card)(({ theme }) => ({
    width: 300,
    margin: 'auto',
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    background: 'rgba(255, 255, 255, 0.9)',
    // boxShadow: theme.shadows[5],
}));

const BackgroundBox = styled(Box)({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to right, #8E2DE2, #4A00E0)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
});

const TriviaLobby = () => {
    const { eventId } = useParams();
    const [remainingTurns, setRemainingTurns] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRemainingTurns();
    }, []);

    const fetchRemainingTurns = async () => {
        try {
            const response = await getAllTurns(eventId);
            setRemainingTurns(response.data.data.turn);
        } catch (error) {
            console.error('Error fetching remaining turns:', error);
        }
    };

    const handlePlayClick = async () => {
        setIsLoading(true);
        try {
            const response = await playEvent(eventId, { "number": 1 });
            if (response.data.message === 'success') {
                navigate(`/end-user/game/triviabox`,{ state: { eventId } });
            } else {
                alert('Không thể bắt đầu trò chơi. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Error starting game:', error);
            alert('Đã xảy ra lỗi. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <BackgroundBox>
            <StyledCard>
                <CardContent>
                    <Typography variant="h4" component="div" gutterBottom align="center">
                        Trivia Game Lobby
                    </Typography>
                    <Typography variant="h6" align="center">
                        Số lượt chơi còn lại: {remainingTurns}
                    </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SportsEsportsIcon />}
                        onClick={handlePlayClick}
                        disabled={isLoading || remainingTurns <= 0}
                    >
                        {isLoading ? 'Đang tải...' : 'Chơi ngay!'}
                    </Button>
                </CardActions>
            </StyledCard>
        </BackgroundBox>
    );
};

export default TriviaLobby;