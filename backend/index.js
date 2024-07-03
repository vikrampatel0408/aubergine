const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");


const app = express();
app.use(cors());
app.use(express.json());

  app.get("/",async (req, res) => {
    if(req.query.search){
        const search = req.query.search;
        const response = await axios.get(
            `http://universities.hipolabs.com/search?country=${search}`,
            {
              headers: {
                "Content-Type": "application/json",
                // "x-auth-token": JSON.parse(localStorage.getItem("x-auth-token")),
              },
            }
          );
          console.log(response);
          const data = response.data;
          console.log(data);
        res.status(200).send({ data: data });
    }else{
    const response = await axios.get(
        `http://universities.hipolabs.com/search?name=middle`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    //   console.log(response);
      const data = response.data;
      console.log(response);
    
    //   console.log(data);
    res.status(200).send({ data: data });
    }
  });
  
  app.get("/search",async (req, res) => {
    var result;
    if(req.query.search){
        const search = req.query.search;
        const response = await axios.get(
            `http://universities.hipolabs.com/search?country=${search}`,
            {
              headers: {
                "Content-Type": "application/json",
                // "x-auth-token": JSON.parse(localStorage.getItem("x-auth-token")),
              },
            }
          );
        //   console.log(response);
          const data = response.data;
          result=data;
        //   console.log();
        // res.status(200).send({ data: data });
    }else{
    const response = await axios.get(
        `http://universities.hipolabs.com/search?name=middle`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    //   console.log(response);
      const data = response.data;
    //   console.log(response);
    result=data;
    //   console.log(data);
    // res.status(200).send({ data: data });
    }
    console.log(result);

    const data = result.filter((item)=>{
        return item.alpha_two_code == req.query.code;
    })
        res.status(200).send({ data: data });

  });


const port =  8080;
app.listen(port, console.log(`Listening on port ${port}`));
