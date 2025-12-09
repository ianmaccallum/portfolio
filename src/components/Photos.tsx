'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { motion } from 'framer-motion'

import beach from '@/images/photos/beach.png'
import swamp from '@/images/photos/swamp.png'
import image3 from '@/images/photos/image-3.jpg'
import image4 from '@/images/photos/image-4.jpg'
import image5 from '@/images/photos/image-5.jpg'

export function Photos() {
  const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']
  const images = [image3, beach, swamp, image4, image5]
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="mt-16 sm:mt-20">
        <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8" style={{ opacity: 0 }}>
          {images.map((image, imageIndex) => (
            <div
              key={image.src}
              className={clsx(
                'relative w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
                rotations[imageIndex % rotations.length],
              )}
            >
              <div className="aspect-9/10">
                <Image
                  src={image}
                  alt=""
                  sizes="(min-width: 640px) 18rem, 11rem"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mt-16 sm:mt-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        transition={{ staggerChildren: 0.1 }}
        className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8"
      >
        {images.map((image, imageIndex) => (
          <motion.div
            key={image.src}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.21, 0.47, 0.32, 0.98],
                },
              },
            }}
            className={clsx(
              'relative w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
              rotations[imageIndex % rotations.length],
            )}
          >
            <div className="aspect-9/10">
              <Image
                src={image}
                alt=""
                sizes="(min-width: 640px) 18rem, 11rem"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
