import React, { useEffect, useState, use } from 'react';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  const [currentScreen,setCurrentScreen]=useState(0);
  const [selectedCountry,setSelectedCountry]=useState('');
  const [selectedProyect,setSelectedProyect]=useState('');
  const [selectedCompany,setSelectedCompany]=useState('');
  const socket = new WebSocket('ws://192.168.100.30:8080'); // HERE you can change the api Address the port is 8080
  var sp = new URLSearchParams(window.location.search)
  const ipadSource = sp.get('source').toLowerCase();

  function Back(){
  setCurrentScreen(currentScreen-1)
};

function navegacion(){
  return(
    <div>
    <img style={{width: '12%', height: '8%', left: '4.0%', top: '2.2%', position: 'absolute'}} src="images/boton.png" alt='' onClick={() => setCurrentScreen(1)}/>
    <img style={{width: '10%', height: '8%', left: '16.72%', top: '2.2%', position: 'absolute'}} src="images/boton.png" alt='' onClick={() => Back()}/>
    </div>
  )
}
/////////////////////////////////////////Conexion WebSockets //////////////////////////////////////
  useEffect(() => {

    socket.onopen = () => {
      //console.log('Conexión WebSocket abierta');
      socket.send(selectedCountry);
      console.log('enviado',selectedCountry)
    };

    // socket.onmessage = (event) => {
    //   console.log('Mensaje recibido del servidor:', event.data);
    //   // Puedes procesar los datos recibidos del servidor aquí
    // };

    socket.onclose = () => {
     // console.log('Conexión WebSocket cerrada');
    };

    socket.onerror = (error) => {
      console.error('Error en la conexión WebSocket:', error);
    };

    // Cierra la conexión WebSocket al desmontar el componente
    return () => {
      socket.close();
    };
  }, );

  const setCollaborative = (screen, action, image ) => {
    let url = "https://mocionws.info/dbController.php?table=dubai&source="+ipadSource;
    if( action !== 'del' )
      url += '&image='+image;
    url += ( action === 'del' ) ? '&method=dropRecord&raw= source="'+ipadSource+'"' : '&method=newRecord&image='+image;
    axios({ method: "get", url})
        .then((res) => {
          console.log("DB REQUEST WS PHP ===> ", res);
          if( action === 'del' ){
            url = "https://mocionws.info/dbController.php?method=newRecord&table=dubai&source="+ipadSource+"&image="+image;
          }
          axios({ method: "get", url}).then((res) => {
            console.log("DB REQUEST INSIDE WS ===> ", res);
            setCurrentScreen(screen);
          }).catch((err) => console.log("ERROR REQUEST INSIDE WS ====> ", err));
        }).catch((error) => console.log("ERROR REQUEST WS ====> ", error))
  }

  return (

  <div className="full-frame">
  {currentScreen ===0 ?
  <div>
  <Image alt='' src='/images/frame0.png' onClick={() => setCollaborative(1, 'del', 'wave-'+ipadSource)} style={{position:'absolute',width:'100%',height:'100%'}}/>
  <video autoPlay muted loop style={{width:'80%',height:'57%',left:'9.9%',top:'36.2%',position:'absolute',objectFit: 'fill' }}>
  <source src="/video/ipad.mp4" type="video/mp4"   />
  </video>
  </div>
  :null}

  {currentScreen ===1 ?
    <div style={{width: '100%', height: 'auto%', position: 'relative', background: '#F3F3F3'}}>
    <Image alt='' src='/images/frame1.png' fluid/>
    <img style={{width: '58.2%', height: '17.35%', left: '20.9%', top: '47.07%', position: 'absolute'}} src="/images/botongreen.png" alt='' onClick={() => setCurrentScreen(2)} />
    <img style={{width: '58.2%', height: '17.35%', left: '20.9%', top: '66.76%', position: 'absolute'}} src="/images/botonblue.png" alt='' onClick={() => setCurrentScreen(7)} />
  </div>
  :null}
  {currentScreen ===2 ?
    <div style={{width: '100%', height: '100%', position: 'relative', background: '#F3F3F3'}}>
    <Image alt='' src='/images/green/frame2.png' fluid/>
    <img style={{width: '3.6%', height: '2%', left: '8%', top: '5.27%', position: 'absolute'}} src="images/back.png" alt='' onClick={() => Back()}/>
    <div className="container-fluid" style={{top:'68%',left:'0%',position:'absolute'}}>
    <div className="row">
      </div>
        <div className="d-flex flex-column justify-content-between mt-3">
          <div className="d-flex">
            <Dropdown className="me-3">
              <Dropdown.Toggle  id="dropdown1" className='custom-dropdown' >
              <Image src='images/green/botonuae.png' alt="Imagen" fluid onClick={() =>[setSelectedCountry("UNITED ARAB EMIRATES")] } />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => [setSelectedProyect("RENEWABLE ENERGY"),setCurrentScreen(3)]}>RENEWABLE ENERGY</Dropdown.Item>
                <Dropdown.Item onClick={() => [setSelectedProyect("SUSTAINABLE WASTEWATER MANAGEMENT"),setCurrentScreen(3)]}>SUSTAINABLE WASTEWATER MANAGEMENT</Dropdown.Item>
                <Dropdown.Item onClick={() => [setSelectedProyect("GREEN BUILDING"),setCurrentScreen(3)]}>GREEN BUILDING</Dropdown.Item>
                <Dropdown.Item onClick={() => [setSelectedProyect("ENERGY EFFICIENCY"),setCurrentScreen(3)]}>ENERGY EFFICIENCY</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle  id="dropdown2" className='custom-dropdown'>
              <Image src='images/green/botonmorroco.png' alt="Imagen" fluid onClick={() =>[setSelectedCountry("MORROCO")] } />
              </Dropdown.Toggle>
              <Dropdown.Menu>
              <Dropdown.Item onClick={() => [setSelectedProyect("RENEWABLE ENERGY"),setCurrentScreen(3)]}>RENEWABLE ENERGY</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="d-flex mt-3">
            <Dropdown className="me-3">
              <Dropdown.Toggle  id="dropdown3" className='custom-dropdown'>
              <Image src='images/green/botonfrance.png' alt="Imagen" fluid onClick={() =>[setSelectedCountry("FRANCE")] } />
              </Dropdown.Toggle>
              <Dropdown.Menu>
              <Dropdown.Item onClick={() => [setSelectedProyect("GREEN BUILDING"),setCurrentScreen(3)]}>GREEN BUILDING</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle  id="dropdown4" className='custom-dropdown'>
              <Image src='images/green/botonfrance.png' alt="Imagen" fluid onClick={() =>[setSelectedCountry("USA")] } />
              </Dropdown.Toggle>
              <Dropdown.Menu>
              <Dropdown.Item onClick={() => [setSelectedProyect("GREEN BUILDING"),setCurrentScreen(3)]}>GREEN BUILDING</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
  </div>
  :null}

  {currentScreen ===3 ?
    <div >
    {selectedCountry === "UNITED ARAB EMIRATES" && selectedProyect === "RENEWABLE ENERGY" ? (
    <div>
    <Image alt='' src='/images/green/UAE/renewable/renewable.png' fluid/>
     {navegacion()}
    <div>
    <img src='images/green/UAE/shams.png' alt="Imagen" 
      style={{width:'41.3%',height:'7%',left:'7.12%',top:'48.17%', position:'absolute'}}  onClick={() =>[setCurrentScreen(4),setSelectedCompany("SHAMS")]  } />

    <img src='images/green/UAE/shuaa.png' alt="Imagen"  style={{width:'41.3%',height:'7%',left:'51.56%',top:'48.17%',position:'absolute'}}
     onClick={() =>[setCurrentScreen(4),setSelectedCompany("SHUAA")] } />

    <img src= 'images/green/UAE/sweihan.png' alt="Imagen" 
    style={{width:'41.3%',height:'7%',left:'7.12%',top:'57.5%',position:'absolute'}} onClick={() =>[setCurrentScreen(4),setSelectedCompany("SWEIHAN")] } />

    <img src='images/green/UAE/noor.png' alt="Imagen" 
    style={{width:'41.3%',height:'7%',left:'51.56%',top:'57.5%',position:'absolute'}}
     onClick={() =>[setCurrentScreen(4),setSelectedCompany("NOOR")] } />
    </div>
     </div>
    ) : null } 
    <div>
    {selectedCountry === "UNITED ARAB EMIRATES" && selectedProyect === "SUSTAINABLE WASTEWATER MANAGEMENT" ? (
    <div>
    <Image alt='' src='images/green/UAE/water/sustainable.png' fluid/>
    {navegacion()}
    <img src='images/green/UAE/water/botonwater.png' alt="Imagen"
      style={{width:'69%',height:'7%',left:'7.12%',top:'52%', position:'absolute'}}  onClick={() =>[setCurrentScreen(4),setSelectedCompany("UAEWATER")]  } />


    </div>
    ) : null}
    {selectedCountry === "UNITED ARAB EMIRATES" && selectedProyect === "GREEN BUILDING" ? (
    <div>
    <Image alt='' src='images/green/UAE/building/building.png' fluid/>
     {navegacion()}
    <img src='images/green/UAE/building/botonetihad.png' alt="Imagen"
    style={{width:'83%',height:'7%',left:'7.12%',top:'48.17%', position:'absolute'}}  
    onClick={() =>[setCurrentScreen(4),setSelectedCompany("ETIHAD")]  } />

    <img src='images/green/UAE/building/botonleed.png'alt="Imagen"  
    style={{width:'83%',height:'7%',left:'7.12%',top:'57.4%',position:'absolute'}}
    onClick={() =>[setCurrentScreen(4),setSelectedCompany("LEED")] } />
    </div>
    ) : null}
    {selectedCountry === "UNITED ARAB EMIRATES" && selectedProyect === "ENERGY EFFICIENCY" ? (
    <div>
    <Image alt='' src='images/green/UAE/efficiency/energy.png' fluid/>{navegacion()}
    <img src='images/green/UAE/efficiency/botoncooling.png' alt="Imagen"
      style={{width:'41.3%',height:'7%',left:'7.12%',top:'48.17%', position:'absolute'}} 
      onClick={() =>[setCurrentScreen(4),setSelectedCompany("PLANT1")]  } />

    <img src='images/green/UAE/efficiency/botonplant.png' alt="Imagen" 
    style={{width:'41.3%',height:'7%',left:'51.56%',top:'48.17%',position:'absolute'}}
    onClick={() =>[setCurrentScreen(4),setSelectedCompany("PLANT2")] } />
    </div>
    ) : null}

    {selectedCountry === "MORROCO" && selectedProyect === "RENEWABLE ENERGY" ? (
      <div>
      <Image alt='' src='/images/green/MORROCO/renewable.png' fluid/>{navegacion()}
      <img src='/images/green/MORROCO/botonmorroco.png' alt="Imagen"
      style={{width:'77.73%',height:'7%',left:'7.12%',top:'48.17%', position:'absolute'}}
      onClick={() =>[setCurrentScreen(4),setSelectedCompany("CONCENTRATED")]  } />
      </div>
    ) : null}

    {selectedCountry === "FRANCE" && selectedProyect === "GREEN BUILDING" ? (
      <div>
      <Image alt='' src='/images/green/FRANCE/building.png' fluid/>{navegacion()}
      <img src='/images/green/FRANCE/botonfrance.png' alt="Imagen"
      style={{width:'55.37%',height:'7%',left:'7.12%',top:'48.17%', position:'absolute'}}
      onClick={() =>[setCurrentScreen(4),setSelectedCompany("OFFICE")]  } />
      </div>
    ) : null}

    {selectedCountry === "USA" && selectedProyect === "GREEN BUILDING" ? (
      <div>
      <Image alt='' src='/images/green/USA/building.png' fluid/>{navegacion()}
      <img src='/images/green/USA/hotel.png' alt="Imagen"
      style={{width:'70%',height:'7%',left:'7.12%',top:'48.17%', position:'absolute'}}  
      onClick={() =>[setCurrentScreen(4),setSelectedCompany("HOTEL")]  } />

     <img src='/images/green/USA/allsuit.png' alt="Imagen"
      style={{width:'70%',height:'7%',left:'7.12%',top:'57.4%', position:'absolute'}}  
      onClick={() =>[setCurrentScreen(4),setSelectedCompany("ALLSUITE")]  } />
      </div>
    ) : null}
    </div>
  </div>
  : null}

  {currentScreen ===4 ?
    <div>
    {selectedCompany === "SHAMS" ? (
      <div><Image alt='' src='/images/green/UAE/renewable/shams.png' fluid/>{navegacion()}
      </div>
    ):null }
    {selectedCompany === "SWEIHAN" ? (
      <div><Image alt='' src='/images/green/UAE/renewable/sweihan.png' fluid/>{navegacion()}</div>
    ):null }
    {selectedCompany === "SHUAA" ? (
      <div><Image alt='' src='/images/green/UAE/renewable/shuaa.png' fluid/>{navegacion()}</div>
    ):null }
    {selectedCompany === "NOOR" ? (
      <div><Image alt='' src='/images/green/UAE/renewable/noor.png' fluid/>{navegacion()}</div>
    ):null }
    {selectedCompany === "UAEWATER" ? (
      <div><Image alt='' src='images/green/UAE/water/waterplant.png' fluid/>{navegacion()}</div>
    ):null }
    {selectedCompany === "ETIHAD" ? (
      <div><Image alt='' src='images/green/UAE/building/etihad.png' fluid/>{navegacion()}</div>
    ):null }
    {selectedCompany === "LEED" ? (
      <div><Image alt='' src='images/green/UAE/building/leed.png' fluid/>{navegacion()}</div>
    ):null }
    {selectedCompany === "PLANT1" ? (
      <div><Image alt='' src='images/green/UAE/efficiency/plant1.png' fluid/>{navegacion()}</div>
    ):null }
    {selectedCompany === "PLANT2" ? (
      <div><Image alt='' src='images/green/UAE/efficiency/plant2.png' fluid/>{navegacion()} </div>
    ):null }
    {selectedCompany === "CONCENTRATED" ? (
      <div>
      <Image alt='' src= '/images/green/MORROCO/morroco.png'fluid/>{navegacion()}</div>
    ):null }

    {selectedCompany === "OFFICE" ? (
      <div><Image alt='' src='/images/green/FRANCE/france.png' fluid/>{navegacion()}</div>
    ):null }
    {selectedCompany === "HOTEL" ? (
      <div><Image alt='' src='/images/green/USA/USAHOTEL.png' fluid/>{navegacion()}</div>
    ):null }
    {selectedCompany === "ALLSUITE" ? (
      <div><Image alt='' src='/images/green/USA/usaallsuit.png' fluid/>{navegacion()}</div>
    ):null }
  </div>
  :null}


  {currentScreen ===7 ? //////////// Sustainable BLUE ////////////////////////////////////////
    <div>
    <Image alt='' src='/images/blue/frame7.png' fluid/>
    <img style={{width: '3.6%', height: '2%', left: '8%', top: '5.27%', position: 'absolute'}} src="images/back.png" alt='' onClick={() => setCurrentScreen(1)}/>
    <div className="container-fluid"  >
    <div className="row">
      </div>
        <div className="d-flex flex-column justify-content-between mt-3" style={{top:'83%',position:'absolute'}} >
          <div className="d-flex">
            <Dropdown className="me-3" style={{padding:0.8}} >
              <Dropdown.Toggle  id="dropdown5" className='custom-dropdown'  >
              <Image src='images/blue/botonuzbe.png' alt="Imagen" onClick={() =>[setSelectedCountry("UZBE")] } />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => [setSelectedProyect("RENEWABLE ENERGY"),setCurrentScreen(8)]}>RENEWABLE ENERGY</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle  id="dropdown6" className='custom-dropdown'>
              <Image src='images/blue/botonuae.png' alt="Imagen" fluid onClick={() =>[setSelectedCountry("UAE")] } />
              </Dropdown.Toggle>
              <Dropdown.Menu>
              <Dropdown.Item onClick={() => [setSelectedProyect("CLEAN"),setCurrentScreen(8)]}>CLEAN TRANSPORTATION</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="d-flex mt-3">
            <Dropdown className="me-3">
              <Dropdown.Toggle  id="dropdown7" className='custom-dropdown'>
              <Image src='images/blue/botonsaudi.png' alt="Imagen" fluid onClick={() =>[setSelectedCountry("KSA")] } />
              </Dropdown.Toggle>
              <Dropdown.Menu>
              <Dropdown.Item onClick={() => [setSelectedProyect("RENEWABLE ENERGY"),setCurrentScreen(8)]}>RENEWABLE ENERGY</Dropdown.Item>
              <Dropdown.Item onClick={() => [setSelectedProyect("ADVISORY SERVICES"),setCurrentScreen(8)]}>ADVISORY SERVICES</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle  id="dropdown8" className='custom-dropdown'>
              <Image src='images/blue/botonoman.png' alt="Imagen" fluid onClick={() =>[setSelectedCountry("OMAN")] } />
              </Dropdown.Toggle>
              <Dropdown.Menu>
              <Dropdown.Item onClick={() => [setSelectedProyect("RENEWABLE ENERGY"),setCurrentScreen(8)]}>RENEWABLE ENERGY</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="d-flex mt-3">
            <Dropdown className="me-3">
              <Dropdown.Toggle  id="dropdown9" className='custom-dropdown'>
              <Image src='images/blue/botonturkey.png' alt="Imagen" fluid onClick={() =>[setSelectedCountry("TURKEY")] } />
              </Dropdown.Toggle>
              <Dropdown.Menu>
              <Dropdown.Item onClick={() => [setSelectedProyect("LINKED"),setCurrentScreen(8)]}>SUSTAINABLE LINKED LOAN</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
  </div>
  :null}
{currentScreen === 8 ? (
<div>
{selectedCountry === "UZBE" && selectedProyect === "RENEWABLE ENERGY" ? (
    <div>
    <Image alt='' src='images/blue/UZBE/uzberenewable.png' fluid/>{navegacion()}
    <div>
    <img src='images/blue/UZBE/botonuzbe.png' alt="Imagen"
    style={{width:'47.56%',height:'7%',left:'7.12%',top:'48.17%', position:'absolute'}}
    onClick={() =>[setCurrentScreen(9),setSelectedCompany("SHAMOL")]  } />
    </div>
    </div>
    ) : null }

    {selectedCountry === "UAE" && selectedProyect === "CLEAN" ? (
    <div>
    <Image alt='' src='images/blue/UAE/clean.png' fluid/>{navegacion()}<div>
    <img src='images/blue/UAE/botonrail.png' alt="Imagen"
      style={{width:'70%',height:'7%',left:'7.12%',top:'48.17%', position:'absolute'}}
      onClick={() =>[setCurrentScreen(9),setSelectedCompany("RAIL")]  } />
    </div>
    </div>
    ) : null }
    {selectedCountry === "OMAN" && selectedProyect === "RENEWABLE ENERGY" ? (
    <div>
    <Image alt='' src='images/blue/OMAN/renewable.png' fluid/>{navegacion()}<div>
    <img src='images/blue/OMAN/botonoman.png' alt="Imagen"
    style={{width:'61%',height:'7%',left:'7.12%',top:'48.17%', position:'absolute'}} 
    onClick={() =>[setCurrentScreen(9),setSelectedCompany("SOLAR")]  } />
    </div>
    </div>
    ) : null }
    {selectedCountry === "KSA" && selectedProyect === "RENEWABLE ENERGY" ? (
    <div>
    <Image alt='' src='images/blue/KSA/renewable.png' fluid/>{navegacion()}<div>
    <img src='images/blue/KSA/botonshuaibah.png' alt="Imagen"
    style={{width:'70%',height:'7%',left:'7.12%',top:'48.17%', position:'absolute'}}  
    onClick={() =>[setCurrentScreen(9),setSelectedCompany("SHUAIBAH")]  } />

    <img src='images/blue/KSA/botonneom.png' alt="Imagen"  
    style={{width:'70%',height:'7%',left:'7.12%',top:'57.17%',position:'absolute'}}
    onClick={() =>[setCurrentScreen(9),setSelectedCompany("NEOM")] } />
    </div>
    </div>
    ) : null }
    {selectedCountry === "KSA" && selectedProyect === "ADVISORY SERVICES" ? (
    <div>
    <Image alt='' src='images/blue/KSA/advisory.png' fluid/>{navegacion()}
    <div>
    <img src='images/blue/KSA/botonpublic.png' alt="Imagen"
      style={{width:'70%',height:'7%',left:'7.12%',top:'48.17%', position:'absolute'}} 
      onClick={() =>[setCurrentScreen(9),setSelectedCompany("PUBLIC")]  } />
    </div>
    </div>
    ) : null }

    {selectedCountry === "TURKEY" && selectedProyect === "LINKED" ? (
    <div>
    <Image alt='' src='images/blue/TURKEY/linked.png' fluid/>{navegacion()}<div>
    <img src='images/blue/TURKEY/botonturkey.png' alt="Imagen"
    style={{width:'35.4%',height:'7%',left:'7.12%',top:'48.17%', position:'absolute'}}
    onClick={() =>[setCurrentScreen(9),setSelectedCompany("LINKED")]  } />
    </div>
    </div>
    ) : null }

</div>
) : null}


