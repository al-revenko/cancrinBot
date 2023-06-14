import { UseFilters, UseInterceptors } from '@nestjs/common';
import {
  Action,
  Ctx,
  Hears,
  InjectBot,
  Message,
  Start,
  Update,
} from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { UpdateLogInterceptor } from './interceptors/update-log-interceptor';
import { CanDeleteMessage } from './guards/can-delete-message.guard';
import { CharCodeExceptionFilter } from './filters/char-code-exception.filter';
import { BotButtons } from './bot.buttons';
import { BotService } from './bot.service';
import { botCommands } from './bot.commands';
import { MessageCreater } from './uttils/bot.message-creater';

@Update()
@UseInterceptors(UpdateLogInterceptor)
export class BotUpdate {
  constructor(
    @InjectBot()
    private readonly bot: Telegraf<Context>,
    private readonly botService: BotService,
    private readonly botButtons: BotButtons,
  ) {
    this.bot.telegram.setMyCommands(botCommands);
  }

  private async deleteMessage(ctx: Context): Promise<void> {
    if (CanDeleteMessage(ctx)) {
      await ctx.deleteMessage(ctx.message.message_id);
    }
  }

  @Start()
  async start(@Ctx() ctx: Context): Promise<void> {
    this.deleteMessage(ctx);
    await ctx.reply(
      'Здравствуйте! Я CancrinBot помогу вам узнать актуальный курс от центрального банка России',
      this.botButtons.startKeyboard(),
    );
  }

  @Hears('/help')
  async showHelpMessage(@Ctx() ctx: Context): Promise<void> {
    this.deleteMessage(ctx);

    await ctx.reply(
      'Чтобы получить информацию об обмене интересующей вас валюты вы можете выбрать её в меню /valutes или просто написав её код в чат например EUR',
    );
    await ctx.reply(
      'Чтобы получить полную информацию о валюте введите /help [код валюты] например /help EUR',
    );
    await ctx.reply('Чтобы получить список имен и кодов валют введите /list');
  }

  @Hears('/list')
  async showValutesList(@Ctx() ctx: Context): Promise<void> {
    this.deleteMessage(ctx);

    const valutes = await this.botService.getValutes();
    await ctx.reply(MessageCreater.createValutesListString(valutes));
  }

  @Hears(/^\/help ([A-Z][A-Z][A-Z]|[a-z][a-z][a-z])$/)
  @UseFilters(CharCodeExceptionFilter)
  // eslint-disable-next-line prettier/prettier
  async showValuteData(@Ctx() ctx: Context, @Message('text') message: string): Promise<void> {
    const charCode = message
      .match(/\/help ([A-Z][A-Z][A-Z]|[a-z][a-z][a-z])/)[1]
      .toUpperCase();

    const valute = await this.botService.getValute(charCode);
    await ctx.replyWithHTML(MessageCreater.createValuteFullDataString(valute));
  }

  @Hears(/^([A-Z][A-Z][A-Z]|[a-z][a-z][a-z])$/)
  @UseFilters(CharCodeExceptionFilter)
  // eslint-disable-next-line prettier/prettier
  async showValuteExchange(@Ctx() ctx: Context, @Message('text') message: string): Promise<void> {
    const charCode = message
      .match(/([A-Z][A-Z][A-Z]|[a-z][a-z][a-z])/)[0]
      .toUpperCase();

    const valute = await this.botService.getValute(charCode);
    await ctx.reply(MessageCreater.createValuteExchangeDataString(valute));
  }

  @Hears(/^\/valutes/)
  async showAvailableValutes(@Ctx() ctx: Context): Promise<void> {
    this.deleteMessage(ctx);
    const date = this.botService.getLastUpdateDate();

    await ctx.reply(
      `Данные на ${date.day}.${date.month}.${date.year}`,
      this.botButtons.valutesKeyboard(),
    );
  }

  @Action('availableValutes')
  async availableValutes(@Ctx() ctx: Context): Promise<void> {
    await this.showAvailableValutes(ctx);
  }

  @Action(/getValuteExchange_[A-Z][A-Z][A-Z]/)
  async getValuteExchange(@Ctx() ctx: Context): Promise<void> {
    const data = 'data' in ctx.callbackQuery ? ctx.callbackQuery.data : null;

    if (data) {
      const queryMatch = data.match(/getValuteExchange_([A-Z][A-Z][A-Z])/);

      const valute = await this.botService.getValute(queryMatch[1]);
      await ctx.reply(MessageCreater.createValuteExchangeDataString(valute));
    }
  }
}
