<template>
  <div class="calandarweek">
    <div class="calandar_time">
      <p v-for="clock in 24" :key="clock">{{ clock }}</p>
    </div>
    <div class="calandarweekcontent">
      <div class="calandar_canter_title radius">
          <div class="canlandar_week" :class="{ day_font_mark: Date.parse(new Date(year, month, day)) === week.id}" v-for="week in getcurrentday" :key="week.id">{{ week.day }} - ({{ week.date }})</div>
      </div>
      <div class="day_group">
        <div class="week_content radius" v-for="day in getcurrentday" :key="day.id">
          <p class="thing_allday" v-for="thing in day.list" :key="thing.id" v-show="thing.allday" :style="{'--thingcolor': thing.color}">
            {{ thing.title }}
          </p>
          <div class="daytime" v-for="space in 24" :key="space">
            <div class="thing" v-for="thing in day.list" :key="thing.id" :style="{'--thingcolor': thing.color}">
              <p class="thing_content" v-show="thing.start_time.slice(0, 2) == space + 1">
                {{ thing.start_time }} {{ thing.title }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default ({
  name: 'CalandarWeek',
  data(){
    return{
      day: this.$store.state.day,
      month: this.$store.state.month,
      year: this.$store.state.year,
    }
  },
  computed: {
    getcurrentday(){
      this.$store.commit('getcurrentweek');
      return this.$store.state.currentweek;
    }
  },
  created(){
    this.$store.commit('getcurrentweek')
  }
})
</script>

