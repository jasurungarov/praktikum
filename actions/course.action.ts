'use server'

import { ICourse } from '@/app.types'
import Course from '@/database/course.model'
import { connectToDatabase } from '@/lib/mongoose'
import { revalidatePath } from 'next/cache'
import { GetCourseParams, ICreateCourse } from './types'
import User from '@/database/user.model'


export const createCourse = async (data: ICreateCourse, clerkId: string) => {
  try {
    await connectToDatabase()
    const user = await User.findOne({ clerkId })
    await Course.create({ ...data, instructor: user._id })
    revalidatePath('/en/instructor/my-courses')
  } catch (error) {
    throw new Error('Something went wrong while creating the course.')
  }
}

export const getCourses = async (params: GetCourseParams) => {
  try {
    await connectToDatabase()
    const { clerkId, page = 1, pageSize = 3 } = params
    const skipAmout = (page -1 ) * pageSize
    const user = await User.findOne({clerkId})
    const { _id } = user 
    const courses = await Course.find({ instructor: _id })
    .skip(skipAmout)
    .limit(pageSize)

    const totalCourses = await Course.find({ instructor: _id }).countDocuments()
    const isNext = totalCourses > skipAmout + courses.length

    return { courses, isNext, totalCourses }
  } catch (error) {
    throw new Error('Something went wrong while getting the courses.')
  }
}

export const getCourseById = async (id: String) => {
  try {
    await connectToDatabase()
    const course = await Course.findById(id)
    return course as ICourse
  } catch (error) {
    throw new Error('Something went wrong while getting course.')
  }
}

export const updateCourse = async (
  id: String, 
  updateData: Partial<ICourse>,
  path: string,
) => {
  try {
    await connectToDatabase()
    await Course.findByIdAndUpdate(id, updateData)
    revalidatePath(path)
  } catch (error) {
    throw new Error('Something went wrong while updating course.')
  }
}

export const deleteCourse = async (
  id: String, 
  path: string,
) => {
  try {
    await connectToDatabase()
    await Course.findByIdAndDelete(id)
    revalidatePath(path)
  } catch (error) {
    throw new Error('Something went wrong while deleting course.')
  }
}