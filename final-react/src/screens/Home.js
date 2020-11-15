import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Image,
  Row,
  Col,
  ProgressBar,
  Container,
  Table,
  Button
} from "react-bootstrap";
import { AccountContext } from "../lib/Accounts";
import axios from "axios";

export default function Home() {
  let url = 'http://192.168.75.135:4200'
  const [status, setStatus] = useState(false);
  const [data, setData] = useState([]);
  const [vida, setVida] = useState(0);
  const [max, setMax] = useState(100);
  const { getSession } = useContext(AccountContext);
  const history = useHistory();

  useEffect(() => {
    getSession()
      .then((session) => {
        console.log("Session:", session);
        setStatus(true);
      })
      .catch((err) => {
        console.log(err);
        history.push("/sign-in");
      });
    console.log(localStorage.getItem("usuario"));
    axios.get(url+"/getLog").then((res) => {
      console.log(res.data);
      setVida((res.data.vida / res.data.total) * 100);
      setData(
        res.data.data.sort(function (a, b) {
          if (a.timestamp < b.timestamp) return 1;
          else return -1;
        })
      );
    });
  }, []);

  function attack(value) {
    axios.post(url+"/atacar",{
      user: localStorage.getItem("usuario"),
      damage: value
    }).then(
      res=> {
        alert("Ataque con exito");
        window.location.reload()
      }
    );
  }

  function reset() {
    axios.get(url+"/reset").then(
      res=> {
        alert("HAS MUERTO");
        window.location.reload()
      }
    );
  }
  function login() {
    localStorage.setItem("usuario", "hola");
  }
  return (
    <div className="outer2">
      <div className="inner2" alignContent="center">
        <h1 style={{ marginTop: "5%" }}>Fight!</h1>
        <h1 style={{ marginTop: "2%" }}>
          {status ? "Logeado!" : "No Logeado!"}
        </h1>
        <Image
          src="https://www.pngkey.com/png/full/66-668469_blue-flame-boss-fire-enemy-pixel-art.png"
          rounded
          style={{ width: 300, height: 300 }}
        />
        <h3 style={{ marginTop: "2%", marginBottom: "2%" }}>Vida</h3>
        <ProgressBar
          animated
          now={vida}
          variant="danger"
          label={`${vida}%`}
          style={{
            marginTop: "1%",
            marginBottom: "2%",
            marginLeft: "10%",
            marginRight: "10%",
          }}
        />
        <h3 style={{ marginTop: "2%", marginBottom: "2%" }}>Atacar</h3>
        <Container>
          <Row>
            <Col xs={6} md={4}>
              <Image
                src="http://pixelartmaker.com/art/eff0401ff60c230.png"
                rounded
                style={{ width: 150, height: 150 }}
                onClick={() => attack(20)}
              />
            </Col>
            <Col xs={6} md={4}>
              <Image
                src="https://art.pixilart.com/95e6f841b928ca6.png"
                rounded
                style={{ width: 150, height: 150 }}
                onClick={() => attack(15)}
              />
            </Col>
            <Col xs={6} md={4}>
              <Image
                src="https://art.pixilart.com/661f9bda0e9b95e.png"
                rounded
                style={{ width: 150, height: 150 }}
                onClick={() => attack(10)}
              />
            </Col>
          </Row>
        </Container>
        <Table
          striped
          bordered
          hover
          style={{ marginTop: "3%", marginBottom: "2%" }}
        >
          <thead>
            <tr>
              <th>Ataques</th>
            </tr>
          </thead>
          <tbody>
            {data.map(function (name) {
              return (
                <tr>
                  <td>{name.ataque}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Button variant="danger" style={{width:"80%"}} onClick={()=>reset()}> Resetear Jefe </Button>
      </div>
    </div>
  );
}
