import { NbMenuItem } from '@nebular/theme';

export const SIDEBAR_MENU_ITEMS: NbMenuItem[] = [
    { title: 'NAVIGATION', group: true, },
    { title: 'Home', icon: 'nb-home', link: '/', home: true, },
    { title: 'TASK MANAGEMENT VIEWS', group: true, },
    { title: 'Board View', icon: 'nb-layout-two-column', link: 'board', },
    { title: 'Detail List View', icon: 'nb-list', link: 'list', },
];
