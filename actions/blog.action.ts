'use server'

import { IBlogDB } from '@/app.types'
import Blog from '@/database/blog.model'
import User from '@/database/user.model'
import { connectToDatabase } from '@/lib/mongoose'
import { revalidatePath } from 'next/cache'
import { cache } from 'react'
import {
  GetAllBlogsParams,
  GetInstructorBlogsParams,
  ICreateBlog,
} from './types'

export const createBlog = async (data: ICreateBlog, clerkId: string) => {
  try {
    await connectToDatabase()
    const user = await User.findOne({ clerkId })
    await Blog.create({ ...data, author: user._id })
    revalidatePath('/en/instructor/my-blogs')
  } catch (error) {
    throw new Error('Something went wrong while creating the blog.')
  }
}

export const getInstructorBlogs = async (params: GetInstructorBlogsParams) => {
  try {
    await connectToDatabase()
    const { clerkId, page = 1, pageSize = 6 } = params
    const skipAmout = (page - 1) * pageSize

    const user = await User.findOne({ clerkId })
    const { _id } = user

    const blogs = await Blog.find({ author: _id })
      .skip(skipAmout)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .populate({
        path: 'author',
        select: 'fullName picture clerkId',
        model: User,
      })

    const totalBlogs = await Blog.find({ author: _id }).countDocuments()
    const isNext = totalBlogs > skipAmout + blogs.length

    return { blogs, isNext, totalBlogs }
  } catch (error) {
    throw new Error('Something went wrong while getting instructor blogs.')
  }
}

export const getBlogs = async (params: GetAllBlogsParams) => {
  try {
    await connectToDatabase()

    const { searchQuery, category, page = 1, pageSize = 6 } = params
    const skipAmout = (page - 1) * pageSize

    const query: Record<string, any> = { published: true }

    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, 'i') } },
        { description: { $regex: new RegExp(searchQuery, 'i') } },
        { category: { $regex: new RegExp(searchQuery, 'i') } },
        { tag: { $regex: new RegExp(searchQuery, 'i') } },
      ]
    }

    if (category && category !== 'all') {
      query.category = category
    }

    const blogs = await Blog.find(query)
      .select('title description content slug category tag coverImage author createdAt')
      .populate({
        path: 'author',
        select: 'fullName picture clerkId',
        model: User,
      })
      .skip(skipAmout)
      .limit(pageSize)
      .sort({ createdAt: -1 })

    const totalBlogs = await Blog.countDocuments(query)
    const isNext = totalBlogs > skipAmout + blogs.length

    return { blogs, isNext, totalBlogs }
  } catch (error) {
    throw new Error('Something went wrong while getting all blogs!')
  }
}

export const getBlogBySlug = cache(async (slug: string) => {
  try {
    await connectToDatabase()

    const blog = await Blog.findOne({ slug, published: true }).populate({
      path: 'author',
      select: 'fullName picture clerkId bio',
      model: User,
    })

    if (!blog) return null

    return blog as IBlogDB
  } catch (error) {
    throw new Error('Something went wrong while getting the blog!')
  }
})

export const getBlogById = async (id: string) => {
  try {
    await connectToDatabase()

    const blog = await Blog.findById(id).populate({
      path: 'author',
      select: 'fullName picture clerkId bio',
      model: User,
    })

    return blog as IBlogDB
  } catch (error) {
    throw new Error('Something went wrong while getting the blog!')
  }
}

export const getRelatedBlogs = cache(
  async (blogId: string, category: string, limit = 3) => {
    try {
      await connectToDatabase()

      const sameCategory = await Blog.find({
        _id: { $ne: blogId },
        category,
        published: true,
      })
        .select('title description slug category coverImage createdAt')
        .limit(limit)
        .sort({ createdAt: -1 })

      if (sameCategory.length >= limit) return sameCategory

      const excludedIds = [blogId, ...sameCategory.map(b => b._id)]

      const rest = await Blog.find({
        _id: { $nin: excludedIds },
        published: true,
      })
        .select('title description slug category coverImage createdAt')
        .limit(limit - sameCategory.length)
        .sort({ createdAt: -1 })

      return [...sameCategory, ...rest]
    } catch (error) {
      throw new Error('Something went wrong while getting related blogs!')
    }
  }
)

export const updateBlog = async (
  id: string,
  updateData: Partial<IBlogDB>,
  path: string,
) => {
  try {
    await connectToDatabase()
    await Blog.findByIdAndUpdate(id, updateData)
    revalidatePath(path)
  } catch (error) {
    throw new Error('Something went wrong while updating the blog.')
  }
}

export const deleteBlog = async (id: string, path: string) => {
  try {
    await connectToDatabase()
    await Blog.findByIdAndDelete(id)
    revalidatePath(path)
  } catch (error) {
    throw new Error('Something went wrong while deleting the blog.')
  }
}

export const incrementBlogViews = async (id: string) => {
  try {
    await connectToDatabase()
    await Blog.findByIdAndUpdate(id, { $inc: { views: 1 } })
  } catch (error) {
    console.error('Failed to increment blog views', error)
  }
}