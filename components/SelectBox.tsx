'use client'
import { Position, SelectBox } from '@/types/other';
import React, { useState } from 'react'

export default function SelectBoxItem(selectBox: SelectBox) {
  // translate-x-[-50%] translate-y-[-50%]

  const topLeft: Position = { x: Math.min(selectBox.start.x, selectBox.end.x), y: Math.min(selectBox.start.y, selectBox.end.y) }
  const bottomRight: Position = { x: Math.max(selectBox.start.x, selectBox.end.x), y: Math.max(selectBox.start.y, selectBox.end.y) }

  return (
    <>{
      selectBox && selectBox.visible ? <div style={{left: `${topLeft.x}px`, top: `${topLeft.y}px`, width: `${bottomRight.x - topLeft.x}px`, height: `${bottomRight.y - topLeft.y}px`}} className='absolute p-0 border-4 border-white place-content-center rounded-lg' /> : <></>
    }</>
  )
}
