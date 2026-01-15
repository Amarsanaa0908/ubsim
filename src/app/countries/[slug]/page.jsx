'use client';

import { apiList, callGet } from '@/axios/api';
import FAQ from '@/components/faq/component';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { capitalizeFirstLetter, roundToNearestHundred } from '@/lib/utils';
import { CheckCircle, ChevronDown, CreditCard, Filter, Globe, Info, Phone, Search, Smartphone, X, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function CountryDataPage() {
    const [selectedSimType, setSelectedSimType] = useState("esim")
  // const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const [days, setDays] = useState('all');
  const [quota, setQuota] = useState('all');
  // const [countries, setCountries] = useState<Country[]>([]);
  const [dayArray, setDayArray] = useState([]);
  const [quotaArray, setQuotaArray] = useState([]);

  // This would normally come from an API or database
  const { slug } = useParams()

  const countryId = slug;

  const countryName =
    countryId.charAt(0).toUpperCase() + countryId.slice(1).replace(/-/g, ' ');

  useEffect(() => {
    const fetchPackages = async () => {
      try {

        const filterArray = [
          ["slug", "ilike", capitalizeFirstLetter(slug)],
          ["isPhysical", selectedSimType === "esim" ? false : true],
        ]

        if (days !== "all") {
          // Ensure 'days' is a number if you're comparing it as such in your backend
          // If selectedDuration directly represents the 'days' value, use it.
          // For this example, we'll assume selectedDuration holds the numeric day value.
          filterArray.push(["day", Number.parseInt(days??'')])
        }

        if (quota !== "all") {
          filterArray.push(["quota", Number.parseInt(quota ?? '')])
        }

        const filters = JSON.stringify(filterArray)

        const res = await callGet(`${apiList.ubsim}/?filters=[${filters}]`)
        const { items } = res;
        setPackages(items)
      } catch (error) {
        console.log(error)
      }
    }

    fetchPackages()
  }, [slug, selectedSimType, days, quota])

//   useEffect(() => {
//     async function fetchPackages() {

//          const filterArray = [
//       ["slug", "ilike", capitalizeFirstLetter(slug)],
//       ["isPhysical", selectedSimType === "esim" ? false : true],
//     ]
//     if (days !== "all") {
//       // Ensure 'days' is a number if you're comparing it as such in your backend
//       // If selectedDuration directly represents the 'days' value, use it.
//       // For this example, we'll assume selectedDuration holds the numeric day value.
//       filterArray.push(["day", Number.parseInt(days??'')])
//     }

//     if (quota !== "all") {
//       filterArray.push(["quota", Number.parseInt(quota ?? '')])
//     }
//       const filters = JSON.stringify(filterArray)

//       const response = await getPackages({ filters, page: 0, size: 100 });
//       if (response.success) {
//         setPackages(response.data.items);
//       } else {
//         toast.error('Failed to fetch packages');
//       }
//       // setLoading(false);
//     }

//     fetchPackages();
//   }, [selectedSimType,slug, days, quota]);

  useEffect(() => {
    async function fetchInitialFilters() {
      try {

        const dayResponse = await callGet(`${apiList.packages}/days?country=${slug}`)
        if (dayResponse.status) {
          setDayArray(dayResponse.data);
        }

        const quotaResponse = await callGet(`${apiList.packages}/quotas?country=${slug}`);
        if (quotaResponse.status) {
          setQuotaArray(quotaResponse.data);
        }

        
      } catch (error) {
        toast.error('Error fetching filters');
        console.error(error);
      }
    }

    fetchInitialFilters();
  }, []);


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
                    Бүх улсууд
                  </Link>
                  <span className='text-muted-foreground'>→</span>
                  <span className='text-sm font-medium'>{countryName}</span>
                </div>
                <h1 className='text-3xl font-bold'>
                  {countryName} улсын eSIM багцууд
                </h1>
                <p className='mt-2 text-muted-foreground'>
                  {countryName} улсад өндөр хурдны интернэттэй, тав тухтай
                  зүйлгүй аялаарай
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                    <Zap className="w-3 h-3 mr-1" />
                    Тохиргоо шаардлагагүй
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                    <Globe className="w-3 h-3 mr-1" />
                    Өргөө сүлжээ
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
                    <Phone className="w-3 h-3 mr-1" />
                    24/7 Туслах
                  </Badge>
                </div>
              </div>
              <div className='flex-shrink-0 w-32 h-24 md:w-72 md:h-44 relative rounded-lg overflow-hidden'>
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

        <section className="w-full py-6 border-b bg-white">
           <div className="container mx-auto px-4 md:px-6">
             <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
               <div className="flex-1">
                 <h2 className="text-xl font-semibold mb-2">SIM төрөл сонгоно уу</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                   <Card
                     className={`cursor-pointer transition-all duration-200 bg-gray-700 ${
                       selectedSimType === "esim"
                         ? "ring-2 ring-blue-500 bg-gradient-to-br from-blue-50 to-purple-50"
                         : "hover:shadow-md"
                     }`}
                     onClick={() => setSelectedSimType("esim")}
                   >
                     <CardContent className="p-4">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                           <Smartphone className="w-5 h-5 text-white" />
                         </div>
                         <div className="flex-1">
                           <h3 className="font-semibold text-muted-foreground pb-4 text-lg">eSIM</h3>
                           <p className="text-sm text-muted-foreground">Онлайнаар шууд суулгах боломжтой</p>
                         </div>
                         <div className="flex flex-col gap-1">
                           <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                             <Zap className="w-3 h-3 mr-1" />
                             QR уншуулна
                           </Badge>
                         </div>
                       </div>
                     </CardContent>
                   </Card>

                   <Card
                     className={`cursor-pointer transition-all duration-200 bg-gray-700 ${
                       selectedSimType === "physical"
                         ? "ring-2 ring-green-500 bg-gradient-to-br from-green-50 to-emerald-50"
                         : "hover:shadow-md"
                    }`}
                     onClick={() => setSelectedSimType("physical")}
                   >
                     <CardContent className="p-4">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                           <CreditCard className="w-5 h-5 text-white" />
                         </div>
                         <div className="flex-1">
                           <h3 className="font-extrabold text-muted-foreground pb-4 text-lg">БИЕТ СИМ</h3>
                           <p className="text-sm text-muted-foreground">esim дэмжихгүй утсанд тохиромжтой</p>
                         </div>
                         <div className="flex flex-col gap-1">
                           <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                             <Phone className="w-3 h-3 mr-1" />
                             Хүргэлтээр авна
                           </Badge>
                         </div>
                       </div>
                     </CardContent>
                   </Card>
                 </div>
               </div>

               {/* <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 max-w-md">
                 <h3 className="font-medium mb-3">Гол ялгаа</h3>
                 <div className="space-y-2 text-sm">
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                     <span>
                       <strong>eSIM:</strong> Шууд суулгаад ашиглах боломжтой
                     </span>
                   </div>
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-green-500"></div>
                     <span>
                       <strong>Биет:</strong> eSIM дэмжихгүй утсанд тохиромжтой
                     </span>
                   </div>
                 </div>
               </div> */}
             </div>
           </div>
         </section>

        {/* Filter Section */}
        <section className='w-full py-4 border-b'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col sm:flex-row gap-4 items-center justify-between'>
              <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto'>
                {/* <div className='relative w-full sm:w-[260px]'>
                  <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input
                    type='search'
                    placeholder='Багц хайх...'
                    className='w-full pl-8'
                  />
                </div> */}
                <Select value={days} onValueChange={setDays}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Хоног</SelectItem>
                  {dayArray &&
                    dayArray.map(
                      (
                        item,
                        index, // Use 'data' if it's the source of your items
                      ) => (
                        <SelectItem key={index} value={item.toString()}>
                          {item}
                        </SelectItem>
                      ),
                    )}
                </SelectContent>
              </Select>
              <Select value={quota} onValueChange={setQuota}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Дата хэмжээ</SelectItem>
                  {quotaArray &&
                    quotaArray.map(
                      (
                        item,
                        index, // Use 'data' if it's the source of your items
                      ) => (
                        <SelectItem key={index} value={item.toString()}>
                          {item / 1000} GB
                        </SelectItem>
                      ),
                    )}
                </SelectContent>
              </Select>
              </div>
              {/* <div className='flex gap-2 w-full sm:w-auto justify-between sm:justify-end'>
                <Button variant='outline' size='sm' className='h-9'>
                  <Filter className='mr-2 h-4 w-4' />
                  Шүүлтүүр
                </Button>
                <Button variant='ghost' size='sm' className='h-9' onClick={() => {
                    setDays("all");
                    setQuota("all");
                }}>
                  <X className='mr-2 h-4 w-4' />
                  Цэвэрлэх
                </Button>
              </div> */}
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <section className='w-full py-8 md:py-12'>
          <div className='container mx-auto px-4 md:px-6'>
            <Tabs defaultValue='list' className='w-full'>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl font-bold'>Багцууд</h2>
                {/* <TabsList>
                  <TabsTrigger value='grid'>Хөндлөнгөөр</TabsTrigger>
                </TabsList> */}
              </div>
              {/* List View */}
              {/* <TabsContent value='list' className='space-y-4'>
                <div className='rounded-lg border overflow-hidden'>
                  <div className='hidden md:grid md:grid-cols-6 bg-muted px-4 py-3 font-medium text-sm'>
                    <div className='col-span-2'>Багц</div>
                    <div>Дата</div>
                    <div>Хугацаа</div>
                    <div>Үнэ</div>
                    <div className='text-right'>Үйлдэл</div>
                  </div>
                  <div className='divide-y'>
                    {packages?.map((pkg) => (
                      <div key={pkg.packageId} className='p-4'>
                        <div className='md:grid md:grid-cols-6 md:items-center gap-4'>
                          <div className='col-span-2 mb-2 md:mb-0'>
                            <div className='flex items-center gap-2'>
                              <h3 className='font-semibold'>{pkg.name}</h3>
                              {pkg.isTrending === true && 
                              <Badge className='bg-orange-500 text-white'>Эрэлттэй</Badge>
                               }
                              
                              <Badge className={pkg.isPhysical === true ? 'bg-blue-500' : 'bg-green-500'}>
                                {pkg.isPhysical === true ? 'Биет SIM' : 'eSIM'} 
                              </Badge>

                            </div>
                            <p className='text-sm text-muted-foreground'>
                              {pkg.name}
                            </p>
                          </div>
                          <div className='flex md:block items-center justify-between mb-2 md:mb-0'>
                            <span className='text-sm font-medium md:text-base'>
                              
                              {pkg.quota === 0 ? 'Хязгааргүй ∞' : `${pkg.quota / 1000} GB${pkg.isDaily === true ? '/өдөр' : ''}` }
                              
                            </span>
                            <span className='md:hidden text-sm text-muted-foreground'>
                              {pkg.coverages}
                            </span>
                          </div>
                          <div className='flex md:block items-center justify-between mb-2 md:mb-0'>
                            <span className='text-sm font-medium md:text-base'>
                              {pkg.day} хоног
                            </span>
                            <span className='md:hidden text-sm text-muted-foreground'>
                              Хугацаа
                            </span>
                          </div>
                          <div className='flex md:block items-center justify-between mb-4 md:mb-0'>
                            <span className='text-sm font-medium md:text-base'>
                              {roundToNearestHundred(pkg.price)} ТӨГ
                            </span>
                            <span className='md:hidden text-sm text-muted-foreground'>
                              ТӨГ
                            </span>
                          </div>
                          <div className='md:text-right'>
                            <Collapsible className='md:hidden mb-4'>
                              <CollapsibleTrigger className='flex items-center text-sm text-primary'>
                                Дэлгэрэнгүй
                                <ChevronDown className='h-4 w-4 ml-1' />
                              </CollapsibleTrigger>
                              <CollapsibleContent className='mt-2 space-y-2'>
                                <ul className='space-y-1'>
                                  <li className='flex items-start gap-2 text-sm'>
                                    <CheckCircle className='h-4 w-4 text-primary mt-0.5' />
                                    <span>
                                      {pkg.quota / 1000} GB өндөр хурдны дата
                                    </span>
                                  </li>
                                  <li className='flex items-start gap-2 text-sm'>
                                    <CheckCircle className='h-4 w-4 text-primary mt-0.5' />
                                    <span>{pkg.day} хоног</span>
                                  </li>
                                  <li className='flex items-start gap-2 text-sm'>
                                    <CheckCircle className='h-4 w-4 text-primary mt-0.5' />
                                    <span>4G/LTE/5G</span>
                                  </li>
                                  <li className='flex items-start gap-2 text-sm'>
                                    <CheckCircle className='h-4 w-4 text-primary mt-0.5' />
                                    <span>{pkg.countryMn} дах сүлжээ</span>
                                  </li>
                                  <li className='flex items-start gap-2 text-sm'>
                                    <CheckCircle className='h-4 w-4 text-primary mt-0.5' />
                                    <span>24/7 харилцагчийн туслах</span>
                                  </li>
                                  <li className='flex items-start gap-2 text-sm'>
                                    <CheckCircle className='h-4 w-4 text-primary mt-0.5' />
                                    <span>Хялбар идэвхжүүлэлт</span>
                                  </li>
                                </ul>
                              </CollapsibleContent>
                            </Collapsible>
                            <Button asChild className='w-full md:w-auto'>
                              <Link href={`/checkout?package=${pkg.packageId}`}>
                                Сонгох
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent> */}
              <TabsContent value='grid' className='space-y-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {packages.map((pkg) => (
                    <Card
                      key={pkg.id}
                      className={`flex flex-col ${
                        // pkg.popular ? 'border-primary' : ''
                        'border-primary'
                      }`}
                    >
                      <CardHeader>
                        <div className='flex justify-between items-start'>
                          <div>
                            <CardTitle>{pkg.name}</CardTitle>
                            <CardDescription>{pkg.name}</CardDescription>
                          </div>
                          {/* {pkg.popular && <Badge>Эрэлттэй</Badge>} */}
                        </div>
                        <div className='mt-4 flex items-baseline'>
                          <span className='text-3xl font-bold'>
                            {roundToNearestHundred(pkg.price)} ТӨГ
                          </span>
                          <span className='ml-1 text-sm text-muted-foreground'>
                            / {pkg.day} хоног
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className='flex-1'>
                        <div className='space-y-4'>
                          <div className='flex items-center gap-2'>
                            <Globe className='h-5 w-5 text-muted-foreground' />
                            <span className='text-sm'>
                              {pkg.companyName} Сүлжээ
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
                              {pkg.quota / 1000} GB өндөр хурдны дата
                            </span>
                          </div>
                          <Separator />
                          <div>
                            <h4 className='text-sm font-medium mb-2'>
                              Багцанд:
                            </h4>
                            <ul className='space-y-2 text-sm'>
                              <ul className='space-y-1'>
                                <li className='flex items-start gap-2 text-sm'>
                                  <CheckCircle className='h-4 w-4 text-primary mt-0.5' />
                                  <span>
                                    {pkg.quota / 1000} GB өндөр хурдны дата
                                  </span>
                                </li>
                                <li className='flex items-start gap-2 text-sm'>
                                  <CheckCircle className='h-4 w-4 text-primary mt-0.5' />
                                  <span>{pkg.day} хоног</span>
                                </li>
                                <li className='flex items-start gap-2 text-sm'>
                                  <CheckCircle className='h-4 w-4 text-primary mt-0.5' />
                                  <span>4G/LTE/5G</span>
                                </li>
                                <li className='flex items-start gap-2 text-sm'>
                                  <CheckCircle className='h-4 w-4 text-primary mt-0.5' />
                                  <span>{pkg.countryMn} дах сүлжээ</span>
                                </li>
                                <li className='flex items-start gap-2 text-sm'>
                                  <CheckCircle className='h-4 w-4 text-primary mt-0.5' />
                                  <span>24/7 харилцагчийн туслах</span>
                                </li>
                                <li className='flex items-start gap-2 text-sm'>
                                  <CheckCircle className='h-4 w-4 text-primary mt-0.5' />
                                  <span>Хялбар идэвхжүүлэлт</span>
                                </li>
                              </ul>
                            </ul>
                            {/* {pkg.features.length > 4 && */}
                            {/* <Accordion
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
                                    <li
                                      // key={index}
                                      className='flex items-center'
                                    >
                                      <CheckCircle className='mr-2 h-4 w-4 text-primary' />
                                      <span>feature</span>
                                    </li>
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion> */}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className='w-full' asChild>
                          <Link href={`/checkout?package=${pkg.id}`}>
                            Сонгох
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
                {countryName} дах интернэт сүлжээ
              </h2>
              <p className='max-w-[700px] text-muted-foreground'>
                Манай eSIM {countryName} даяар найдвартай интернэт холбогддог
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
                  <h3 className='text-xl font-bold mb-4'>Сүлжээ мэдээлэл</h3>
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
                        <h4 className='font-medium'>Санал болгож буй сүлжээ</h4>
                        <p className='text-sm text-muted-foreground'>
                          LTE, 4G, 5G
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='bg-background p-4 rounded-lg flex items-start gap-3'>
                  <Info className='h-5 w-5 text-muted-foreground mt-0.5' />
                  <div>
                    <h4 className='font-medium'>Анхаарах зүйлс</h4>
                    <p className='text-sm text-muted-foreground'>
                      Бид {countryName} улс дах маш сайн сүлжээга ашигладаг ч,
                      зарим алслагдсан бүс нутагт холболт муу байж болно. Манай
                      eSIM автоматаар хамгийн сайн интернетэд холбогдох болно.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ />

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
    </div>
  );
}
