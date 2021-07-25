import Image from 'next/image';
import Link from 'next/link';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './header.module.scss';

export function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', { locale: ptBR });

  return (
    <header className={styles.container}>
      <Link href="/" passHref>
        <a>
          <Image width="200px" height="100%" src="/logo.svg" alt="Devcast logo" />
        </a>
      </Link>
      <p>O melhor para você ouvir. Sempre!</p>
      <span>{currentDate}</span>
    </header>
  );
}