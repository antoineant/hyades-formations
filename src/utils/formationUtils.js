/**
 * Calcule la durée totale d'une formation à partir de ses jours
 * @param {Array} jours - Array des jours de la formation
 * @returns {Object} - {heures: number, jours: number, texte: string}
 */
export function calculateDuration(jours) {
  if (!jours || jours.length === 0) {
    return { heures: 0, jours: 0, texte: '0h' }
  }

  let totalMinutes = 0

  jours.forEach(jour => {
    if (jour.sessions) {
      jour.sessions.forEach(session => {
        // Parse duration like "3h", "3h30", "90min"
        const duration = session.duree
        if (duration.includes('h')) {
          const parts = duration.split('h')
          const hours = parseInt(parts[0]) || 0
          const minutes = parts[1] ? parseInt(parts[1]) : 0
          totalMinutes += hours * 60 + minutes
        } else if (duration.includes('min')) {
          totalMinutes += parseInt(duration) || 0
        }
      })
    }
  })

  const totalHours = totalMinutes / 60
  const numberOfDays = jours.length

  // Format text
  const hoursText = totalHours % 1 === 0
    ? `${totalHours}h`
    : `${Math.floor(totalHours)}h${(totalMinutes % 60).toString().padStart(2, '0')}`

  const daysText = numberOfDays === 1 ? '1 jour' : `${numberOfDays} jours`

  return {
    heures: totalHours,
    jours: numberOfDays,
    texte: `${daysText} (${hoursText})`
  }
}

/**
 * Compte le nombre total de sessions dans une formation
 * @param {Array} jours - Array des jours de la formation
 * @returns {number} - Nombre total de sessions
 */
export function countSessions(jours) {
  if (!jours || jours.length === 0) return 0

  return jours.reduce((total, jour) => {
    return total + (jour.sessions ? jour.sessions.length : 0)
  }, 0)
}

/**
 * Récupère les jours correspondant à un format spécifique
 * @param {Array} allJours - Tous les jours de la formation
 * @param {Array} joursIds - IDs des jours à inclure (ex: [1, 2])
 * @returns {Array} - Jours filtrés
 */
export function getJoursByFormat(allJours, joursIds) {
  if (!allJours || !joursIds) return []

  return allJours.filter(jour => joursIds.includes(jour.numero))
}

/**
 * Formatte un nombre de jours pour affichage
 * @param {number} days - Nombre de jours
 * @returns {string} - Texte formatté
 */
export function formatDays(days) {
  return days === 1 ? '1 jour' : `${days} jours`
}
