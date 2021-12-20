const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json())
//Enable CORS
app.use(cors());

//Route
app.get('/api/users', (req, res)=> {
    let page = req.query.page //Page is equal to the page number provided by the React frontend
    let url = `https://randomuser.me/api/?inc=name,email,phone,city,country,dob,picture,id,location&page=${page}&results=20&seed=abc`
    axios.get(url)
    .then(result => {
        res.send(result.data.results)
    })
});

// PORT
const port = process.env.PORT || 3001; //If environment port variable is set use that port otherwise use port 3001
app.listen(port, () => console.log(`Listening on port ${port}`));