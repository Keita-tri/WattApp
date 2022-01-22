const device1 = await navigator.bluetooth.requestDevice({
    filters:[{ services: ['heart_rate']}],
    // filters:[{ services: ['cycling_power']}]
})

const server = await device1.gatt.connect()  // connection情報をgattServerに対して変更
const service = await server.getPrimaryService('heart_rate') //プライマリサービス情報を取得（uuid,name,など)(デバイス情報のサービスではない）

const char = await service.getCharacteristics('heart_rate_measurement')//心拍計機能のさらに心拍計測characteristicへアクセス)

console.log(server)
console.log(service)
console.log(char)



function printHeartRate(event) {
const heartRate = event.target.value.getInt8(1)
const prev = hrData[hrData.length - 1]
hrData[hrData.length] = heartRate
hrData = hrData.slice(-200)
let arrow = ''
if (heartRate !== prev) arrow = heartRate > prev ? '⬆' : '⬇'
console.clear()
console.graph(hrData)
console.log(`%c\n💚 ${heartRate} ${arrow}`, 'font-size: 24px;', '\n\n(To disconnect, refresh or close tab)\n\n')
}
