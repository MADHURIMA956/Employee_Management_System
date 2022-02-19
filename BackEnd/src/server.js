const app = require('./index.js')
const connect = require('./configs/db');

const port = process.env.PORT || 3001;

app.listen(port , async ()=> {
    try{
        await connect();
        console.log(`listening on port ${port}`);
    }catch(e) {
        console.log(`Not connected ${e}`);
    }
});