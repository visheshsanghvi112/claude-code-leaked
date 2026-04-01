import type { ContentBlockParam } from '@anthropic-ai/sdk/resources/messages.js'
import type { Command } from '../commands.js'
import { getCompanion } from '../buddy/companion.js'
import { renderFace } from '../buddy/sprites.js'

const LINKEDIN_PROMPT = (args: string, companionName?: string, companionType?: string, companionFace?: string) => `
      You are an expert social media manager specializing in LinkedIn. 
      The user wants to generate a "LinkedIn-ready" post about their experience using "Claude Code"—Anthropic's advanced CLI agent.
      
      Additional context:
      - The user's name is Vishesh Sanghvi (refer to him as "I" in the post if appropriate, or as the author).
      - He is specifically using a version of Claude Code that he has customized.
      ${companionName ? `- He has an AI companion (buddy) named "${companionName}" which is a "${companionType}" (${companionFace}).` : ''}
      - The post should be professional yet "tech-enthusiast" flavored.
      - Use relevant emojis (like 🚀, 🤖, 💻, ✦).
      - Include a section about how agentic workflows are changing software development.
      - If the user provided additional notes in the args, incorporate them: "${args}"

      Generate 3 options for the post:
      Option 1: Short & Punchy (for high engagement).
      Option 2: Detailed & Technical (sharing insights).
      Option 3: Visionary (focusing on the future of AI coding).

      Format the output clearly.
    `

const linkedin: Command = {
  type: 'prompt',
  name: 'linkedin',
  description: 'Generate a LinkedIn post about your project',
  progressMessage: 'generating LinkedIn post options',
  contentLength: 0,
  source: 'builtin',
  async getPromptForCommand(args): Promise<ContentBlockParam[]> {
    const companion = getCompanion()
    const companionName = companion?.name
    const companionType = companion?.species
    const companionFace = companion ? renderFace(companion) : undefined
    
    return [{ type: 'text', text: LINKEDIN_PROMPT(args, companionName, companionType, companionFace) }]
  },
}

export default linkedin
