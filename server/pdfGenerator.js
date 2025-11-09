import PDFDocument from 'pdfkit'

// Colors from HYADES brand
const COLORS = {
  navy: '#4A5677',
  pink: '#E8B3B8',
  mint: '#A8C7C5',
  coral: '#F4A261',
  darkGray: '#333333',
  mediumGray: '#666666',
  lightGray: '#F5F5F5'
}

export async function generatePDF(formation, res) {
  return new Promise((resolve, reject) => {
    try {
      // Create PDF document
      const doc = new PDFDocument({
        size: 'A4',
        margins: {
          top: 40,
          bottom: 40,
          left: 40,
          right: 40
        }
      })

      // Pipe to response
      doc.pipe(res)

      // Generate first page
      generateFirstPage(doc, formation)

      // Add second page if needed
      doc.addPage()
      generateSecondPage(doc, formation)

      // Finalize PDF
      doc.end()

      doc.on('end', () => {
        resolve()
      })

      doc.on('error', (error) => {
        reject(error)
      })
    } catch (error) {
      reject(error)
    }
  })
}

function generateFirstPage(doc, formation) {
  const pageWidth = doc.page.width
  const margin = 40

  // Header with logo placeholder and title
  doc.save()
  doc.rect(margin, margin, 150, 60).fill('#FFFFFF')
  doc.fillColor(COLORS.darkGray)
    .fontSize(10)
    .text('Bureau HYADES', margin + 10, margin + 10, { width: 130 })
  doc.fontSize(8)
    .fillColor(COLORS.mediumGray)
    .text('Solutions & Développement RH', margin + 10, margin + 25, { width: 130 })
  doc.restore()

  // Title banner
  doc.save()
  doc.rect(200, margin, pageWidth - 200 - margin, 60)
    .fill(COLORS.navy)
  doc.fillColor('#FFFFFF')
    .fontSize(16)
    .font('Helvetica-Bold')
    .text('FORMATION', 210, margin + 15, { width: pageWidth - 220 - margin })
  doc.fontSize(14)
    .text(formation.titre.substring(0, 50), 210, margin + 35, {
      width: pageWidth - 220 - margin,
      lineGap: 2
    })
  doc.restore()

  let yPos = margin + 80

  // Subtitle/description banner
  doc.save()
  doc.rect(margin, yPos, pageWidth - 2 * margin, 30)
    .fill(COLORS.lightGray)
  doc.fillColor(COLORS.darkGray)
    .fontSize(10)
    .font('Helvetica')
    .text(formation.description.substring(0, 120) + '...', margin + 10, yPos + 10, {
      width: pageWidth - 2 * margin - 20,
      lineGap: 2
    })
  doc.restore()

  yPos += 45

  // Main content area - left column (60%)
  const leftColumnWidth = (pageWidth - 2 * margin) * 0.58
  const rightColumnX = margin + leftColumnWidth + 15
  const rightColumnWidth = (pageWidth - 2 * margin) * 0.38

  // Objectifs section
  doc.save()
  doc.fontSize(12)
    .font('Helvetica-Bold')
    .fillColor(COLORS.navy)
    .text('OBJECTIFS DE LA FORMATION', margin, yPos)

  yPos += 20

  doc.fontSize(9)
    .font('Helvetica')
    .fillColor(COLORS.darkGray)

  formation.objectifs.slice(0, 4).forEach((objectif) => {
    doc.circle(margin + 5, yPos + 4, 2).fill(COLORS.coral)
    doc.fillColor(COLORS.darkGray)
      .text(objectif, margin + 15, yPos, {
        width: leftColumnWidth - 15,
        lineGap: 3
      })
    yPos = doc.y + 5
  })
  doc.restore()

  yPos += 10

  // Programme section
  doc.save()
  doc.rect(margin, yPos, leftColumnWidth, 20)
    .fill(COLORS.pink)
  doc.fillColor('#FFFFFF')
    .fontSize(11)
    .font('Helvetica-Bold')
    .text('PROGRAMME', margin + 10, yPos + 6)
  doc.restore()

  yPos += 30

  // Day 1 content
  const day1 = formation.jours[0]
  doc.fontSize(10)
    .font('Helvetica-Bold')
    .fillColor(COLORS.navy)
    .text(`JOUR 1 - ${day1.titre.toUpperCase()}`, margin, yPos, {
      width: leftColumnWidth
    })

  yPos += 15

  doc.fontSize(8)
    .font('Helvetica')
    .fillColor(COLORS.mediumGray)
    .text(day1.description, margin, yPos, {
      width: leftColumnWidth,
      lineGap: 2
    })

  yPos = doc.y + 10

  // Sessions for Day 1
  day1.sessions.slice(0, 2).forEach((session, idx) => {
    doc.fontSize(9)
      .font('Helvetica-Bold')
      .fillColor(COLORS.darkGray)
      .text(`${session.titre} (${session.duree})`, margin + 10, yPos, {
        width: leftColumnWidth - 10
      })

    yPos = doc.y + 5

    // Activities
    session.activites.slice(0, 3).forEach((activite) => {
      doc.fontSize(7)
        .font('Helvetica')
        .fillColor(COLORS.mediumGray)
        .text(`• ${activite.titre}`, margin + 20, yPos, {
          width: leftColumnWidth - 20
        })
      yPos = doc.y + 3
    })

    yPos += 5
  })

  // Right column - Sidebar with info
  generateSidebar(doc, formation, rightColumnX, margin + 80, rightColumnWidth)
}

