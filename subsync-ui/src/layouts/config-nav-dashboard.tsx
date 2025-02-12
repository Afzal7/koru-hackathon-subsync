import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  // {
  //   title: 'Dashboard',
  //   path: '/',
  //   icon: icon('ic-analytics'),
  // },
  {
    title: 'Schedule',
    path: '/booking-calendar',
    icon: icon('ic-blog'),
  },
  // {
  //   title: 'Booking',
  //   path: '/booking',
  //   icon: icon('ic-blog'),
  // },
  // {
  //   title: 'Summary',
  //   path: '/summary',
  //   icon: icon('ic-analytics'),
  // },
  {
    title: 'Share',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Substitute',
    path: '/summary',
    icon: icon('ic-user'),
  },
  {
    title: 'Documents',
    path: '/products',
    icon: icon('ic-cart'),
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: icon('ic-lock'),
  },
  // {
  //   title: 'Blog',
  //   path: '/blog',
  //   icon: icon('ic-blog'),
  // },
  // {
  //   title: 'Sign in',
  //   path: '/sign-in',
  //   icon: icon('ic-lock'),
  // },
  // {
  //   title: 'Sub - Sign in',
  //   path: '/sub-login',
  //   icon: icon('ic-lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic-disabled'),
  // },
];
