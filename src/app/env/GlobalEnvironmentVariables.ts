/** 값으로 관리할 경우와 출력 시의 포맷이 따로 있는 경우의 포맷 정보 형식 */
type ValueAndDisplayFormat = {
  /** 값으로 관리할 때의 포맷 */
  value: string;
  /** 출력시 적용할 포맷 */
  display: string;
};

/** 전역 환경 변수 형식입니다. */
export interface GlobalEnvironmentVariables {
  /** 포맷 정보 */
  format: {
    /** 날짜/시간 관련 포맷 정보 */
    date?: {
      /** 날짜만 있는 데이터에 대한 포맷 */
      date?: ValueAndDisplayFormat;
      /** 날짜와 시간이 모두 있는 데이터에 대한 포맷 */
      dateTime?: ValueAndDisplayFormat;
      /** 날짜 중 월까지의 정보만 포함하는 데이터에 대한 포맷 */
      dateMonth?: ValueAndDisplayFormat;
      /** 주 번호를 포현하는 데이터에 대한 포맷 */
      dateWeek?: ValueAndDisplayFormat;
      /** 시간마 있는 데이터에 대한 포맷 */
      time?: ValueAndDisplayFormat;
    };
    /** 숫자 포맷 */
    number?: string;
  };
}

/* 따로 제공되는 전역 환경 변수 정보가 없을 경우 사용되는 기본값 정보 입니다. */
export const DefaultGlobalEnvironmentVariables: GlobalEnvironmentVariables = {
  format: {
    date: {
      date: {
        value: 'yyyyMMdd',
        display: 'yyyy-MM-dd'
      },
      dateTime: {
        value: 'yyyyMMddHHmmss',
        display: 'yyyy-MM-dd HH:mm:ss'
      },
      dateMonth: {
        value: 'yyyyMM',
        display: 'yyyy-MM'
      },
      dateWeek: {
        value: 'yyyyWW',
        display: 'yyyy-WW'
      },
      time: {
        value: 'HHmmss',
        display: 'HH:mm:ss'
      }
    },
    number: '#,###.##'
  }
};
