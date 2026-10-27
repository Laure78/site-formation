import { CharteIaBtpDownloadBlock } from '@/components/ressources/CharteIaBtpDownloadBlock';

type Props = {
  className?: string;
  hint?: string;
};

/** @deprecated Préférer CharteIaBtpDownloadBlock sur /ressources/charte-ia-btp */
export function CharteIaBtpDownloadButton({ className = '', hint }: Props) {
  return <CharteIaBtpDownloadBlock className={className} hint={hint} />;
}
