'use server'

import { connectToDatabase } from '@/lib/mongoose'
import Review from '../database/review.model'
import User from '@/database/user.model'
import { IReview } from '@/app.types'

export const createReview = async (
  data: Partial<IReview>,
  clerkId: string,
  course: string,
) => {
  try {
    await connectToDatabase()
    const user = await User.findOne({ clerkId })
    await Review.create({
      ...data,
      user: user._id,
      course,
    })
  } catch (error) {
    throw new Error('Error creating review')
  }
}

export const getReview = async (course: string, clerkId: string) => {
  try {
    await connectToDatabase()
    const user = await User.findOne({ clerkId })
    const review = await Review.findOne({ course, user: user._id })
    return JSON.parse(JSON.stringify(review))
  } catch (error) {
    throw new Error('Error getting review')
  }
}

export const updateReview = async (
  data: Partial<IReview>) => {
  try {
    await connectToDatabase()
    await Review.findByIdAndUpdate(data._id, data)
  } catch (error) {
    throw new Error('Error updating review')
  }
}