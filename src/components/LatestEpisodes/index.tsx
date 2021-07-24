/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { ReactNode } from 'react';

import styles from './latestEpisodes.module.scss';

type Episode = {
  id: string,      
  title: string,
  thumbnail: string,
  members:string,
  publishedAt: string,
  description: ReactNode,
  duration: number
  durationAsString: string,
  url: string,
}

type LatestEpisodesProps = {
  data: Episode[],
}; 

export function LatestEpisodes({data}: LatestEpisodesProps) {

  return(
    <section className={styles.container}>
      <h2>Últimos Lançamentos</h2>
      <ul>
        {data.map((episode)=> {          
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
                <a href="">{episode.title}</a>
                <p>{episode.members}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
              </div>

              <button>
                <img src="/play-green.svg" alt="Tocar episódio" />
              </button>
            </li>
          );})}
      </ul>
    </section>
  );
}