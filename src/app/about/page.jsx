import { Card, CardContent } from '@/components/ui/card'
import { Globe, Mail, MapPin, Phone, Shield, Users, Zap } from 'lucide-react'
import React from 'react'

export default function AboutPage() {
  return (
    <div>
      <section className="py-16 px-4 md:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Ubsim.mn</h1>
          <p className="text-lg md:text-xl opacity-90">Монголын анхны eSIM үйлчилгээ үзүүлэгч</p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Бидний тухай</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Ubsim.mn нь Монгол улсад eSIM технологийг нэвтрүүлэн, хэрэглэгчдэд хялбар, хурдан, найдвартай холболтын
              шийдэл санал болгодог компани юм. Бид 2024 онд байгуулагдсан бөгөөд богино хугацаанд олон мянган
              хэрэглэгчийн итгэлийг хүлээж чадсан.
            </p>
            <p>
              Манай зорилго бол Монгол хүн бүрт дэлхийн аль ч өнцөгт байсан найдвартай интернет холболтоор хангах явдал
              юм. eSIM технологи нь уламжлалт SIM картаас ялгаатай нь физик карт шаардахгүй, цахимаар шууд идэвхжүүлэх
              боломжтой.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 md:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Яагаад биднийг сонгох вэ?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Хурдан идэвхжүүлэлт</h3>
                    <p className="text-sm text-muted-foreground">
                      Худалдан авсны дараа хэдхэн минутын дотор eSIM-ээ идэвхжүүлэх боломжтой.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Олон улсын хамрах хүрээ</h3>
                    <p className="text-sm text-muted-foreground">Дэлхийн 100 гаруй улс оронд ажилладаг data багцууд.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Аюулгүй, найдвартай</h3>
                    <p className="text-sm text-muted-foreground">
                      Таны мэдээлэл бүрэн хамгаалагдсан, найдвартай холболт.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">24/7 хэрэглэгчийн дэмжлэг</h3>
                    <p className="text-sm text-muted-foreground">Манай баг танд хэзээ ч туслахад бэлэн байна.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Холбоо барих</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="flex items-center justify-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <span>91111116</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span>Улаанбаатар, Монгол</span>
            </div>
          </div>
        </div>
      </section>
      </div>
  )
}
