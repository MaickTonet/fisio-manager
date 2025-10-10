import { useState } from 'react'
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form'
import { FormData } from '../components/new-appointment-form/new-appointment-form'

export function useZipCodeSearch(formGetValues: UseFormGetValues<FormData>, formSetValue: UseFormSetValue<FormData>) {
  const [zipCodeCity, setZipCodeCity] = useState<string>('')
  const [zipCodeError, setZipCodeError] = useState<string>('')

  const searchCityByZipCode = async (zipCode: string) => {
    const cleanZipCode = zipCode.replace(/\D/g, '')
    if (cleanZipCode.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanZipCode}/json/`)
        const data = await response.json()

        if (data.erro) {
          setZipCodeError('CEP não encontrado')
          setZipCodeCity('')
        } else {
          setZipCodeError('')
          setZipCodeCity(data.localidade)
          if (!formGetValues('city')) formSetValue('city', data.localidade)
          if (!formGetValues('state')) formSetValue('state', data.uf)
          if (!formGetValues('neighborhood')) formSetValue('neighborhood', data.bairro || '')
        }
      } catch {
        setZipCodeError('Erro ao buscar CEP')
        setZipCodeCity('')
      }
    } else {
      setZipCodeCity('')
      setZipCodeError('')
    }
  }

  return { zipCodeCity, zipCodeError, searchCityByZipCode }
}
