import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CheckCircle,
  ChevronDown,
  Filter,
  Globe,
  Info,
  Search,
  Wifi,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Helper function to get country flag URL
const getCountryFlagUrl = (countryId) => {
  // Use country-flags CDN for consistent flag images
  return `https://flagcdn.com/w320/${countryId
    .toLowerCase()
    .substring(0, 2)}.png`;
};

// Helper function to get country-specific image
// const getCountryImage = (countryId: string) => {
//   return `/country-images/${countryId}.jpg`;
// };


export default async function CountryPage({params,searchParams}) {
  // This would normally come from an API or database
  const params = await props.params;

  const countryId = params.id;
  const countryName =
    countryId.charAt(0).toUpperCase() + countryId.slice(1).replace(/-/g, ' ');

  // Mock data for country packages - would be fetched based on country ID
  const packages = [
    {
      id: `${countryId}-mini`,
      name: `${countryName} Mini`,
      description: 'Perfect for a short trip',
      price: 9.99,
      duration: 3,
      data: 1,
      speed: '4G/LTE',
      popular: false,
      features: [
        '1GB high-speed data',
        '3 days validity',
        '4G/LTE speeds',
        'Nationwide coverage',
        '24/7 support',
        'Instant activation',
      ],
    },
    {
      id: `${countryId}-standard`,
      name: `${countryName} Standard`,
      description: 'Ideal for regular travelers',
      price: 24.99,
      duration: 10,
      data: 5,
      speed: '4G/5G',
      popular: true,
      features: [
        '5GB high-speed data',
        '10 days validity',
        '4G/5G speeds where available',
        'Nationwide coverage',
        '24/7 support',
        'Instant activation',
        'Hotspot/tethering enabled',
      ],
    },
    {
      id: `${countryId}-premium`,
      name: `${countryName} Premium`,
      description: 'For heavy data users',
      price: 39.99,
      duration: 15,
      data: 10,
      speed: '4G/5G',
      popular: false,
      features: [
        '10GB high-speed data',
        '15 days validity',
        '4G/5G speeds where available',
        'Nationwide coverage',
        'Priority 24/7 support',
        'Instant activation',
        'Hotspot/tethering enabled',
        'Unlimited social media',
      ],
    },
  ];

  // Mock coverage info
  const coverageInfo = {
    providers: ['Major Network 1', 'Major Network 2', 'Major Network 3'],
    coverage: 'Excellent (95% population coverage)',
    speeds: 'Average 4G: 40 Mbps, 5G: 180+ Mbps',
    areas: [
      'Major City 1',
      'Major City 2',
      'Major City 3',
      'All major cities and tourist destinations',
    ],
  };

  return (
    <div className='flex min-h-screen flex-col'>
      {/* Header */}
      <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='container mx-auto flex h-16 items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Link href='/' className='flex items-center gap-2'>
              <Wifi className='h-6 w-6' />
              <span className='text-xl font-bold'>GlobaleSIM</span>
            </Link>
          </div>
          <nav className='hidden md:flex gap-6'>
            <Link
              href='/countries'
              className='text-sm font-medium transition-colors hover:text-primary'
            >
              Countries
            </Link>
            <Link
              href='/about'
              className='text-sm font-medium transition-colors hover:text-primary'
            >
              About Us
            </Link>
            <Link
              href='/contact'
              className='text-sm font-medium transition-colors hover:text-primary'
            >
              Contact
            </Link>
            <Link
              href='/faq'
              className='text-sm font-medium transition-colors hover:text-primary'
            >
              FAQ
            </Link>
          </nav>
          <div className='flex items-center gap-4'>
            <Link
              href='/login'
              className='text-sm font-medium hover:underline underline-offset-4 hidden sm:block'
            >
              Нэвтрэх
            </Link>
            <Button asChild>
              <Link href='/signup'>Get Started</Link>
            </Button>
            <Button variant='outline' size='icon' className='md:hidden'>
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
                className='h-4 w-4'
              >
                <path d='M3 12h18M3 6h18M3 18h18' />
              </svg>
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>

      <main className='flex-1'>
        {/* Country Header */}
        <section className='w-full py-8 md:py-12 bg-muted'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col md:flex-row md:items-center gap-6'>
              <div className='flex-1'>
                <div className='flex items-center gap-3 mb-2'>
                  <Link
                    href='/countries'
                    className='text-sm text-muted-foreground hover:text-foreground'
                  >
                    All Countries
                  </Link>
                  <span className='text-muted-foreground'>→</span>
                  <span className='text-sm font-medium'>{countryName}</span>
                </div>
                <h1 className='text-3xl font-bold'>
                  {countryName} eSIM Data Plans
                </h1>
                <p className='mt-2 text-muted-foreground'>
                  Stay connected throughout {countryName} with our reliable,
                  high-speed data plans
                </p>
              </div>
              <div className='flex-shrink-0 w-24 h-24 md:w-32 md:h-32 relative rounded-lg overflow-hidden'>
                <Image
                  src={getCountryFlagUrl(countryId) || '/placeholder.svg'}
                  alt={`${countryName} Flag`}
                  fill
                  className='object-cover'
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className='w-full py-4 border-b'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col sm:flex-row gap-4 items-center justify-between'>
              <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto'>
                <div className='relative w-full sm:w-[260px]'>
                  <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input
                    type='search'
                    placeholder='Search plans...'
                    className='w-full pl-8'
                  />
                </div>
                <Select defaultValue='all'>
                  <SelectTrigger className='w-full sm:w-[180px]'>
                    <SelectValue placeholder='Filter by duration' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Durations</SelectItem>
                    <SelectItem value='short'>Short (1-7 days)</SelectItem>
                    <SelectItem value='medium'>Medium (8-15 days)</SelectItem>
                    <SelectItem value='long'>Long (16+ days)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='flex gap-2 w-full sm:w-auto justify-between sm:justify-end'>
                <Button variant='outline' size='sm' className='h-9'>
                  <Filter className='mr-2 h-4 w-4' />
                  Filter
                </Button>
                <Button variant='ghost' size='sm' className='h-9'>
                  <X className='mr-2 h-4 w-4' />
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <section className='w-full py-8 md:py-12'>
          <div className='container mx-auto px-4 md:px-6'>
            <Tabs defaultValue='list' className='w-full'>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl font-bold'>Available Plans</h2>
                <TabsList>
                  <TabsTrigger value='list'>List View</TabsTrigger>
                  <TabsTrigger value='grid'>Grid View</TabsTrigger>
                </TabsList>
              </div>

              {/* List View */}
              <TabsContent value='list' className='space-y-4'>
                <div className='rounded-lg border overflow-hidden'>
                  <div className='hidden md:grid md:grid-cols-6 bg-muted px-4 py-3 font-medium text-sm'>
                    <div className='col-span-2'>Plan</div>
                    <div>Data</div>
                    <div>Duration</div>
                    <div>Price</div>
                    <div className='text-right'>Action</div>
                  </div>
                  <div className='divide-y'>
                    {packages.map((pkg) => (
                      <div key={pkg.id} className='p-4'>
                        <div className='md:grid md:grid-cols-6 md:items-center gap-4'>
                          <div className='col-span-2 mb-2 md:mb-0'>
                            <div className='flex items-center gap-2'>
                              <h3 className='font-semibold'>{pkg.name}</h3>
                              {pkg.popular && <Badge>Popular</Badge>}
                            </div>
                            <p className='text-sm text-muted-foreground'>
                              {pkg.description}
                            </p>
                          </div>
                          <div className='flex md:block items-center justify-between mb-2 md:mb-0'>
                            <span className='text-sm font-medium md:text-base'>
                              {pkg.data}GB
                            </span>
                            <span className='md:hidden text-sm text-muted-foreground'>
                              {pkg.speed}
                            </span>
                          </div>
                          <div className='flex md:block items-center justify-between mb-2 md:mb-0'>
                            <span className='text-sm font-medium md:text-base'>
                              {pkg.duration} days
                            </span>
                            <span className='md:hidden text-sm text-muted-foreground'>
                              Validity
                            </span>
                          </div>
                          <div className='flex md:block items-center justify-between mb-4 md:mb-0'>
                            <span className='text-sm font-medium md:text-base'>
                              ${pkg.price.toFixed(2)}
                            </span>
                            <span className='md:hidden text-sm text-muted-foreground'>
                              USD
                            </span>
                          </div>
                          <div className='md:text-right'>
                            <Collapsible className='md:hidden mb-4'>
                              <CollapsibleTrigger className='flex items-center text-sm text-primary'>
                                View Features
                                <ChevronDown className='h-4 w-4 ml-1' />
                              </CollapsibleTrigger>
                              <CollapsibleContent className='mt-2 space-y-2'>
                                <ul className='space-y-1'>
                                  {pkg.features.map((feature, idx) => (
                                    <li
                                      key={idx}
                                      className='flex items-start gap-2 text-sm'
                                    >
                                      <CheckCircle className='h-4 w-4 text-primary mt-0.5' />
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </CollapsibleContent>
                            </Collapsible>
                            <Button asChild className='w-full md:w-auto'>
                              <Link href={`/checkout?package=${pkg.id}`}>
                                Select
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Grid View */}
              <TabsContent value='grid' className='space-y-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {packages.map((pkg) => (
                    <Card
                      key={pkg.id}
                      className={`flex flex-col ${
                        pkg.popular ? 'border-primary' : ''
                      }`}
                    >
                      <CardHeader>
                        <div className='flex justify-between items-start'>
                          <div>
                            <CardTitle>{pkg.name}</CardTitle>
                            <CardDescription>{pkg.description}</CardDescription>
                          </div>
                          {pkg.popular && <Badge>Popular</Badge>}
                        </div>
                        <div className='mt-4 flex items-baseline'>
                          <span className='text-3xl font-bold'>
                            ${pkg.price.toFixed(2)}
                          </span>
                          <span className='ml-1 text-sm text-muted-foreground'>
                            / {pkg.duration} days
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className='flex-1'>
                        <div className='space-y-4'>
                          <div className='flex items-center gap-2'>
                            <Globe className='h-5 w-5 text-muted-foreground' />
                            <span className='text-sm'>
                              {countryName} Coverage
                            </span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              className='h-5 w-5 text-muted-foreground'
                            >
                              <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                            </svg>
                            <span className='text-sm'>
                              {pkg.data}GB high-speed data
                            </span>
                          </div>
                          <Separator />
                          <div>
                            <h4 className='text-sm font-medium mb-2'>
                              Package includes:
                            </h4>
                            <ul className='space-y-2 text-sm'>
                              {pkg.features
                                .slice(0, 4)
                                .map((feature, index) => (
                                  <li key={index} className='flex items-center'>
                                    <CheckCircle className='mr-2 h-4 w-4 text-primary' />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                            </ul>
                            {pkg.features.length > 4 && (
                              <Accordion
                                type='single'
                                collapsible
                                className='w-full'
                              >
                                <AccordionItem
                                  value='more-features'
                                  className='border-0'
                                >
                                  <AccordionTrigger className='py-2 text-sm font-medium'>
                                    Show more features
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <ul className='space-y-2 text-sm'>
                                      {pkg.features
                                        .slice(4)
                                        .map((feature, index) => (
                                          <li
                                            key={index}
                                            className='flex items-center'
                                          >
                                            <CheckCircle className='mr-2 h-4 w-4 text-primary' />
                                            <span>{feature}</span>
                                          </li>
                                        ))}
                                    </ul>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className='w-full' asChild>
                          <Link href={`/checkout?package=${pkg.id}`}>
                            Select Package
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Coverage Details */}
        <section id='coverage' className='w-full py-8 md:py-12 bg-muted'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center mb-8'>
              <h2 className='text-2xl font-bold'>
                {countryName} Coverage Details
              </h2>
              <p className='max-w-[700px] text-muted-foreground'>
                Our eSIM provides excellent coverage throughout {countryName}
              </p>
            </div>

            <div className='grid gap-8 md:grid-cols-2'>
              <div>
                <div className='rounded-xl overflow-hidden h-[300px] relative'>
                  <Image
                    src={`/placeholder.svg?text=${countryName}+Coverage&height=600&width=800`}
                    alt={`${countryName} Coverage Map`}
                    fill
                    className='object-cover'
                  />
                </div>
              </div>
              <div className='space-y-6'>
                <div>
                  <h3 className='text-xl font-bold mb-4'>
                    Network Information
                  </h3>
                  <div className='space-y-4'>
                    <div className='flex items-start gap-3'>
                      <div className='w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5'>
                        <CheckCircle className='h-4 w-4 text-primary' />
                      </div>
                      <div>
                        <h4 className='font-medium'>Network Providers</h4>
                        <p className='text-sm text-muted-foreground'>
                          {coverageInfo.providers.join(', ')}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-start gap-3'>
                      <div className='w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5'>
                        <CheckCircle className='h-4 w-4 text-primary' />
                      </div>
                      <div>
                        <h4 className='font-medium'>Coverage Quality</h4>
                        <p className='text-sm text-muted-foreground'>
                          {coverageInfo.coverage}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-start gap-3'>
                      <div className='w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5'>
                        <CheckCircle className='h-4 w-4 text-primary' />
                      </div>
                      <div>
                        <h4 className='font-medium'>Average Speeds</h4>
                        <p className='text-sm text-muted-foreground'>
                          {coverageInfo.speeds}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='bg-background p-4 rounded-lg flex items-start gap-3'>
                  <Info className='h-5 w-5 text-muted-foreground mt-0.5' />
                  <div>
                    <h4 className='font-medium'>Important Information</h4>
                    <p className='text-sm text-muted-foreground'>
                      While we provide excellent coverage throughout{' '}
                      {countryName}, connectivity may vary in some remote areas
                      and underground locations. Our eSIM automatically connects
                      to the strongest available network.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className='w-full py-8 md:py-12 bg-background'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center mb-8'>
              <h2 className='text-2xl font-bold'>Frequently Asked Questions</h2>
              <p className='max-w-[700px] text-muted-foreground'>
                Everything you need to know about our {countryName} eSIM
                packages
              </p>
            </div>

            <div className='mx-auto max-w-3xl'>
              <Accordion type='single' collapsible className='w-full'>
                <AccordionItem value='item-1'>
                  <AccordionTrigger>
                    How do I activate my {countryName} eSIM?
                  </AccordionTrigger>
                  <AccordionContent>
                    After purchasing, you will receive a QR code via email. On
                    your device, go to Settings → Cellular/Mobile → Add
                    Cellular/Mobile Plan, then scan the QR code. Follow the
                    on-screen instructions to complete activation. The process
                    takes just a few minutes.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-2'>
                  <AccordionTrigger>
                    Will my phone work with this eSIM in {countryName}?
                  </AccordionTrigger>
                  <AccordionContent>
                    Most newer smartphones (iPhone XS and newer, Google Pixel 3
                    and newer, Samsung Galaxy S20 and newer) support eSIM
                    technology. Your device must be unlocked to use our eSIM.
                    You can check our compatibility list or your device
                    specifications to confirm.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-3'>
                  <AccordionTrigger>
                    Can I make calls and send SMS with this eSIM?
                  </AccordionTrigger>
                  <AccordionContent>
                    Our {countryName} eSIM provides data connectivity only. For
                    calls and SMS, you can use apps like WhatsApp, Messenger, or
                    LINE. If you need traditional voice calling, we recommend
                    keeping your home SIM active for calls and using our eSIM
                    for data.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-4'>
                  <AccordionTrigger>
                    What happens if I run out of data?
                  </AccordionTrigger>
                  <AccordionContent>
                    If you run out of data before your plan expires, you can
                    easily purchase a top-up through your account dashboard. We
                    will send you notifications when you are approaching your
                    data limit so you can top up before running out.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='w-full py-8 md:py-12 bg-primary text-primary-foreground'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-2xl font-bold'>
                  Ready for Your Trip to {countryName}?
                </h2>
                <p className='max-w-[700px]'>
                  Get your {countryName} eSIM now and enjoy seamless
                  connectivity throughout your journey.
                </p>
              </div>
              <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                <Button size='lg' variant='secondary' asChild>
                  <a href='#top'>Get Your {countryName} eSIM</a>
                </Button>
                <Button
                  size='lg'
                  variant='outline'
                  className='bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10'
                  asChild
                >
                  <Link href='/contact'>Need Help?</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className='w-full border-t bg-background py-6 md:py-12'>
        <div className='container mx-auto px-4 md:px-6'>
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <Wifi className='h-6 w-6' />
                <span className='text-xl font-bold'>GlobaleSIM</span>
              </div>
              <p className='text-sm text-muted-foreground'>
                Stay connected anywhere in the world with our global eSIM
                service.
              </p>
              <div className='flex gap-4'>
                <Link
                  href='#'
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
                  href='#'
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
                    <path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' />
                  </svg>
                </Link>
                <Link
                  href='#'
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
              <h3 className='text-lg font-medium'>Company</h3>
              <ul className='space-y-2 text-sm'>
                <li>
                  <Link
                    href='/about'
                    className='text-muted-foreground hover:text-foreground'
                  >
                    About Us
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
                    href='/press'
                    className='text-muted-foreground hover:text-foreground'
                  >
                    Press
                  </Link>
                </li>
                <li>
                  <Link
                    href='/blog'
                    className='text-muted-foreground hover:text-foreground'
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className='space-y-4'>
              <h3 className='text-lg font-medium'>Support</h3>
              <ul className='space-y-2 text-sm'>
                <li>
                  <Link
                    href='/help'
                    className='text-muted-foreground hover:text-foreground'
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href='/contact'
                    className='text-muted-foreground hover:text-foreground'
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href='/compatibility-checker'
                    className='text-muted-foreground hover:text-foreground'
                  >
                    Device Compatibility
                  </Link>
                </li>
                <li>
                  <Link
                    href='/coverage'
                    className='text-muted-foreground hover:text-foreground'
                  >
                    Coverage Map
                  </Link>
                </li>
              </ul>
            </div>
            <div className='space-y-4'>
              <h3 className='text-lg font-medium'>Legal</h3>
              <ul className='space-y-2 text-sm'>
                <li>
                  <Link
                    href='/terms-of-service'
                    className='text-muted-foreground hover:text-foreground'
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href='/privacy-policy'
                    className='text-muted-foreground hover:text-foreground'
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href='/cookies'
                    className='text-muted-foreground hover:text-foreground'
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href='/acceptable-use'
                    className='text-muted-foreground hover:text-foreground'
                  >
                    Acceptable Use
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='mt-8 border-t pt-8 text-center text-sm text-muted-foreground'>
            <p>© {new Date().getFullYear()} Atlas Esim. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
