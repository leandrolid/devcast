/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react';

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

  return(
    <section className={styles.container}>
      <h2>Todos episódios</h2>

      <table cellSpacing={0}>
        <thead>
          <tr>
            <th colSpan={2}>Podcast</th>
            <th>Integrantes</th>
            <th>Data</th>
            <th>Duração</th>
            <th>Tocar</th>
          </tr>
        </thead>

        <tbody>
        {data.map((episode)=> {          
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

              <td>
                <Link href={`/episodes/${episode.id}`} >
                  <a>{episode.title}</a>
                </Link>
              </td>

              <td>
                {episode.members}
              </td>

              <td className={styles.date}>
                {episode.publishedAt}
              </td>

              <td >
                {episode.durationAsString}
              </td>

              <td>
              <button type="button">
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