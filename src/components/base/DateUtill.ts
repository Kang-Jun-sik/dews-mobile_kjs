export class DateUtill {
  /**
   *  입력된 년 월 일을 현재 지역의 초단위 로 리턴해줍니다. (비교를 위해 사용)
   * @param y: 년
   * @param m: 월
   * @param d: 일
   * @return 시간을 반환합니다.
   * */
  getTime(y: number, m: number, d: number, h?: number, M?: number): number {
    return M ? new Date(y, m - 1, d, h, M).getTime() : new Date(y, m - 1, d).getTime();
  }

  getDay(y: number, m: number): number {
    return new Date(y, m - 1, 1).getDay();
  }

  /**
   * @param s: 초를 입력합니다
   * @return Date {year: 년도,month: 월,day: 일} 를 반환 합니다.
   * */
  getDate(s: number): object {
    const date = new Date();
    date.setMilliseconds(s);
    return { year: date.getFullYear(), month: date.getMonth(), day: date.getDate() };
  }

  getLastDay(y: number, m: number): number {
    return new Date(y, m, 0).getDate();
  }
}
