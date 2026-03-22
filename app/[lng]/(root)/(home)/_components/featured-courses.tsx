'use client'

import CourseCard from '@/components/cards/course.card'
import { Button } from '@/components/ui/button'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import useTranslate from '@/hooks/use-translate'
import { cn, formUrlQuery } from '@/lib/utils'
import { ICourse } from '@/app.types'
import { filterCourses } from '@/constants'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
	courses: ICourse[]
}

function FeaturedCourses({ courses }: Props) {
	const t = useTranslate()
	const searchParams = useSearchParams()
	const router = useRouter()

	const currentFilter = searchParams.get('filter') || 'all'

	const onUpdateUrl = (values: string) => {
		const newUrl = formUrlQuery({
			params: searchParams.toString(),
			key: 'filter',
			value: values,
			toCourses: true,
		})
		router.push(newUrl)
	}

	return (
		<section className='w-full py-8 md:py-12'>
			<div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>

				{/* Header */}
				<div className='flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between'>
					<div className='flex flex-col space-y-1.5'>
						<h1 className='font-space-grotesk text-2xl font-bold sm:text-3xl'>
							{t('exploreCourses')}
						</h1>
						<p className='text-sm text-muted-foreground'>
							{t('exploreCoursesDescription')}
						</p>
					</div>

					{/* Filter buttons */}
					<div className='w-full sm:w-auto'>
						{/* Mobile — scroll qilib ko'rish mumkin */}
						<div className='flex w-full gap-2 overflow-x-auto pb-1 sm:hidden'>
							{filterCourses.map(item => (
								<Button
									key={item.name}
									rounded={'full'}
									size='sm'
									variant={currentFilter === item.name ? 'default' : 'outline'}
									className={cn(
										'shrink-0 text-xs font-medium',
										currentFilter === item.name && 'text-white'
									)}
									onClick={() => onUpdateUrl(item.name)}
								>
									{t(item.label)}
								</Button>
							))}
						</div>

						{/* Desktop — normal ko'rinish */}
						<div className='hidden items-center gap-1 sm:flex'>
							{filterCourses.map(item => (
								<Button
									key={item.name}
									rounded={'full'}
									variant={currentFilter === item.name ? 'secondary' : 'ghost'}
									className={cn(
										'font-medium',
										currentFilter === item.name && 'text-primary'
									)}
									onClick={() => onUpdateUrl(item.name)}
								>
									{t(item.label)}
								</Button>
							))}
						</div>
					</div>
				</div>

				{/* Mobile — grid ko'rinish */}
				<div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden'>
					{courses.map(course => (
						<CourseCard key={course.title} {...course} />
					))}
				</div>

				{/* Desktop — Carousel */}
				<Carousel
					opts={{ align: 'start' }}
					className='mt-6 hidden w-full md:flex'
				>
					<CarouselContent>
						{courses.map(course => (
							<CarouselItem
								key={course.title}
								className='md:basis-1/2 lg:basis-1/3'
							>
								<CourseCard {...course} />
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>

				{/* Kurs yo'q */}
				{courses.length === 0 && (
					<div className='mt-12 flex flex-col items-center justify-center gap-2 text-center'>
						<p className='text-lg font-medium'>{t('noCoursesFound') || 'No courses found'}</p>
						<p className='text-sm text-muted-foreground'>
							{t('tryAnotherFilter') || 'Try selecting a different filter'}
						</p>
					</div>
				)}
			</div>
		</section>
	)
}

export default FeaturedCourses