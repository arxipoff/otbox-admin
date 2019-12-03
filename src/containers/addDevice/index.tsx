import React from 'react'
import { 
  OnetrakScheme,
  OnetrakBox,
  LoaderSVG
} from '../icons'
import formatMacAddress from '../utils'
import '../../index.scss'



const AddDevice: React.FC = () => {
  let [page, setPage] = React.useState(0)

  let [loader, setLoader] = React.useState(false)

  let [macAddress, setMacAddress] = React.useState("")
  let [macAddressError, setMacAddressError] = React.useState(false)

  let [wifiName, setWifiName] = React.useState("")
  let [wifiNameError, setWifiNameError] = React.useState(false)

  let [wifiPassword, setWifiPassword] = React.useState("")
  let [wifiPasswordError, setWifiPasswordError] = React.useState(false)

  const inputHandler = (func: any, e: React.ChangeEvent<HTMLInputElement>) => {
    func(e.target.value)
  }
  
  const postData = () => {
    setLoader(true)
    fetch(`http://192.168.68.79:8081/api/v1/iot_device`, {  
      method: 'POST',
      body: JSON.stringify({
        data: {
          mac_address: macAddress,
          wlan0_name: wifiName,
          wlan0_password: wifiPassword,
          type_iot: ""
        }
      })
    })
    .then(response => {  
      console.log('Request succeeded with JSON response', response)

      setLoader(false)
      alert("Через 3-4 минуты перейдите на вкладку «Проверить статус», чтобы проверить статус OTBox.")
      setPage(0)
    })  
    .catch(error => {  
      console.log('Request failed', error)

      setLoader(false)
      alert("Сервер не отвечает! Повторите поппытку позже.")
      setPage(0)
    })
  }

  const sliderOne = () => {
    return(
      <div className="slider-page slider-one">
        <p>Подключите кабель 2KOM (#2 в комплекте) к LAN-порту OTBox и включите OTBox в электросеть.</p>
        <OnetrakScheme />
        <div className="button--gold" onClick={ () => setPage(1) }>Далее</div>
      </div>
    )
  }

  const sliderTwo = () => {
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
            value={ formatMacAddress(macAddress) }
            onChange={ (e) => {
              setMacAddressError(false)
              inputHandler(setMacAddress, e)
            }}
            required
          />
          {!macAddressError ? null : 
            macAddress.length === 0 
              ? <p className="input-error--label">MAC-номер не указан!</p>
              : <p className="input-error--label">MAC-номер указан не корректно!</p>
          }
        </div>
        <OnetrakBox />
        <div className="button--gold" onClick={ () => {

          if(!macAddress || formatMacAddress(macAddress).length !== 17) setMacAddressError(true)
          else setPage(2)
          
        }}>
          Далее
        </div>
      </div>
    )
  }

  const sliderThree = () => {
    return(
      <div className="slider-page">
        <p>Введите название и пароль сети WiFi, к которой хотите подключить OTBox.</p>
        <div className="slider-page--form">
          <label htmlFor="wifiName">Название сети Wi-Fi</label>
          <input 
            className={wifiNameError ? "input-error" : ""}
            placeholder="Введите имя сети"
            type="text" 
            name="wifiName" 
            id="wifiName" 
            value={ wifiName } 
            onChange={ (e) => {
              setWifiNameError(false)
              inputHandler(setWifiName, e)
            }}
          />
          {!wifiNameError ? null : <p className="input-error--label">Имя сети Wi-Fi не указано!</p>}
          <label id="wifiPasswordLabel" htmlFor="wifiPassword">Пароль</label>
          <input
            className={wifiPasswordError ? "input-error" : ""}
            placeholder="Введите пароль"
            type="password" 
            name="wifiPassword" 
            id="wifiPassword" 
            value={ wifiPassword } 
            onChange={ (e) => {
              setWifiPasswordError(false)
              inputHandler(setWifiPassword, e)
            }}
          />
          {!wifiPasswordError ? null : <p className="input-error--label">Пароль сети Wi-Fi не указан!</p>}
        </div>
        <div className="button--gold" onClick={() => {
          if(!wifiName) {
            if(!wifiName) setWifiNameError(true)
            return
          }
          postData()
        }}>
          Подключить
        </div>
      </div>
    )
  }

  const chooseSlider = () => {
    if(page === 0) return sliderOne()
    if(page === 1) return sliderTwo()
    if(page === 2) return sliderThree()
  }

  return (
    <div className="addDevice">
      {!loader ? chooseSlider(): <div className="loader"><LoaderSVG /></div>}
    </div>
  )
}
export default AddDevice