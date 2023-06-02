'use client'
import { Database } from '@/types/supabase'
import { Auth } from '@supabase/auth-ui-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { User } from '@/types/db-elements'

export default function Login() {
  const supabase = createClientComponentClient<Database>()

  const [ user, setUser ] = useState<User>()

  useEffect(() => {
    const getData = async () => {
      const userId = (await supabase.auth.getUser()).data.user?.id
      const profile = (await supabase.from("profiles").select().eq('id', userId)).data?.at(0)
      setUser(profile);
    };

    getData();
  }, [])

  return (
    <div className='w-screen h-screen bg-zinc-950'>
      <main className='m-4 p-4 rounded-md bg-slate-500'>
        <div className='flex flex-row'>
          <Link href='/' className='m-2 p-2 rounded-md bg-red-500'>Home</Link>
          <div className='m-2 p-2'>{user && user.username}</div>
        </div>
        <Auth supabaseClient={supabase} providers={[]}/>
      </main>
    </div>
  )
}
