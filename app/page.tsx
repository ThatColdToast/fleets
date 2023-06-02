'use client'
import SelectBoxItem from '@/components/SelectBox'
import ShipItem from '@/components/Ship'
import { Ship, User } from '@/types/db-elements'
import { Position, SelectBox } from '@/types/other'
import { Database } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()

  const [ user, setUser ] = useState<User>()
  const [ ships, setShips ] = useState<Ship[] | null>(null)
  // const [ mousePos, setMousePos ] = useState<Position>({ x: 0, y: 0 })
  const [ selectBox, setSelectBox ] = useState<SelectBox>({ start: { x: 0, y: 0 }, end: { x: 0, y: 0 }, visible: false })

  // Fetch User Data & Redirect to login
  useEffect(() => {
    const getData = async () => {
      const userId = (await supabase.auth.getUser()).data.user?.id
      if (!userId)
        router.push('/login')
      
      const profile = (await supabase.from("profiles").select().eq('id', userId)).data?.at(0)
      setUser(profile);
    };

    getData();
  }, [])

  // Fetch Ship Data
  useEffect(() => {
    const updateShips = async () => {
      const { data } = await supabase.from("ships").select()
      setShips(data)
    };

    updateShips()
  }, [])

  // Add 'Disable Context Menu', 'Mouse Move', 'Mouse Up', and 'Mouse Down' event handlers
  useEffect(() => {
    // define a custom handler function
    // for the contextmenu event
    const handleContextMenu = (e: Event) => {
      // prevent the right-click menu from appearing
      e.preventDefault()
    }

    // attach the event listener to 
    // the document object
    document.addEventListener("contextmenu", handleContextMenu)

    const handleMouseMove = (event: MouseEvent) => {
      const pos = { x: event.clientX, y: event.clientY }
      setSelectBox(prevState => ({...prevState, end: pos}))
    }
    window.addEventListener('mousemove', handleMouseMove)

    const handleMouseDown = (event: MouseEvent) => {
      const pos = { x: event.clientX, y: event.clientY }
      setSelectBox(prevState => ({...prevState, start: pos, visible: true}))
    }
    window.addEventListener('mousedown', handleMouseDown)

    const handleMouseUp = (event: MouseEvent) => {
      const pos = { x: event.clientX, y: event.clientY }
      setSelectBox(prevState => ({...prevState, end: pos, visible: false}))

      // TODO: Select Units
    }
    window.addEventListener('mouseup', handleMouseUp)

    // clean up the event listener when 
    // the component unmounts
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseDown)
    }
  }, [])

  const channel = supabase
  .channel('table-db-changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'ships',
    },
    (data) => {
      if (!ships)
        return
      
      const localShips = JSON.parse(JSON.stringify(ships))
      
      const newShip = data.new as Ship // Get new ship
      console.log(newShip)

      localShips.forEach((ship: Ship, i: number) => { if (ship.id == newShip.id) localShips[i] = newShip })

      // console.log(ships)
      // console.log(localShips)

      // console.log('setShips')
      setShips(localShips)

      // console.log(ships)
      // console.log(localShips)
    }
  )
  .subscribe()

  return (
    <div className='w-screen h-screen bg-zinc-950'>
      <main className='w-screen h-screen select-none'>
        <div className='flex justify-center items-center'>{user ? user.username : <p>...</p>} - {ships ? ships.length : <p>...</p>} ships loaded</div>
        {/* {mousePos && <p>MousePos - X:{mousePos.x} Y:{mousePos.y}</p>} */}
        {selectBox && <p>SelectBox - X:{selectBox.start.x} Y:{selectBox.start.y} - X:{selectBox.end.x} Y:{selectBox.end.y}</p>}
        <div>
          {ships && ships.map(ship => (<ShipItem key={ship.id} {...ship}/>))}
          <SelectBoxItem {...selectBox} />
        </div>
      </main>
    </div>
  )
}
