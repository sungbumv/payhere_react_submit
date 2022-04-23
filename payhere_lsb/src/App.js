import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";


function App() {
  let [inputData, inputDataChange] = useState(""); // repository name
  let [resTitle, setResTitle] = useState([]);
  let [resultRepo, setResultRepo] = useState([]);

  // 통신 메서드
  function searchApi() {
    const apiUrl = "https://api.github.com/repos/sungbumv/";
    axios
      .get(apiUrl + inputData, {
        headers: {
          Authorization: "token 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", // github api 초과로 인한 access token 발급
        },
      })
      .then(function (response) {
        //정상
          //1. 성공하더라도 로컬 스토리지에 같은 item이 있다면 추가하지 않음 
        if(localStorage.getItem(response.data.id) !== response.data.name)
        {
          localStorage.setItem(response.data.id,response.data.name); //로컬 스토리지에 쌓이게 처리 
          let copyResult = [...resultRepo];
          copyResult.unshift(response.data);
          setResultRepo(copyResult); 
        }
      })
      .catch(function (error) {
        // 에러케이스
        return () => {};
      });
  }
 

  return (
    <div className="App">
      <Header />
      <div>
        <h3>{inputData}</h3>
        <input
          onChange={(e) => {
            inputDataChange(e.target.value);
          }}
        />
        <button
          onClick={() => {
            searchApi();
          }}
        >
          버튼 입력
        </button>
      </div>
      <ContentFloor resultRepo={resultRepo}/>
      <Footer />
    </div>
  );
}

function ContentFloor(props) {
  return (
    <main>
    {/* Hero unit */}
    <Container sx={{ py: 8 }} maxWidth="md">
      {/* End hero unit */}
      <Grid container spacing={4}>
        {props.resultRepo.map((param,i) => (
          <Grid item key={param.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                    {
                      props.resultRepo[i].name
                    }
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">View</Button>
                <Button size="small">Edit</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </main>
  );
}

export default App;
