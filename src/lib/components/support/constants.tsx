import { FaGithub } from 'react-icons/fa';

type SponsorLink = {
  label: string;
  description?: string;
  url: string;
  icon?: React.ReactElement;
  colorScheme?: string;
};

export const sponsorLinks: Array<SponsorLink> = [
  {
    label: 'Github Sponsor',
    url: 'https://github.com/sponsors/sozonome',
    icon: <FaGithub />,
  },
  {
    label: '🇮🇩 saweria',
    description: '(QRIS, GoPay, etc)',
    url: 'https://saweria.co/sozonome',
    colorScheme: 'orange',
  },
  {
    label: 'Ko-fi',
    url: 'https://ko-fi.com/sozonome',
    colorScheme: 'blue',
  },
  {
    label: 'Buy Me a Coffee',
    url: 'https://www.buymeacoffee.com/sozonome',
    colorScheme: 'yellow',
  },
];
