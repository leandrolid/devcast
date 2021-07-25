/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { usePlayerContext } from '../../contexts/PlayerContext';

import styles from './latestEpisodes.module.scss';

type Episode = {
  id: string,      
  title: string,
  thumbnail: string,
  members:string,
  publishedAt: string,
  duration: number
  durationAsString: string,
  url: string,
}

type LatestEpisodesProps = {
  data: Episode[],
}; 

export function LatestEpisodes({data}: LatestEpisodesProps) {
  const { play } = usePlayerContext();

  return(
    <section className={styles.container}>
      <h2>Últimos Lançamentos</h2>
      <ul>
        {data.map((episode, index) => {          
          return (
            <li key={episode.id}>
              <Image
              width={192}
              height={192}
              src={episode.thumbnail}
              alt={episode.title}
              objectFit="cover"
              />
              <div className={styles.details}>
                <Link href={`/episodes/${episode.id}`}>
                  <a>{episode.title}</a>
                </Link>
                <p>{episode.members}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
              </div>

              <button type="button" onClick={() => play(data, index)}>
                <img src="/play-green.svg" alt="Tocar episódio" />
              </button>
            </li>
          );})}
      </ul>
    </section>
  );
}