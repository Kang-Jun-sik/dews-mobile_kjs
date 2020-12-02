type ValueAndDisplayFormat = {
  value: string;
  display: string;
};

export interface GlobalEnvironmentVariables {
  format: {
    date?: {
      date?: ValueAndDisplayFormat;
      dateTime?: ValueAndDisplayFormat;
      dateMonth?: ValueAndDisplayFormat;
      dateWeek?: ValueAndDisplayFormat;
      time?: ValueAndDisplayFormat;
    };
    number?: string;
  };
}

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
