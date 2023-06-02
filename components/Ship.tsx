'use client'
import { Ship } from '@/types/db-elements';
import { Database } from '@/types/supabase';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useState } from 'react'

export default function ShipItem(ship: Ship) {
  const [ sel, setSel ] = useState<Boolean>(false)
  // const supabase = createClientComponentClient<Database>()

  // transition ease-linear duration-75 hover:bg-zinc-500
  return (
    <div style={{left: `${ship.xpos}px`, top: `${ship.ypos}px`}} className='absolute translate-x-[-50%] translate-y-[-50%] p-8 place-content-center rounded-lg bg-white'>
      <div className='p-2 rounded-xl bg-black'></div>
    </div>
  )
}
