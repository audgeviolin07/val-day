'use client'

import dynamic from 'next/dynamic'
import { Suspense, useState, useRef } from 'react'

const Logo = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Logo), { ssr: false })
const Dog = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Dog), { ssr: false })
const Duck = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Duck), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 size-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function Page() {
  const [screen, setScreen] = useState('greeting') // 'greeting', 'ask', or 'answer'
  const [answer, setAnswer] = useState(null)
  const audioRef = useRef(null)

  const playSound = async () => {
    try {
      const audio = new Audio('https://www.myinstants.com/media/sounds/vine-boom.mp3')
      audio.volume = 1.0
      await audio.play()
      setScreen('ask')
    } catch (error) {
      console.log("Audio playback failed:", error)
      setScreen('ask') // Continue to next screen even if sound fails
    }
  }

  return (
    <div className='min-h-screen bg-pink-50'>
      {screen === 'greeting' ? (
        <div className='flex min-h-screen flex-col items-center justify-center'>
          <button
            onClick={playSound}
            className='rounded-lg bg-pink-500 px-8 py-4 text-2xl font-bold text-white transition-colors hover:bg-pink-600'
          >
            Hi, click this button! ✨
          </button>
        </div>
      ) : screen === 'ask' ? (
        <div className='mx-auto flex w-full flex-col items-center justify-center p-8'>
          <div className='mb-12 w-full text-center'>
            <h1 className='mb-8 text-center text-5xl font-bold text-pink-600'>Will you be my Valentine?</h1>
            
            <div className='flex justify-center gap-8'>
              <button
                onClick={() => setAnswer(true)}
                className='rounded-lg bg-pink-500 px-8 py-3 text-xl font-bold text-white transition-colors hover:bg-pink-600'
              >
                Yes! 💖
              </button>
              <button
                onClick={() => setAnswer(false)}
                className='rounded-lg bg-gray-500 px-8 py-3 text-xl font-bold text-white transition-colors hover:bg-gray-600'
              >
                No 💔
              </button>
            </div>
          </div>

          <div className='grid w-full max-w-4xl grid-cols-3 gap-8'>
            <View className='h-64 w-full'>
              <Suspense fallback={null}>
                <Logo scale={0.4} position={[0, 0, 0]} />
                <Common color='pink' />
              </Suspense>
            </View>

            <View className='h-64 w-full'>
              <Suspense fallback={null}>
                <Dog scale={1.5} position={[0, -1.6, 0]} rotation={[0.0, -0.3, 0]} />
                <Common color='pink' />
              </Suspense>
            </View>

            <View className='h-64 w-full'>
              <Suspense fallback={null}>
                <Duck scale={1.5} position={[0, -1.6, 0]} />
                <Common color='pink' />
              </Suspense>
            </View>
          </div>
        </div>
      ) : (
        <div className='flex min-h-screen flex-col items-center justify-center gap-8'>
          <h1 className='text-4xl font-bold text-pink-600'>
            {answer ? "Yay! You've made me the happiest! 💖" : "Maybe next time... 💔"}
          </h1>
          <button
            onClick={() => {
              setAnswer(null)
              setScreen('ask')
            }}
            className='rounded-lg bg-pink-500 px-6 py-2 text-lg font-bold text-white transition-colors hover:bg-pink-600'
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  )
}
