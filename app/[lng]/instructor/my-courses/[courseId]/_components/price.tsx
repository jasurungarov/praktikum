'use client'

import { ICourse } from '@/app.types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import useToggleEdit from '@/hooks/use-toggle-edit'
import { Edit2, X } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { priceSchema } from '@/lib/validation'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { updateCourse } from '@/actions/course.action'
import { toast } from 'sonner'
import FillLoading from '@/components/shared/fill-loading'
import { Input } from '@/components/ui/input'


function Price(course: ICourse) {
    const { state, onToggle } = useToggleEdit()

  return (
    <>
    <Card>
      <CardContent className='relative p-6'>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-medium'>
            Price
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
                Old Price:
              </span>
              <span className='font-medium'>{course.oldPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD', })}</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='font-space-grotesk font-bold text-muted-foreground'>
                Current Price:
              </span>
              <span className='font-medium'>{course.currentPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD', })}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
    </>
  )
}

export default Price

interface FormsProps {
  course: ICourse
  onToggle: () => void
}

function Forms({course, onToggle}: FormsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  const form = useForm({
      resolver: zodResolver(priceSchema),
      defaultValues: {
        oldPrice: `${course.oldPrice}`,
        currentPrice: `${course.currentPrice}`,
      },
    })

    const onSubmit = (values: z.infer<typeof priceSchema>) => {
      setIsLoading(true)
      const promise = updateCourse(course._id, { currentPrice: +values.currentPrice, oldPrice: +values.oldPrice }, pathname)
      .then(() => onToggle())
      .finally(() => setIsLoading(false)
      )

      toast.promise(promise, {
        loading: 'Updating course price...',
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
            name='oldPrice'
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
            name='currentPrice'
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