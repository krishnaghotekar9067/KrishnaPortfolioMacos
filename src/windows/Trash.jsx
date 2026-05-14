import { WindowControls } from '#components'
import WindowWrapper from '#hoc/WindowWrapper'
import { gallery } from "#constants";
import useWindowStore from "#store/window"
import { Trash2 } from 'lucide-react'


import React from 'react'
const Trash = () => {

  const { openWindow } = useWindowStore()
  return (
    <>
      <div id="window-header">
        <WindowControls target="trash" />
        <h1>TRASH</h1>
        <Trash2 />
      </div>

      <div className='p-5 bg-white flex items-center gap-3 text-gray-500'>
        <div className="sidebar">
          <h1>Files</h1>
          <h1>Images</h1>
          <h1>Video</h1>
          <h1></h1>
        </div>

        <div className="trashbox">
          <h1 className='py-0 px-30'>hello</h1>
          
        </div>
        
      </div>
    </>
  )
}


const TrashWindow = WindowWrapper(Trash, "trash")
export default TrashWindow;
