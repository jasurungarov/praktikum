'use client'

import { dark } from '@clerk/themes'
import { UserProfile } from '@clerk/nextjs'
import { useTheme } from 'next-themes'

function Profile() {
  const { resolvedTheme } = useTheme()
  
  return (
    <UserProfile
					appearance={{
						baseTheme: resolvedTheme === 'dark' ? dark : undefined,
						variables: {
							colorBackground: resolvedTheme === 'dark' ? '#020817' : '#fff',
						},
					}}
				/>
  )
}

export default Profile