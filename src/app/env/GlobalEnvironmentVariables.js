/* 따로 제공되는 전역 환경 변수 정보가 없을 경우 사용되는 기본값 정보 입니다. */
export const DefaultGlobalEnvironmentVariables = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2xvYmFsRW52aXJvbm1lbnRWYXJpYWJsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHbG9iYWxFbnZpcm9ubWVudFZhcmlhYmxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE4QkEsaURBQWlEO0FBQ2pELE1BQU0sQ0FBQyxNQUFNLGlDQUFpQyxHQUErQjtJQUMzRSxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUU7Z0JBQ0osS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLE9BQU8sRUFBRSxZQUFZO2FBQ3RCO1lBQ0QsUUFBUSxFQUFFO2dCQUNSLEtBQUssRUFBRSxnQkFBZ0I7Z0JBQ3ZCLE9BQU8sRUFBRSxxQkFBcUI7YUFDL0I7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsT0FBTyxFQUFFLFNBQVM7YUFDbkI7WUFDRCxRQUFRLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsT0FBTyxFQUFFLFNBQVM7YUFDbkI7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsT0FBTyxFQUFFLFVBQVU7YUFDcEI7U0FDRjtRQUNELE1BQU0sRUFBRSxVQUFVO0tBQ25CO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiDqsJLsnLzroZwg6rSA66as7ZWgIOqyveyasOyZgCDstpzroKUg7Iuc7J2YIO2PrOunt+ydtCDrlLDroZwg7J6I64qUIOqyveyasOydmCDtj6zrp7cg7KCV67O0IO2YleyLnSAqL1xudHlwZSBWYWx1ZUFuZERpc3BsYXlGb3JtYXQgPSB7XG4gIC8qKiDqsJLsnLzroZwg6rSA66as7ZWgIOuVjOydmCDtj6zrp7cgKi9cbiAgdmFsdWU6IHN0cmluZztcbiAgLyoqIOy2nOugpeyLnCDsoIHsmqntlaAg7Y+s66e3ICovXG4gIGRpc3BsYXk6IHN0cmluZztcbn07XG5cbi8qKiDsoITsl60g7ZmY6rK9IOuzgOyImCDtmJXsi53snoXri4jri6QuICovXG5leHBvcnQgaW50ZXJmYWNlIEdsb2JhbEVudmlyb25tZW50VmFyaWFibGVzIHtcbiAgLyoqIO2PrOuntyDsoJXrs7QgKi9cbiAgZm9ybWF0OiB7XG4gICAgLyoqIOuCoOynnC/si5zqsIQg6rSA66CoIO2PrOuntyDsoJXrs7QgKi9cbiAgICBkYXRlPzoge1xuICAgICAgLyoqIOuCoOynnOunjCDsnojripQg642w7J207YSw7JeQIOuMgO2VnCDtj6zrp7cgKi9cbiAgICAgIGRhdGU/OiBWYWx1ZUFuZERpc3BsYXlGb3JtYXQ7XG4gICAgICAvKiog64Kg7Kec7JmAIOyLnOqwhOydtCDrqqjrkZAg7J6I64qUIOuNsOydtO2EsOyXkCDrjIDtlZwg7Y+s66e3ICovXG4gICAgICBkYXRlVGltZT86IFZhbHVlQW5kRGlzcGxheUZvcm1hdDtcbiAgICAgIC8qKiDrgqDsp5wg7KSRIOyblOq5jOyngOydmCDsoJXrs7Trp4wg7Y+s7ZWo7ZWY64qUIOuNsOydtO2EsOyXkCDrjIDtlZwg7Y+s66e3ICovXG4gICAgICBkYXRlTW9udGg/OiBWYWx1ZUFuZERpc3BsYXlGb3JtYXQ7XG4gICAgICAvKiog7KO8IOuyiO2YuOulvCDtj6ztmITtlZjripQg642w7J207YSw7JeQIOuMgO2VnCDtj6zrp7cgKi9cbiAgICAgIGRhdGVXZWVrPzogVmFsdWVBbmREaXNwbGF5Rm9ybWF0O1xuICAgICAgLyoqIOyLnOqwhOuniCDsnojripQg642w7J207YSw7JeQIOuMgO2VnCDtj6zrp7cgKi9cbiAgICAgIHRpbWU/OiBWYWx1ZUFuZERpc3BsYXlGb3JtYXQ7XG4gICAgfTtcbiAgICAvKiog7Iir7J6QIO2PrOuntyAqL1xuICAgIG51bWJlcj86IHN0cmluZztcbiAgfTtcbn1cblxuLyog65Sw66GcIOygnOqzteuQmOuKlCDsoITsl60g7ZmY6rK9IOuzgOyImCDsoJXrs7TqsIAg7JeG7J2EIOqyveyasCDsgqzsmqnrkJjripQg6riw67O46rCSIOygleuztCDsnoXri4jri6QuICovXG5leHBvcnQgY29uc3QgRGVmYXVsdEdsb2JhbEVudmlyb25tZW50VmFyaWFibGVzOiBHbG9iYWxFbnZpcm9ubWVudFZhcmlhYmxlcyA9IHtcbiAgZm9ybWF0OiB7XG4gICAgZGF0ZToge1xuICAgICAgZGF0ZToge1xuICAgICAgICB2YWx1ZTogJ3l5eXlNTWRkJyxcbiAgICAgICAgZGlzcGxheTogJ3l5eXktTU0tZGQnXG4gICAgICB9LFxuICAgICAgZGF0ZVRpbWU6IHtcbiAgICAgICAgdmFsdWU6ICd5eXl5TU1kZEhIbW1zcycsXG4gICAgICAgIGRpc3BsYXk6ICd5eXl5LU1NLWRkIEhIOm1tOnNzJ1xuICAgICAgfSxcbiAgICAgIGRhdGVNb250aDoge1xuICAgICAgICB2YWx1ZTogJ3l5eXlNTScsXG4gICAgICAgIGRpc3BsYXk6ICd5eXl5LU1NJ1xuICAgICAgfSxcbiAgICAgIGRhdGVXZWVrOiB7XG4gICAgICAgIHZhbHVlOiAneXl5eVdXJyxcbiAgICAgICAgZGlzcGxheTogJ3l5eXktV1cnXG4gICAgICB9LFxuICAgICAgdGltZToge1xuICAgICAgICB2YWx1ZTogJ0hIbW1zcycsXG4gICAgICAgIGRpc3BsYXk6ICdISDptbTpzcydcbiAgICAgIH1cbiAgICB9LFxuICAgIG51bWJlcjogJyMsIyMjLiMjJ1xuICB9XG59O1xuIl19