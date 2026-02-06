'use server'

import { connectToDatabase } from '@/lib/mongoose'
import { ICreateLesson } from './types'
import Section from '@/database/section.model'
import Lesson from '@/database/lesson.model'
import { revalidatePath } from 'next/cache'

export const createLesson = async (params: ICreateLesson) => {
  try {
    await connectToDatabase()

    const { lesson, section, path } = params

    if (!section) {
      throw new Error('Section ID is missing')
    }

    const existSection = await Section.findById(section)

    if (!existSection) {
      throw new Error('Section not found')
    }

    const position = existSection.lessons?.length || 0

    const duration = {
      hours: Number(lesson.hours) || 0,
      minutes: Number(lesson.minutes) || 0,
      seconds: Number(lesson.seconds) || 0,
    }

    const newLesson = await Lesson.create({
      ...lesson,
      position,
      duration,
      section,
    })

    existSection.lessons.push(newLesson._id)
    await existSection.save()

    revalidatePath(path)

    return { success: true }
  } catch (error) {
    console.log('CREATE LESSON ERROR:', error)
    throw error
  }
}
