import { randomUUID } from 'crypto'

/**
 * Converts ai4trainers workshop format to HYADES formation format
 */
export class WorkshopConverter {
  /**
   * Main conversion function
   * @param {Object} ai4trainersData - Workshop data from ai4trainers
   * @returns {Object} - HYADES formation format
   */
  convert(ai4trainersData) {
    const workshop = ai4trainersData.workshopData

    const formation = {
      id: randomUUID(),
      titre: workshop.title || '',
      description: workshop.description || '',
      publicCible: workshop.audience || '',
      formatParDefaut: this.determineDefaultFormat(workshop.milestones),
      formats: this.generateFormats(workshop.milestones),
      prerequis: this.extractPrerequisites(workshop.description),
      modaliteAcces: 'Formation en présentiel',
      effectif: '8 à 12 participants',
      accessibilite: 'Accessible aux personnes à mobilité réduite',
      objectifs: this.extractObjectives(workshop.milestones),
      jours: this.convertMilestonesToJours(workshop.milestones),
      demarchePedagogique: this.generateDemarchePedagogique(workshop.milestones)
    }

    return { formations: [formation] }
  }

  /**
   * Determine default format based on number of milestones
   */
  determineDefaultFormat(milestones) {
    const count = milestones?.length || 4
    return `${count}j`
  }

  /**
   * Generate multiple format options (4j, 3j, 2j)
   */
  generateFormats(milestones) {
    const count = milestones?.length || 4
    const formats = {}

    // Full format
    formats[`${count}j`] = {
      id: `${count}j`,
      titre: `Formation complète ${count} jours`,
      description: `Programme complet avec mise en pratique et plan d'action personnel`,
      joursInclus: Array.from({ length: count }, (_, i) => i + 1)
    }

    // Intermediate format (count - 1 days)
    if (count > 2) {
      formats[`${count - 1}j`] = {
        id: `${count - 1}j`,
        titre: `Version intermédiaire ${count - 1} jours`,
        description: `Formation approfondie`,
        joursInclus: Array.from({ length: count - 1 }, (_, i) => i + 1)
      }
    }

    // Short format (count - 2 days or minimum 2)
    const shortDays = Math.max(2, count - 2)
    formats[`${shortDays}j`] = {
      id: `${shortDays}j`,
      titre: `Version intensive ${shortDays} jours`,
      description: `Formation concentrée sur les fondamentaux`,
      joursInclus: Array.from({ length: shortDays }, (_, i) => i + 1)
    }

    return formats
  }

  /**
   * Extract prerequisites from description or use default
   */
  extractPrerequisites(description) {
    // Try to find prerequisite mentions in description
    if (description && description.toLowerCase().includes('prérequis')) {
      return description.split('.')[0]
    }
    return 'Aucun prérequis spécifique'
  }

  /**
   * Extract learning objectives from all milestones
   */
  extractObjectives(milestones) {
    const objectives = []

    milestones?.forEach(milestone => {
      if (milestone.learningObjectives) {
        objectives.push(...milestone.learningObjectives)
      }
    })

    // If no objectives found, generate from milestone titles
    if (objectives.length === 0) {
      milestones?.forEach(milestone => {
        objectives.push(`Maîtriser ${milestone.title}`)
      })
    }

    return objectives.slice(0, 5) // Limit to 5 main objectives
  }

  /**
   * Convert milestones to jours (days)
   */
  convertMilestonesToJours(milestones) {
    return milestones?.map((milestone, index) => ({
      numero: milestone.order || (index + 1),
      titre: milestone.title || '',
      description: milestone.description || '',
      duree: this.calculateMilestoneDuration(milestone.sessions),
      sessions: this.convertSessions(milestone.sessions)
    })) || []
  }

  /**
   * Calculate total duration for a milestone
   */
  calculateMilestoneDuration(sessions) {
    let totalMinutes = 0

    sessions?.forEach(session => {
      totalMinutes += this.parseDuration(session.duration)
    })

    return this.formatDuration(totalMinutes)
  }

