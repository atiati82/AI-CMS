
import { db } from '../db';
import { agentBriefings } from '../agents/briefings';

async function seedAgentConfigs() {
    console.log('🌱 Seeding agent configurations from briefings...');

    try {
        for (const [key, briefing] of Object.entries(agentBriefings)) {
            console.log(`Processing agent: ${briefing.name} (${briefing.displayName})`);

            const metadata = {
                icon: briefing.icon,
                role: briefing.role,
                rules: briefing.rules,
                capabilities: briefing.capabilities,
                examples: briefing.examples
            };

            await db.query(`
        INSERT INTO agent_configurations (
          agent_name, 
          display_name,
          system_prompt, 
          metadata,
          enabled,
          max_tokens,
          temperature,
          top_p,
          updated_at
        ) VALUES ($1, $2, $3, $4, true, 2000, 0.7, 1.0, NOW())
        ON CONFLICT (agent_name) DO UPDATE SET
          display_name = EXCLUDED.display_name,
          system_prompt = EXCLUDED.system_prompt,
          metadata = EXCLUDED.metadata,
          updated_at = NOW()
        WHERE agent_configurations.agent_name = $1
      `, [
                briefing.name,
                briefing.displayName,
                briefing.systemPrompt,
                JSON.stringify(metadata)
            ]);
        }

        console.log('✅ Successfully seeded all agent configurations!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding agent configs:', error);
        process.exit(1);
    }
}

seedAgentConfigs();
