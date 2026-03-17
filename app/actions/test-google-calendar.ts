'use server';

import { testGoogleCalendarConnection } from '@/lib/google-calendar';

export async function testGoogleCalendarAction() {
  return testGoogleCalendarConnection();
}
