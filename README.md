# HYADES Formations - Site Web

Application web Vue.js pour afficher les formations professionnelles de Bureau HYADES avec génération de PDF.

## 🚀 Fonctionnalités

- ✅ Page d'accueil avec grille de formations
- ✅ Système de filtrage et recherche en temps réel
- ✅ Page de détails avec timeline interactive
- ✅ Sessions expandables/collapsables
- ✅ Génération de PDF téléchargeable
- ✅ Design responsive (mobile, tablette, desktop)
- ✅ Animations et transitions fluides
- ✅ Charte graphique HYADES (bleu marine, rose, vert menthe)

## 📋 Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn

## 🛠️ Installation

### 1. Frontend (Vue.js)

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le frontend sera accessible sur `http://localhost:5174`

### 2. Backend (Serveur PDF)

```bash
# Aller dans le dossier serveur
cd server

# Installer les dépendances
npm install

# Lancer le serveur
npm start
```

Le serveur PDF sera accessible sur `http://localhost:3003`

## 🎯 Utilisation

1. **Démarrer les deux serveurs** (frontend et backend) dans deux terminaux séparés
2. **Ouvrir** `http://localhost:5174` dans votre navigateur
3. **Parcourir** les formations disponibles
4. **Cliquer** sur une carte pour voir les détails
5. **Télécharger** le PDF depuis la page de détails

## 📁 Structure du Projet

```
hyades-formations/
├── src/
│   ├── components/          # Composants Vue réutilisables
│   │   ├── Header.vue       # En-tête avec logo et navigation
│   │   ├── FilterBar.vue    # Barre de filtres
│   │   └── FormationCard.vue # Carte de formation
│   ├── views/               # Pages de l'application
│   │   ├── Home.vue         # Page d'accueil
│   │   └── FormationDetails.vue # Page de détails
│   ├── router/              # Configuration Vue Router
│   ├── data/                # Données JSON
│   │   └── formations.json  # Catalogue de formations
│   ├── assets/              # Images et ressources
│   │   └── logo-hyades.avif # Logo HYADES
│   └── style.css            # Styles Tailwind globaux
├── server/                  # Backend Node.js
│   ├── server.js            # Serveur Express
│   ├── pdfGenerator.js      # Générateur PDF avec PDFKit
│   └── package.json         # Dépendances backend
└── README.md
```

## 🎨 Charte Graphique

- **Bleu Marine** (#4A5677) - Couleur principale
- **Rose/Corail** (#E8B3B8) - Accents et informations
- **Vert Menthe** (#A8C7C5) - Sections pédagogiques
- **Orange Corail** (#F4A261) - Boutons et actions

## 🔧 Technologies Utilisées

### Frontend
- **Vue.js 3** - Framework JavaScript
- **Vue Router** - Routing
- **Tailwind CSS** - Styling
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express** - Server framework
- **PDFKit** - Génération de PDF
- **CORS** - Gestion des requêtes cross-origin

## 📝 API Endpoints

### Backend (Port 3003)

- `GET /api/generate-pdf/:id` - Génère et télécharge le PDF d'une formation (port 3003)
- `GET /api/health` - Health check du serveur

## 🚀 Production

### Build Frontend

```bash
npm run build
```

Les fichiers de production seront dans le dossier `dist/`

### Déploiement Backend

Le serveur PDF peut être déployé sur n'importe quel service Node.js (Heroku, Railway, etc.)

## 📄 Licence

© 2025 Bureau HYADES. Tous droits réservés.

## 👨‍💻 Développement

Pour ajouter une nouvelle formation, modifiez le fichier `src/data/formations.json` en suivant la structure existante.

## 🐛 Dépannage

### Le PDF ne se génère pas
- Vérifiez que le serveur backend est bien démarré sur le port 3003
- Vérifiez les logs du serveur dans le terminal

### Les images ne s'affichent pas
- Vérifiez que le fichier logo est bien dans `src/assets/`
- Vérifiez le format du fichier (AVIF, PNG, JPG supportés)

### Erreur CORS
- Assurez-vous que le serveur backend utilise bien le middleware CORS
- Vérifiez que les URLs correspondent (localhost:5174 et localhost:3003)
