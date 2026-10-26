'use client';

import { apiList, callGet } from '@/axios/api';
import FAQ from '@/components/faq/component';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { roundToNearestHundred } from '@/lib/utils';
import { CheckCircle, CreditCard, Globe, Hourglass, Info, MapPin, Phone, Signal, Smartphone, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const numberFormatter = new Intl.NumberFormat('en-US');
const formatPrice = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? `${numberFormatter.format(n)}₮` : '—';
};

const dataLabel = (pkg) => {
  if (pkg.quota === 0) return 'Хязгааргүй';
  const gb = pkg.quota / 1000;
  return pkg.isDaily ? `${gb} GB/өдөр` : `${gb} GB`;
};

const durationLabel = (pkg) => (pkg.isDaily ? 'Өдөр бүр' : `${pkg.day} хоног`);

function PackageCard({ pkg, countryCode }) {
  const isPhysical = pkg.isPhysical === true;

  const toMnt = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? Math.round(n / 100) * 100 : null;
  };

const formatMnt = (value) => {
  const n = toMnt(value);
  return n === null ? '—' : `${n.toLocaleString('en-US')}₮`;
  };  

  const hasDiscount = (pkg) => {
  const discount = Number(pkg.discountPrice);
  const price = Number(pkg.price);
    return Number.isFinite(discount) && discount > 0 && discount < price;
  };

  return (
    <Card className='flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md'>
      <CardContent className='flex flex-1 flex-col p-5'>
        <div className='flex items-start justify-between'>
          <div className='flex items-center gap-3'>
            <Image
              src={`https://flagcdn.com/w80/${countryCode}.png`}
              alt={`${pkg.country} flag`}
              width={40}
              height={28}
              className='h-7 w-10 rounded-sm object-cover'
            />
            <Badge variant='secondary' className='bg-slate-100 text-slate-600'>
              {pkg.isTrending ? 'Эрэлттэй' : 'Энгийн'}
            </Badge>
          </div>
          <div className='text-right'>
            {hasDiscount(pkg) ? (
              <>
                <p className='text-2xl font-bold text-rose-600'>
                  {formatPrice(Number(pkg.discountPrice))}
                </p>
                <p className='text-sm text-slate-400 line-through'>
                  {formatPrice(Number(pkg.price))}
                </p>
              </>
            ) : (
              <p className='text-2xl font-bold text-slate-900'>
                {formatPrice(Number(pkg.price))}
              </p>
            )}
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-lg font-semibold text-slate-900'>
            {pkg.country} - {pkg.quota === 0 ? 'Unlimited' : `${pkg.gb} GB`} {pkg.isDaily ? '/day' : `${pkg.day} days`}
          </h3>
          <p className='mt-1 flex items-center gap-1 text-sm text-blue-600'>
            <MapPin className='h-4 w-4' />
            {pkg.country}
          </p>
        </div>

        <div className='mt-5 grid grid-cols-2 gap-y-4 border-t border-slate-100 pt-5 text-sm'>
          <div className='flex items-center gap-2 text-slate-700'>
            <Signal className='h-4 w-4 text-slate-500' />
            <span>{dataLabel(pkg)}</span>
          </div>
          <div className='flex items-center gap-2 text-slate-700'>
            <Smartphone className='h-4 w-4 text-slate-500' />
            <span>Төрөл: {isPhysical ? 'Биет' : 'eSIM'}</span>
          </div>
          <div className='flex items-center gap-2 text-slate-700'>
            <Hourglass className='h-4 w-4 text-slate-500' />
            <span>{durationLabel(pkg)}</span>
          </div>
          <div className='flex items-center gap-2 text-slate-700'>
            <Zap className='h-4 w-4 text-slate-500' />
            <span>Идэвхжүүлэлт: Тийм</span>
          </div>
        </div>

        <div className='mt-auto pt-6'>
          <Button asChild className='w-full'>
            <Link href={`/checkout?package=${pkg.id}`}>Сонгох</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CountryDataPage() {
  const { slug } = useParams();
  const countryId = slug;
  const countryName = countryId.charAt(0).toUpperCase() + countryId.slice(1).replace(/-/g, ' ');

  const [simType, setSimType] = useState('esim');
  const [days, setDays] = useState('all');
  const [quota, setQuota] = useState('all');
  const [packages, setPackages] = useState([]);
  const [dayArray, setDayArray] = useState([]);
  const [quotaArray, setQuotaArray] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const filterArray = [
          ['slug', 'ilike', countryId.toUpperCase()],
          ['isPhysical', simType === 'physical'],
        ];
        if (days !== 'all') filterArray.push(['day', Number.parseInt(days, 10)]);
        if (quota !== 'all') filterArray.push(['quota', Number.parseInt(quota, 10)]);

        const res = await callGet(`${apiList.ubsim}/?filters=[${JSON.stringify(filterArray)}]`);
        setPackages(res?.items ?? []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPackages();
  }, [countryId, simType, days, quota]);

  useEffect(() => {
    async function fetchInitialFilters() {
      try {
        const dayResponse = await callGet(`${apiList.packages}/days?country=${countryId}`);
        if (dayResponse.status) setDayArray(dayResponse.data);

        const quotaResponse = await callGet(`${apiList.packages}/quotas?country=${countryId}`);
        if (quotaResponse.status) setQuotaArray(quotaResponse.data);
      } catch (error) {
        toast.error('Error fetching filters');
        console.error(error);
      }
    }
    fetchInitialFilters();
  }, [countryId]);

  return (
    <div className='flex min-h-screen flex-col'>
      <main className='flex-1'>
        {/* Country header */}
        <section className='w-full bg-muted py-8 md:py-12'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col gap-6 md:flex-row md:items-center'>
              <div className='flex-1'>
                <div className='mb-2 flex items-center gap-3'>
                  <Link href='/countries' className='text-sm text-muted-foreground hover:text-foreground'>
                    Бүх улсууд
                  </Link>
                  <span className='text-muted-foreground'>→</span>
                  <span className='text-sm font-medium'>{countryName}</span>
                </div>
                <h1 className='text-3xl font-bold'>{countryName} улсын eSIM багцууд</h1>
                <p className='mt-2 text-muted-foreground'>
                  {countryName} улсад өндөр хурдны интернэттэй, тав тухтай зүйлгүй аялаарай
                </p>
                <div className='mt-4 flex flex-wrap gap-2'>
                  <Badge variant='secondary' className='border-green-200 bg-green-100 text-green-700'>
                    <Zap className='mr-1 h-3 w-3' />
                    Тохиргоо шаардлагагүй
                  </Badge>
                  <Badge variant='secondary' className='border-blue-200 bg-blue-100 text-blue-700'>
                    <Globe className='mr-1 h-3 w-3' />
                    Өргөө сүлжээ
                  </Badge>
                  <Badge variant='secondary' className='border-purple-200 bg-purple-100 text-purple-700'>
                    <Phone className='mr-1 h-3 w-3' />
                    24/7 Туслах
                  </Badge>
                </div>
              </div>
              <div className='relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-lg md:h-44 md:w-72'>
                <Image
                  src={`https://flagcdn.com/w320/${countryId.toLowerCase()}.png`}
                  alt={`${countryName} Flag`}
                  fill
                  className='object-cover'
                />
              </div>
            </div>
          </div>
        </section>

        {/* Horizontal filter bar */}
        <section className='sticky top-0 z-10 w-full border-b bg-white py-4'>
          <div className='container mx-auto flex flex-col gap-3 px-4 md:px-6 lg:flex-row lg:items-center'>
            <div className='inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1'>
              {[
                { value: 'esim', label: 'eSIM', icon: Smartphone },
                { value: 'physical', label: 'Биет сим', icon: CreditCard },
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type='button'
                  onClick={() => setSimType(value)}
                  className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    simType === value ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className='h-4 w-4' />
                  {label}
                </button>
              ))}
            </div>

            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:flex-1 lg:justify-end'>
              <Select value={days} onValueChange={setDays}>
                <SelectTrigger className='w-full bg-white lg:w-[180px]'>
                  <SelectValue placeholder='Хоног' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>Бүх хоног</SelectItem>
                  {dayArray?.map((item) => (
                    <SelectItem key={item} value={String(item)}>
                      {item} хоног
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={quota} onValueChange={setQuota}>
                <SelectTrigger className='w-full bg-white lg:w-[180px]'>
                  <SelectValue placeholder='Дата хэмжээ' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>Бүх дата</SelectItem>
                  {quotaArray?.map((item) => (
                    <SelectItem key={item} value={String(item)}>
                      {item / 1000} GB
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Package cards */}
        <section className='w-full py-8 md:py-12'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='mb-6 flex items-center justify-between'>
              <h2 className='text-2xl font-bold'>Багцууд</h2>
              <span className='text-sm text-muted-foreground'>{packages.length} багц</span>
            </div>

            {packages.length === 0 ? (
              <p className='py-16 text-center text-muted-foreground'>Таны шүүлтүүрт тохирох багц олдсонгүй.</p>
            ) : (
              <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                {packages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} countryCode={countryId.toLowerCase()} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Coverage details */}
        <section id='coverage' className='w-full bg-muted py-8 md:py-12'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='mb-8 flex flex-col items-center justify-center space-y-4 text-center'>
              <h2 className='text-2xl font-bold'>{countryName} дах интернэт сүлжээ</h2>
              <p className='max-w-[700px] text-muted-foreground'>
                Манай eSIM {countryName} даяар найдвартай интернэт холбогддог
              </p>
            </div>
            <div className='bg-background flex items-start gap-3 rounded-lg p-4'>
              <Info className='mt-0.5 h-5 w-5 text-muted-foreground' />
              <div>
                <h4 className='font-medium'>Анхаарах зүйлс</h4>
                <p className='text-sm text-muted-foreground'>
                  Бид {countryName} улс дах маш сайн сүлжээг ашигладаг ч, зарим алслагдсан бүс нутагт холболт муу байж
                  болно. Манай eSIM автоматаар хамгийн сайн интернетэд холбогдох болно.
                </p>
              </div>
            </div>
          </div>
        </section>

        <FAQ />

        {/* CTA */}
        <section className='w-full bg-primary py-8 text-primary-foreground md:py-12'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-2xl font-bold'>Ready for Your Trip to {countryName}?</h2>
                <p className='max-w-[700px]'>
                  Get your {countryName} eSIM now and enjoy seamless connectivity throughout your journey.
                </p>
              </div>
              <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                <Button size='lg' variant='secondary' asChild>
                  <a href='#top'>Get Your {countryName} eSIM</a>
                </Button>
                <Button
                  size='lg'
                  variant='outline'
                  className='border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground/10'
                  asChild
                >
                  <Link href='/contact'>Need Help?</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}