function generateSidebar(doc, formation, x, y, width) {
  let yPos = y

  // Info boxes with icons (simplified text-based icons)
  const infoItems = [
    { icon: '⏱', label: 'Durée', value: formation.duree },
    { icon: '👥', label: 'Public cible', value: formation.publicCible },
    { icon: '📋', label: 'Prérequis', value: formation.prerequis },
    { icon: '🏢', label: 'Modalité', value: formation.modaliteAcces },
    { icon: '👨‍👩‍👧‍👦', label: 'Effectif', value: formation.effectif },
    { icon: '♿', label: 'Accessibilité', value: formation.accessibilite }
  ]

  doc.save()
  doc.rect(x, yPos, width, 250).fill(COLORS.pink).opacity(0.3)
  doc.restore()

  yPos += 10

  infoItems.forEach((item) => {
    doc.fontSize(8)
      .font('Helvetica-Bold')
      .fillColor(COLORS.navy)
      .text(item.label, x + 10, yPos, { width: width - 20 })

    yPos += 12

    doc.fontSize(7)
      .font('Helvetica')
      .fillColor(COLORS.darkGray)
      .text(item.value, x + 10, yPos, {
        width: width - 20,
        lineGap: 2
      })

    yPos = doc.y + 10
  })

  // Pedagogical approach box
  yPos = Math.max(yPos, 520)

  doc.save()
  doc.rect(x, yPos, width, 180).fill(COLORS.mint).opacity(0.4)
  doc.restore()

  yPos += 10

  doc.fontSize(9)
    .font('Helvetica-Bold')
    .fillColor(COLORS.navy)
    .text('DÉMARCHE PÉDAGOGIQUE', x + 10, yPos, { width: width - 20 })

  yPos += 15

  // Methods
  doc.fontSize(7)
    .font('Helvetica-Bold')
    .fillColor(COLORS.darkGray)
    .text('Méthodes:', x + 10, yPos)

  yPos += 10

  formation.demarchePedagogique.methodes.slice(0, 3).forEach((methode) => {
    doc.fontSize(6)
      .font('Helvetica')
      .fillColor(COLORS.mediumGray)
      .text(`• ${methode}`, x + 10, yPos, { width: width - 20 })
    yPos = doc.y + 3
  })

  yPos += 8

  // Evaluation
  doc.fontSize(7)
    .font('Helvetica-Bold')
    .fillColor(COLORS.darkGray)
    .text('Évaluation:', x + 10, yPos)

  yPos += 10

  formation.demarchePedagogique.evaluation.slice(0, 2).forEach((evaluation) => {
    doc.fontSize(6)
      .font('Helvetica')
      .fillColor(COLORS.mediumGray)
      .text(`• ${evaluation}`, x + 10, yPos, { width: width - 20 })
    yPos = doc.y + 3
  })

  yPos += 10

  // Formateur
  doc.fontSize(6)
    .fillColor(COLORS.mediumGray)
    .text(`Formateur: ${formation.demarchePedagogique.formateur}`, x + 10, yPos, {
      width: width - 20
    })

  yPos = doc.y + 5

  doc.text(`Sanction: ${formation.demarchePedagogique.sanction}`, x + 10, yPos, {
    width: width - 20
  })

  yPos = doc.y + 10

  doc.fontSize(6)
    .fillColor(COLORS.mediumGray)
    .text(formation.demarchePedagogique.edition, x + 10, yPos)
}

function generateSecondPage(doc, formation) {
  const pageWidth = doc.page.width
  const margin = 40

  let yPos = margin

  // Header
  doc.fontSize(14)
    .font('Helvetica-Bold')
    .fillColor(COLORS.navy)
    .text('PROGRAMME DÉTAILLÉ (suite)', margin, yPos)

  yPos += 25

  const leftColumnWidth = (pageWidth - 2 * margin) * 0.58

  // Continue with remaining days
  formation.jours.slice(1).forEach((jour, idx) => {
    if (yPos > 700) {
      doc.addPage()
      yPos = margin
    }

    doc.fontSize(10)
      .font('Helvetica-Bold')
      .fillColor(COLORS.navy)
      .text(`JOUR ${jour.numero} - ${jour.titre.toUpperCase()}`, margin, yPos, {
        width: leftColumnWidth
      })

    yPos += 15

    doc.fontSize(8)
      .font('Helvetica')
      .fillColor(COLORS.mediumGray)
      .text(jour.description, margin, yPos, {
        width: leftColumnWidth,
        lineGap: 2
      })

    yPos = doc.y + 10

    // Sessions
    jour.sessions.forEach((session) => {
      if (yPos > 700) {
        doc.addPage()
        yPos = margin
      }

      doc.fontSize(9)
        .font('Helvetica-Bold')
        .fillColor(COLORS.darkGray)
        .text(`${session.titre} (${session.duree})`, margin + 10, yPos, {
          width: leftColumnWidth - 10
        })

      yPos = doc.y + 5

      // Learning objectives
      if (session.objectifsApprentissage && session.objectifsApprentissage.length > 0) {
        doc.fontSize(7)
          .font('Helvetica-Oblique')
          .fillColor(COLORS.mediumGray)
          .text(`Objectifs: ${session.objectifsApprentissage.slice(0, 2).join(' • ')}`, margin + 20, yPos, {
            width: leftColumnWidth - 20
          })
        yPos = doc.y + 5
      }

      yPos += 5
    })

    yPos += 10
  })

  // Footer
  doc.fontSize(8)
    .fillColor(COLORS.mediumGray)
    .text('Bureau HYADES - Solutions & Développement RH', margin, 780, {
      align: 'center',
      width: pageWidth - 2 * margin
    })
}
