<template>
  <MatterModal/>
  <ModifyModal/>
  <div class="home">
    <div class="veiw">
      <nav class="navbar">
        <div class="logo">
          <span class="calendarlogo" style="width:40px;height:40px">
            <p class="logo_date">{{ date }}</p>
            <img src="@/assets/calendar.png" alt="calendar" style="width:40px;height:40px">
          </span>
          <p class="calendartext">日曆</p>
        </div>
        <div class="navbar_content">
          <router-link to="/" @click="change" v-if="changedeep"><i class="fa-solid fa-moon fa-xl"></i></router-link>
          <router-link to="/" @click="change" v-else><i class="fa-regular fa-sun fa-xl"></i></router-link>
          <router-link to="/"><i class="fa-solid fa-right-to-bracket fa-xl"></i></router-link>
        </div>
      </nav>
      <div class="veiw_calendar">
        <div class="function_bar">
          <SmallCalendar/>
          <TargetSelect/>
        </div>
        <div class="calendar_content">
          <div class="filter_bar radius">
            <div class="change_unit flex_box filter_radius">
              <router-link to="/week" class="week cell_grow calendar_type" @click="settype('週')" :class="{cell_grow_mark:type === '週'}">週</router-link>
              <i class="I"></i>
              <router-link to="/" class="month cell_grow calendar_type" @click="settype('月')" :class="{cell_grow_mark:type === '月'}">月</router-link>
            </div>
            <div class="show_weekend flex_box filter_radius" @click="changeweekend" :class="{cell_grow_mark:weekend}">顯示週末</div>
            <div class="show_off_activity flex_box filter_radius" @click="changestatus" :class="{cell_grow_mark:getstatus}">顯示已停止活動</div>
          </div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SmallCalendar from '@/components/Small_calendar.vue'
import TargetSelect from '@/components/Target.vue'
import MatterModal from '@/components/Matter_modal.vue'
import ModifyModal from '@/components/Modify_modal.vue'
import changestyle from '@/utils/publicStyle.js'


export default {
  name: 'HomeView',
  components: {
    SmallCalendar,
    TargetSelect,
    MatterModal,
    ModifyModal,
  },
  data(){
    return{
      changedeep: true,
    }
  },
  computed: {
    type(){
      return this.$store.state.calendartype;
    },
    getstatus(){
      return this.$store.state.status;
    },
    weekend(){
      return this.$store.state.weekend;
    },
    date(){
      return this.$store.state.day;
    },
  },
  methods: {
    change(){
      changestyle(this.changedeep);
      this.changedeep = !this.changedeep
    },
    settype(type){
      this.$store.commit('setType', type);
    },
    changestatus(){
      this.$store.commit('changestatus');
    },
    changeweekend(){
      this.$store.commit('weekend');
    },
  },
  created(){
    this.$store.commit('setType', '月');
    this.$store.dispatch('gettodolist');
  }
}
</script>

<style scoped>
  .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  position: relative;
  width: 50%;
  max-height: 300px;
  padding: 16px;
  overflow: auto;
  background-color: #fff;
  border-radius: 4px;
}
.modal-close {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  margin: 8px 8px 0 0;
  cursor: pointer;
}
.modal-close:hover {
  color: gray;
}
</style>
