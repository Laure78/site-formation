import { redirect } from 'next/navigation';

/** Pipeline retiré de l’admin pour simplifier l’interface. */
export default function PipelinePage() {
  redirect('/admin');
}
