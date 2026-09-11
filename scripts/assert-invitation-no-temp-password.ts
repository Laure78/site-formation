/**
 * Contrôles — invitation sans mot de passe temporaire.
 * Usage : `npx tsx scripts/assert-invitation-no-temp-password.ts`
 */
import assert from 'node:assert/strict';
import {
  invitationEmailSubject,
  invitationEmailText,
} from '../emails/InvitationApprenantEmail';
import { inviteApprenantSchema } from '../lib/invitation';

console.log('assert-invitation-no-temp-password…');

assert.equal(
  invitationEmailSubject('Test'),
  'Votre accès à votre espace de formation – Laure Olivié'
);

const textNew = invitationEmailText({
  formationTitle: 'IA BTP',
  inviteUrl: 'https://www.laureolivie.fr/invitation/tokentest',
  loginUrl: 'https://www.laureolivie.fr/auth/connexion',
  email: 'prenom.nom@email.fr',
  firstName: 'Marie',
  accountAlreadyActive: false,
});

assert.match(textNew, /prenom\.nom@email\.fr/);
assert.match(textNew, /Créer|créer votre mot de passe|créer/i);
assert.match(textNew, /invitation\/tokentest/);
assert.doesNotMatch(textNew, /mot de passe temporaire/i);
assert.doesNotMatch(textNew, /temporaryPassword/i);
assert.doesNotMatch(textNew, /XXXX-/);
assert.doesNotMatch(textNew, /undefined|null/);

const textActive = invitationEmailText({
  formationTitle: 'Claude BTP',
  inviteUrl: 'https://www.laureolivie.fr/invitation/unused',
  loginUrl: 'https://www.laureolivie.fr/auth/connexion',
  email: 'deja@actif.fr',
  firstName: null,
  accountAlreadyActive: true,
});
assert.match(textActive, /^Bonjour,/);
assert.match(textActive, /nouvelle formation/i);
assert.doesNotMatch(textActive, /mot de passe temporaire/i);

const parsed = inviteApprenantSchema.safeParse({
  email: ' Prenom.Nom@Email.FR ',
  firstName: 'Prénom',
  lastName: 'Nom',
  formationId: '00000000-0000-4000-8000-000000000001',
  action: 'create',
});
assert.equal(parsed.success, true);
if (parsed.success) {
  assert.equal(parsed.data.email, 'prenom.nom@email.fr');
  assert.equal('includePassword' in parsed.data, false);
}

const badEmail = inviteApprenantSchema.safeParse({
  email: 'pas-un-email',
  firstName: 'A',
  lastName: 'B',
  formationId: '00000000-0000-4000-8000-000000000001',
});
assert.equal(badEmail.success, false);

console.log('OK — assert-invitation-no-temp-password');
