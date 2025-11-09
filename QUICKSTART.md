# Guide de Démarrage Rapide - HYADES Formations

## 🚀 Lancement Rapide

### Option 1: Script automatique (Recommandé)

```bash
./start-all.sh
```

Ce script lance automatiquement :
- Le serveur PDF (backend) sur le port 3003
- Le serveur frontend (Vue.js) sur le port 5174

Appuyez sur `Ctrl+C` pour arrêter tous les serveurs.

### Option 2: Lancement Manuel

**Terminal 1 - Backend PDF:**
```bash
cd server
npm install  # première fois seulement
npm start
```

**Terminal 2 - Frontend Vue.js:**
```bash
npm install  # première fois seulement
npm run dev
```

## 📱 Accès à l'Application

Une fois les serveurs démarrés, ouvrez votre navigateur :

- **Frontend:** http://localhost:5174
- **API PDF:** http://localhost:3003

## ✅ Vérification

Pour vérifier que tout fonctionne :

1. **Page d'accueil:** Vous devriez voir la carte de formation "Leadership en Action"
2. **Filtres:** Testez la recherche et les filtres
3. **Détails:** Cliquez sur la carte pour voir les détails
4. **Timeline:** Les sessions doivent être expandables/collapsables
5. **PDF:** Cliquez sur "Télécharger le programme PDF" pour tester la génération

## 🔧 Structure des URLs

- `/` - Page d'accueil avec liste des formations
- `/formation/:id` - Page de détails d'une formation
- API: `http://localhost:3003/api/generate-pdf/:id` - Téléchargement PDF

## 💡 Conseils

### Développement
- Les modifications du frontend sont automatiquement rechargées (Hot Module Replacement)
- Pour le backend, utilisez `npm run dev` avec nodemon pour le rechargement automatique

### Production
```bash
# Build frontend
npm run build

# Les fichiers seront dans dist/
```

### Arrêter les serveurs
- Si vous utilisez `start-all.sh`: Appuyez sur `Ctrl+C`
- Si vous les avez lancés manuellement: Appuyez sur `Ctrl+C` dans chaque terminal

## 🐛 Problèmes Courants

**Port déjà utilisé:**
```bash
# Trouver et tuer le processus sur le port 3003
lsof -ti:3003 | xargs kill -9

# Trouver et tuer le processus sur le port 5174
lsof -ti:5174 | xargs kill -9
```

**Module non trouvé:**
```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install

# Pour le serveur
cd server
rm -rf node_modules package-lock.json
npm install
```

**Le logo ne s'affiche pas:**
Vérifiez que le fichier `src/assets/logo-hyades.avif` existe.

## 📚 Plus d'informations

Consultez le [README.md](./README.md) pour la documentation complète.
