'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import useToggleEdit from '@/hooks/use-toggle-edit'
import { Edit2, X } from 'lucide-react'
import { ICourse } from '@/app.types'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { updateCourse } from '@/actions/course.action'
import { toast } from 'sonner'
import FillLoading from '@/components/shared/fill-loading'
import Image from 'next/image'
import { Form, FormItem, FormLabel } from '@/components/ui/form'
import { UploadButton } from '@/lib/uploadthing'
import { previewImageSchema } from '@/lib/validation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

function PreviewImage(course: ICourse) {
    const { state, onToggle } = useToggleEdit()

  return (
    <>
    <Card>
      <CardContent className='relative p-6'>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-medium'>
            Replace Image
          </span>
          <Button size='icon' variant='ghost' onClick={onToggle}>
            {state ? <X/> : <Edit2 />}
          </Button>
        </div>
        <Separator className='my-3'/>
        {state ? (
          <Forms course={course} onToggle={onToggle}/>
        ) : (
          <div className='relative h-72 w-full'>
            <Image src={course.previewImage} alt={course.title} fill className='rounded-sm object-cover'/>
          </div>
        )}
      </CardContent>
    </Card>
    </>
  )
}

export default PreviewImage


interface FormsProps {
  course: ICourse
  onToggle: () => void
}

function Forms({course, onToggle}: FormsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  
  

    const form = useForm<z.infer<typeof previewImageSchema>>({
      resolver: zodResolver(previewImageSchema),
      defaultValues: {
        previewImage: course.previewImage,
      },
    })
  
    function onSubmit(values: z.infer<typeof previewImageSchema>) {
      if (!values.previewImage) {
        return toast.error('Please upload a preview image')
      }
      setIsLoading(true)
      const promise = updateCourse(course._id, {
        previewImage: values.previewImage,
      }, pathname)
        .then(() => {onToggle()})
        .finally(() => setIsLoading(false))
  
      toast.promise(promise, {
        loading: 'Loading...',
        success: 'Successfully updated!',
        error: 'Something went wrong!',
      })
    }

  return (
    <>
    {isLoading && <FillLoading />}
    <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
                   <FormItem>
                    <FormLabel>
                      Preview Image<span className='text-red-500'>*</span>
                        
                    <UploadButton 
                    endpoint={'imageUploader'}
                    config={{ appendOnPaste: true, mode: 'auto' }}
                    onClientUploadComplete={ res => {form.setValue('previewImage', res[0].ufsUrl)} }
                    />					
                      {/* <Input 
                      className='bg-secondary'
                      type='file'
                      disabled={isLoading}
                      onChange={onUpload}
                      /> */}
                      </FormLabel>
                  </FormItem>
                  <Button type='submit' disabled={isLoading}>
                    Save
                  </Button>                     
            </form>
      </Form>      
    </>
  )
  }
