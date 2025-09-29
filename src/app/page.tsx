import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { DataTable } from '@/components/dashboard/data-table/data-table'
import { SectionCards } from '@/components/dashboard/section-cards'
import { SiteHeader } from '@/components/dashboard/site-header'
import { Button } from '@/components/ui-components/button'
import { SidebarInset, SidebarProvider } from '@/components/ui-components/sidebar'
import { db } from '@/database/database'
import { appointment } from '@/database/schema'
import { auth } from '@/lib/auth'
import { desc } from 'drizzle-orm'
import { CirclePlus, Grid2x2X } from 'lucide-react'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Dashboard | FisioAgenda',
  description: 'Dashboard do sistema de agendamentos',
}

export const revalidate = 120

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) redirect('/login')

  const appointments = await db.select().from(appointment).orderBy(desc(appointment.createdAt))

  return (
    <SidebarProvider style={{ '--sidebar-width': 'calc(var(--spacing) * 72)', '--header-height': 'calc(var(--spacing) * 12)' } as React.CSSProperties}>
      <AppSidebar variant='inset' />
      <SidebarInset>
        <SiteHeader breadcrumbs={['Dashboard']} />
        {appointments.length > 0 ? (
          <div className='flex flex-1 flex-col'>
            <div className='@container/main flex flex-1 flex-col gap-2'>
              <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
                <SectionCards appointments={appointments} />
                <div className='px-4 lg:px-6'></div>
                <DataTable data={appointments} />
              </div>
            </div>
          </div>
        ) : (
          <div className='flex h-8/10 flex-col items-center justify-center'>
            <div className='bg-primary/20 mb-6 rounded-full p-6'>
              <Grid2x2X size={60} className='text-primary' />
            </div>
            <h3 className='text-lg font-semibold'>Nenhum agendamento cadastrado.</h3>

            <Button className='bg-primary text-primary-foreground mt-2.5 transition-colors'>
              <Link href='/new-appointment' className='flex items-center gap-x-2'>
                <CirclePlus size={32} />
                <p>Novo agendamento</p>
              </Link>
            </Button>
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  )
}
