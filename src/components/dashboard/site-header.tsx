import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui-components/breadcrumb'
import { Separator } from '@/components/ui-components/separator'
import { SidebarTrigger } from '@/components/ui-components/sidebar'
import { Fragment } from 'react'

export function SiteHeader({ breadcrumbs }: { breadcrumbs: string[] }) {
  return (
    <header className='flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)'>
      <div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mx-2 data-[orientation=vertical]:h-4' />

        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => (
              <Fragment key={index}>
                <BreadcrumbItem>
                  {index === breadcrumbs.length - 1 ? <BreadcrumbPage>{item}</BreadcrumbPage> : <BreadcrumbLink href='#'>{item}</BreadcrumbLink>}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator key={`sep-${index}`} />}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        <div className='ml-auto flex items-center gap-2'></div>
      </div>
    </header>
  )
}
