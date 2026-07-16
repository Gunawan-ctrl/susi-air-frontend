<template>
  <div class="legend">
    <div v-for="item in legend" :key="item.code" class="legend-item">
      <span class="color-dot" :style="{ backgroundColor: item.color }"></span>
      <span class="label">{{ item.code }} – {{ item.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const scheduleStore = useScheduleStore()
const legend = scheduleStore.legend
</script>

<style scoped lang="scss">
.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 12px;
  margin-top: 16px;
  background: white;
  padding: 12px 16px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);

  .legend-item {
    display: flex;
    align-items: center;
    font-size: 12px;
    .color-dot {
      width: 12px;
      height: 12px;
      border-radius: 4px;
      margin-right: 6px;
    }
    .label {
      color: $text-primary;
    }
  }
}
</style>
