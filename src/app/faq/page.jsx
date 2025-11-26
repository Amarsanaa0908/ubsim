import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Phone } from 'lucide-react'
import React from 'react'

const faqs = [
  {
    question: "eSIM гэж юу вэ?",
    answer:
      "eSIM нь физик SIM картгүйгээр утсандаа шууд суулгаж болдог дижитал SIM юм. Та QR код уншуулах эсвэл апп-аар дамжуулан хэдхэн минутын дотор идэвхжүүлэх боломжтой.",
  },
  {
    question: "Миний утас eSIM дэмждэг эсэхийг яаж мэдэх вэ?",
    answer:
      "Ихэнх шинэ үеийн ухаалаг гар утаснууд eSIM дэмждэг. iPhone XS болон түүнээс хойшхи загварууд, Samsung Galaxy S20 болон түүнээс хойшхи загварууд, Google Pixel 3 болон түүнээс хойшхи загварууд eSIM дэмждэг. Та утасныхаа тохиргооноос шалгах боломжтой.",
  },
  {
    question: "eSIM-ийг хэрхэн идэвхжүүлэх вэ?",
    answer:
      "Худалдан авалт хийсний дараа таны имэйл рүү QR код илгээгдэнэ. Та утасныхаа тохиргоо хэсгээс eSIM нэмэх сонголтыг сонгоод QR кодоо уншуулахад л болно. Бүх процесс 5 минутаас бага хугацаа зарцуулна.",
  },
  {
    question: "Нэг утсанд хэдэн eSIM ашиглаж болох вэ?",
    answer:
      "Энэ нь таны утасны загвараас хамаарна. Ихэнх утаснууд 5-10 eSIM хадгалах боломжтой бөгөөд нэг дор 1-2 eSIM идэвхтэй байлгаж болно.",
  },
  {
    question: "Гадаадад ашиглахад ямар үнэтэй вэ?",
    answer:
      "Бид олон улсын өрсөлдөхүйц үнэ санал болгодог. Улс орон бүрээр үнийн санал өөр байх бөгөөд та манай вэбсайтаас шууд шалгах боломжтой. Роуминг төлбөргүйгээр гадаадад хямд интернет ашиглаарай.",
  },
  {
    question: "Дата дуусвал яах вэ?",
    answer:
      "Та манай апп эсвэл вэбсайтаар дамжуулан хүссэн үедээ нэмэлт дата худалдан авах боломжтой. Шинэ eSIM авах шаардлагагүй, одоо байгаа eSIM дээрээ шууд цэнэглэнэ.",
  },
  {
    question: "Төлбөрийн ямар сонголтууд байдаг вэ?",
    answer:
      "Бид олон улсын карт (Visa, Mastercard), QPay, SocialPay болон бусад дотоодын төлбөрийн хэрэгслүүдийг хүлээн авдаг.",
  },
  {
    question: "Буцаан олголт авах боломжтой юу?",
    answer:
      "Хэрэв eSIM идэвхжүүлээгүй бол худалдан авснаас хойш 7 хоногийн дотор буцаан олголт авах боломжтой. Идэвхжүүлсэн eSIM-ийн хувьд буцаан олголт хийгдэхгүй.",
  },
  {
    question: "Тусламж хэрэгтэй бол хаана хандах вэ?",
    answer:
      "Манай хэрэглэгчийн үйлчилгээ 24/7 ажиллаж байна. Та info@ubsim.mn хаягаар имэйл илгээх эсвэл манай вэбсайт дээрх чат үйлчилгээг ашиглаж болно.",
  },
]

export default function FAQpage() {
  return (
    <div><div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">Түгээмэл асуултууд</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            eSIM болон манай үйлчилгээний талаар хамгийн их асуудаг асуултуудын хариултыг эндээс олоорой.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Card className="mx-auto max-w-3xl">
          <CardHeader>
            <CardTitle>Асуулт & Хариулт</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <div className="mx-auto mt-12 max-w-3xl text-center">
          <p className="mb-4 text-muted-foreground">Хариулт олдсонгүй юу? Бидэнтэй холбогдоорой.</p>
          <a href="mailto:info@ubsim.mn" className="inline-flex items-center gap-2 text-primary hover:underline">
            <Phone className="h-4 w-4" />
            91111116
          </a>
        </div></div>
  )
}
