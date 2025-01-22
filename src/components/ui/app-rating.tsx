'use client'

import { Rating as ReactRating } from '@smastrom/react-rating'
import { useState } from 'react'

export function Rating() {
  const [rating, setRating] = useState(0)

  return <ReactRating style={{ maxWidth: 100 }} value={rating} onChange={setRating} />
}
