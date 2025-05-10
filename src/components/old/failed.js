"use client"
import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import Image from 'next/image';
import { useVideoJS } from 'react-hook-videojs';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isVideoAvailable, setIsVideoAvailable] = useState(true);

  const { player } = useVideoJS(videoRef, {
    controls: false, // Disable default controls
    autoplay: false,
    sources: [{ src, type: 'application/x-mpegURL' }],
  });

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleError = (event) => {
      const error = event?.details  || '';
      if (error.includes('manifestLoadError')) {
        setIsVideoAvailable(false);
      }
    };

    const setupVideo = () => {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoElement);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoElement.play().catch(error => {
            console.error('Error attempting to play the video:', error);
            setIsVideoAvailable(false);
          });
          setDuration(videoElement.duration);
        });
        hls.on(Hls.Events.ERROR, (event, data) => {
          handleError(data);
        });
      } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        videoElement.src = src;
        videoElement.addEventListener('loadedmetadata', () => {
          videoElement.play().catch(error => {
            console.error('Error attempting to play the video:', error);
            setIsVideoAvailable(false);
          });
          setDuration(videoElement.duration);
        });
        videoElement.addEventListener('error', handleError);
      }
    };

    if (isVideoAvailable) {
      setupVideo();

      if (player) {
        player.on('timeupdate', () => {
          setCurrentTime(player.currentTime());
          setDuration(player.duration());
        });
      }

      playerRef.current = player;

      // Copy custom controls after component mounts
      moveControls({ el: () => document.getElementById('custom-controls') });

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
        }
      };
    }
  }, [src, isVideoAvailable, player]);

  const handlePlayToggle = () => {
    if (player) {
      if (player.paused()) {
        player.play().catch(error => {
          console.error('Error attempting to play the video:', error);
          setIsVideoAvailable(false);
        });
        setIsPlaying(true);
      } else {
        player.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleForward = () => {
    if (player) {
      player.currentTime(player.currentTime() + 10);
    }
  };

  const handleReplay = () => {
    if (player) {
      player.currentTime(player.currentTime() - 10);
    }
  };

  const handleFullscreenToggle = () => {
    if (player) {
      if (isFullscreen) {
        player.exitFullscreen();
      } else {
        player.requestFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    if (player) {
      player.currentTime(newTime);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) {
      return '0:00';
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const addEventListeners = (targetElements, originalSelector) => {
    for (let i = 0; i < targetElements.length; i++) {
      targetElements[i].addEventListener('click', () => {
        const originalElement = document.querySelector(`#controls ${originalSelector}`);
        if (originalElement) {
          originalElement.click();
        }
      });
    }
  };

  const moveControls = (button) => {
    const controls = document.getElementById('controls');
    const targetElement = button.el();

    if (controls && targetElement) {
      targetElement.style.position = 'absolute';
      targetElement.innerHTML = `<div className="video-controls">${controls.innerHTML}</div>`;

      addEventListeners(targetElement.getElementsByclassNameName('video-replay'), '.video-replay');
      addEventListeners(targetElement.getElementsByclassNameName('video-play'), '.video-play');
      addEventListeners(targetElement.getElementsByclassNameName('video-forward'), '.video-forward');
      addEventListeners(targetElement.getElementsByclassNameName('video-fs'), '.video-fs');
    } else {
      console.error('Controls or target element not found');
    }
  };

  return (
    <div>
      <div className="video-container">
        {isVideoAvailable ? (
          <video ref={videoRef} className="video-js vjs-default-skin" />
        ) : (
          <Image src="/static/img/stream_offline.png" width={640} height={360} alt="stream offline" />
        )}
      </div>
      <div id="controls" style={{ display: 'none' }}>
        <Image onClick={handleReplay} className="video-replay" src="/static/icons/ic_backward.png" width={30} height={30} alt="backward_10sec" />
        <Image onClick={handlePlayToggle} className="video-play" src={isPlaying ? '/static/icons/ic_pause.png' : '/static/icons/ic_play.png'} width={30} height={30} alt="play_pause" />
        <Image onClick={handleForward} className="video-forward" src="/static/icons/ic_forward.png" width={30} height={30} alt="forward_10sec" />
        <Image onClick={handleFullscreenToggle} className="video-fs" src="/static/icons/ic_fs.png" width={30} height={30} alt="fullscreen" />
      </div>
      <div id="custom-controls" style={{ marginTop: '10px', display: 'none' }}></div>
      <div className="progress-container">
        <input
          type="range"
          min={0}
          max={duration.toString()}
          value={currentTime}
          onChange={handleProgressChange}
          step={1}
          className="progress-bar"
          style={{ width: '80%' }}
        />
      </div>
      <div className="time-display">
        <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default VideoPlayer;
