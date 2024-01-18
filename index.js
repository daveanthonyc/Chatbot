import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import dotenv from 'dotenv';
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('quit', async (ctx) => {
  // Explicit usage
  await ctx.telegram.leaveChat(ctx.message.chat.id)

  // Using context shortcut
  await ctx.leaveChat()
})

bot.on(message('text'), async (ctx) => {
    console.log(ctx.message.text);
  // Using context shortcut
  await ctx.reply(`Hello David`);
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
