import { defineStore } from 'pinia'
import mockDocs from '~/assets/data/mock-documents.json'
import type { Document } from '~/types'
import dayjs from 'dayjs'

export const useDocumentsStore = defineStore('documents', () => {
  const documents = ref<Document[]>(mockDocs.documents)
  const today = ref(mockDocs.today)

  const getDocumentStatus = (doc: Document): 'safe' | 'warning' | 'expired'  => {
    const now = dayjs(today.value)
    const expiry = dayjs(doc.expiryDate)
    const daysRemaining = expiry.diff(now, 'day')
    if (daysRemaining <= 0) return 'expired'
    if (daysRemaining <= mockDocs.thresholds.warningDays) return 'warning'
    return 'safe'
  }

  return { documents, today, getDocumentStatus }
})
