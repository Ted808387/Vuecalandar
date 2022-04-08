import { createStore } from 'vuex'

export default createStore({
  state: {
    canlandarweek: ['日', '一', '二', '三', '四', '五', '六'],
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
    calandar: [],
    currentweek:[],
    show: false,
    modifyModal: false,
    list: {}, // 暫存用
    thing: {}, // 修改暫存用
    todolist: [],
    time: '',
    calandartype: '',
  },
  getters: {
    getcalander: (state) => (num) => {
      let fistday = new Date(state.year, state.month, 1);
      let weekday = fistday.getDay();
      let startday = fistday - weekday * 24 * 3600 * 1000;
      state.calandar = [];
      for(let i = 0; i < num; i++){
        let date = new Date(startday + i * 24 * 3600 * 1000)
        let day = '';
        switch(date.getDay()){
          case 0:
            day = '日';
            break;
          case 1:
            day = '一';
            break;
          case 2:
            day = '二';
            break;
          case 3:
            day = '三';
            break;
          case 4:
            day = '四';
            break;
          case 5:
            day = '五';
            break;
          case 6:
            day = '六';
            break;
        }
        state.calandar.push({
          'day': date.getDate(),
          'month': date.getMonth(),
          'year': date.getFullYear(),
          'date': day,
          'id': Date.parse(date),
          'list': [],
        });
      }
      if(state.todolist){
        state.calandar.forEach((item) => {
          state.todolist.forEach((thing) => {
            if(item.id === thing.id){
              item.list.push(thing.list)
            }
          })
        })
      }
    },
  },
  mutations: {
    beforeMonth(state){
      if (state.month <= 0){
        state.month = 11;
        state.year--;
      } else {
        state.month--;
      }
    },
    afterMonth(state){
      if (state.month >= 11){
        state.month = 0;
        state.year++;
      } else {
        state.month++;
      }
    },
    closeModal(state){
      state.show = !state.show; 
    },
    showModal(state, data){
      state.list = data;
      state.show = !state.show;
      state.time = new Date(state.list.id).toLocaleDateString('en-CA');
    },
    settodolist(state, data){
      state.list.list = data;
      state.todolist.push(state.list);
      state.show = !state.show;
    },
    modifyModal(state, data){
      state.modifyModal = !state.modifyModal;
      state.thing = data;
      console.log(state.thing)
    },
    closeModifyModal(state){
      state.modifyModal = !state.modifyModal; 
    },
    setType(state, type){
      state.calandartype = type;
    },
    getcurrentweek(state){
      let currentdate = new Date(state.year, state.month, state.day);
      let currentday = currentdate.getDay();
      let startday = currentdate - currentday * 24 * 3600 * 1000;
      let data = state.calandar;
      let num = data.map((item) => {
        return item.id
      }).indexOf(startday);
      state.currentweek = data.slice(num, num + 7);
    },
  },
  actions: {
    beforeMonth({ commit }){
      commit('beforeMonth');
    },
    afterMonth({ commit }){
      commit('afterMonth');
    },
    showModal({ commit }, data){
      commit('showModal', data);
    },
    closeModal({ commit }){
      commit('closeModal');
    },
    settodolist({ commit }, thing){
      commit('settodolist', thing);
    },
  },
})
