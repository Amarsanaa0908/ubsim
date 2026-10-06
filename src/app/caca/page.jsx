import React, { Suspense } from 'react'
import FixPriceClient from './FixPriceClient'

export default function FixPricePage() {
  return (
    <Suspense fallback={<div>Түр хүлээгээрэй</div>}>
        <FixPriceClient />
    </Suspense>
  )
}
