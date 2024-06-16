import { useState,Suspense } from 'react';
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import './App.css';

function App() {
  const [isDarkTheme,setDarkTheme]=useState(false)
  const [city,setCity]=useState("")
  const [temperature,setTemperature]=useState("")
  const [name,setName]=useState("")
  const [result,setResult]=useState("")
  const [error,setError]=useState("")
  const dateTme=new Date()

  const showError=(error)=>{
    setResult(false)
    setError(error)
  }

 const getWeatherData=async()=>{
    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=72bdf545ea54479bcfc4d2699688841e`);
    const data=await response.json();
    if(response.ok){
      setResult(true)
      const temp=Math.round(data.main.temp-273)
    setTemperature(temp);
    setName(data.name)
    }else{
      showError(data.message)
    }
 }

 const changeHandler=(e)=>{
  setCity(e.target.value)
 }

 

const submitHandler=(e)=>{
    e.preventDefault();
    if(e.target.value===""){
      alert("Enter the valid Input")
    }
    getWeatherData()
    setCity("")
}

  return (
    <div className={isDarkTheme===true?"App-dark":"App-light"}>

      <header>
      <h1 className='heading'>Weather App</h1>
      <>{isDarkTheme===true?<MdDarkMode className='icon' size={40} onClick={()=>setDarkTheme(false)}/>:<CiLight className='icon'  size={40} onClick={()=>setDarkTheme(true)} />}</>
      </header>

      <div className='search-feilds'>
          <form onSubmit={submitHandler}>
              <input type='text' onChange={changeHandler}  value={city} className='city-name'/>
              <button type='submit'  className='button'>Get Temperature</button>
          </form>
      </div>

      {result===true?
        <Suspense className="output" fallback={<p>...Loading</p>}>
          <div className='result'>
            <table>
              <tr>
                <td><span>Location</span></td>
                <td><p>{name}</p></td>
              </tr>
              <tr>
                <td><span>Temperature</span></td>
                <td><p>{temperature} degree Celcius</p></td>
              </tr>
              <tr>
                <td><span>Date</span></td>
                <td><p>{dateTme.getDate()}.{dateTme.getMonth()+1}.{dateTme.getFullYear()}</p></td>
              </tr>
              <tr>
                <td><span>Time</span></td>
                <td><p>{dateTme.getHours()}:{dateTme.getMinutes()}:{dateTme.getSeconds()}</p></td>
              </tr>
            </table>
            </div>
        </Suspense>:
        <p className='error'>{error}</p>
      }
    </div>
  );
}

export default App;
