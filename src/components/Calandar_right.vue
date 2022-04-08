<template>
  <div class="small_calandar radius">
    <div class="title">
      <i class="fa-solid fa-arrow-left hover" @click="beforeMonth"></i>
      <div class="calandar_title">
        <p class="month_title">{{ getmonth + 1 }}</p> /
        <p class="year_title">{{ getyear }}</p>
      </div>
      <i class="fa-solid fa-arrow-right hover" @click="afterMonth"></i>
    </div>
    <div class="calandar_right_content">
      <i class="calandar_week" v-for="week in getweek" :key="week">{{ week }}</i>
      <i class="calandar_date" v-for="date in getcalandar" :key="date.id" :class="{ mark: date.day === day && date.month === month && date.year === year, month_mark: date.month === month && date.year === year}">{{ date.day }}</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calandar_right',
  data(){
    return {
      day: this.$store.state.day,
      month: this.$store.state.month,
      year: this.$store.state.year,
    }
  },
  computed: {
    getweek(){
      return this.$store.state.canlandarweek;
    },
    getcalandar(){
      this.$store.getters.getcalander(42);
      return this.$store.state.calandar;
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
