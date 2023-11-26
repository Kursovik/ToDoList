import { MenuCategories } from '../models/menu-categories';

export const menuCategories: MenuCategories[] = [
  {
    title: 'Главная',
    routerLink: '',
  },
  {
    title: 'Заметки',
    routerLink: 'notes',
    description: 'Открыть заметки',
  },
  {
    title: 'Задачи',
    routerLink: 'tasks',
    description: 'Открыть задачи',
  },
];
