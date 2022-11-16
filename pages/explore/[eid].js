import EncounterAPI from '../../api/encounters';
import {Form, Col, Row, Carousel, Button} from 'react-bootstrap';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.css';
import styles from "../../styles/Encounter.module.css";
import config from '../../constant';

const Detail = (data) => {
  let defaultOption = [];
  const {encounters, uploads, reasons, types} = data;
  const options = reasons.map((item, index) => {
    return {value:item.id, label:item.name}
  });
  
  JSON.parse(encounters.encounter_reasons).forEach((item, index) => {
    reasons.forEach((rItem, rIndex) => {
      if(rItem.id == parseInt(item)){
        let r = {value:rItem.id, label:rItem.name};
        defaultOption.push(r);
      }
    });
  });

  const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? 'black' : "black",
        color: '#FFF',
        cursor: isDisabled ? 'not-allowed' : 'default'
      };
    }
  };

  return (
    <>
    <Row className={styles.editPanel}>
      <Col sm={4}></Col>
      <Col sm={4} className={styles.editForm}>
        <Form className={styles.padding5}>
          <Row>
            <Col sm={6}>
              <Form.Group className="mb-3">
                <Form.Label>Caption</Form.Label>
                <Form.Control type="text" placeholder="Caption" value={encounters.caption} readOnly/>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-3">
                <Form.Label>Types</Form.Label>
                <Form.Select value={encounters.encounter_type} readOnly>
                  {
                    types.map((item, index) => {
                      return (
                        <option className={styles.selectOption} key={index} value={item.id}>{item.name}</option>
                      );
                    })
                  }
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label>Reasons</Form.Label>
            <Select isMulti
              id="reasons"
              instanceId="reasons"
              className="basic-multi-select multi-option"
              styles={colourStyles}
              classNamePrefix="select"
              placeholder="ex: Tints"
              defaultValue={defaultOption}
              options={options}
              readOnly
            />
          </Form.Group>
          <Form.Group className={styles.mt5}>
            <Form.Label>Additional details</Form.Label>
            <Form.Control type="text" placeholder="Additional details" value={encounters.details} readOnly/>
          </Form.Group>
          <Row>
            <Col sm={6}>
              <Form.Group className={styles.mt5}>
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="City" value={encounters.city} readOnly/>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className={styles.mt5}>
                <Form.Label>State</Form.Label>
                <Form.Control type="text" placeholder="State" value={encounters.state} readOnly/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Form.Group className={styles.mt5}>
                <Form.Label>Zipcode</Form.Label>
                <Form.Control type="text" placeholder="Zipcode" value={encounters.zipcode} readOnly/>
              </Form.Group>
            </Col>
            <Col sm={6}></Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Form.Group className={styles.mt5}>
                <Form.Label>Latitude</Form.Label>
                <Form.Control type="text" placeholder="Latitude" value={encounters.latitude} readOnly/>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className={styles.mt5}>
                <Form.Label>Longitude</Form.Label>
                <Form.Control type="text" placeholder="Longitude" value={encounters.longitude} readOnly/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={3}></Col>
            <Col sm={6}>
              <Carousel className={styles.mt15}>
                {
                  uploads.map((item, index) => {
                    return (
                      <Carousel.Item key={index}>
                        <object
                          className="d-block w-100"
                          data={config.IMAGE_URL + item.file_name}
                        />
                        <Carousel.Caption>
                          <h3>{item.file_original_name}</h3>
                        </Carousel.Caption>
                      </Carousel.Item>
                    )
                  })
                }
              </Carousel>
            </Col>
            <Col sm={3}></Col>
          </Row>
          <Row className={styles.mt15}>
            <Button onClick={() => {history.back()}}>Return</Button>
          </Row>
        </Form>
      </Col>
      <Col sm={4}></Col>
    </Row>
    </>
  )
}

Detail.getInitialProps = async ({ query }) => {
  const {data} = await EncounterAPI.get(query.eid);  
  return data;
};

export default Detail