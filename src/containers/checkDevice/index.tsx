import React from 'react'
import { 
  OnetrakBox,
  LoaderSVG
} from '../icons'
import '../../index.scss'


const CheckDevice: React.FC = () => {
  let [page, setPage] = React.useState(0)

  let [loader, setLoader] = React.useState(false)

  let [macAddress, setMacAddress] = React.useState("")
  let [macAddressError, setMacAddressError] = React.useState(false)

  const inputHandler = (func: any, e: React.ChangeEvent<HTMLInputElement>) => {
    func(e.target.value.split(" ").join(""))
  }

  const getData = () => {
    setLoader(true)
    
    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //   .then(response => response.json())
    //   .then(json => console.log(json))

    fetch(`http://192.168.68.79:8081/api/v1/iot_device/${macAddress}`, {
      method: 'GET',
      // mode: 'no-cors'
    })
      .then(response => {
        console.log('Request succeeded with JSON response', response)

        setLoader(false)
        setPage(1)
      })
      .catch(error => {
        console.log('Request failed', error)

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
              setMacAddressError(false)
              inputHandler(setMacAddress, e)
            }}
          />
          {!macAddressError ? null : 
            macAddress.length === 0 
              ? <p className="input-error--label">MAC-номер не указан!</p>
              : <p className="input-error--label">MAC-номер указан не корректно!</p>
          }
        </div>
        <OnetrakBox />
        <div className="button--gold" onClick={() => {
          if(!macAddress || macAddress.length !== 17) setMacAddressError(true)
          else getData()
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
            <span className={false ? "online" : "offline"}>
              {false 
                ? "В сети"
                : "Не в сети"
              }
            </span>
          </p>
          <p>Последняя синхронизация <span>{}</span></p>
        </div>
        <div className="button--gold" onClick={() => setPage(0)}>Проверить еще</div>
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