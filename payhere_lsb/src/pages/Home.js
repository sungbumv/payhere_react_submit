
import React, { Component,useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import Detail from "./Detail";
class Home extends Component {
    render()
    {
        return(
            <>
             <MainFunction />
            </>
               
        );
    }
}

function MainFunction() {

    let [inputData, inputDataChange] = useState(""); // repository name
    let [resultRepo, setResultRepo] = useState([]);
    // 통신 메서드
    function searchApi() {
      const apiUrl = "https://api.github.com/repos/sungbumv/";
      axios
        .get(apiUrl + inputData)
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
        <ContentFloor resultRepo={resultRepo} setResultRepo={setResultRepo}/>
        <Footer />
      </div>
    );
  }
  
  function ContentFloor(props) {
    let [open , setOpen]            = useState(false);
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
                  display: "block",
                  flexDirection: "row",
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
                  <Button size="small" 
                  onClick={()=>setOpen(!open)}>상세</Button>
                  {
                    open === true ? <Detail open = "open"/> : false
                  }
                  <Button size="small" 
                  onClick={()=>{
                    localStorage.removeItem(param.id);
                    let copyResultrepo = [...props.resultRepo];
                    copyResultrepo.splice(i,1);
                    props.setResultRepo(copyResultrepo);
                  }}>제거</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
    );
  }

  export default Home;