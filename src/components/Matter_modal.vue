<template>
    <div>
    <vue-final-modal name="show" focus-retain click-to-close drag hide-overlay v-model="this.$store.state.show" classes="modal-container" content-class="modal-content">
      <div class="modal__title">
          事件紀錄
          <button class="modal__close" @click="closeModal">
             <div class="close">X</div>
          </button>
      </div>
      <div class="modal__content">
          <div class="modal_content">
            <input class="title_text ptb-5" type="text" placeholder="新增標題" v-model="data.title">
            <div class="modal_select js_c ptb-5">
                <div class="select1">
                    <input  id="sele1" type="radio" name="select" value="1" v-model="data.type" checked><label for="sele1" data-name="工作"></label>
                </div>
                <div class="select2">
                    <input  id="sele2" type="radio" name="select" value="2" v-model="data.type"><label for="sele2" data-name="活動"></label>
                </div>
            </div>
            <div class="modal_time js_c ptb-5">
                <div class="thing_date">
                    <input id="start_date" type="date" v-model="this.$store.state.time">
                </div>
                <div class="thing_time" v-show="!data.allday">
                    <span>-</span>
                    <input id="start_time" type="time" v-model="data.start_time">
                    <span>~</span>
                    <input id="end_time" type="time" v-model="data.end_time">
                </div>
            </div>
            <div class="modal_all_day js_c ptb-5">
                <input id="all_day" type="checkbox" name="all_day" v-model="data.allday">
                <label for="all_day" data-name="全天"></label>
                <input id="status" type="checkbox" name="status" v-model="data.status">
                <label for="status" data-name="停止活動"></label>
            </div>
            <div class="modal_detail js_c ptb-5">
                <textarea id="textarea" placeholder="輸入內容" rows="3" cols="65" v-model="data.detail"></textarea>
            </div>
            <div class="modal_color js_c ptb-5">
                <input class="thing_color" type="color" name="color" id="color" v-model="data.color">
                <label for="color">設定活動顏色</label>
            </div>
            <div class="modal_btn">
                <button class="entry" @click="settodolist">確認</button>
                <button class="cancel" @click="closeModal">取消</button>
            </div>
          </div>
      </div>
    </vue-final-modal>
    </div>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal'

export default {
    name: 'MatterModal',
    data(){
        return{
            data: {
                'title': '',
                'type': '1',
                'start_date': '',
                'end_date': '',
                'start_time': '',
                'end_time': '',
                'allday': true,
                'status': false,
                'detail': null,
                'color': '#000000',
                'id': Date.parse(new Date()),
            },
        }
    },
    components: {
        VueFinalModal,
    },
    methods: {
        settodolist(){
            this.data.start_date = this.$store.state.time;
            if (this.data.title && this.data.start_date){
                 let data = this.data;
                 this.data = {
                    'title': '',
                    'type': '1',
                    'start_date': '',
                    'end_date': '',
                    'start_time': '',
                    'end_time': '',
                    'allday': true,
                    'status': false,
                    'detail': null,
                    'color': '#000000',
                    'id': Date.parse(new Date()),
                 };
                 this.$store.dispatch('settodolist', data);
                 this.$store.commit('closeModal');
            } else {
                console.error('請輸入正確資料');
            }
        },
        closeModal(){
            this.$store.dispatch('closeModal');
        },
    },
}
</script>

<style scoped>
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  /* border: 1px solid #f0e8e2; */
  border-radius: 0.25rem;
}
.modal__title {
  font-size: 1.5rem;
  font-weight: 700;
  background-color: #b0e6c7;
}
.modal__close {
  position: absolute;
  padding: 3px;
  right: 0;
  font-size: 0.8em;
  background-color: inherit;
  border: none;
  cursor: pointer;
}
.modal__close:hover{
    color: white;
    transition: color .3s;
}
</style>

<style scoped>
.dark-mode div::v-deep .modal-content {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>