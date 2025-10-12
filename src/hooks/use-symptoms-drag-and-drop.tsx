'use client'

import { addSymptomAction } from '@/actions/add-symptom'
import { deleteSymptomAction } from '@/actions/delete-symptom'
import { toggleSymptomAction } from '@/actions/toggle-symptom'
import { updateSymptomOrderAction } from '@/actions/update-symptom-order'
import { Symptom } from '@/types/symptom-type'
import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useState } from 'react'

export function useSymptomsDragAndDrop({ initialSymptoms }: { initialSymptoms: Symptom[] }) {
  const [symptoms, setSymptoms] = useState(initialSymptoms)
  const [newSymptom, setNewSymptom] = useState('')

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = symptoms.findIndex((i) => i.id === active.id)
    const newIndex = symptoms.findIndex((i) => i.id === over.id)
    const newOrder = arrayMove(symptoms, oldIndex, newIndex)

    setSymptoms(newOrder)
    await updateSymptomOrderAction(newOrder.map((s) => s.id))
  }

  async function toggleSymptom(id: string) {
    setSymptoms((prev) => prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s)))

    const target = symptoms.find((s) => s.id === id)
    if (target) {
      await toggleSymptomAction(id, !target.active)
    }
  }

  async function addSymptom() {
    if (!newSymptom.trim()) return

    const created = await addSymptomAction(newSymptom.trim())

    setSymptoms((prev) => [...prev, created])
    setNewSymptom('')
  }

  async function deleteSymptom(id: string) {
    setSymptoms((prev) => prev.filter((s) => s.id !== id))
    await deleteSymptomAction(id)
  }

  return {
    symptoms,
    newSymptom,
    setNewSymptom,
    handleDragEnd,
    toggleSymptom,
    addSymptom,
    deleteSymptom,
  }
}
