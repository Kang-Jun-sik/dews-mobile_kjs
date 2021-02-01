import { DrawerBottomBase } from '../picker/drawer-bottom-base.js';
export class PeriodPickerBase extends DrawerBottomBase {
  /**
   *  입력된 년 월 일을 현재 지역의 초단위 로 리턴해줍니다. (비교를 위해 사용)
   * @param y: 년
   * @param m: 월
   * @param d: 일
   * @return 초를 반환합니다.
   * */
  protected getSecond(y: number, m: number, d: number): number {
    return new Date(y, m, d).getMilliseconds();
  }

  /**
   * @param s: 초를 입력합니다
   * @return Date {year: 년도,month: 월,day: 일} 를 반환 합니다.
   * */
  protected getDate(s: number): object {
    const date = new Date();
    date.setMilliseconds(s);
    return { year: date.getFullYear(), month: date.getMonth(), day: date.getDate() };
  }

  protected getLastDay(y: number, m: number): number {
    return new Date(y, m, 0).getDate();
  }
}
