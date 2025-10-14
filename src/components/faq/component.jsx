import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Button } from '../ui/button';

export default function FAQ() {
  return (
    <section id='faq' className='w-full py-12 md:py-24 lg:py-32 bg-white'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='space-y-2'>
            {/* <Badge
                className='rounded-md px-3 py-1 text-sm'
                variant='secondary'
              >
                FAQ
              </Badge> */}
            <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
              Түгээмэл асуултууд
            </h2>
            <p className='max-w-[900px] text-muted-foreground md:text-xl'>
              Everything you need to know about our eSIM service.
            </p>
          </div>
        </div>
        <div className='mx-auto mt-12 max-w-3xl'>
          <Accordion type='single' collapsible className='w-full'>
            <AccordionItem value='item-1'>
              <AccordionTrigger>eSIM гэж юу вэ?</AccordionTrigger>
              <AccordionContent>
                eSim нь физик SIM карт ашиглах шаардлагагүйгээр гар утасны
                багцыг идэвхжүүлэх боломжийг олгодог дижитал SIM юм. Энэ нь таны
                утсанд суудаг бөгөөд QR код эсвэл кодоор идэвхжүүлдэг.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-2'>
              <AccordionTrigger>Миний утсанд eSIM суух уу?</AccordionTrigger>
              <AccordionContent>
                Орчин үеийн ихэнх ухаалаг утас, таблет, ухаалаг цаг зэрэг нь
                eSIM дэмждэг. Таны утасны загвар iPhone XR болон түүнээс дээш,
                Samsung Galaxy, Google Pixel, Huawei зэрэг утсанд суух
                боломжтой.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-3'>
              <AccordionTrigger>eSIM хэрхэн идэвхжүүлэх вэ?</AccordionTrigger>
              <AccordionContent>
                Багц сонгосны дараагаар, та имэйл хаягаар QR код хүлээн авна.
                Утсан дээрээ, Settings Cellular/Mobile Add Cellular/Mobile Plan
                дараад scan QR дарж имэйл хаягаар ирсэн QR кодоо уншуулна.
                Дэлгэцэн дээр гарч ирэх зааврыг дагаж суулгана. 1-3 минут
                болдог.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-4'>
              <AccordionTrigger>
                Би өөрийн утасны дугаартай хамт eSIM ашиглаж болох уу?
              </AccordionTrigger>
              <AccordionContent>
                Манай eSIM зөвхөн интернет холболт олгодог. Таны утасны дугаар
                Our eSIM provides data connectivity only. Your existing phone
                number will continue to work for calls and SMS through your
                physical SIM. Many devices support Dual SIM Dual Standby (DSDS),
                allowing you to use both your regular SIM and our eSIM
                simultaneously.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-5'>
              <AccordionTrigger>
                Миний дата дууссан тохиолдолд яах вэ?
              </AccordionTrigger>
              <AccordionContent>
                Та өөрийн бүртгэлээр нэвтрэх Dashboard цэснээс цэнэглэх
                боломжтой. Бид тань руу дуусах дөхөхөд имэйл явуулж мэдэгдэх
                болно, ингэснээр та дуусахаас нь өмнө цэнэглэх боломжтой.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-6'>
              <AccordionTrigger>
                Би олон утсан дээр eSIM ашиглаж болох уу?
              </AccordionTrigger>
              <AccordionContent>
                eSIM бүр нэг дор нэг л утсан дээр суудаг учир нэг дор нэг
                eSIM-ийг нэгээс дээш утсан дээр суулгах боломжгүй. one account.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className='mt-8 text-center'>
            <p className='text-muted-foreground'>
              Өөр асуух асуулт байна уу? Бид танд тусалъя.
            </p>
            <Link href={'/contact'}>
              <Button variant='link'>Холбогдох</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
