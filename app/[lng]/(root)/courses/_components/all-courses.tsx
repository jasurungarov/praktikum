'use client'

import { ICourse } from '@/app.types'
import CourseCard from '@/components/cards/course.card'
import NoResult from '@/components/shared/no-result'
import Pagination from '@/components/shared/pagination'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { courseLanguage, filterCourses, filterLevels } from '@/constants'
import useTranslate from '@/hooks/use-translate'
import { formUrlQuery } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
	result: {
		courses: ICourse[]
		isNext: boolean
		totalCourses: number
	}
}

function AllCourses({ result }: Props) {
	const t = useTranslate()
	const searchParams = useSearchParams()
	const router = useRouter()

	const page = searchParams.get('page')
	const { courses, isNext, totalCourses } = result

	const onUpdateUrl = (key: string) => (value: string) => {
		const newUrl = formUrlQuery({
			params: searchParams.toString(),
			key,
			value,
		})
		router.push(newUrl)
	}

	return (
		<section className='w-full py-8 md:py-12'>
			<div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>

				{/* Header — natija va filterlar */}
				<div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
					{/* Natija soni */}
					<h2 className='text-sm text-muted-foreground sm:text-base'>
						{t('result1')}{' '}
						<span className='font-space-grotesk text-base font-bold text-foreground sm:text-lg'>
							{totalCourses}
						</span>{' '}
						{t('result2')}
					</h2>

					{/* Filterlar */}
					<div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
						<p className='text-sm text-muted-foreground'>{t('sortBy')}</p>

						{/* Mobile — 2 ustun grid */}
						<div className='grid grid-cols-2 gap-2 sm:hidden'>
							<Select onValueChange={onUpdateUrl('filter')}>
								<SelectTrigger className='w-full bg-gradient-to-r from-secondary via-secondary to-background text-xs'>
									<SelectValue placeholder={t('filter')} />
								</SelectTrigger>
								<SelectContent>
									{filterCourses.map(item => (
										<SelectItem key={item.name} value={item.name}>
											{t(item.label)}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<Select onValueChange={onUpdateUrl('level')}>
								<SelectTrigger className='w-full bg-gradient-to-l from-secondary via-secondary to-background text-xs'>
									<SelectValue placeholder={t('level')} />
								</SelectTrigger>
								<SelectContent>
									{filterLevels.map(item => (
										<SelectItem key={item.name} value={item.name}>
											{t(item.label)}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<Select onValueChange={onUpdateUrl('language')}>
								<SelectTrigger className='col-span-2 w-full bg-gradient-to-l from-secondary via-secondary to-background text-xs'>
									<SelectValue placeholder={t('language')} />
								</SelectTrigger>
								<SelectContent>
									{courseLanguage.map(item => (
										<SelectItem key={item} value={item} className='capitalize'>
											{item}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Desktop — bir qatorda */}
						<div className='hidden items-center gap-2 sm:flex'>
							<Select onValueChange={onUpdateUrl('filter')}>
								<SelectTrigger className='w-[130px] bg-gradient-to-r from-secondary via-secondary to-background'>
									<SelectValue placeholder={t('filter')} />
								</SelectTrigger>
								<SelectContent>
									{filterCourses.map(item => (
										<SelectItem key={item.name} value={item.name}>
											{t(item.label)}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<Select onValueChange={onUpdateUrl('level')}>
								<SelectTrigger className='w-[130px] bg-gradient-to-l from-secondary via-secondary to-background'>
									<SelectValue placeholder={t('level')} />
								</SelectTrigger>
								<SelectContent>
									{filterLevels.map(item => (
										<SelectItem key={item.name} value={item.name}>
											{t(item.label)}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<Select onValueChange={onUpdateUrl('language')}>
								<SelectTrigger className='w-[130px] bg-gradient-to-l from-secondary via-secondary to-background'>
									<SelectValue placeholder={t('language')} />
								</SelectTrigger>
								<SelectContent>
									{courseLanguage.map(item => (
										<SelectItem key={item} value={item} className='capitalize'>
											{item}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>

				{/* Kurslar grid */}
				{courses.length > 0 ? (
					<div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						{courses.map((course, index) => (
							<CourseCard key={index} {...course} />
						))}
					</div>
				) : (
					<div className='mt-8'>
						<NoResult
							title="Ko'rsatish uchun hech qanday kurslar yo'q"
							description="O'zingizga mos kurslarni toping! Hozirda sizning so'rovingizga to'g'ri keladigan kurslar bizda mavjud emas. Tez kunda qo'shiladi!"
						/>
					</div>
				)}

				{/* Pagination */}
				{courses.length > 0 && (
					<div className='mt-8'>
						<Pagination pageNumber={page ? +page : 1} isNext={isNext} />
					</div>
				)}
			</div>
		</section>
	)
}

export default AllCourses