{currentScreen ===9 ?
    <div>
    {selectedCompany === "SHAMOL" ? (
      <div><Image alt='' src='/images/blue/UZBE/uzbe.png' fluid/>{navegacion()}</div>
    ):null }

    {selectedCompany === "RAIL" ? (
      <div><Image alt='' src='/images/blue/UAE/uae.png' fluid/>{navegacion()}</div>
    ):null }

    {selectedCompany === "SOLAR" ? (
      <div><Image alt='' src='/images/blue/OMAN/oman.png' fluid/>{navegacion()}</div>
    ):null }

    {selectedCompany === "LINKED" ? (
      <div><Image alt='' src='/images/blue/TURKEY/turkey.png' fluid/>{navegacion()}</div>
    ):null }

    {selectedCompany === "SHUAIBAH" ? (
      <div><Image alt='' src='/images/blue/KSA/shuaibah.png' fluid/>{navegacion()}</div>
    ):null }

    {selectedCompany === "NEOM" ? (
      <div><Image alt='' src='/images/blue/KSA/neom.png' fluid/>{navegacion()}</div>
    ):null }

    {selectedCompany === "PUBLIC" ? (
      <div><Image alt='' src='/images/blue/KSA/public.png' fluid/>{navegacion()}</div>
    ):null }


  </div>
  :null}

    </div>
  );
}

export default App;





