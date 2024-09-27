const oneSecond = () => 1000
const getCurrentTime = () => new Date()
const clear = () => console.clear()
const log = (message: string) => console.log(message)

const abstractClockTime = (date: Date) => ({
  hours: date.getHours(),
  minutes: date.getMinutes(),
  seconds: date.getSeconds(),
})

type ClockTime = {
  hours: number
  minutes: number
  seconds: number
  ampm: string
}

const civilianHours = (clockTime: ClockTime) => ({
  ...clockTime,
  hours: clockTime.hours > 12 ? clockTime.hours - 12 : clockTime.hours,
})

const appendAMPM = (clockTime: ClockTime) => ({
  ...clockTime,
  ampm: clockTime.hours >= 12 ? 'PM' : 'AM',
})

const display = (target: (x: any) => void) => (time: ClockTime) => target(time)

const formatClock = (format: string) => (time: ClockTime) =>
  format
    .replace('hh', time.hours.toString())
    .replace('mm', time.minutes.toString())
    .replace('ss', time.seconds.toString())
    .replace('tt', time.ampm)

const prependZero =
  (key: keyof Omit<ClockTime, 'ampm'>) => (clockTime: ClockTime) => ({
    ...clockTime,
    [key]: clockTime[key] < 10 ? '0' + clockTime[key] : clockTime[key],
  })

const compose: (...fns: Function[]) => Function =
  (...fns) =>
  (arg: any) =>
    fns.reduce((composed, f) => f(composed), arg)

const convertToCivilianTime = (clockTime: ClockTime) =>
  compose(appendAMPM, civilianHours)(clockTime)

const doubleDigits = (civilianTime: ClockTime) =>
  compose(
    prependZero('hours'),
    prependZero('minutes'),
    prependZero('seconds')
  )(civilianTime)

export const startTicking = () =>
  setInterval(
    compose(
      clear,
      getCurrentTime,
      abstractClockTime,
      convertToCivilianTime,
      doubleDigits,
      formatClock('hh:mm:ss tt'),
      display(log)
    ),
    oneSecond()
  )
