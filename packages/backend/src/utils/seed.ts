import 'dotenv/config'
import axios from 'axios'
import { db } from './db.js'

const API_URL =
  'https://resource-hub-production.s3.us-west-2.amazonaws.com/uploads/62/baseball_data.json'

async function seed() {
  try {
    console.log('🔄 Fetching baseball data from API...')
    const response = await axios.get(API_URL)
    const players = response.data

    console.log(`Found ${players.length} players`)
    console.log('Starting seed process...\n')

    let created = 0
    let updated = 0
    let skipped = 0

    for (const player of players) {
      try {
        const playerName = player['Player name'] || player.name
        const teamName = player.team || 'Unknown' // API doesn't provide team info
        const position = player.position
        
        const externalId = `${playerName}-${position}`.replace(/\s+/g, '-')

        const hits = parseInt(player.Hits) || parseInt(player.hits) || 0
        const homeRuns = parseInt(player['home run']) || parseInt(player.HR) || 0
        const average = parseFloat(player.AVG) || parseFloat(player.avg) || 0
        const atBats = parseInt(player['At-bat']) || parseInt(player.AB) || null
        const runs = parseInt(player.Runs) || parseInt(player.R) || null
        const rbi = parseInt(player['run batted in']) || parseInt(player.RBI) || null

        const result = await db.player.upsert({
          where: { externalId },
          update: {
            name: playerName,
            team: teamName,
            position: position || null,
            hits,
            homeRuns,
            average,
            atBats,
            runs,
            rbi,
            rawData: player,
          },
          create: {
            externalId,
            name: playerName,
            team: teamName,
            position: position || null,
            hits,
            homeRuns,
            average,
            atBats,
            runs,
            rbi,
            rawData: player,
          },
        })

        // Check if it was created or updated
        const wasCreated = result.createdAt.getTime() === result.updatedAt.getTime()
        if (wasCreated) {
          created++
        } else {
          updated++
        }

        // Log progress every 10 players
        if ((created + updated + skipped) % 10 === 0) {
          process.stdout.write(
            `\rProgress: ${created + updated + skipped}/${players.length} (${created} new, ${updated} updated)`,
          )
        }
      } catch (error) {
        skipped++
        const errorMessage = error instanceof Error ? error.message : String(error)
        console.error(`\nFailed to process player: ${player['Player name'] || player.name}`, errorMessage)
      }
    }

    console.log(`\n\n🎉 Seed complete!`)
    console.log(`   Created: ${created} new players`)
    console.log(`   Updated: ${updated} existing players`)
    if (skipped > 0) {
      console.warn(`   Skipped: ${skipped} players (errors)`)
    }
    console.log('')
  } catch (error) {
    console.error('Seed failed:', error)
    throw error
  } finally {
    await db.$disconnect()
  }
}

seed()
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
