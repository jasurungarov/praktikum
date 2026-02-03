import ContactForm from '@/components/forms/contact.form'
import TopBar from '@/components/shared/top-bar'
import { translation } from '@/i18n/server'
import { LngParams } from '@/types'
import { Mail, Phone } from 'lucide-react'

async function Page({ params: { lng } }: LngParams) {
	const { t } = await translation(lng)

	return (
		<>
			<TopBar label='contacts' />
			<iframe
				src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2067.564981138972!2d74.605031836283!3d42.8732992618102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb7c4b5aaaaab%3A0x79751aa41fde1080!2z0JjQvdGB0YLQuNGC0YPRgiDQuNC80LXQvdC4INCQ0YDQsNCx0LDQtdCy0LA!5e0!3m2!1sru!2skg!4v1769872411318!5m2!1sru!2skg'
				loading='lazy'
				className='h-96 w-full'
			/>

			<div className='container mx-auto max-w-6xl'>
				<div className='mt-6 grid grid-cols-2 gap-4 max-md:grid-cols-1'>
					<div className='flex flex-col'>
						<h1 className='font-space-grotesk text-4xl font-bold'>
							{t('contactTitle')}
						</h1>
						<p className='mt-2 text-muted-foreground'>
							{t('contactDescription')}
						</p>

						<div className='mt-12 flex items-center gap-3'>
							<Mail className='size-4' />
							<a href='mailto:info@ungarov.ac' className='text-sm hover:underline dark:hover:text-blue-300'>info@ungarov.ac</a>
						</div>
						<div className='mt-2 flex items-center gap-3'>
							<Phone className='size-4' />
							<a href='tel:+98022964902' className='text-sm hover:underline dark:hover:text-blue-300'>+98 02 296 4902</a>
						</div>
					</div>

					<div>
						<h1 className='mb-2 font-space-grotesk text-4xl font-bold'>
							{t('contactForm')}
						</h1>
						<ContactForm />
					</div>
				</div>
			</div>
		</>
	)
}

export default Page
