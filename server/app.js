require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
const mongoose = require("mongoose");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { indexRouter } = require("./routes/index"); //람준 index이름 바꿔서 작업할것
const { userRouter } = require("./routes/userRouter");
const {authenticate} = require("./middleware/authentication");
const { teamRouter } = require("./routes/teamRouter");

const app = express();


mongoose.connect(process.env.MONGO_URI,
{
  // useCreateIndex:true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=> {
  // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(authenticate);


app.use('/index', indexRouter);//람준이가 작업할 라우터!!!
app.use('/users', userRouter);
app.use('/makeTeam',teamRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
})
.catch((err) => console.log(err));

module.exports = app;
