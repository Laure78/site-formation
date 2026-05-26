import { FormationIaAppelsOffreBtpCourseSchema } from '@/components/schema/CatalogueCourseSchema';

export default function FormationIaAppelsOffreBtpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FormationIaAppelsOffreBtpCourseSchema />
      {children}
    </>
  );
}
