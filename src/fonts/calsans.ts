// Using Inter as fallback since Calsans font file is not available
import { Inter } from 'next/font/google';

export const calsans = Inter({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-calsans',
  display: 'swap',
});

// TODO: Replace with actual Calsans font when available
// import localFont from 'next/font/local';
// 
// export const calsans = localFont({
//   src: [
//     {
//       path: './CalSans-SemiBold.woff2',
//       weight: '600',
//       style: 'normal',
//     },
//   ],
//   variable: '--font-calsans',
//   display: 'swap',
//   fallback: ['system-ui', 'arial'],
// });