#!/bin/bash

echo "🚀 Démarrage de l'application HYADES Formations..."
echo ""

# Fonction pour tuer tous les processus enfants à l'arrêt
trap 'kill $(jobs -p)' EXIT

# Démarrer le serveur PDF en arrière-plan
echo "📄 Démarrage du serveur PDF (port 3003)..."
cd server && npm start &
PDF_PID=$!

# Attendre que le serveur PDF démarre
sleep 3

# Démarrer le serveur frontend en arrière-plan
echo "🎨 Démarrage du frontend Vue.js (port 5174)..."
cd .. && npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Application démarrée !"
echo ""
echo "📱 Frontend: http://localhost:5174"
echo "🖨️  Backend PDF: http://localhost:3003"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter tous les serveurs"
echo ""

# Attendre que l'utilisateur arrête les serveurs
wait
