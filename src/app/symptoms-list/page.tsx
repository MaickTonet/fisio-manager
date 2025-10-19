import { getSymptoms } from '@/actions/get-symptoms'
import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { SiteHeader } from '@/components/dashboard/site-header'
import SymptomsListTable from '@/components/symptoms-list-table/symptoms-list-table'
import { SidebarInset, SidebarProvider } from '@/components/ui-components/sidebar'
import { auth } from '@/lib/auth'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Lista de sintomas | FisioAgenda',
  description: 'Lista de sintomas do sistema de agendamentos',
}

export default async function SymptomsListPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) redirect('/login')

  const symptoms = await getSymptoms()

  return (
    <SidebarProvider style={{ '--sidebar-width': 'calc(var(--spacing) * 72)', '--header-height': 'calc(var(--spacing) * 12)' } as React.CSSProperties}>
      <AppSidebar variant='inset' />
      <SidebarInset>
        <SiteHeader breadcrumbs={['Lista de sintomas']} />
        <SymptomsListTable initialSymptoms={symptoms} />
      </SidebarInset>
    </SidebarProvider>
  )
}
