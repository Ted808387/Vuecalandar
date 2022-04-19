<template>
  <div class="small_calendar radius">
    <div class="title">
      <i class="fa-solid fa-arrow-left hover" @click="beforeMonth"></i>
      <div class="calendar_title">
        <p class="month_title">{{ getmonth + 1 }}</p> /
        <p class="year_title">{{ getyear }}</p>
      </div>
      <i class="fa-solid fa-arrow-right hover" @click="afterMonth"></i>
    </div>
    <div class="calendar_right_content">
      <i class="calendar_week" v-for="week in getweek" :key="week">{{ week }}</i>
      <i class="calendar_date" v-for="date in getcalendar" :key="date.id" :class="{ mark: date.day === day && date.month === month && date.year === year, month_mark: date.month === month && date.year === year}">{{ date.day }}</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Small_calendar',
  data(){
    return {
      day: this.$store.state.day,
      month: this.$store.state.month,
      year: this.$store.state.year,
    }
  },
  computed: {
    getweek(){
      return this.$store.state.calendarweek;
    },
    getcalendar(){
      return this.$store.getters.getcalender(42);
    },
    getyear(){
      return this.$store.state.year;
    },
    getmonth(){
      return this.$store.state.month;
    },
  },
  methods: {
    beforeMonth(){
      this.$store.dispatch('beforeMonth');
    },
    afterMonth(){
      this.$store.dispatch('afterMonth');
    },
  }
}
</script>

<style scoped lang="scss">
i.calandar_date{
  font-style: normal;
}
.fa-arrow-right, .fa-arrow-left{
  cursor: pointer;
}
</style>
