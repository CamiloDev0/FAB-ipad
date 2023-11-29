import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';

const CustomDropdown = ({ setScreen }) =>  {

  return (
    <div className="container-fluid" style={{top:'68%',left:'0%',position:'absolute'}}>
    <div className="row">
      </div>
        <div className="d-flex flex-column justify-content-between mt-3">
          <div className="d-flex">
            <Dropdown className="me-3">
              <Dropdown.Toggle  id="dropdown1" className='custom-dropdown' >
              <Image src='images/uae1.png' alt="Imagen" fluid />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={setScreen(3)}>Opción 1</Dropdown.Item>
                <Dropdown.Item eventKey="2">Opción 2</Dropdown.Item>
                <Dropdown.Item eventKey="3">Opción 3</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle  id="dropdown2" className='custom-dropdown'>
              <Image src='images/morroco1.png' alt="Imagen" fluid />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-4">Opción 4</Dropdown.Item>
                <Dropdown.Item href="#/action-5">Opción 5</Dropdown.Item>
                <Dropdown.Item href="#/action-6">Opción 6</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="d-flex mt-3">
            <Dropdown className="me-3">
              <Dropdown.Toggle  id="dropdown3" className='custom-dropdown'>
              <Image src='images/france1.png' alt="Imagen" fluid />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-7">Opción 7</Dropdown.Item>
                <Dropdown.Item href="#/action-8">Opción 8</Dropdown.Item>
                <Dropdown.Item href="#/action-9">Opción 9</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle  id="dropdown4" className='custom-dropdown'>
              <Image src='images/usa1.png' alt="Imagen" fluid />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-10">Opción 10</Dropdown.Item>
                <Dropdown.Item href="#/action-11">Opción 11</Dropdown.Item>
                <Dropdown.Item href="#/action-12">Opción 12</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>

  );
}
export default CustomDropdown;


