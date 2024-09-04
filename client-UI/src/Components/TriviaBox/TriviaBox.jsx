import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, HelpCircle, Award, Repeat, PlayCircle, ArrowLeft, Gift } from 'lucide-react';
import axios from 'axios';
import {
    Box,
    Typography,
    Button,
    Paper,
    Alert,
    AlertTitle,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    CardMedia,
    CircularProgress,
    Modal
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate, useLocation } from 'react-router-dom';
import { BackEndAddress, getVouchers, tradeVoucherQuiz } from '../../api';

const questions = [
    {
        question: "Thủ đô của Việt Nam là gì?",
        options: ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Huế"],
        correctAnswer: "Hà Nội"
    },
    {
        question: "Năm bao nhiêu Việt Nam giành độc lập?",
        options: ["1945", "1954", "1975", "1986"],
        correctAnswer: "1945"
    },
    {
        question: "Sông nào dài nhất Việt Nam?",
        options: ["Sông Hồng", "Sông Mekong", "Sông Đà", "Sông Đồng Nai"],
        correctAnswer: "Sông Mekong"
    }
];

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
                src="/src/Images/virtual-assistant-software-tools1.jpg"
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

const TriviaBox = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const virtualMCRef = useRef(null);
    const [isMCSpeaking, setIsMCSpeaking] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { eventId } = location.state || {};
    // New states for voucher dialog
    const [openVoucherDialog, setOpenVoucherDialog] = useState(false);
    const [vouchers, setVouchers] = useState([]);
    const [isExchangingVoucher, setIsExchangingVoucher] = useState(false);
    const [qrCodeImage, setQrCodeImage] = useState(null);
    const [openQrCodeModal, setOpenQrCodeModal] = useState(false);

    useEffect(() => {
        document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundAttachment = "fixed";

        return () => {
            document.body.style.backgroundImage = "none";
        };
    }, []);

    const speakWithMC = (text) => {
        setIsMCSpeaking(true);
        virtualMCRef.current.speak(text);
    };

    const startGame = () => {
        setGameStarted(true);
        speakWithMC("Chào mừng bạn đến với trò chơi Câu đố. Hãy chuẩn bị cho câu hỏi đầu tiên.");
        setTimeout(() => {
            speakWithMC(questions[currentQuestion].question);
        }, 3000);
    };

    const handleAnswerClick = (answer) => {
        if (isMCSpeaking) return;

        setSelectedAnswer(answer);
        const correct = answer === questions[currentQuestion].correctAnswer;
        setIsCorrect(correct);

        if (correct) {
            setScore(score + 1);
            speakWithMC("Chính xác! Bạn thật thông minh.");
        } else {
            speakWithMC(`Rất tiếc, câu trả lời chưa đúng. Đáp án đúng là ${questions[currentQuestion].correctAnswer}.`);
        }

        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion);
                setSelectedAnswer(null);
                setIsCorrect(null);
                setTimeout(() => {
                    speakWithMC(questions[nextQuestion].question);
                }, 2000);
            } else {
                setShowScore(true);
                speakWithMC(`Trò chơi kết thúc. Bạn đã trả lời đúng ${score + (correct ? 1 : 0)} trên ${questions.length} câu hỏi.`);
            }
        }, 3000);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setSelectedAnswer(null);
        setIsCorrect(null);
        speakWithMC("Hãy bắt đầu lại nào! Chúc bạn may mắn.");
        setTimeout(() => {
            speakWithMC(questions[0].question);
        }, 2000);
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -50, transition: { duration: 0.5 } }
    };

    const buttonVariants = {
        hover: { scale: 1.05, transition: { duration: 0.2 } },
        tap: { scale: 0.95, transition: { duration: 0.2 } }
    };

    const handleSpeakComplete = () => {
        setIsMCSpeaking(false);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleOpenVoucherDialog = async () => {
        try {
            const response = await getVouchers(eventId); 
            setVouchers(response.data.data || []);
            setOpenVoucherDialog(true);
        } catch (error) {
            console.error('Failed to fetch vouchers:', error);
            // Show error message
        }
    };

    const handleCloseVoucherDialog = () => {
        setOpenVoucherDialog(false);
    };

    const handleTradeVoucher = async (voucherId) => {
        try {
            setIsExchangingVoucher(true);
            const response = await tradeVoucherQuiz({ 
                "voucher_id": voucherId, 
                "score": 200
            });
            setQrCodeImage(response.data.data);
            handleCloseVoucherDialog();
            setOpenQrCodeModal(true);
        } catch (error) {
            console.error('Failed to trade voucher:', error);
            // Show error message
        } finally {
            setIsExchangingVoucher(false);
        }
    };

    const handleCloseQrCodeModal = () => {
        setOpenQrCodeModal(false);
        setQrCodeImage(null);
        navigate(-1);
    };

    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}
        >
            <VirtualMC ref={virtualMCRef} onSpeakComplete={handleSpeakComplete} />

            <AnimatePresence mode="wait">
                <motion.div
                    key={gameStarted ? currentQuestion : 'start'}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <StyledPaper elevation={3}>
                        {!gameStarted ? (
                            <Box textAlign="center">
                                <Typography variant="h4" gutterBottom>Trò chơi Câu đố</Typography>
                                <Typography variant="body1" gutterBottom>
                                    Nhấn nút bên dưới để bắt đầu trò chơi!
                                </Typography>
                                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={startGame}
                                        startIcon={<PlayCircle />}
                                    >
                                        Bắt đầu
                                    </Button>
                                </motion.div>
                            </Box>
                        ) : showScore ? (
                            <Box textAlign="center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                >
                                    <Award style={{ width: 64, height: 64, color: '#FFD700', margin: '0 auto 16px' }} />
                                </motion.div>
                                <Typography variant="h4" gutterBottom>Kết quả</Typography>
                                <Typography variant="h6" gutterBottom>
                                    Bạn đã trả lời đúng {score} / {questions.length} câu hỏi
                                </Typography>
                                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                                    {score < 1 ? (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleGoBack}
                                            startIcon={<ArrowLeft />}
                                        >
                                            Quay về
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleOpenVoucherDialog}
                                            startIcon={<Gift />}
                                        >
                                            Đổi thưởng
                                        </Button>
                                    )}
                                </motion.div>
                            </Box>
                        )  : (
                            <>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                                    <Typography variant="h6">
                                        Câu hỏi {currentQuestion + 1}/{questions.length}
                                    </Typography>
                                    <HelpCircle style={{ color: '#2196F3' }} />
                                </Box>
                                <Typography variant="body1" gutterBottom>
                                    {questions[currentQuestion].question}
                                </Typography>
                                <Box mt={3}>
                                    {questions[currentQuestion].options.map((option, index) => (
                                        <motion.div key={index} variants={buttonVariants} whileHover="hover" whileTap="tap">
                                            <StyledButton
                                                fullWidth
                                                variant="contained"
                                                onClick={() => handleAnswerClick(option)}
                                                disabled={selectedAnswer !== null || isMCSpeaking}
                                                isSelected={selectedAnswer === option}
                                                isCorrect={isCorrect}
                                            >
                                                {option}
                                            </StyledButton>
                                        </motion.div>
                                    ))}
                                </Box>
                                {isCorrect !== null && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Alert
                                            severity={isCorrect ? "success" : "error"}
                                            sx={{ mt: 3 }}
                                        >
                                            <AlertTitle>
                                                {isCorrect ? "Chính xác!" : "Rất tiếc, câu trả lời chưa đúng."}
                                            </AlertTitle>
                                        </Alert>
                                    </motion.div>
                                )}
                            </>
                        )}
                    </StyledPaper>
                </motion.div>
            </AnimatePresence>
            <Dialog open={openVoucherDialog} onClose={handleCloseVoucherDialog}>
                <DialogTitle>Danh sách Voucher</DialogTitle>
                <DialogContent>
                    <List>
                        {vouchers.map((voucher) => (
                            <ListItem key={voucher.id}>
                                <ListItemText primary={voucher.name} secondary={voucher.description} />
                                <CardMedia
                                    component="img"
                                    height="20"
                                    image={`${BackEndAddress}/image/voucherimage/${voucher.images}`}
                                    alt={voucher.name}
                                    sx={{
                                        transition: 'transform 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                        },
                                    }}
                                />
                                <Button
                                    onClick={() => handleTradeVoucher(voucher.id)}
                                    disabled={isExchangingVoucher}
                                >
                                    {isExchangingVoucher ? <CircularProgress size={24} /> : 'Đổi'}
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseVoucherDialog} disabled={isExchangingVoucher}>Đóng</Button>
                </DialogActions>
            </Dialog>

            <Modal
                open={openQrCodeModal}
                onClose={handleCloseQrCodeModal}
                aria-labelledby="qr-code-modal-title"
                aria-describedby="qr-code-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    textAlign: 'center',
                    color: 'black'
                }}>
                    <Typography id="qr-code-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                        Chúc mừng bạn đã đổi voucher thành công!
                    </Typography>
                    <Typography id="qr-code-modal-description" sx={{ mt: 2, mb: 2 }}>
                        Hãy sử dụng mã QR code này để nhận phần thưởng của bạn.
                    </Typography>
                    {qrCodeImage && (
                        <img src={`${BackEndAddress}/image/vouchercode/${qrCodeImage}`} alt="QR Code" style={{ maxWidth: '100%', height: 'auto' }} />
                    )}
                    <Button onClick={handleCloseQrCodeModal} sx={{ mt: 2 }}>Đóng</Button>
                </Box>
            </Modal>
        </Container>
    );
};

export default TriviaBox;