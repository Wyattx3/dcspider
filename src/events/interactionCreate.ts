import { BaseInteraction, ChatInputCommandInteraction } from 'discord.js';
import { commandHandler } from '../handlers/commandHandler';
import { buttonHandler } from '../handlers/buttonHandler';
import { createErrorEmbed } from '../utils/embedBuilder';

export const name = 'interactionCreate';

export async function execute(interaction: BaseInteraction): Promise<void> {
  // Handle button interactions
  if (interaction.isButton()) {
    try {
      if (interaction.customId.startsWith('music_') || interaction.customId.startsWith('queue_')) {
        await buttonHandler.handleMusicButton(interaction);
      }
    } catch (error) {
      console.error('❌ Error handling button:', error);
      
      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({
          embeds: [createErrorEmbed('အမှား', 'Button action မအောင်မြင်ပါ')],
          ephemeral: true,
        });
      }
    }
    return;
  }

  // Handle slash commands
  if (!interaction.isChatInputCommand()) return;

  const command = commandHandler.getCommand(interaction.commandName);

  if (!command) {
    console.error(`❌ Command not found: ${interaction.commandName}`);
    return;
  }

  try {
    await command.execute(interaction as ChatInputCommandInteraction);
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

