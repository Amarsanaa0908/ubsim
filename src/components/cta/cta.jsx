import Link from 'next/link';
import { Button } from '../ui/button';

export default function Cta() {
  return (
    <section className='w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='space-y-2'>
            <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
              Дэлхийгээр интернэттэй аялахдаа бэлэн үү?
            </h2>
            <p className='max-w-[900px] md:text-xl/relaxed'>
              Join thousands of travelers who enjoy seamless connectivity with
              our global eSIM service.
            </p>
          </div>
          <div className='flex flex-col gap-2 min-[400px]:flex-row'>
            <Link href={'/countries'}>
              <Button
                size='lg'
                variant='secondary'
                className='hover:cursor-pointer'
              >
                eSIM худалдаж авах
              </Button>
            </Link>
            <Link href={'/faq'}>
              <Button
                size='lg'
                variant='outline'
                className='bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10 hover:cursor-pointer'
              >
                Асуулт байна
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
