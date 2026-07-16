<template>
  <div class="calendar">
    <div class="header">
      <UButton @click="prevMonth" icon="i-heroicons-chevron-left" variant="ghost" />
      <span class="month-year">{{ currentMonthName }} {{ currentYear }}</span>
      <UButton @click="nextMonth" icon="i-heroicons-chevron-right" variant="ghost" />
    </div>

    <div class="weekdays">
      <div v-for="day in weekdays" :key="day" class="weekday">
        {{ day }}
      </div>
    </div>

    <div class="days-grid">
      <div
        v-for="day in days"
        :key="day.date || day.day"
        class="day-cell"
        :style="{ backgroundColor: day.color || 'transparent' }"
        @click="day.date && showDetail(day)"
      >
        <span v-if="day.day" class="day-number">
          {{ day.day }}
        </span>
        <span v-if="day.baseName" class="base-name">
          {{ day.baseName }}
        </span>
        <span v-if="day.count && day.count > 0" class="badge">
          {{ day.count }}
        </span>
      </div>
    </div>

    <UModal v-model="showModal">
      <div class="modal-content">
        <p>Detail page coming soon</p>
        <UButton @click="onModalClose">
          Close
        </UButton>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useScheduleStore } from '~/stores/scheduleStore'
import dayjs from 'dayjs'

const scheduleStore = useScheduleStore()
const currentDate = ref(dayjs('2026-05-31')) // mock today
const showModal = ref(false)

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const currentMonthName = computed(() => currentDate.value.format('MMMM'))
const currentYear = computed(() => currentDate.value.year())

const days = computed(() => {
  const start = currentDate.value.startOf('month')
  const end = currentDate.value.endOf('month')
  const daysInMonth = end.date()
  const firstDay = start.day()
  const result = []

  // Padding before first day
  for (let i = 0; i < firstDay; i++) {
    result.push({ day: null, date: null, color: 'transparent', baseName: '', count: 0 })
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = currentDate.value.date(d)
    const dateStr = dateObj.format('YYYY-MM-DD')
    const schedule = scheduleStore.schedules.find(s => s.duty_date === dateStr)
    const color = schedule ? schedule.base_color : 'transparent'
    const baseName = schedule ? schedule.base_name : ''
    const count = schedule ? schedule.count_schedules : 0
    result.push({ day: d, date: dateStr, color, baseName, count })
  }

  return result
})

const onModalClose = () => {
  showModal.value = false
}

const prevMonth = () => {
  currentDate.value = currentDate.value.subtract(1, 'month')
}
const nextMonth = () => {
  currentDate.value = currentDate.value.add(1, 'month')
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const showDetail = (day: any) => {
  if (day.date) showModal.value = true
}
</script>

<style scoped lang="scss">
.calendar {
  background: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    .month-year {
      font-weight: 600;
      font-size: 18px;
    }
  }

  .weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-weight: 600;
    font-size: 12px;
    color: $text-secondary;
    margin-bottom: 6px;
  }

  .days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;

    .day-cell {
      aspect-ratio: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      font-size: 12px;
      color: white;
      position: relative;
      cursor: pointer;
      transition: opacity 0.2s;

      .day-number {
        font-weight: 700;
        font-size: 14px;
      }
      .base-name {
        font-size: 10px;
        opacity: 0.9;
      }
      .badge {
        position: absolute;
        top: 2px;
        right: 2px;
        background: rgba(0,0,0,0.6);
        color: white;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        font-size: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
      }

      &:active {
        opacity: 0.7;
      }
    }
  }

  .modal-content {
    padding: 24px;
    text-align: center;
    p {
      margin-bottom: 16px;
    }
  }
}
</style>
