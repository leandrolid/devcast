/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { usePlayerContext } from '../../contexts/PlayerContext';

import styles from './allEpisodes.module.scss';

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

type AllEpisodesProps = {
  data: Episode[],
}; 

export function AllEpisodes({data}: AllEpisodesProps) {
  const { play, togglePlayerPositionDefault } = usePlayerContext();  

  return(
    <section className={styles.container}>
      <h2>Todos episódios</h2>

      <table cellSpacing={0}>
        <thead>
          <tr>
            <th>Capa</th>
            <th className={styles.title}>Podcast</th>
            <th className={styles.members} title="Integrantes">Integrantes</th>
            <th>Data</th>
            <th className={styles.duration}>Duração</th>
            <th>Tocar</th>
          </tr>
        </thead>

        <tbody>
        {data.map((episode, index)=> {          
          return (
            <tr key={episode.id} className={styles.details}>

              <td className={styles.image}>
                <Image
                width={120}
                height={120}
                src={episode.thumbnail}
                alt={episode.title}
                objectFit="cover"
                />
              </td>

              <td className={styles.title}>
                <Link href={`/episodes/${episode.id}`}>
                  <a title={episode.title}>{episode.title}</a>
                </Link>
              </td>

              <td className={styles.members} title={episode.members}>
                {episode.members}
              </td>

              <td className={styles.date}>
                {episode.publishedAt}
              </td>

              <td className={styles.duration}>
                {episode.durationAsString}
              </td>

              <td>
              <button type="button" onClick={() => { 
                play(data, index);
                togglePlayerPositionDefault();
              }}>
                <img src="/play-green.svg" alt="Tocar episódio" />
              </button>
              </td>

            </tr>
          );})}

        </tbody>
        
      </table>
    </section>
  );
}