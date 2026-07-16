/* eslint-disable @stylistic/arrow-parens */
import { defineStore } from 'pinia'
import mockSchedules from '~/assets/data/mock-schedules.json'
import type { Schedule, LegendItem } from '~/types'
import dayjs from 'dayjs'

export const useScheduleStore = defineStore('schedule', () => {
  const schedules = ref<Schedule[]>(mockSchedules.schedules)
  const legend = ref<LegendItem[]>(mockSchedules.legend)
  const today = ref(mockSchedules.today)

  const getSchedulesForMonth = (year: number, month: number): Schedule[] => {
    // month is 0-indexed? dayjs month is 0-indexed, but our data uses strings
    // We'll filter by month and year from duty_date
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const monthStr = String(month + 1).padStart(2, '0')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const yearStr = String(year)
    return schedules.value.filter((s) => {
      const d = dayjs(s.duty_date)
      return d.year() === year && d.month() === month
    })
  }

  const getLegendColor = (dutyType: string): string => {
    const item = legend.value.find((l) => l.code === dutyType)
    return item?.color || '#000'
  }

  return { schedules, legend, today, getSchedulesForMonth, getLegendColor }
})
