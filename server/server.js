import express from 'express'
import cors from 'cors'
import { generatePDF } from './pdfGenerator.js'
import { convertWorkshop } from './services/workshopConverter.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3003

// Middleware
app.use(cors())
app.use(express.json())

// Load formations data
const formationsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/data/formations.json'), 'utf-8')
)

// API endpoint to generate and download PDF
app.get('/api/generate-pdf/:id', async (req, res) => {
  try {
    const formationId = req.params.id
    const formatId = req.query.format // Get format from query parameter
    const formation = formationsData.formations.find(f => f.id === formationId)

    if (!formation) {
      return res.status(404).json({ error: 'Formation not found' })
    }

    // Use default format if not specified
    const selectedFormat = formatId || formation.formatParDefaut

    // Filter days based on selected format
    let filteredFormation = { ...formation }
    if (formation.formats && formation.formats[selectedFormat]) {
      const joursInclus = formation.formats[selectedFormat].joursInclus
      filteredFormation.jours = formation.jours.filter(jour => joursInclus.includes(jour.numero))

      // Calculate duration for the filtered format
      filteredFormation.duree = formation.formats[selectedFormat].titre
    }

    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="Programme-${formation.titre.substring(0, 30).replace(/[^a-zA-Z0-9]/g, '-')}-${selectedFormat}.pdf"`
    )

    // Generate and stream PDF
    await generatePDF(filteredFormation, res)
  } catch (error) {
    console.error('Error generating PDF:', error)
    res.status(500).json({ error: 'Failed to generate PDF' })
  }
})

// Workshop converter endpoint
app.post('/api/convert-workshop', async (req, res) => {
  try {
    const ai4trainersData = req.body

    if (!ai4trainersData || !ai4trainersData.workshopData) {
      return res.status(400).json({ error: 'Invalid workshop data format' })
    }

    const converted = convertWorkshop(ai4trainersData)
    res.json(converted)
  } catch (error) {
    console.error('Error converting workshop:', error)
    res.status(500).json({ error: 'Failed to convert workshop', details: error.message })
  }
})

// Add formation to formations.json
app.post('/api/add-formation', async (req, res) => {
  try {
    const newFormation = req.body

    if (!newFormation || !newFormation.id) {
      return res.status(400).json({ error: 'Invalid formation data' })
    }

    const formationsPath = path.join(__dirname, '../src/data/formations.json')
    const formationsData = JSON.parse(fs.readFileSync(formationsPath, 'utf-8'))

    // Check if formation with this ID already exists
    const existingIndex = formationsData.formations.findIndex(f => f.id === newFormation.id)

    if (existingIndex >= 0) {
      // Update existing formation
      formationsData.formations[existingIndex] = newFormation
      fs.writeFileSync(formationsPath, JSON.stringify(formationsData, null, 2))
      res.json({ success: true, message: 'Formation mise à jour avec succès', updated: true })
    } else {
      // Add new formation
      formationsData.formations.push(newFormation)
      fs.writeFileSync(formationsPath, JSON.stringify(formationsData, null, 2))
      res.json({ success: true, message: 'Formation ajoutée avec succès', updated: false })
    }
  } catch (error) {
    console.error('Error adding formation:', error)
    res.status(500).json({ error: 'Failed to add formation', details: error.message })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'PDF server is running' })
})

app.listen(PORT, () => {
  console.log(`🚀 PDF Server running on http://localhost:${PORT}`)
  console.log(`📄 PDF endpoint: http://localhost:${PORT}/api/generate-pdf/:id`)
})
