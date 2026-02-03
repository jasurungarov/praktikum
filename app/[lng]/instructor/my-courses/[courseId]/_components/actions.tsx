'use client'

import { deleteCourse, updateCourse } from '@/actions/course.action'
import { ICourse } from '@/app.types'
import ConfirDeleteModal from '@/components/modals/confir-delete.modal'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

function Actions(course: ICourse) {
  const pathname = usePathname()
  const router = useRouter()

  const onUpdateStatus = async () => {
    let promise 

    if (course.published) {
      promise =updateCourse(
        course._id as string,
        { published: false },
        pathname,
      )
    } else {
      promise =updateCourse(
        course._id as string,
        { published: true },
        pathname,
      )
    }

    toast.promise(promise, {
      loading: 'Updating status...',
      success: 'Status updated successfully!',
      error: 'Error updating status.',
    })
  }

  const onDelete = async () => {
    const promise =  deleteCourse(course._id, '/en/instructor/my-courses').then(() => {
      router.push('/en/instructor/my-courses')
    })

    toast.promise(promise, {
      loading: 'Deleting course...',
      success: 'Course deleted successfully!',
      error: 'Error deleting course.',
    })
  }

  return (
    <div className='flex gap-2 self-end'>
      <Button onClick={onUpdateStatus}>{course.published ? "Draft" : "Published"}</Button>
      <ConfirDeleteModal onConfirm={onDelete}>
        <Button variant="destructive">Delete</Button>
      </ConfirDeleteModal>
    </div>
  )
}

export default Actions
