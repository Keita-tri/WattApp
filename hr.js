const btn = document.getElementById('bt')

const connect = async (props) => {
    const device = await navigator.bluetooth.requestDevice({
        filters:[{ services: ['heart_rate']}],
        // filters:[{ services: ['cycling_power']}]
    })
    
    const server = await device.gatt.connect()  // connection情報をgattServerに対して変更
    const service = await server.getPrimaryService('heart_rate') //プライマリサービス情報を取得（uuid,name,など)(デバイス情報のサービスではない）
    const char = await service.getCharacteristics('heart_rate_measurement')//心拍計機能のさらに心拍計測characteristicへアクセス)
    
    char.oncharacteristicvaluechanged = props.onChange
    char.startNotifications()
    console.log(device.name)
    return char
}

let hrData = new Array(200).fill(10)

const pp = 
console.clear()
btn.addEventListener('click', {
    
})

function printHeartRate(event) {
    const heartRate = event.target.value.getInt8(1)
    const prev = hrData[hrData.length - 1]
    hrData[hrData.length] = heartRate
    hrData = hrData.slice(-200)
    // let arrow = ''
    // if (heartRate !== prev) arrow = heartRate > prev ? '⬆' : '⬇'

    hr = document.getElementById('hrvalue')
    hr.innerHTML = 'heartRate'
}