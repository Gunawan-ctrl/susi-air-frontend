export interface Pilot {
  name: string
  totalFlightHours: number
}

export interface Limits {
  daily: number
  weekly: number
  monthly: number
  annual: number
}

export interface ChartBounds {
  limit: number
  max: number
  windowDays: number
  displayRangeDays: number
}

export interface FlightHour {
  date: string
  hours: number
}

export interface Document {
  id: string
  label: string
  expiryDate: string
}

export interface Schedule {
  id: string
  duty_date: string
  status: number
  base_name: string
  base_color: string
  duty_type: string
  count_schedules: number
  count_logbooks: number
}

export interface LegendItem {
  code: string
  label: string
  color: string
}
