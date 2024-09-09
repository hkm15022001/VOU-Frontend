import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, HelpCircle, Award, Repeat, PlayCircle } from 'lucide-react';
import {
    Box,
    Typography,
    Button,
    Paper,
    Alert,
    AlertTitle,
    Container
} from '@mui/material';
const StyledPaper = styled(Paper)({
    padding: '32px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    maxWidth: '400px',
    width: '100%',
});

const StyledButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isCorrect',
})(({ isSelected, isCorrect }) => ({
    justifyContent: 'flex-start',
    textAlign: 'left',
    marginBottom: '12px',
    backgroundColor: isSelected
        ? isCorrect
            ? '#4caf50'
            : '#f44336'
        : '#f5f5f5',
    color: isSelected ? '#ffffff' : '#000000',
    '&:hover': {
        backgroundColor: isSelected
            ? isCorrect
                ? '#45a049'
                : '#d32f2f'
            : '#e0e0e0',
    },
}));

const VirtualMC = React.forwardRef((props, ref) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const audioRef = useRef(new Audio());

    React.useImperativeHandle(ref, () => ({
        speak: async (text) => {
            try {
                setIsSpeaking(true);
                const response = await axios.post('http://34.124.217.226:5175/api/tts', { text });
                const audioUrl = response.data.audioUrl;
                
                audioRef.current.src = audioUrl;
                audioRef.current.onended = () => {
                    setIsSpeaking(false);
                    props.onSpeakComplete();
                };
                await audioRef.current.play();
            } catch (error) {
                console.error('Error in text-to-speech:', error);
                setIsSpeaking(false);
                props.onSpeakComplete();
            }
        }
    }));

    return (
        <Box
            component={motion.div}
            sx={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                width: 120,
                height: 120,
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
            }}
            animate={{
                scale: isSpeaking ? [1, 1.1, 1] : 1,
                rotate: isSpeaking ? [0, 5, -5, 0] : 0,
            }}
            transition={{
                duration: 0.5,
                repeat: isSpeaking ? Infinity : 0,
                repeatType: "loop"
            }}
        >
            <Box
                component="img"
                src="/Images/virtual-assistant-software-tools1.jpg"
                alt="Virtual MC"
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
            />
            {isSpeaking && (
                <Box
                    component={motion.div}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    }}
                    animate={{
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                    }}
                />
            )}
        </Box>
    );
});
