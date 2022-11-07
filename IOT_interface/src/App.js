import './App.css';
import Expand from './collapse';
import {React,useEffect,useState} from "react";


function App() {

  const [ans, setans] = useState([]);
 

  const [temp_min, set_temp_min] = useState(15);
  const [temp_max, set_temp_max] = useState(25);

  const [humidity_min, set_humidity_min] = useState(60);
  const [humidity_max, set_humidity_max] = useState(80);

  const [co2_min, set_co2_min] = useState(0);
  const [co2_max, set_co2_max] = useState(50);
  
  const [temperature, set_temperature] = useState(0);
  const [humidity, set_humidity] = useState(0);
  const [co2, set_co2 ]= useState(0);
  const [location, set_location ]= useState(0);

  



  const change_temp_max =(event)=>{
    set_temp_max(event.target.valueAsNumber);
  }
  const change_temp_min =(event)=>{
    set_temp_min(event.target.valueAsNumber);
  }
  const change_humidity_max =(event)=>{
    set_humidity_max(event.target.valueAsNumber);
  }
  const change_humidity_min =(event)=>{
    set_humidity_min(event.target.valueAsNumber);
  }
  const change_co2_max =(event)=>{
    set_co2_max(event.target.valueAsNumber);
  }
  const change_co2_min =(event)=>{
    set_co2_min(event.target.valueAsNumber);
  }
  const MINUTE_MS = 1000;
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://172.17.36.72:8080/')
     .then(response=>response.json())
      .then(data=>{setans(data);
      set_temperature(data[data.length-1].data.temperature);
      set_humidity(data[data.length-1].data.humidity);
      //set_co2(data[data.length-1].data.co2);
      set_location(data[data.length-1].data.gps);
    })
    }, MINUTE_MS);
  
    return () => clearInterval(interval);}, [])

  return (
    
    <div className="App">
      <h1 className='title'>Quality sensor</h1>
      <div className="Gateway_and_configuration">
      <div className="Gateway">
      <div className="Gateway1" >
      <Expand title="Gateway 1" defaultExpanded= {true} >
          <h3>Device 1</h3>
          <label className="capteur"><div className="data" style={{ backgroundColor: temperature > temp_max  | temperature<temp_min ? 'red':'green'}}> </div> Température: {temperature}°C</label><br/>
          <label className="capteur"><div className="data" style={{ backgroundColor: humidity > humidity_max  | humidity<humidity_min ? 'red':'green'}}> </div> Humidity: {humidity}</label ><br/>
          <label className="capteur"><div className="data" style={{ backgroundColor: co2 > co2_max  | co2<co2_min ? 'red':'green'}}> </div> CO2: {co2}</label ><br/>
          <label className="capteur"><div className="data" style={{ backgroundColor: 'white'}}> </div> GPS: {location.latitude + ' , '+location.longitude} <a  href={ "https://www.google.com/maps/search/?api=1&query=" +location.latitude+','+location.longitude} target="_blank" >Google Maps</a></label ><br/>
          
          <h3>Device 2</h3>
          <label className="capteur"><div className="data" style={{ backgroundColor: temperature > temp_max  | temperature<temp_min ? 'red':'green'}}> </div> Température: {temperature}°C</label><br/>
          <label className="capteur"><div className="data" style={{ backgroundColor: humidity > humidity_max  | humidity<humidity_min ? 'red':'green'}}> </div> Humidity: {humidity}</label ><br/>
          <label className="capteur"><div className="data" style={{ backgroundColor: co2 > co2_max  | co2<co2_min ? 'red':'green'}}> </div> CO2: {co2}</label ><br/>
          <label className="capteur"><div className="data" style={{ backgroundColor: 'white'}}> </div> GPS</label ><br/>

          <h3>Device 3</h3>
          <label className="capteur"><div className="data" style={{ backgroundColor: temperature> temp_max  | temperature<temp_min ? 'red':'green'}}> </div> Température: {temperature}°C</label><br/>
          <label className="capteur"><div className="data" style={{ backgroundColor: humidity > humidity_max  | humidity<humidity_min ? 'red':'green'}}> </div> Humidity: {humidity}</label ><br/>
          <label className="capteur"><div className="data" style={{ backgroundColor: co2 > co2_max  | co2<co2_min ? 'red':'green'}}> </div> CO2: {co2}</label ><br/>
          <label className="capteur"><div className="data" style={{ backgroundColor: 'white'}}> </div> GPS</label ><br/>
         
      </Expand>
      </div>

      <div className="Gateway2" >
      <Expand title="Gateway 2" >
         <div>none</div>
      </Expand>
      </div>
      </div>


      <div className='configuration'>

            <h2 className='configuration_text'>configuration</h2>
            <div className='configuration_line'></div>

            <div className='temperature'> 
              <h3>Temperature</h3>
              <div className='temperature_field'>
                    Min: <input type="number" className='temperature_input' defaultValue={90} min={0} onChange={change_temp_min}/>
                    <br/><br/>
                    Max: <input type="number" className='temperature_input' defaultValue={100} onChange={change_temp_max}/>
                    <br/><br/>
              </div>
            </div>

            <div className='Humidity'> 
              <h3>Humidity</h3>
              <div className='Humidity_field'>
                    Min: <input type="number" className='Humidity_input' defaultValue={90} min={0} onChange={change_humidity_min}/>
                    <br/><br/>
                    Max: <input type="number" className='Humidity_input' defaultValue={100} onChange={change_humidity_max}/>
                    <br/><br/>
              </div>
            </div>

            <div className='CO2'> 
              <h3 className='CO2_text'>CO2</h3>
              <div className='CO2_field'>
                    Min: <input type="number" className='CO2_input' defaultValue={90} min={0} onChange={change_co2_min}/>
                    <br/><br/>
                    Max: <input type="number" className='CO2_input' defaultValue={100} onChange={change_co2_max}/>
                    <br/><br/>
              </div>
            </div>
            </div>
      </div>
    </div>
  );
}

export default App;
