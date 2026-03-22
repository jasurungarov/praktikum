import { ChildProps } from '@/types'
import Navbar from './_components/navbar'
import Footer from './_components/footer'

function Layout({ children }: ChildProps) {
	return (
		<div>
			<Navbar />
			<main className='pt-12'>{children}</main>
			<Footer />
		</div>
	)
}

export default Layout
