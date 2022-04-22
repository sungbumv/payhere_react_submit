import React, { useState, useEffect } from "react";
import "./App.css";
import AxiosAPI from "./context/AxiosAPI";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from 'axios';


function App() {
  let [inputData, inputDataChange] = useState(""); // repository name
  let [resTitle, setResTitle] = useState([]);
  let [resultRepo, setResultRepo] = useState([]);
  const [check, setCheck] = useState(false);

  // 통신 메서드
function searchApi() {
  const apiUrl = 'https://api.github.com/repos/sungbumv/'; 
  axios.get(apiUrl+inputData,
    {
      headers : {
        Authorization : "token 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"    // github api 초과로 인한 access token 발급
    },
    })
  .then(function(response) { //정상 
    console.log(response.data);

    //1. 성공하더라도 로컬 스토리지에 같은 key가 있다면 추가하지 않음 (코딩애플에서 가능할듯)
    localStorage.setItem(response.data.id,response.data.name);
    let copyResult = [...resultRepo];
    copyResult.unshift(response.data);
    setResultRepo(copyResult); //로컬 스토리지에 쌓이게 처리 
  })
  .catch(function(error) { // 에러케이스
    return(()=>{});
  })
}

  return (
    <div className="App">
      <Header />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "white",
            pt: 4,
            pb: 2,
          }}
        >
          <Container maxWidth="sm">
            <h3>{inputData}</h3>
            <input
              onChange={(e) => {
                inputDataChange(e.target.value);
              }}
            />
            <button
              onClick={() => {
                searchApi()
              }}
            >
              버튼 입력
            </button>
            <Stack
              sx={{ pt: 2 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {/* <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button> */}
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 1 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={2}>
            {
              resultRepo.map((id,index) => (
              <Grid item key={id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {resultRepo[index].name}
                    </Typography>
                    <Typography>
                      최근 업데이트 <br/> {resultRepo[index].updated_at}
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
      <Footer />
    </div>
  );
}




export default App;
