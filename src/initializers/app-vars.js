import { searchIcon, homeIcon, busIcon, cogsIcon, contactIcon, listIcon } from './my-icons.js';


export const desktopMenu = [{
        page: 'vehicule',
        href: '/vehicule',
        text: 'Vehicule'
    },
    {
        page: 'piese',
        href: '/piese',
        text: 'Piese'
    },
    {
        page: 'catalog',
        href: '/catalog',
        text: 'Catalog'
    },
    {
        page: 'contact',
        href: '/contact',
        text: 'Contact'
    }
];


export const mobileMenu = [{
        page: 'acasa',
        href: '/acasa',
        text: 'Acasa',
        icon: homeIcon
    },
    {
        page: 'cautare',
        href: '/cautare',
        text: 'Cautare',
        icon: searchIcon
    },
    {
        page: 'vehicule',
        href: '/vehicule',
        text: 'Vehicule',
        icon: busIcon
    },
    {
        page: 'piese',
        href: '/piese',
        text: 'Piese',
        icon: cogsIcon
    },
    {
        page: 'catalog',
        href: '/catalog',
        text: 'Catalog',
        icon: listIcon
    },
    {
        page: 'contact',
        href: '/contact',
        text: 'Contact',
        icon: contactIcon
    }
]