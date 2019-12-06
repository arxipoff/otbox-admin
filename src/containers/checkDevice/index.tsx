import React from 'react'
import { 
  OnetrakBox,
  LoaderSVG
} from '../icons'
// import formatMacAddress from '../utils'
import '../../index.scss'



const CheckDevice: React.FC = () => {
  let [page, setPage] = React.useState(0)

  let [loader, setLoader] = React.useState(false)

  let [macAddress, setMacAddress] = React.useState("")
  let [macAddressError, setMacAddressError] = React.useState(false)
  let [macAddressStatus, setMacAddressStatus] = React.useState(false)

  let [onlineStatus, setOnlineStatus] = React.useState(false)
  let [lastSync, setLastSync] = React.useState("")



  const inputHandler = (func: any, e: React.ChangeEvent<HTMLInputElement>) => {
    func(e.target.value.split(" ").join(""))
  }

  const checkMac = () => {
    setLoader(true)
    fetch(`http://192.168.68.79:8000/api/v1/iot_device_check`, {
      method: 'POST',
      body: JSON.stringify({
        data: {
          mac_address: macAddress
        }
      })
    })
      .then(response => response.json())
      .then(res => {
        // console.log('Request succeeded with JSON response', res)

        setLoader(false)
        if(res.iot_device_exists) getData()
        else {
          setMacAddressError(true)
          setMacAddressStatus(true)
        }
       
      })
      .catch(error => {
        setLoader(false)
        // console.log('Request failed', error)
      })
  }

  const getData = () => {
    fetch(`http://192.168.68.79:8000/api/v1/iot_device/${macAddress}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(res => {
        // console.log('Request succeeded with JSON response', res)

        // last_sync must be like: "2019-12-03T09:44:06.741456+00:00"
        if(res.data.last_sync) {
          const lastSyncDate = res.data.last_sync.split("T"),
                lastSyncDateDDMMYYYY = lastSyncDate[0].split("-").reverse().join("-"),
                lastSyncDateTime = lastSyncDate[1].slice(0, 5);

          setLastSync(`${lastSyncDateDDMMYYYY}T${lastSyncDateTime}`)
        }
        setOnlineStatus(res.data.last_settings_check)
        
        setLoader(false)
        setPage(1)
      })
      .catch(error => {
        // console.log('Request failed', error)

        setLoader(false)
        alert("Сервер не отвечает! Повторите поппытку позже.")
      })
  }

  const sliderOne = () => {
    return(
      <div className="slider-page slider-two">
        <p>Введите MAC-номер OTBox. Вы можете найти его на упаковке.</p>
        <div className="slider-page--form">
          <label htmlFor="macAddress">MAC-номер</label>
          <input
            className={macAddressError ? "input-error" : ""}
            placeholder="Введите Мас-номер"
            type="text" 
            name="macAddress"
            id="macAddress"
            value={ macAddress }
            onChange={ (e) => {
              setMacAddressStatus(false)
              setMacAddressError(false)
              inputHandler(setMacAddress, e)
            }}
          />
          {!macAddressError ? null : 
            macAddress.length === 0 
              ? <p className="input-error--label">MAC-номер не указан</p>
              : macAddressStatus 
                ? <p className="input-error--label">Нет OTBox с таким MAC-номером</p>
                : <p className="input-error--label">MAC-номер указан некорректно</p>
          }
        </div>
        <OnetrakBox />
        <div className="button--gold" onClick={() => {
          if(!macAddress || macAddress.length !== 17) setMacAddressError(true)
          else checkMac()
        }}>Проверить</div>
      </div>
    )
  }

  const sliderTwo = () => {    
    return(
      <div className="slider-page">
        <div className="otbox-status">
          <p>MAC-номер OTBox <span>{ macAddress }</span></p>
          <p>Статус 
            <span className={onlineStatus ? "online" : "offline"}>
              {onlineStatus 
                ? "В сети"
                : "Не в сети"
              }
            </span>
          </p>
          <p>Последняя синхронизация 
            <span>
              {lastSync
                ? `${lastSync.split("T")[0]} в ${lastSync.split("T")[1]}`
                : "Ещё не совершалась"
              }
            </span>
          </p>
        </div>
        <div className="button--gold" onClick={() => {
          setMacAddress("")
          setPage(0)
        }}>Проверить еще</div>
      </div>
    )
  }

  const chooseSlider = () => {
    if(page === 0) return sliderOne()
    if(page === 1) return sliderTwo()
  }

  return (
    <div className="checkDevice">
      {!loader ? chooseSlider(): <div className="loader"><LoaderSVG /></div>}
    </div>
  )
};
export default CheckDevice