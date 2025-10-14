"use client"

import Cta from '@/components/cta/cta';
import FAQ from '@/components/faq/component';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Cookies from "js-cookie";
import {
  ArrowRight,
  CheckCircle,
  Globe,
  MapPin,
  MessageSquare,
  Phone,
  Shield,
  Smartphone,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import ReactCountryFlag from 'react-country-flag';

const trendingCountries = [
  {
    country: 'Хятад',
    ios2: 'CN',
  },
  {
    country: 'Япон',
    ios2: 'JP',
  },
  {
    country: 'Тайланд',
    ios2: 'TH',
  },
  {
    country: 'Индонез',
    ios2: 'ID',
  },
  {
    country: 'Франц',
    ios2: 'FR',
  },
  {
    country: 'Хонг Конг',
    ios2: 'HK',
  },
  {
    country: 'Макао',
    ios2: 'MO',
  },
  {
    country: 'Өмнөд Солонгос',
    ios2: 'KR',
  },
  {
    country: 'Вьетнам',
    ios2: 'VN',
  },
  {
    country: 'Герман',
    ios2: 'DE',
  },
];

const euroCountries = [
  {
    country: 'UK',
    ios2: 'GB',
  },
  {
    country: 'Франц',
    ios2: 'FR',
  },
  {
    country: 'Герман',
    ios2: 'DE',
  },
  {
    country: 'Итали',
    ios2: 'IT',
  },
  {
    country: 'Испани',
    ios2: 'ES',
  },
  {
    country: 'Нидерланд',
    ios2: 'NL',
  },
  {
    country: 'Португал',
    ios2: 'PT',
  },
  {
    country: 'Грек',
    ios2: 'GR',
  },
  {
    country: 'Швед',
    ios2: 'SE',
  },
  {
    country: 'Швейцар',
    ios2: 'CH',
  },
];

const asiaCountries = [
  {
    country: 'Япон',
    ios2: 'JP',
  },
  {
    country: 'БНХАУ',
    ios2: 'CN',
  },
  {
    country: 'Өмнөд Солонгос',
    ios2: 'KR',
  },
  {
    country: 'Тайланд',
    ios2: 'TH',
  },
  {
    country: 'Сингапур',
    ios2: 'SG',
  },
  {
    country: 'Малайз',
    ios2: 'MY',
  },
  {
    country: 'Вьетнам',
    ios2: 'VN',
  },
  {
    country: 'Индонез',
    ios2: 'ID',
  },
  {
    country: 'Энэтхэг',
    ios2: 'IN',
  },
  {
    country: 'Филиппин',
    ios2: 'PH',
  },
];

const americaCountries = [
  {
    country: 'АНУ',
    ios2: 'US',
  },
  {
    country: 'Канад',
    ios2: 'CA',
  },
  {
    country: 'Мексик',
    ios2: 'MX',
  },
  {
    country: 'Бразил',
    ios2: 'BR',
  },
  {
    country: 'Аргентин',
    ios2: 'AR',
  },
  {
    country: 'Чили',
    ios2: 'CL',
  },
  {
    country: 'Перу',
    ios2: 'PE',
  },
  {
    country: 'Колумб',
    ios2: 'CO',
  },
  {
    country: 'Коста Рика',
    ios2: 'CR',
  },
  {
    country: 'Панам',
    ios2: 'PA',
  },
];

const africaCountries = [
  {
    country: 'Өмнөд Африк',
    ios2: 'ZA',
  },
  {
    country: 'Египм',
    ios2: 'EG',
  },
  {
    country: 'Марокко',
    ios2: 'MA',
  },
  {
    country: 'АНЭУ',
    ios2: 'AE',
  },
  {
    country: 'Саудын Араб',
    ios2: 'SA',
  },
  {
    country: 'Кени',
    ios2: 'KE',
  },
  {
    country: 'Nigeria',
    ios2: 'NG',
  },
  {
    country: 'Tanzania',
    ios2: 'TZ',
  },
  {
    country: 'Israel',
    ios2: 'IL',
  },
  {
    country: 'Qatar',
    ios2: 'QA',
  },
];

 function HomePage() {
// { searchParams } : {searchParams: {ref?: string}}

const searchParams = useSearchParams();
const ref = searchParams.get('ref');

  useEffect(() => {
    if (ref) {
      Cookies.set("ref", ref, {expires: 1})
    }
  }, [ref])

  
  return (
    <div className='flex min-h-screen flex-col'>
      {/* Header */}

      <main className='flex-1'>
        {/* Hero Section */}
        <section className='w-full py-12 md:py-24 lg:py-16 xl:py-24 bg-gradient-to-b from-background to-muted'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='grid lg:grid-cols-2 md:px-20'>
              <div className='flex flex-col justify-center space-y-4'>
                <div className='space-y-2'>
                  <Badge
                    className='inline-flex rounded-md px-3 py-1 text-sm'
                    variant='secondary'
                  >
                    Ухаалаг, хямд аялъя
                  </Badge>
                  <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
                    Дэлхийн хаана ч интернеттэй
                  </h1>
                  <p className='max-w-[600px] text-muted-foreground md:text-xl'>
                    Дэлхийн 190+ улсад хялбар, хямд интернеттэй. Сим солих
                    шаардлагагүй, роуминг зардалгүй, хурдан интернет
                  </p>
                </div>
                <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                  <Button asChild size='lg' className='primary-button'>
                    <Link href='#plans'>
                      Багц үзэх
                      <ArrowRight className='ml-2 h-4 w-4' />
                    </Link>
                  </Button>
                  <Button variant='outline' size='lg'>
                    <Link href='#how-it-works'>Яаж ажилладаг вэ</Link>
                  </Button>
                </div>
                <div className='flex items-center space-x-4 text-sm'>
                  <div className='flex items-center space-x-1'>
                    <CheckCircle className='h-4 w-4 text-primary' />
                    <span>Хялбар идэвхжүүлэлт</span>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <CheckCircle className='h-4 w-4 text-primary' />
                    <span>Цэнэглэдэг</span>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <CheckCircle className='h-4 w-4 text-primary' />
                    <span>24/7 туслах</span>
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-center md:justify-end'>
                <div className='relative w-full max-w-60 md:max-w-[500px] aspect-square rounded-4xl'>
                  <Image
                    src='/banner1.png'
                    alt='eSIM Global Coverage'
                    fill
                    className='object-contain rounded-full'
                    priority
                    sizes=''
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Destinations Section */}
        <section
          id='destinations'
          className='w-full py-6 md:py-12 lg:py-16 bg-muted'
        >
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <Badge
                  className='rounded-md px-3 py-1 text-sm'
                  variant='secondary'
                >
                  Дэлхийн хаана ч интернеттэй
                </Badge>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                  190 гаруй улсад холбогдсон
                </h2>
                <p className='max-w-[900px] text-muted-foreground md:text-xl'>
                  Манай eSIM таны дараагийн аяллыг илүү амар болгоно
                </p>
              </div>
            </div>
            <div className='mx-auto mt-12 max-w-5xl'>
              <Tabs defaultValue='popular' className='w-full'>
                <TabsList className='grid w-full grid-cols-3 md:grid-cols-5'>
                  <TabsTrigger value='popular'>Эрэлттэй</TabsTrigger>
                  <TabsTrigger value='asia'>Ази</TabsTrigger>
                  <TabsTrigger value='europe'>Европ</TabsTrigger>
                  <TabsTrigger value='americas'>Америк</TabsTrigger>
                  <TabsTrigger value='africa'>Африк & ME</TabsTrigger>
                </TabsList>
                <TabsContent value='popular' className='mt-6'>
                  <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                    {trendingCountries.map((el) => (
                      <Link
                        href={`/countries/${el.ios2}`}
                        key={el.country}
                        className='flex flex-col items-center space-y-2 rounded-lg border bg-card p-4 text-center'
                      >
                        <div className='h-10 w-10 rounded-full bg-muted'>
                          <ReactCountryFlag
                            className='rounded-2xl'
                            countryCode={el.ios2}
                            // svg
                            style={{
                              fontSize: '2.5em',
                              lineHeight: '1em',
                            }}
                          />
                        </div>
                        <span className='text-sm font-medium'>
                          {el.country}
                        </span>
                      </Link>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value='asia' className='mt-6'>
                  <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                    {asiaCountries.map((el) => (
                      <Link href={`/countries/${el.ios2}`} key={el.country}>
                      <div
                        key={el.ios2}
                        className='flex flex-col items-center space-y-2 rounded-lg border bg-card p-4 text-center'
                      >
                        <ReactCountryFlag
                          className='rounded-2xl'
                          countryCode={el.ios2}
                          // svg
                          style={{
                            fontSize: '2.5em',
                            lineHeight: '1em',
                          }}
                        />
                        <span className='text-sm font-medium'>
                          {el.country}
                        </span>
                      </div></Link>
                      
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value='europe' className='mt-6'>
                  <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                    {euroCountries.map((el, i) => (
                      <Link href={`/countries/${el.ios2}`} key={i}>
                      <div
                        className='flex flex-col items-center space-y-2 rounded-lg border bg-card p-4 text-center'
                      >
                        <div className='h-10 w-10 rounded-full bg-muted'>
                          <ReactCountryFlag
                            className='rounded-2xl'
                            countryCode={el.ios2}
                            // svg
                            style={{
                              fontSize: '2.5em',
                              lineHeight: '1em',
                            }}
                          />
                        </div>
                        <span className='text-sm font-medium'>
                          {el.country}
                        </span>
                      </div></Link>
                      
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value='americas' className='mt-6'>
                  <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                    {americaCountries.map((el, i) => (
                      <Link href={`/countries/${el.ios2}`} key={i}>
                        <div
                        className='flex flex-col items-center space-y-2 rounded-lg border bg-card p-4 text-center'
                      >
                        <ReactCountryFlag
                          className='rounded-2xl'
                          countryCode={el.ios2}
                          // svg
                          style={{
                            fontSize: '2.5em',
                            lineHeight: '1em',
                          }}
                        />
                        <span className='text-sm font-medium'>
                          {el.country}
                        </span>
                      </div>
                      </Link>
                      
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value='africa' className='mt-6'>
                  <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                    {africaCountries.map((el, i) => (
                      <Link href={`/countries/${el.ios2}`} key={i}>  <div
                        
                        className='flex flex-col items-center space-y-2 rounded-lg border bg-card p-4 text-center'
                      >
                        <ReactCountryFlag
                          className='rounded-2xl'
                          countryCode={el.ios2}
                          // svg
                          style={{
                            fontSize: '2.5em',
                            lineHeight: '1em',
                          }}
                        />
                        <span className='text-sm font-medium'>
                          {el.country}
                        </span>
                      </div></Link>
                    
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              <div className='mt-8 text-center'>
                <Link href={'/countries'}>
                  <Button
                    variant='outline'
                    size='lg'
                    className='primary-button text-white'
                  >
                    Бүгдийг үзэх
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* <RegionalEsimCarousel /> */}

        {/* Features Section */}
        <section className='w-full py-12 md:py-24 lg:py-32 bg-background'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <Badge
                  className='rounded-md px-3 py-1 text-sm'
                  variant='secondary'
                >
                  Давуу талууд
                </Badge>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                  Яагаад манай eSIM-ийг сонгож ашиглах вэ?
                </h2>
                <p className='max-w-[900px] text-muted-foreground md:text-xl'>
                  Experience the future of mobile connectivity with our
                  cutting-edge eSIM technology.
                </p>
              </div>
            </div>
            <div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3'>
              <Card className='flex flex-col items-center text-center'>
                <CardHeader className='flex flex-col items-center text-center'>
                  <div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
                    <Globe className='h-8 w-8 text-primary' />
                  </div>
                  <CardTitle className='mt-4'>Хамрах хүрээ</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    190+ оронд найдвартай хурдан, хямд интернеттэй аялаарай.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className='flex flex-col items-center text-center'>
                <CardHeader className='flex flex-col items-center text-center'>
                  <div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
                    <Smartphone className='h-8 w-8 text-primary' />
                  </div>
                  <CardTitle className='mt-4'>Хялбар суулгалт</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    QR код уншуулж суулгаад интернеттэй болоорой. Биет SIM
                    шаардлагагүй
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className='flex flex-col items-center text-center'>
                <CardHeader className='flex flex-col items-center text-center'>
                  <div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
                    <Shield className='h-8 w-8 text-primary' />
                  </div>
                  <CardTitle className='mt-4'>Аюулгүй гүйлгээ</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Монголд байдаг найдвартай төлбөрийн хэрэгсэл ашиглан гүйлгээ
                    баталгаажуулна.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className='flex flex-col items-center text-center'>
                <CardHeader className='flex flex-col items-center text-center'>
                  <div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
                    <Phone className='h-8 w-8 text-primary' />
                  </div>
                  <CardTitle className='mt-4'>Хэрэглэгчийн самбар</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Бүх eSIM-үүдээ нэг бүртгэлээр орж үлдэгдэл, цэнэглэлт бусад
                    зүйлээ хянаарай.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className='flex flex-col items-center text-center'>
                <CardHeader className='flex flex-col items-center text-center'>
                  <div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
                    <MessageSquare className='h-8 w-8 text-primary' />
                  </div>
                  <CardTitle className='mt-4'>24/7 Support center</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Манай баг таньд гарсан eSIM-тэй холбоотой бүх асуудлыг
                    шийдэхэд бэлэн байна.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className='flex flex-col items-center text-center'>
                <CardHeader className='flex flex-col items-center text-center'>
                  <div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
                    <MapPin className='h-8 w-8 text-primary' />
                  </div>
                  <CardTitle className='mt-4'>Хямд үнэ</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Нэмэлт үйлчилгээний төлбөргүй хямд үнэ.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Plans Section */}

        {/* How It Works Section */}
        <section
          id='how-it-works'
          className='w-full py-12 md:py-24 lg:py-32 bg-muted'
        >
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <Badge
                  className='rounded-md px-3 py-1 text-sm'
                  variant='secondary'
                >
                  Хялбар идэвхжүүлэлт
                </Badge>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                  eSIM яаж ажилладаг вэ?
                </h2>
                <p className='max-w-[900px] text-muted-foreground md:text-xl'>
                  Хэдхэн хормын дотор интернетэд холбогдоорой.
                </p>
              </div>
            </div>
            <div className='mx-auto mt-12 max-w-5xl'>
              <div className='grid gap-8 md:grid-cols-3'>
                <div className='flex flex-col items-center text-center'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                    1
                  </div>
                  <h3 className='mt-4 text-xl font-bold'>Багцаа сонгох</h3>
                  <p className='mt-2 text-muted-foreground'>
                    Таны аяллын хэрэгцээнд тохирсон дата багцыг сонгох.
                  </p>
                  <div className='mt-4 h-80 w-full max-w-[200px] rounded-md p-2'>
                    <Image
                      src='/how_2.svg'
                      alt='Choose Plan'
                      width={250}
                      height={250}
                      className='h-full w-full object-contain'
                    />
                  </div>
                </div>
                <div className='flex flex-col items-center text-center'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                    2
                  </div>
                  <h3 className='mt-4 text-xl font-bold'>QR код уншуулах</h3>
                  <p className='mt-2 text-muted-foreground'>
                    Тань руу явуулсан QR кодыг утсан дээрээ уншуулах.
                  </p>
                  <div className='mt-4 h-80 w-full max-w-[200px] rounded-md p-2'>
                    <Image
                      src='/how_3.svg'
                      alt='Scan QR Code'
                      width={250}
                      height={250}
                      className='h-full w-full object-contain'
                    />
                  </div>
                </div>
                <div className='flex flex-col items-center text-center'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                    3
                  </div>
                  <h3 className='mt-4 text-xl font-bold'>Холбогдох</h3>
                  <p className='mt-2 text-muted-foreground'>
                    Шинэхэн суулгасан eSIM-ээ идэвхжүүлж интернетэд холбогдох.
                  </p>
                  <div className='mt-4 h-80 w-full max-w-[200px] rounded-md p-2'>
                    <Image
                      src='/how_4.svg'
                      alt='Connect and Go'
                      width={250}
                      height={250}
                      className='h-full w-full object-contain'
                    />
                  </div>
                </div>
              </div>
              <div className='mt-12 text-center'>
                <Link href={'/countries'}>
                  <Button size='lg'>Худалдаж авах</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className='w-full py-12 md:py-24 lg:py-32 bg-background'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <Badge
                  className='rounded-md px-3 py-1 text-sm'
                  variant='secondary'
                >
                  {/* Хэрэглэгчийн сэтгэгдэл */}
                </Badge>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                  Хэрэглэгчдийн сэтгэгдэл
                </h2>
                <p className='max-w-[900px] text-muted-foreground md:text-xl'>
                  {/* Join thousands of satisfied travelers who stay connected with
                  our eSIM service. */}
                </p>
              </div>
            </div>
            <div className='mx-auto mt-12 max-w-5xl'>
              <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                <Card>
                  <CardContent className='py-2'>
                    <div className='flex items-start gap-4'>
                      <div className='h-10 w-10 rounded-full bg-muted items-center flex'>
                        <Star className='mx-auto' />
                      </div>
                      <div>
                        <p className='text-sm font-medium'>Д. Төмөрсүх</p>
                        <p className='text-sm text-muted-foreground'>
                          Japan 5GB - 30 Days
                        </p>
                      </div>
                    </div>
                    <p className='mt-4 text-sm'>
                      Монгол заавартай байсан болохоор суулгахад их амар байлаа
                      бас хурдан байсан нь их таалагдсан!
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className='py-2'>
                    <div className='flex items-start gap-4'>
                      <div className='h-10 w-10 rounded-full bg-muted items-center  flex'>
                        <Star className='mx-auto' />
                      </div>
                      <div>
                        <p className='text-sm font-medium'>С. Баттулга</p>
                        <p className='text-sm text-muted-foreground'>
                          Singapore 5GB - 30 Days
                        </p>
                      </div>
                    </div>
                    <p className='mt-4 text-sm'>
                      Танайхаас авсан дата сим ёстой амар байсан вэбсайтаар
                      төлөөд шууд имэйл хаягаар QR код ирээд уншуулсан, бусад
                      дата сим зардаг газруудтай харьцуулахад хямдхан бас хурдан
                      санагдсан.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className='py-2'>
                    <div className='flex items-start gap-4'>
                      <div className='h-10 w-10 rounded-full bg-muted items-center flex'>
                        <Star className='mx-auto' />
                      </div>
                      <div>
                        <p className='text-sm font-medium'>Н. Нарантунгалаг</p>
                        <p className='text-sm text-muted-foreground'>
                          China (Mainland) 10GB - 30 Days
                        </p>
                      </div>
                    </div>
                    <p className='mt-4 text-sm'>
                      Бид гэр бүлээрээ Хятад явахдаа дата сим авсан. VPN
                      шаардлагагүйгээр FB, Instagram орж байсан нь их чухал
                      байсан
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className='mt-8 text-center'>
                <Button variant='outline'>Бүх сэтгэгдэл унших</Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ />

        {/* CTA Section */}
        <Cta />
      </main>
    </div>
  );
}

const PageWithSuspense = () => {
  return (
    <Suspense fallback={<div>Түр хүлээнэ үү..</div>}>
      <HomePage />
    </Suspense>
  )
}

export default PageWithSuspense;