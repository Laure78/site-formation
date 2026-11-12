'use client';

import { CopyPromptButton } from '@/components/CopyPromptButton';

type Props = {
  text: string;
};

export function PromptBlockCopyButton({ text }: Props) {
  return (
    <CopyPromptButton
      text={text}
      label="Copier"
      className="min-h-11 border-[#377CF3] bg-[#377CF3] text-white hover:bg-[#2f6bd4]"
    />
  );
}
