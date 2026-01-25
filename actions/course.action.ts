'use server'

import { ICourse } from '@/app.types'
import Course from '@/database/course.model'
import { connectToDatabase } from '@/lib/mongoose'
import { revalidatePath } from 'next/cache'
import { ICreateCourse } from './types'


export const createCourse = async (data: ICreateCourse) => {
  try {
    await connectToDatabase()
    await Course.create(data)
    revalidatePath('/en/instructor/my-courses')
  } catch (error) {
    throw new Error('Something went wrong while creating the course.')
  }
}

export const getCourses = async () => {
  try {
    await connectToDatabase()
    const courses = await Course.find()
    return courses as ICourse[]
  } catch (error) {
    throw new Error('Something went wrong while getting the courses.')
  }
}

// export const getCourseById = async (id: String) => {
//   try {
//     await connectToDatabase()
//     const course = await Course.findById(id)
//     return course
//   } catch (error) {
//     throw new Error('Something went wrong while fetching the course.')
//   }
// }