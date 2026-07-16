import { defineStore } from 'pinia'
import mockData from '~/assets/data/mock-flight-hours.json'
import type { FlightHour, Limits, ChartBounds } from '~/types'
import dayjs from 'dayjs'

export const useFlightHoursStore = defineStore('flightHours', () => {
  const flightHours = ref<FlightHour[]>(mockData.flightHours)
  const limits = ref<Limits>(mockData.limits)
  const chartBounds = ref<Record<string, ChartBounds>>(mockData.chartBounds)
  const pilot = ref(mockData.pilot)

  // computed: get total flight hours
  const totalFlightHours = computed(() => pilot.value.totalFlightHours)

  // fungsi untuk menghitung rolling sum
  const getRollingSum = (date: string, windowDays: number): number => {
    const d = dayjs(date)
    const start = d.subtract(windowDays - 1, 'day')
    let sum = 0
    for (const entry of flightHours.value) {
      const entryDate = dayjs(entry.date)
      if (
        // eslint-disable-next-line @stylistic/operator-linebreak
        entryDate.isAfter(start.subtract(1, 'day')) &&
        entryDate.isBefore(d.add(1, 'day'))
      ) {
        sum += entry.hours
      }
    }
    return sum
  }

  // fungsi untuk mendapatkan data chart berdasarkan toggle
  const getChartData = (
    toggle: '1w' | '1m' | '3m' | '6m' | '1y',
    today: string = '2026-05-31'
  ) => {
    const bounds = chartBounds?.value[toggle]
    const windowDays = bounds?.windowDays
    const displayRangeDays = bounds?.displayRangeDays ?? 0 // 7
    const dates: string[] = []
    const values: number[] = []
    const todayDate = dayjs(today)
    for (let i = -displayRangeDays; i <= displayRangeDays; i++) {
      const d = todayDate.add(i, 'day')
      dates.push(d.format('YYYY-MM-DD'))
      values.push(getRollingSum(d.format('YYYY-MM-DD'), windowDays || 0))
    }
    return { dates, values, limit: bounds?.limit, max: bounds?.max }
  }

  // Untuk summary cards, kita hitung untuk setiap limit
  const getSummary = (today: string = '2026-05-31') => {
    // daily: hours on today
    // eslint-disable-next-line @stylistic/operator-linebreak
    const todayHours =
      // eslint-disable-next-line @stylistic/arrow-parens
      flightHours.value.find((f) => f.date === today)?.hours || 0
    const dailyLimit = limits.value.daily
    // weekly: rolling 7 days ending today
    const weeklySum = getRollingSum(today, 7)
    const weeklyLimit = limits.value.weekly
    // monthly: rolling 30 days ending today
    const monthlySum = getRollingSum(today, 30)
    const monthlyLimit = limits.value.monthly
    // annual: rolling 365 days ending today
    const annualSum = getRollingSum(today, 365)
    const annualLimit = limits.value.annual

    return {
      daily: { current: todayHours, limit: dailyLimit },
      weekly: { current: weeklySum, limit: weeklyLimit },
      monthly: { current: monthlySum, limit: monthlyLimit },
      annual: { current: annualSum, limit: annualLimit }
    }
  }

  return {
    flightHours,
    limits,
    chartBounds,
    pilot,
    totalFlightHours,
    getRollingSum,
    getChartData,
    getSummary
  }
})
