import {ListGroup, Col, Card, Row, FormGroup, FormControl } from 'react-bootstrap';  
import { MapContainer, Marker, TileLayer, useMap, Tooltip } from 'react-leaflet';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from "react-redux";
import { getEncounters } from "../store/action/encounterAction";
import { useEffect} from 'react';
import Head from "next/head";
import 'leaflet/dist/leaflet.css'
import 'bootstrap/dist/css/bootstrap.css';
import styles from "../styles/Encounter.module.css";
import config from '../constant';

const MapContent = ({ data, router }) => {
  const map = useMap();

  useEffect(() => {
    if (data.length > 0) {
      map.setView([Number(data[0].latitude), Number(data[0].longitude)]);
    }
  }, [data])

  return <>
    <TileLayer
      url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    {data.map((seedlibrary, index) => (
      <Marker
        key={index}
        position={[
          seedlibrary.latitude,
          seedlibrary.longitude
        ]}
        animate={false}
        eventHandlers={{
          click: () => {
            router.push({
              pathname: '/explore/[eid]',
              query: { eid: seedlibrary.id },
            })
          },
        }}
        >
        <Tooltip>
          {seedlibrary.caption} <br/>{seedlibrary.city}, {seedlibrary.state}, {seedlibrary.zipcode} <br/> {new Date(seedlibrary.created_at).toLocaleString()}
        </Tooltip>
      </Marker>
    ))}
  </>
}

const Map = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {encounters} = useSelector((state) => state.encounter);

  useEffect(() => {
    dispatch(getEncounters(""));
  }, [dispatch]);

  const handleCaption = (str) => {
    dispatch(getEncounters(str));
  }

  const handleMouseEvent = (id) =>{
    router.push({
      pathname: '/explore/[eid]',
      query: { eid: id },
    })
  }

  return(
    <>
    <Head>
      <title>Map | Encounters</title>
      <meta name="description" content="Please login to use fully-featured next-realworld site. (Post articles, comments, and like, follow etc.)" />
    </Head>
    <Row className={styles.row}>
      <Col sm={4}>
        <Card bg={'dark'}>  
          <Card.Body>
            <FormGroup>
              <FormControl type="text" placeholder="Caption..."  className={styles.searchInput} onKeyPress={
                (e) => {
                  if(e.key === 'Enter')
                    handleCaption(e.target.value)
                }
              }/>
            </FormGroup>
            <div>
              <object width="100%" data={config.SERVER_URL + '/image/introduction.mp4'}></object>
            </div>
            <ListGroup variant="flush">
              <div className={styles.list}>
              {
                encounters.map((item, index) => {
                  return (
                    <ListGroup.Item variant='secondary' key={index} className={styles.listItem} onMouseDown={() => handleMouseEvent(item.id)}>
                      <div className="checklist-info">
                        <Row>
                          <h6 className={styles.listH5}>{item.caption}</h6>
                        </Row>
                        <Row>
                          <Col sm={8}>
                            <small className={styles.listSmall}>{item.city}, {item.state}, {item.zipcode}</small>
                          </Col>
                          <Col sm={4} className={styles.dateFormat}>
                            {new Date(item.created_at).toLocaleString()}
                          </Col>
                        </Row>
                      </div>
                    </ListGroup.Item>
                  )
                })
              }
              </div>
            </ListGroup>
          </Card.Body>  
        </Card>
      </Col>
      <Col sm={8}>
        <Card bg={'dark'}>  
          <Card.Body>
            <MapContainer center={[0,0]} zoom={5} scrollWheelZoom={true} className="leaflet-container">
              <MapContent data={encounters} router={router} />
            </MapContainer>
          </Card.Body>  
        </Card>
      </Col>
    </Row>
    </>
  )
}

export default Map