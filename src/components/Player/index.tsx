/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useEffect, useRef } from 'react';

import { usePlayerContext } from '../../contexts/PlayerContext';

import styles from './player.module.scss';

export function Player() {
  const { 
    episodes,
    currentEpisodeIndex,
    isPlaying,
    handleNext,
    togglePlayButton,
    togglePlayingState
  } = usePlayerContext();

  const episode = episodes[currentEpisodeIndex];

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if( !audioRef.current ) return ;
    
    if (isPlaying) {
      audioRef.current.play();
    } else if (!isPlaying) {
      audioRef.current.pause(); 
      
    }
    
  },[isPlaying]);

  return (
    <div className={styles.container}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      { episode ? (
        <div className={styles.currentEpisode}>
          <Image
          width={592}
          height={592}
          src={episode.thumbnail}
          alt={episode.title}
          objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}
      

      <footer className={ !episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            { episode ? (
              <>
                <Slider
                trackStyle={{
                  backgroundColor: 'var(--green-500)'
                }}
                railStyle={{
                  backgroundColor: 'var(--purple-300)'
                }}
                handleStyle={{
                  borderColor: 'var(--green-500)', borderWidth: 4
                }}
                />

                <audio
                ref={audioRef}
                src={episode.url}
                autoPlay
                onPlay={() => togglePlayingState(true)}
                onPause={() => togglePlayingState(false)}
                />
              </>
            ) : (
              <div className={styles.emptySlider} />
            ) }
          </div>
          <span>00:00</span>
        </div>

        <div className={styles.controls}>
          <button type="button" disabled={ !episode }>
            <img src="/shuffle.svg" alt="Embaralhar"/>
          </button>
          <button type="button" disabled={ !episode }>
            <img src="/play-previous.svg" alt="Tocar anterior"/>
          </button>
          { isPlaying ? (
            <button
            type="button"
            className={styles.play}
            disabled={ !episode }
            onClick={() => togglePlayButton()}
            >
              <img src="/pause.svg" alt="Pausar"/>
            </button>
          ) : (
            <button
            type="button"
            className={styles.play}
            disabled={ !episode }
            onClick={() => togglePlayButton()}
            >
              <img src="/play.svg" alt="Tocar"/>
            </button>
          ) }
          <button type="button" onClick={() => handleNext()} disabled={ !episode }>
            <img src="/play-next.svg" alt="Tocar próxima"/>
          </button>
          <button type="button" disabled={ !episode }>
            <img src="/repeat.svg" alt="Repetir"/>
          </button>
        </div>
      </footer>
    </div>
  );
}