/*
Make sure you are wearing the hr monitor, as it typically
goes to sleep when inactive, not allowing you to connect to it.
Instructions
=============
1. Using Google Chrome, open the dev console and paste the below code.
2. A panel near the address bar will open, searching for nearby bluetooth (ble)
   heart rate devices. Don't click away from the panel or Chrome will cancel the search.
3. When found, click connect on your device.
4. An event listener will be added to start capturing the hr data.
   You can refresh the browser if you need to disconnect or cancel the streaming data.
The event's value will be a DataView. Use the getInt8 method, which
gets a signed 8-bit integer (byte) at the specified byte offset.
To extract the heart rate value, pass 1 as the byte offset:
  let dataView = event.target.value
  let heartRate = dataView.getInt8(1)
DataView documentation
developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView
developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getInt8
*/

async function connect(props) {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: ['heart_rate'] }],
      acceptAllDevices: false,
    })
    console.log(`%c\n👩🏼‍⚕️`, 'font-size: 82px;', 'Starting HR...\n\n')
    const server = await device.gatt.connect()
    const service = await server.getPrimaryService('heart_rate')
    const char = await service.getCharacteristic('heart_rate_measurement')
    char.oncharacteristicvaluechanged = props.onChange //propsオブジェクトのonChangeメソッドを実行（今回はpropsに渡されるobjectの中にonChangeしかない！)
    char.startNotifications()
    return char
  }
  
  
  // Basic example that prints a live updating chart of the heart rate history.
  // Note: This should only be used as a quick/hacky test, it's not optimized.
  
  let hrData = new Array(200).fill(10)
  
  console.clear()
  setupConsoleGraphExample(100, 400)
  connect({ onChange: printHeartRate }).catch(console.error)
  
  
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
  
  
  function setupConsoleGraphExample(height, width) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.height = height
    canvas.width = width
    context.fillStyle = '#fff'
    window.console.graph = data => {
      const n = data.length
      const units = Math.floor(width / n)
      width = units * n
      context.clearRect(0, 0, width, height)
      for (let i = 0; i < n; ++i) {
        context.fillRect(i * units, 0, units, 100 - (data[i] / 2))
      }
      console.log('%c ',
        `font-size: 0; padding-left: ${width}px; padding-bottom: ${height}px;
         background: url("${canvas.toDataURL()}"), -webkit-linear-gradient(#eee, #888);`,
      )
    }
  }