  /**
   * Parse duration string to minutes
   */
  parseDuration(durationStr) {
    if (!durationStr) return 0

    // Handle formats: "3h", "45min", "3h30", "2 hours", "1 day (8 hours)"
    let minutes = 0

    // Extract hours
    const hoursMatch = durationStr.match(/(\d+(?:\.\d+)?)\s*h(?:ours?)?/i)
    if (hoursMatch) {
      minutes += parseFloat(hoursMatch[1]) * 60
    }

    // Extract additional minutes
    const minsMatch = durationStr.match(/(\d+)\s*min/i)
    if (minsMatch) {
      minutes += parseInt(minsMatch[1])
    }

    // Handle "1 day" format
    if (durationStr.toLowerCase().includes('day')) {
      const dayMatch = durationStr.match(/(\d+)\s*day/i)
      if (dayMatch) {
        minutes += parseInt(dayMatch[1]) * 8 * 60 // 8 hours per day
      }
    }

    return minutes
  }

  /**
   * Format minutes to HYADES duration format
   */
  formatDuration(totalMinutes) {
    if (totalMinutes === 0) return '0h'

    const hours = Math.floor(totalMinutes / 60)
    const mins = totalMinutes % 60

    if (mins === 0) {
      return `${hours}h`
    } else {
      return `${hours}h${mins.toString().padStart(2, '0')}`
    }
  }

  /**
   * Convert sessions from ai4trainers to HYADES format
   */
  convertSessions(sessions) {
    return sessions?.map((session, index) => ({
      numero: session.order || (index + 1),
      titre: session.title || '',
      duree: session.duration || '',
      objectifsApprentissage: session.objectives || [],
      activites: this.convertActivities(session.activities)
    })) || []
  }

  /**
   * Convert activities from ai4trainers to HYADES format
   */
  convertActivities(activities) {
    return activities?.map(activity => ({
      titre: activity.title || '',
      type: activity.type || 'presentation',
      duree: activity.duration || ''
    })) || []
  }

  /**
   * Generate pedagogical approach from milestones
   */
  generateDemarchePedagogique(milestones) {
    const methodes = new Set()
    const moyens = new Set()
    const evaluation = new Set()

    // Extract methods from activities
    milestones?.forEach(milestone => {
      milestone.sessions?.forEach(session => {
        session.activities?.forEach(activity => {
          // Map activity types to pedagogical methods
          if (activity.type === 'presentation') {
            methodes.add('Apports théoriques ciblés')
            moyens.add('Supports visuels et outils digitaux')
          } else if (activity.type === 'exercise') {
            methodes.add('Mises en situation et jeux de rôles')
          } else if (activity.type === 'workshop') {
            methodes.add('Ateliers collaboratifs')
          } else if (activity.type === 'discussion') {
            methodes.add('Feedback 360° et peer-learning')
          } else if (activity.type === 'reflection') {
            evaluation.add('Auto-évaluation en début et fin de formation')
          }
        })
      })

      // Extract evaluation from deliverables
      if (milestone.deliverable) {
        evaluation.add('Plan d\'action personnel')
        if (milestone.deliverable.assessmentCriteria?.length > 0) {
          evaluation.add('Évaluations formatives après chaque session')
        }
      }
    })

    // Add defaults
    methodes.add('Pédagogie active et expérientielle')
    moyens.add('Boîte à outils pratiques')
    evaluation.add('Simulations évaluées')

    return {
      methodes: Array.from(methodes),
      moyens: Array.from(moyens),
      evaluation: Array.from(evaluation),
      formateur: 'Consultant expert certifié',
      sanction: 'Attestation de formation',
      edition: `Édition 1 - ${new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`
    }
  }
}

export function convertWorkshop(ai4trainersData) {
  const converter = new WorkshopConverter()
  return converter.convert(ai4trainersData)
}
