import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'

function DropdownContent() {
  return <DropdownMenuContent className='w-56'>
    <DropdownMenuItem>
      <div className='flex items-center gap-2'>
        <p>Evaluation</p>
      </div>
    </DropdownMenuItem>
  </DropdownMenuContent>
}

export default DropdownContent