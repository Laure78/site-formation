# Module Messagerie — LMS Laure Olivié

## Vue d'ensemble

Système de messagerie temps réel pour les apprenants et formateurs, intégré à la plateforme de formation.

## Fonctionnalités

### Conversations
- **Discussions de cours** : chat de groupe par formation (accès : inscrits + formateur)
- **Messages privés** : conversations en direct entre apprenants ou apprenant ↔ formateur

### Messages
- Envoi instantané en temps réel (Supabase Realtime)
- Pièces jointes (images, PDF, etc. — max 10 Mo)
- Anti-spam (2 s entre chaque message)
- Emojis et liens

### Rôles
- **Apprenant** : envoie/reçoit dans les discussions de cours, peut initier des conversations privées
- **Formateur** : idem + accès à toutes les formations (même sans inscription)
- **Admin** : modération (suppression de messages, bannissement)

## Architecture technique

### Base de données (migration 009_messaging.sql)
- `conversations` — type course ou direct
- `conversation_participants` — membres, muted, banned
- `messages` — contenu, statut, épinglé, supprimé
- `message_attachments` — pièces jointes
- `typing_indicators` — indicateur de frappe (prévu)
- `unread_counts` — compteur non lus

### API
- `GET /api/conversations` — liste des conversations
- `GET /api/conversations/course/[courseId]` — récupère ou crée la discussion de cours
- `POST /api/conversations/direct` — crée conversation privée (body: `{ otherUserId }`)
- `GET /api/messages?conversationId=` — messages paginés
- `POST /api/messages/send` — envoyer un message
- `POST /api/messages/upload` — upload pièce jointe

### Realtime
Supabase Realtime sur la table `messages`. Activer dans le dashboard :
- Database → Replication → `supabase_realtime` → ajouter la table `messages`

## Déploiement

1. **Exécuter la migration** : `supabase db push` ou manuellement dans SQL Editor
2. **Activer Realtime** : Dashboard Supabase → Database → Replication → ajouter `messages`
3. **Vérifier le bucket Storage** : les pièces jointes utilisent `formations` (existant)

## Accès utilisateur

- **Apprenant** : Espace apprenant → Messages
- **Formateur/Admin** : Admin → Modérer les messages (ou `/messages`)
- URL directe : `/messages`

## Évolutions possibles

- Indicateur de frappe (table `typing_indicators` + Realtime)
- Notifications par email pour messages hors ligne
- Messages vocaux
- Assistant IA dans le chat
- Canaux communautaires
