import React, { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react';
import axios from 'axios';
import './index.css';

const VirtualMC = forwardRef(({ onSpeakComplete }, ref) => {
  const [mcText, setMcText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [isPrepared, setIsPrepared] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const speak = async (text) => {
    setMcText(text);
    try {
      const response = await axios.post('http://34.124.217.226:5175/api/tts', { text });
      setAudioUrl(response.data.audioUrl);
      setIsPrepared(true);
    } catch (error) {
      console.error('Error fetching audio:', error);
    }
  };

  const playAudio = () => {
    if (audioUrl && isPrepared) {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioUrl);
        audioRef.current.onended = () => {
          setIsSpeaking(false);
          setIsPlaying(false);
          if (onSpeakComplete) {
            onSpeakComplete();
          }
        };
      }
      audioRef.current.play();
      setIsSpeaking(true);
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  useImperativeHandle(ref, () => ({
    speak
  }));

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="virtual-mc-container">
      <div className={`virtual-mc ${isSpeaking ? 'speaking' : ''}`}>
        <img src="/Images/virtual-assistant-software-tools1.jpg" alt="Virtual MC" />
      </div>
      {mcText && <div className="mc-text">{mcText}</div>}
      {isPrepared && (
        <button className="speak-button" onClick={togglePlayPause}>
          {isPlaying ? 'Tạm dừng' : 'Nghe MC'}
        </button>
      )}
    </div>
  );
});

export default VirtualMC;