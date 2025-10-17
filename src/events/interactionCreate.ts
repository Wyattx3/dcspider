import { BaseInteraction, CommandInteraction } from 'discord.js';
import { commandHandler } from '../handlers/commandHandler';
import { createErrorEmbed } from '../utils/embedBuilder';

export const name = 'interactionCreate';

export async function execute(interaction: BaseInteraction): Promise<void> {
  if (!interaction.isChatInputCommand()) return;

  const command = commandHandler.getCommand(interaction.commandName);

  if (!command) {
    console.error(`❌ Command not found: ${interaction.commandName}`);
    return;
  }

  try {
    await command.execute(interaction as CommandInteraction);
  } catch (error) {
    console.error(`❌ Error executing command ${interaction.commandName}:`, error);

    const errorEmbed = createErrorEmbed(
      'အမှား ဖြစ်ပေါ်ခဲ့သည်',
      'Command ကို လုပ်ဆောင်ရာတွင် အမှား ဖြစ်ပေါ်ခဲ့သည်'
    );

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        embeds: [errorEmbed],
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        embeds: [errorEmbed],
        ephemeral: true,
      });
    }
  }
}

