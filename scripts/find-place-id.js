/**
 * Script pour trouver le Place ID Google de votre établissement
 * 
 * Usage :
 * 1. Obtenir une clé API Google Places sur https://console.cloud.google.com/
 * 2. Remplacer 'VOTRE_CLE_API' ci-dessous
 * 3. Lancer : node scripts/find-place-id.js
 */

const API_KEY = 'VOTRE_CLE_API'; // ⚠️ Remplacer par votre clé API
const RECHERCHE = 'Formation IA BTP Laure Olivié Montigny-le-Bretonneux';

async function findPlaceId() {
  try {
    console.log('🔍 Recherche en cours...\n');
    
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(RECHERCHE)}&inputtype=textquery&fields=place_id,name,formatted_address,rating,user_ratings_total&key=${API_KEY}`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.candidates && data.candidates.length > 0) {
      const place = data.candidates[0];
      
      console.log('✅ Établissement trouvé !\n');
      console.log('📍 Nom:', place.name);
      console.log('📫 Adresse:', place.formatted_address);
      console.log('⭐ Note:', place.rating || 'N/A');
      console.log('👥 Nombre d\'avis:', place.user_ratings_total || 'N/A');
      console.log('\n🔑 Place ID:', place.place_id);
      
      console.log('\n📋 Ajoutez cette ligne dans votre fichier .env.local :');
      console.log(`GOOGLE_PLACE_ID="${place.place_id}"`);
      
    } else if (data.status === 'ZERO_RESULTS') {
      console.log('❌ Aucun résultat trouvé.');
      console.log('💡 Essayez de modifier la recherche ou vérifiez que votre fiche Google Business est bien active.');
    } else if (data.status === 'REQUEST_DENIED') {
      console.log('❌ Requête refusée.');
      console.log('💡 Vérifiez que :');
      console.log('   - Votre clé API est correcte');
      console.log('   - L\'API Places est activée sur votre projet Google Cloud');
      console.log('   - Les restrictions de clé API autorisent les requêtes depuis votre IP');
    } else {
      console.log('❌ Erreur:', data.status);
      console.log(data);
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la requête:', error.message);
  }
}

// Vérifier que la clé API est renseignée
if (API_KEY === 'VOTRE_CLE_API') {
  console.log('⚠️  Veuillez renseigner votre clé API Google Places dans le script.');
  console.log('\n📚 Guide pour obtenir une clé API :');
  console.log('1. Aller sur https://console.cloud.google.com/');
  console.log('2. Créer un projet ou sélectionner un projet existant');
  console.log('3. Activer l\'API "Places API"');
  console.log('4. Aller dans "Identifiants" et créer une clé API');
  console.log('5. Copier la clé et la coller dans ce script\n');
  process.exit(1);
}

findPlaceId();
