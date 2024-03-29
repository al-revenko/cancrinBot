// Доступные команды и их описание
// Эти данные будут отправлены в Telegram для их отображения в подсказках
export const botCommands = [
  {
    command: 'start',
    description: 'Приветствие',
  },
  {
    command: 'help',
    description:
      'Список имен и кодов доступных валют.\nНапишите /help [код. например EUR] для запроса полной информации о валюте',
  },
  {
    command: 'currency',
    description: 'Меню выбора курса обмена валют',
  },
  {
    command: 'list',
    description: 'Список валют',
  },
];
