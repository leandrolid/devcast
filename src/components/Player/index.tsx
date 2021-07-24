/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import styles from './player.module.scss';

export function Player() {

  return (
    <div className={styles.container}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      <div className={styles.emptyPlayer}>
        <strong>Selecione um podcast para ouvir</strong>
      </div>

      <footer className={styles.empty}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            <div className={styles.emptySlider} />
          </div>
          <span>00:00</span>
        </div>

        <div className={styles.controls}>
          <button type="button">
            <Image width="100%" height="100%" src="/shuffle.svg" alt="Embaralhar"/>
          </button>
          <button type="button">
            <Image width="100%" height="100%" src="/play-previous.svg" alt="Tocar anterior"/>
          </button>
          <button type="button" className={styles.play}>
            <Image width="100%" height="100%" src="/play.svg" alt="Tocar"/>
          </button>
          <button type="button">
            <Image width="100%" height="100%" src="/play-next.svg" alt="Tocar próxima"/>
          </button>
          <button type="button">
            <Image width="100%" height="100%" src="/repeat.svg" alt="Repetir"/>
          </button>
        </div>
      </footer>
    </div>
  );
}