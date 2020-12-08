import { html } from 'lit-html';
import '../src/dews-mobile.js';
// eslint-disable-next-line import/extensions
import { Messagebox, MSGBOX_OPTIONS } from '../src/components/messagebox/dews-messagebox';

export default {
  title: 'Messagebox'
};

export const Messagebox1 = () => html`<div style="width: 360px">
  <dews-box id="box1" title="box1">
    <dews-container>
      <dews-textbox title="default" @input="()=>{console.log('input');}"></dews-textbox>
      <dews-textbox title="readonly" readonly></dews-textbox>
      <button
        id="msgBox1"
        @click="${() => {
          showMsgBox('저장이 완료되었습니다.', {
            id: 'msgBox1',
            align: 'center',
            icon: 'success'
          })
            .done(() => {
              console.log('icon: success done');
            })
            .yes(() => {
              console.log('icon: success yes');
            })
            .no(() => {
              console.log('icon: success no');
            });
        }}"
      >
        icon: success
      </button>
    </dews-container>
  </dews-box>
  <dews-area-panel id="panel1">
    <area-item id="item1" col="4">
      <dews-box id="box2" title="box2">
        <dews-textbox title="default"></dews-textbox>
        <dews-textbox title="readonly" readonly></dews-textbox>
        <button
          id="msgBox2"
          @click="${() => {
            showMsgBox('조건에 해당하는 데이터가 없습니다.', {
              id: 'msgBox2',
              align: 'center',
              icon: 'info'
            })
              .done(() => {
                console.log('icon: info done');
              })
              .yes(() => {
                console.log('icon: info yes');
              })
              .no(() => {
                console.log('icon: info no');
              });
          }}"
        >
          icon: info
        </button>
      </dews-box>
    </area-item>
    <area-item id="item2" col="8">
      <dews-area-panel>
        <area-item col="6">
          <dews-box id="box3" title="box3">
            <dews-textbox title="default"></dews-textbox>
            <dews-textbox title="readonly" readonly></dews-textbox>
            <button
              id="msgBox3"
              @click="${() => {
                showMsgBox('서버와 연결이 끊겼습니다.', {
                  id: 'msgBox3',
                  align: 'center',
                  icon: 'error'
                })
                  .done(() => {
                    console.log('icon: error done');
                  })
                  .yes(() => {
                    console.log('icon: error yes');
                  })
                  .no(() => {
                    console.log('icon: error no');
                  });
              }}"
            >
              icon: error
            </button>
          </dews-box>
        </area-item>
        <area-item col="6">
          <dews-box id="box4" title="box4">
            <dews-textbox title="default"></dews-textbox>
            <dews-textbox title="readonly" readonly></dews-textbox>
            <button
              id="msgBox4"
              @click="${() => {
                showMsgBox('저장되지 않은 정보가 있습니다.\n그래도 진행하시겠습니까?', {
                  id: 'msgBox4',
                  align: 'center',
                  icon: 'warning',
                  cancel: true
                })
                  .done(() => {
                    console.log('icon: warning/cancel: true done');
                  })
                  .yes(() => {
                    console.log('icon: warning/cancel: true yes');
                  })
                  .no(() => {
                    console.log('icon: warning/cancel: true no');
                  });
              }}"
            >
              icon: warning/cancel: true
            </button>
          </dews-box>
        </area-item>
      </dews-area-panel>
    </area-item>
  </dews-area-panel>
  <dews-box id="box5" title="box5">
    <dews-textbox title="default"></dews-textbox>
    <dews-textbox title="readonly" readonly></dews-textbox>
    <button
      id="msgBox5"
      @click="${() => {
        showMsgBox('변경된 사항이 있습니다.\n저장하시겠습니까?', {
          id: 'msgBox5',
          align: 'center',
          icon: 'question'
        })
          .done(() => {
            console.log('icon: question done');
          })
          .yes(() => {
            console.log('icon: question yes');
          })
          .no(() => {
            console.log('icon: question no');
          });
      }}"
    >
      icon: question
    </button>
  </dews-box>
  <dews-box id="box6" title="box6">
    <dews-textbox title="default"></dews-textbox>
    <dews-textbox title="readonly" readonly></dews-textbox>
    <button
      id="msgBox6"
      @click="${() => {
        showMsgBox('해당 앱을 기본으로 설정하시겠습니까?', {
          id: 'msgBox6',
          align: 'center',
          icon: 'question',
          showCheckbox: 'never'
        })
          .done(() => {
            console.log('icon: question/다시보지않기 done');
          })
          .yes(() => {
            console.log('icon: question/다시보지않기 yes');
          })
          .no(() => {
            console.log('icon: question/다시보지않기 no');
          });
      }}"
    >
      icon: question/다시보지않기
    </button>
  </dews-box>
  <dews-box id="box7" title="box7">
    <dews-textbox title="default"></dews-textbox>
    <dews-textbox title="readonly" readonly></dews-textbox>
    <button
      id="msgBox7"
      @click="${() => {
        showMsgBox('해당 앱을 기본으로 설정하시겠습니까?', {
          id: 'msgBox7',
          align: 'center',
          icon: 'question',
          showCheckbox: 'today'
        })
          .done(() => {
            console.log('icon: question/오늘하루보지않기 done');
          })
          .yes(() => {
            console.log('icon: question/오늘하루보지않기 yes');
          })
          .no(() => {
            console.log('icon: question/오늘하루보지않기 no');
          });
      }}"
    >
      icon: question/오늘하루보지않기
    </button>
  </dews-box>
  <dews-box id="box8" title="box8">
    <dews-textbox title="default"></dews-textbox>
    <dews-textbox title="readonly" readonly></dews-textbox>
    <button
      id="msgBox8"
      @click="${() => {
        showMsgBox('조건에 해당하는 데이터가 없습니다.', {
          id: 'msgBox8',
          align: 'center',
          icon: 'info',
          cancel: true
        })
          .done(() => {
            console.log('icon: info/cancel: true done');
          })
          .yes(() => {
            console.log('icon: info/cancel: true yes');
          })
          .no(() => {
            console.log('icon: info/cancel: true no');
          });
      }}"
    >
      icon: info/cancel: true
    </button>
  </dews-box>
  <dews-box id="box9" title="box9">
    <dews-textbox title="default"></dews-textbox>
    <dews-textbox title="readonly" readonly></dews-textbox>
    <button
      id="msgBox9"
      @click="${() => {
        showMsgBox('저장되지 않은 데이터가 있습니다.\n그래도 진행하시겠습니까?', {
          id: 'msgBox9',
          align: 'left',
          icon: 'warning'
        })
          .done(() => {
            console.log('icon: warning/align: left done');
          })
          .yes(() => {
            console.log('icon: warning/align: left yes');
          })
          .no(() => {
            console.log('icon: warning/align: left no');
          });
      }}"
    >
      icon: warning/align: left
    </button>
  </dews-box>
  <dews-box id="box10" title="box10">
    <dews-textbox title="default"></dews-textbox>
    <dews-textbox title="readonly" readonly></dews-textbox>
    <button
      id="msgBox10"
      @click="${() => {
        showMsgBox('저장되지 않은 데이터가 있습니다.\n그래도 진행하시겠습니까?', {
          id: 'msgBox10',
          align: 'right',
          icon: 'warning'
        })
          .done(() => {
            console.log('icon: warning/align: right done');
          })
          .yes(() => {
            console.log('icon: warning/align: right yes');
          })
          .no(() => {
            console.log('icon: warning/align: right no');
          });
      }}"
    >
      icon: warning/align: right
    </button>
  </dews-box>
</div> `;

function showMsgBox(message: string, options: MSGBOX_OPTIONS) {
  const msgBox = new Messagebox();
  msgBox.message = message;
  msgBox.options = options;
  msgBox.show();
  return msgBox;
}
