'use client'

import { ICourse } from '@/app.types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { updateCourse } from '@/actions/course.action'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { courseFieldsSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit2, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import FillLoading from '@/components/shared/fill-loading'
import useToggleEdit from '@/hooks/use-toggle-edit'

function CourseFields(course: ICourse) {
  const { state, onToggle } = useToggleEdit()

  return (
    <Card>
      <CardContent className='relative p-6'>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-medium'>
            Course title
          </span>
          <Button size='icon' variant='ghost' onClick={onToggle}>
            {state ? <X/> : <Edit2 />}
          </Button>
        </div>
        <Separator className='my-3'/>

        {state ? (
          <Forms course={course} onToggle={onToggle}/>
        ) : (
          <div className='flex flex-col space-y-2'>
            <div className='flex items-center gap-2'>
              <span className='font-space-grotesk font-bold text-muted-foreground'>
                Title:
              </span>
              <span className='font-medium'>{course.title}</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='font-space-grotesk font-bold text-muted-foreground'>
                Slug:
              </span>
              <span className='font-medium'>{course.slug}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default CourseFields

interface FormsProps {
  course: ICourse
  onToggle: () => void
}

function Forms({course, onToggle}: FormsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  const form = useForm({
      resolver: zodResolver(courseFieldsSchema),
      defaultValues: {
        title: course.title ?? "",
        slug: course.slug ?? "",
      },
    })

    const onSubmit = (values: z.infer<typeof courseFieldsSchema>) => {
      setIsLoading(true)
      const promise = updateCourse(course._id, values, pathname)
      .then(() => onToggle())
      .finally(() => setIsLoading(false)
      )

      toast.promise(promise, {
        loading: 'Updating course title...',
        success: 'Course updated successfully!',
        error: 'Error updating course.',
      })
    }

  return (
    <>
    {isLoading && <FillLoading />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
        <FormField
          control={form.control as any}
            name='title'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
          control={form.control as any}
            name='slug'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' disabled={isLoading}>
            Save
          </Button>
        </form>
      </Form>
    </>
  )
}