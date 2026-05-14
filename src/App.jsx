import React from 'react'
import { Finder, Resume, Safari, Terminal, Text, Image, Contact, Photos, Trash,} from "#windows";
import { Dock, Home, Navbar, Welcome } from '#components'
import gsap from "gsap/all";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
    

      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Image />
      <Contact />
      <Trash />
      <Photos />
      <Home />
    </main>
  )
}

export default App
