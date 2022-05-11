import app from './index';
app.listen(process.env.PORT , ()=> { console.log(`server is listening on port : ${process.env.PORT}`)});
