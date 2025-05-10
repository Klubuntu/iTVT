
"use client"
import React, { useRef, useState, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Hls from 'hls.js';
import Image from 'next/image';

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const placeholderVideo = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isVideoAvailable, setIsVideoAvailable] = useState(false);
  const [videoInitialized, setVideoInitialized] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
  
    const handleError = (event) => {
      const error = event?.details || '';
      console.log(error);
      if (error.includes('manifestLoadError')) {
        setIsVideoAvailable(false);
      }
    };




  }, [src]);
  

  useEffect(() => {
    if (isVideoAvailable) {
      // playerRef.current.play().catch(error => {
      //   console.error('Error attempting to play the video:', error);
      //   setIsVideoAvailable(false);
      // });
      const setupVideo = () => {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(src);
          hls.attachMedia(videoElement);
          hls.on(Hls.Events.ERROR, (event, data) => {
            console.error('HLS error:', event, data);
            if (data.fatal) {
              switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                  console.error('HLS network error.');
                  break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                  console.error('HLS media error.');
                  break;
                default:
                  console.error('HLS unknown error.');
                  break;
              }
              placeholderVideo.current.src = "/static/img/stream_offline.png";
              setIsVideoAvailable(true);
            }
          });
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            videoElement.play().catch(error => {
              console.error('Error attempting to play the video:', error);
              setIsVideoAvailable(false);
            });
            setDuration(videoElement.duration);
            setIsVideoAvailable(true);
          });
        } else {
          console.error('HLS is not supported on this browser.');
          setIsVideoAvailable(false);
        }
      };
      const videoElement = videoRef.current;
      if (videoElement && !playerRef.current) {
        setupVideo();
        const player = playerRef.current = videojs(videoElement);
        var myButton = player.controlBar.addChild("button");
        moveControls(myButton);
    
        player.on('timeupdate', () => {
          setCurrentTime(player.currentTime());
          setDuration(player.duration());
        });
    
        player.on('fullscreenchange', () => {
          setIsFullscreen(player.isFullscreen());
        });
    
        return () => {
          if (playerRef.current) {
            playerRef.current.dispose();
            playerRef.current = null;
          }
        };
      }
      console.log("SETUPPED");
    }
  }, [isVideoAvailable, videoInitialized]);

  const handlePlayToggle = () => {
    if (playerRef.current) {
      if (playerRef.current.paused()) {
        playerRef.current.play().catch(error => {
          console.error('Error attempting to play the video:', error);
          setIsVideoAvailable(false);
        });
        setIsPlaying(true);
      } else {
        playerRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleForward = () => {
    if (playerRef.current) {
      playerRef.current.currentTime(playerRef.current.currentTime() + 10);
    }
  };

  const handleReplay = () => {
    if (playerRef.current) {
      playerRef.current.currentTime(playerRef.current.currentTime() - 10);
    }
  };

  const handleFullscreenToggle = () => {
    if (playerRef.current) {
      if (isFullscreen) {
        playerRef.current.exitFullscreen();
      } else {
        playerRef.current.requestFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    if (playerRef.current) {
      playerRef.current.currentTime(newTime);
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
      targetElement.style.position = "absolute";
      targetElement.innerHTML = `<div className="video-controls">${controls.innerHTML}</div>`;
      
      addEventListeners(targetElement.getElementsByclassNameName('video-replay'), '.video-replay');
      addEventListeners(targetElement.getElementsByclassNameName('video-play'), '.video-play');
      addEventListeners(targetElement.getElementsByclassNameName('video-forward'), '.video-forward');
      addEventListeners(targetElement.getElementsByclassNameName('video-fs'), '.video-fs');
    } else {
      console.error('Controls or target element not found');
    }
  };

  const setVideo = () => {
    setIsVideoAvailable(true);
  }

  return (
    <div>
      <div className="video-container">
        {isVideoAvailable ? (
          <video ref={videoRef} className="video-js vjs-default-skin" autoPlay />
        ) : (
          <Image ref={placeholderVideo} src="/static/img/stream_offline.png" width={640} height={360} alt="stream offline" />
        )}
      </div>
      <div id="controls" style={{ display: 'none' }}>
        <Image onClick={handleReplay} className="video-replay" src="/static/icons/ic_backward.png" width={30} height={30} alt="backward_10sec"/>
        <Image onClick={handlePlayToggle} className="video-play" src={isPlaying ? "/static/icons/ic_pause.png": "/static/icons/ic_play.png"} width={30} height={30} alt="play_pause"/>
        <Image onClick={handleForward} className="video-forward" src="/static/icons/ic_forward.png" width={30} height={30} alt="forward_10sec"/>
        <Image onClick={handleFullscreenToggle} className="video-fs" src="/static/icons/ic_fs.png" width={30} height={30} alt="fullscreen"/>
      </div>
      <Image onClick={handlePlayToggle} className="video-play" src={isPlaying ? "/static/icons/ic_pause.png": "/static/icons/ic_play.png"} width={30} height={30} alt="play_pause"/>
      <button id="move-controls-button" onClick={setVideo}>Move Controls</button>
      <div id="custom-controls" style={{ marginTop: '10px' }}></div>
      <div className="progress-container">
        <div className="time-display">
          <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={duration.toString()}
          value={currentTime}
          onChange={handleProgressChange}
          step={1}
          className="progress-bar"
          style={{ width: "80%" }}
        />
      </div>

    </div>
  );
};

export default VideoPlayer;


