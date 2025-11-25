"use client"

import { apiList, callGet, callPost } from "@/axios/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { roundToNearestHundred } from "@/lib/utils";
import { ArrowLeft, Badge, CheckCircle, Globe, Info, Loader2, LockKeyhole, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { toast } from "sonner";

const selectedPlan = {
  id: 'global-traveler',
  name: 'Global Traveler',
  description: 'Best for international travelers',
  price: 39.99,
  duration: 15,
  data: 10,
  regions: ['Global (190+ countries)'],
  features: [
    '10GB high-speed data',
    'Global coverage (190+ countries)',
    '4G/5G speeds where available',
    'Priority 24/7 support',
    'Data rollover',
    'No contract',
    'Instant activation',
  ],
  popular: true,
};

export default function CheckoutClient() {
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1)
    const [data, setData] = useState()
    const [couponCode, setCouponCode] = useState('');
    const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
    const [afterPromo, setAfterPromo] = useState();
      const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const searchParams = useSearchParams();
  const packageId = searchParams.get('package') ?? '';
  const [paymentData, setPaymentData] = useState()

    const applyCoupon = async () => {
    setIsApplyingCoupon(true);
    try {
      const response = await checkCoupon(
        couponCode.toLowerCase(),
        data?.price ?? 0,
        data?.packageId ?? ''
      );

      setAfterPromo(response.data.data);

      setIsApplyingCoupon(false);
    } catch (error) {
      console.error('Error applying coupon:', error);
      toast.error('An error occurred');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const totalPrice =
      afterPromo?.total.toLocaleString() ?? data?.price.toLocaleString();

    try {
      let response;

      const res = await callPost(`${apiList.ubsim}/`, {
        phoneNumber: phone,
        email: email,
        id: packageId,
        price: totalPrice
      })

    
        // response = await createInvoice(
        //   email,
        //   phone,
        //   packageId,
        //   totalPrice ?? '',
        //   couponCode,
        //   Cookies.get("ref")
        // );
      


      if (res.status) {
        setPaymentData(res.data);
        setCurrentStep(2);
      } else {
        toast.error(res.data.msg[0]);
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred while processing your payment.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await callGet(`${apiList.ubsim}/${packageId}`)
        setData(res?.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchPackage()
  }, [packageId])

  const handleCheck = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const response = await callGet(`${apiList.ubsim}/check/${paymentData?.orderId}`)
      if (response?.status) {
        setCurrentStep(3)
      } else {
        console.log(response)
        toast(response.msg[0])
      }
    } catch (error) {
      console.log(error)
    }

    setIsLoading(false)
  }

    return (
        <div className='flex min-h-screen flex-col'>
      <main className='flex-1 bg-muted/50 py-8'>
        <div className='container mx-auto px-4 md:px-6'>
          <div className='mb-8'>
            <Button variant='ghost' size='sm' asChild className='mb-4'>
              <Link href='/'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Буцах
              </Link>
            </Button>
            <h1 className='text-3xl font-bold'>Төлбөр төлөх</h1>
            <p className='text-muted-foreground mt-2'>
              Төлбөрөө төлөөд интернеттэй болоорой
            </p>
          </div>

          {/* {!isLoggedIn && (
            <Card className='mb-8 border-primary/50 bg-primary/5'>
              <CardContent className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                <div className='space-y-1'>
                  <h3 className='font-medium flex items-center'>
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
                      className='h-5 w-5 mr-2 text-primary'
                    >
                      <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                    </svg>
                    Нэвтэрч орч худалдаж аваад урамшууллын оноо цуглуулаарай
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    Нэвтэрч орж худалдан авалтандаа{' '}
                    <span className='font-medium text-primary'>10%</span>{' '}
                    цуглуулаарай. Оноогоор цаашдын худалдан авалтаа хямдруулж
                    аваарай.
                  </p>
                </div>
                <div className='flex gap-2 w-full sm:w-auto'>
                  <Button
                    variant='outline'
                    size='sm'
                    asChild
                    className='flex-1 sm:flex-initial'
                  >
                    <Link href='/register'>Бүртгүүлэх</Link>
                  </Button>
                  <Button size='sm' asChild className='flex-1 sm:flex-initial'>
                    <Link href='/login'>Нэвтрэх</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )} */}

          <div className='grid gap-8 md:grid-cols-3'>
            {/* Main Checkout Form */}
            <div className='md:col-span-2 space-y-6'>
              {/* Checkout Steps */}
              <div className='flex justify-between mb-6'>
                <div className='flex flex-col items-center'>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep >= 1
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {currentStep > 1 ? <CheckCircle className='h-5 w-5' /> : 1}
                  </div>
                  <span className='text-xs mt-1'>Багц</span>
                </div>
                <div className='flex-1 flex items-center -mt-4 ml-3.5'>
                  <div
                    className={`h-1 w-full ${
                      currentStep >= 2 ? 'bg-primary' : 'bg-muted'
                    }`}
                  ></div>
                </div>
                <div className='flex flex-col items-center'>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep >= 2
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {currentStep > 2 ? <CheckCircle className='h-5 w-5' /> : 2}
                  </div>
                  <span className='text-xs mt-1'>Төлбөр төлөлт</span>
                </div>
                <div className='flex-1 flex items-center -mt-4'>
                  <div
                    className={`h-1 w-full ${
                      currentStep >= 3 ? 'bg-primary' : 'bg-muted'
                    }`}
                  ></div>
                </div>
                <div className='flex flex-col items-center'>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep >= 3
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    3
                  </div>
                  <span className='text-xs mt-1'>Баталгаажуулалт</span>
                </div>
              </div>

              {/* Step 1: Plan Details */}
              {currentStep === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Төлбөрийн дэлгэрэнгүй</CardTitle>
                    <CardDescription>
                      Та сонгосон багцын мэдээллийг нягтална уу
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='flex items-start gap-4'>
                     <div className='h-16 w-24 rounded-md bg-primary/10 flex items-center justify-center'>
                      <ReactCountryFlag 
                        countryCode='CN' 
                        svg
                        style={{
                          width: '6rem',
                          height: '6rem',
                        }}
                      />
                    </div>
                      <div className='flex-1'>
                        <div className='flex items-center gap-2'>
                          <h3 className='font-semibold text-lg'>
                            {data && data.packageTitle}
                          </h3>
                          {selectedPlan.popular && <Badge>Эрэлттэй</Badge>}
                        </div>
                        <p className='text-muted-foreground'>
                          {selectedPlan.description}
                        </p>
                        <div className='mt-2 flex items-center gap-4 text-sm'>
                          <span className='flex items-center gap-1'>
                            <Globe className='h-4 w-4 text-muted-foreground' />
                            {data?.countryMn} /
                          </span>
                          <span>{(data?.quota ?? 0) / 1000} GB</span>/
                          <span>{data?.day} хоног</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className='font-medium mb-2'>Багцын тухай:</h4>
                      <ul className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                        {/* {selectedPlan.features.map((feature, index) => ( */}
                        <li className='flex items-center text-sm'>
                          <CheckCircle className='mr-2 h-4 w-4 text-primary' />
                          <span>
                            {(data?.quota ?? 0) / 1000} GB өндөр хурдны дата
                          </span>
                        </li>
                        <li className='flex items-center text-sm'>
                          <CheckCircle className='mr-2 h-4 w-4 text-primary' />
                          <span>{data?.day} хоног</span>
                        </li>
                        <li className='flex items-center text-sm'>
                          <CheckCircle className='mr-2 h-4 w-4 text-primary' />
                          <span>4G/LTE/5G</span>
                        </li>
                        <li className='flex items-center text-sm'>
                          <CheckCircle className='mr-2 h-4 w-4 text-primary' />
                          <span>VPN шаардлагагүй</span>
                        </li>
                        <li className='flex items-center text-sm'>
                          <CheckCircle className='mr-2 h-4 w-4 text-primary' />
                          <span>24/7 харилцагчийн туслах</span>
                        </li>
                        <li className='flex items-center text-sm'>
                          <CheckCircle className='mr-2 h-4 w-4 text-primary' />
                          <span>Хялбар идэвхжүүлэлт</span>
                        </li>
                      </ul>
                    </div>

                    <Separator />
                    <div>
                      <h4 className='font-medium mb-3'>
                        Холбоо барих мэдээлэл
                      </h4>
                      <p className='text-sm text-muted-foreground mb-4'>
                        Бид энэхүү мэдээллийг ашиглан тань руу eSIM дэлгэрэнгүй
                        болон суулгах заавар явуулах болно.
                      </p>
                      <div className='space-y-4'>
                        <div className='space-y-2'>
                          <Label
                            htmlFor='guest-email'
                            className='flex items-center gap-1'
                          >
                            <Mail className='h-4 w-4' /> И-мэйл хаяг
                          </Label>
                          <Input
                            id='guest-email'
                            type='email'
                            placeholder='your.email@example.com'
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (emailError) validateEmail(e.target.value);
                            }}
                            className={emailError ? 'border-red-500' : ''}
                          />
                          {emailError && (
                            <p className='text-xs text-red-500 mt-1'>
                              {emailError}
                            </p>
                          )}
                        </div>
                        <div className='space-y-2'>
                          <Label
                            htmlFor='guest-phone'
                            className='flex items-center gap-1'
                          >
                            <Phone className='h-4 w-4' /> Утасны дугаар
                          </Label>
                          <Input
                            id='guest-phone'
                            type='number'
                            placeholder='99999999'
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                              if (phoneError) validatePhone(e.target.value);
                            }}
                            className={phoneError ? 'border-red-500' : ''}
                          />
                          {phoneError && (
                            <p className='text-xs text-red-500 mt-1'>
                              {phoneError}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className='bg-muted p-4 rounded-md flex items-start gap-2'>
                      <Info className='h-5 w-5 text-muted-foreground mt-0.5' />
                      <div className='text-sm'>
                        <p className='font-medium'>eSIM дэмждэг эсэх</p>
                        <p className='text-muted-foreground'>
                          Таны утас eSIM дэмждэг эсэхийг шалгаарай. Орчин үеийн
                          ихэнх утаснууд eSIM дэмждэг.
                          <Link
                            href='/compatibility'
                            className='text-primary hover:underline ml-1'
                          >
                            Шалгах
                          </Link>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={handleSubmit}
                      className='w-full'
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                          Түр хүлээнэ үү...
                        </>
                      ) : (
                        'Үргэлжлүүлэх'
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* Step 2: Payment Details */}
              {currentStep === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Төлбөр</CardTitle>
                    <CardDescription>
                      Дараах QR кодыг уншуулан төлбөрөө төлөөрэй
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-6'>
                    <div className='flex items-center justify-between bg-muted p-3 rounded-md'>
                      <div className='flex items-center gap-2'>
                        <LockKeyhole className='h-4 w-4 text-muted-foreground' />
                        <span className='text-sm'>
                          Найдвартай төлбөрийн систем
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Image
                          src='https://s3.qpay.mn/p/e9bbdc69-3544-4c2f-aff0-4c292bc094f6/launcher-icon-ios.jpg'
                          alt='QPay'
                          width={36}
                          height={24}
                        />
                      </div>
                    </div>

                    {/* {!isLoggedIn && (
                      <div className='bg-muted/50 p-4 rounded-md mb-4'>
                        <div className='flex items-start gap-2'>
                          <div>
                            <h4 className='text-sm font-medium'>
                              Холбоо барих мэдээлэл
                            </h4>
                            <div className='mt-1 text-sm'>
                              <p className='flex items-center gap-1 text-muted-foreground'>
                                <Mail className='h-3.5 w-3.5' /> {email}
                              </p>
                              <p className='flex items-center gap-1 text-muted-foreground'>
                                <Phone className='h-3.5 w-3.5' /> {phone}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='ml-auto text-xs h-7 px-2'
                            onClick={() => setCurrentStep(1)}
                          >
                            Засах
                          </Button>
                        </div>
                      </div>
                    )} */}

                    <div className='flex flex-col items-center justify-center space-y-4'>
                      <div className='text-center mb-2'>
                        <h3 className='font-medium text-lg mb-2'>
                          Уншуулах QR
                        </h3>
                        <p className='text-sm text-muted-foreground mb-4'>
                          Банкны аппликейшнээ ашиглан доорх QR кодыг уншуулж
                          төлбөрөө төлөөрэй
                        </p>
                      </div>

                      <div className='bg-white p-6 rounded-md border'>
                        <QRCodeCanvas value={paymentData?.qrCode || ''} />
                      </div>

                      <div className='sm:hidden mt-6 w-full'>
                        <p className='text-sm text-center text-muted-foreground mb-3'>
                          Or pay directly with your preferred app:
                        </p>
                        <div className='grid grid-cols-4 sm:grid-cols-5 gap-4 justify-items-center'>
                          {paymentData?.urls.map((app) => (
                            <a
                              key={app.name}
                              href={app.link}
                              className='flex flex-col items-center'
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              <div
                                className={`w-12 h-12 flex items-center justify-center mb-1`}
                              >
                                <Image
                                  src={app.logo || '/placeholder.svg'}
                                  alt={app.name}
                                  width={40}
                                  height={40}
                                  className=''
                                />
                              </div>
                              {/* <span className='text-xs'>{app.name}</span> */}
                            </a>
                          ))}
                        </div>
                      </div>

                      <div className='text-center mt-4 text-sm text-muted-foreground'>
                        <p>
                          Төлөх дүн:{' '}
                          <span className='font-semibold'>
                            {afterPromo?.total
                              ? roundToNearestHundred(afterPromo.total)
                              : roundToNearestHundred(data?.price ?? 0)}{' '}
                            ТӨГ
                          </span>
                        </p>
                        <p className='mt-1'>
                          Захиалгын дугаар:
                          {paymentData?.orderId}
                        </p>
                        <p>
                          Таны {email} хаягаар суулгах заавар болно QR код очно, хэрвээ ирэхгүй байвал та spam шалгаад үзээрэй. Бидэнтэй холбогдох 9514 - 1452
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className='flex justify-center'>
                    <Button
                      onClick={handleCheck}
                      className='w-full max-w-xs'
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                          Шалгаж байна...
                        </>
                      ) : (
                        'Төлбөр шалгах'
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* Step 3: Confirmation */}
              {currentStep === 3 && (
                <Card>
                  <CardHeader className='text-center'>
                    <div className='mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4'>
                      <CheckCircle className='h-8 w-8 text-primary' />
                    </div>
                    <CardTitle>Төлөлт амжилттай!</CardTitle>
                    <CardDescription>
                      Таны худалдан авалт амжилттай үүсэж, eSIM үүслээ.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-6'>
                    <div className='bg-muted p-4 rounded-md'>
                      <h3 className='font-medium mb-2'>
                        Захиалгын дэлгэрэнгүй
                      </h3>
                      <div className='grid grid-cols-2 gap-2 text-sm'>
                        <div className='text-muted-foreground'>
                          Нэхэмжлэхийн дугаар:
                        </div>
                        <div className='font-medium'>
                          {paymentData?.orderId}
                        </div>
                        <div className='text-muted-foreground'>Огноо:</div>
                        <div className='font-medium'>
                          {new Date().toLocaleDateString()}
                        </div>
                        <div className='text-muted-foreground'>Багц:</div>
                        <div className='font-medium'>{data?.packageTitle}</div>
                        <div className='text-muted-foreground'>Дүн:</div>
                        <div className='font-medium'>
                          {afterPromo?.total
                            ? roundToNearestHundred(afterPromo.total)
                            : roundToNearestHundred(data?.price ?? 0)}{' '}
                          ТӨГ
                        </div>
                      </div>
                    </div>

                    {/* <div className='border border-dashed border-primary rounded-md p-4 text-center'>
                      <h3 className='font-medium mb-2'>Таны eSIM QR код</h3>
                      <div className='bg-white p-4 inline-block rounded-md mb-2'>
                        <QRCodeCanvas
                          value={'/placeholder.svg?height=150&width=150'}
                        />
                      </div>
                      <p className='text-sm text-muted-foreground mb-2'>
                        Scan this QR code with your device to activate your eSIM
                      </p>
                      <Button variant='outline' size='sm'>
                        Download QR Code
                      </Button>
                    </div> */}

                    <div className='space-y-2'>
                      <h3 className='font-medium'>Дараагийн алхам</h3>
                      <ol className='list-decimal list-inside space-y-2 text-sm'>
                        <li>
                          Таны бүртгүүлсэн имэйл
                          хаягаар QR code очих болно
                        </li>
                        <li>QR code-ийг утасныхаа камераар уншуулаарай</li>
                        <li>
                          Уншуулсны дараагаар гарч ирэх зааврыг дагуу суулгаарай
                        </li>
                        <li className=''>Data Roaming асаах</li>
                        <li>
                          Зааврын дагуу зөв хийсэн бол та зорьсон газраа очиход
                          интернет орох болно.
                        </li>
                      </ol>
                    </div>

                    <div className='bg-muted p-4 rounded-md flex items-start gap-2'>
                      <Info className='h-5 w-5 text-muted-foreground mt-0.5' />
                      <div className='text-sm'>
                        <p className='font-medium'>Асуудал гарсан уу?</p>
                        <p className='text-muted-foreground'>
                          eSIM идэвхжүүлэх явцад туслалцаа хэрэгтэй бол бидэнтэй
                          рүү холбогдоорой.
                          <Link
                            href='/contact'
                            className='text-primary hover:underline ml-1'
                          >
                            Холбогдох
                          </Link>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className='flex flex-col space-y-2'>
                    <Button asChild className='w-full'>
                      <Link href='/dashboard'>Захиалга үзэх</Link>
                    </Button>
                    <Button variant='outline' asChild className='w-full'>
                      <Link href='/'>Нүүр хуудас руу очих</Link>
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div className='md:col-span-1'>
              <Card>
                <CardHeader>
                  <CardTitle>Захиалгын хураангуй</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Үнэ</span>
                    <span>{roundToNearestHundred(data?.price ?? 0)} ТӨГ</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Хэмжээ</span>
                    <span>{(data?.quota ?? 0) / 1000} GB</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Хугацаа</span>
                    <span>{data?.day} хоног</span>
                  </div>
                  {/* {!isLoggedIn && (
                    <div className='flex justify-between text-muted-foreground text-sm bg-muted/50 p-2 rounded-md'>
                      <span>Урамшууллын оноо</span>
                      <span className='font-medium text-primary'>10% оноо</span>
                    </div>
                  )} */}
                  <Separator />
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Дүн</span>
                    <span>{roundToNearestHundred(data?.price ?? 0)} ТӨГ</span>
                  </div>
                  {/* <div className='flex justify-between'>
                    <span className='text-muted-foreground'>НӨАТ</span>
                    <span>${(selectedPlan.price * 0.1).toFixed(2)}</span>
                  </div> */}
                  <div className='space-y-4'>
                    <Separator />
                    <div className='space-y-2'>
                      <Label htmlFor='coupon-code'>Купон код</Label>
                      <div className='flex gap-2'>
                        <Input
                          id='coupon-code'
                          placeholder='Код оруулах...'
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={applyCoupon}
                          disabled={isApplyingCoupon || !couponCode}
                        >
                          {isApplyingCoupon ? (
                            <Loader2 className='h-4 w-4 animate-spin' />
                          ) : (
                            'Шалгах'
                          )}
                        </Button>
                      </div>
                      {/* {couponApplied && (
                        <p className='text-xs text-green-600 flex items-center'>
                          <CheckCircle className='h-3 w-3 mr-1' /> Coupon
                          applied successfully!
                        </p>
                      )} */}
                      {/* {couponError && (
                        <p className='text-xs text-red-500 flex items-center'>
                          <Info className='h-3 w-3 mr-1' /> {couponError}
                        </p>
                      )} */}
                    </div>
                    <Separator />
                  </div>
                  {afterPromo && (
                    <div className='flex justify-between text-green-600'>
                      <span>{afterPromo?.discountCode}</span>
                      <span>- {afterPromo?.percentage ?? 0} %</span>
                    </div>
                  )}

                  <div className='flex justify-between font-bold'>
                    <span>Нийт</span>
                    <span>
                      {afterPromo?.total
                        ? roundToNearestHundred(afterPromo.total)
                        : roundToNearestHundred(data?.price ?? 0)}{' '}
                      ТӨГ
                    </span>
                  </div>

                  {/* <div className='bg-muted p-3 rounded-md text-sm'>
                    <div className='flex items-center gap-2 mb-2'>
                      <CreditCard className='h-4 w-4 text-muted-foreground' />
                      <span className='font-medium'>Secure Payment</span>
                    </div>
                    <p className='text-muted-foreground'>
                      Your payment information is encrypted and secure. We never
                      store your full card details.
                    </p>
                  </div> */}
                </CardContent>
                <CardFooter className='flex flex-col space-y-2'>
                  <div className='text-xs text-muted-foreground'>
                    Худалдан авснаар та манай{' '}
                    <Link
                      href='/terms'
                      className='text-primary hover:underline'
                    >
                      Үйлчилгээний нөхцөл
                    </Link>{' '}
                    болон{' '}
                    <Link
                      href='/privacy'
                      className='text-primary hover:underline'
                    >
                      Нууцлалын бодлого{' '}
                    </Link>
                    хүлээн зөвшөөрсөнд тооцно.
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
    )
}