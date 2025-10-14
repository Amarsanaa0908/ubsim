import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='w-full border-t bg-background py-6 md:py-12'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
          <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              <Link href={'/'}>
                <Image
                  src={'/logo.png'}
                  alt='Atlas Esim Logo'
                  width={150}
                  height={150}
                />
              </Link>
            </div>
            <p className='text-sm text-muted-foreground'>
              Stay connected anywhere in the world with our global eSIM service.
            </p>
            <div className='flex gap-4'>
              <Link
                href='https://www.facebook.com/atlastourcom'
                className='text-muted-foreground hover:text-foreground'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='h-5 w-5'
                >
                  <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
                </svg>
              </Link>
              <Link
                href='https://www.instagram.com/atlasesim'
                className='text-muted-foreground hover:text-foreground'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='h-5 w-5'
                >
                  <rect width='20' height='20' x='2' y='2' rx='5' ry='5' />
                  <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
                  <line x1='17.5' x2='17.51' y1='6.5' y2='6.5' />
                </svg>
              </Link>
            </div>
          </div>
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Компани</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  href='/about'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Бидний тухай
                </Link>
              </li>
              <li>
                <Link
                  href='/careers'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href='/blog'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Блог
                </Link>
              </li>
            </ul>
          </div>
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Тусламж</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  href='/contact'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Холбогдох
                </Link>
              </li>
              <li>
                <Link
                  href='/compatibility'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Ямар утас тохирох вэ?
                </Link>
              </li>
              <li>
                <Link
                  href='/terms-of-service'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Үйлчилгээний нөхцөл
                </Link>
              </li>
              <li>
                <Link
                  href='/privacy-policy'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Нууцлалын бодлого
                </Link>
              </li>
            </ul>
          </div>
          {/* <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Үйлчилгээ</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  href='/terms-of-service'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Үйлчилгээний нөхцөл
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Acceptable Use
                </Link>
              </li>
            </ul>
          </div> */}
        </div>
        <div className='mt-8 border-t pt-8 text-center text-sm text-muted-foreground'>
          <p>© {new Date().getFullYear()} Atlas eSIM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
