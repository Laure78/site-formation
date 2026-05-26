import { FormationIaBatimentTravauxPublicsCourseSchema } from '@/components/schema/CatalogueCourseSchema';

export default function FormationIaBatimentTravauxPublicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FormationIaBatimentTravauxPublicsCourseSchema />
      {children}
    </>
  );
}
