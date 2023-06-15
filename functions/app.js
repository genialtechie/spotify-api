!function(e,t){for(var n in t)e[n]=t[n]}(exports,function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t){e.exports=require("express")},function(e,t){e.exports=require("mongoose")},function(e,t){e.exports=require("passport")},function(e,t,n){(function(t){n(4).config();const r=n(5),o=n(0),s=n(6),i=n(7),u=n(1),c=n(8),a=n(2),l=n(11),f=n(12).Strategy,p=n(13),d=n(14),g=n(15),m=n(16),x=o(),y=process.env.PORT||"5000";try{const e=process.env.MONGODB_CLIENT_ID;u.connect(e,()=>console.log("Connected to Mongo Cluster!"))}catch(e){console.error(e)}x.use(r({origin:"http://localhost:"+y,methods:"GET,POST,PUT,DELETE",credentials:!0})),x.use(l({secret:"messidagoat",resave:!1,saveUninitialized:!1,store:g.create({mongoUrl:process.env.MONGODB_CLIENT_ID,touchAfter:86400,dbName:"test"})})),x.use(i("dev")),x.use(o.json()),x.use(o.urlencoded({extended:!1})),x.use(s()),x.use(a.initialize()),x.use(a.session()),a.use(c.createStrategy()),a.serializeUser((function(e,t){t(null,e.id)})),a.deserializeUser((function(e,t){c.findById(e,(function(e,n){t(e,n)}))})),a.use(new f({clientID:process.env.SPOTIFY_CLIENT_ID,clientSecret:process.env.SPOTIFY_CLIENT_SECRET,callbackURL:process.env.REDIRECT_URI},(async function(e,t,n,r,o){try{return o(null,await c.findOneAndUpdate({spotifyId:r.id},{name:r.displayName,accessToken:e,refreshToken:t},{new:!0,upsert:!0,maxTimeMS:1e4}))}catch(e){return console.error(e),o(e)}}))),x.use("/.netlify/functions/app",m),x.use(o.static(d.join(t,"../client/build"))),x.use("/",(e,n)=>{n.sendFile(d.join(t,"../client/build/index.html"))}),e.exports=x,e.exports.handler=p(x)}).call(this,"/")},function(e,t){e.exports=require("dotenv")},function(e,t){e.exports=require("cors")},function(e,t){e.exports=require("cookie-parser")},function(e,t){e.exports=require("morgan")},function(e,t,n){const{default:r}=n(1),o=n(9),s=n(10),i=new(0,r.Schema)({name:String,spotifyId:{type:String,unique:!0,required:!0},secret:String,refreshToken:String,accessToken:{type:String,unique:!0,required:!0}});i.plugin(o),i.plugin(s),global.User=global.User||r.model("User",i),e.exports=global.User},function(e,t){e.exports=require("passport-local-mongoose")},function(e,t){e.exports=require("mongoose-findorcreate")},function(e,t){e.exports=require("express-session")},function(e,t){e.exports=require("passport-spotify")},function(e,t){e.exports=require("serverless-http")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("connect-mongo")},function(e,t,n){var r=n(0).Router();const o=n(2),s=n(17);r.get("/login",o.authenticate("spotify",{scope:["user-read-email","user-read-private","user-top-read"],showDialog:!0})),r.get("/callback",o.authenticate("spotify",{failureRedirect:"/login/failed"}),(function(e,t){t.redirect("/")})),r.get("/refresh_token",(function(e,t){const n=process.env.SPOTIFY_CLIENT_ID,r=process.env.SPOTIFY_CLIENT_SECRET,o=e.user.refreshToken,i={url:"https://accounts.spotify.com/api/token",headers:{Authorization:"Basic "+new Buffer.from(n+":"+r).toString("base64")},form:{grant_type:"refresh_token",refresh_token:o},json:!0};s.post(i,(function(e,n,r){if(!e&&200===n.statusCode){const e=r.access_token;t.send({access_token:e,refresh_token:o})}}))})),r.get("/login/failed",(e,t)=>{t.status(401).json({success:!1,message:"login failure"})}),r.get("/login/success",(e,t)=>{e.user?t.status(200).json({success:!0,message:"user logged in",user:e.user}):t.status(401).json({success:!1,message:"user not logged in"})}),r.get("/logout",(function(e,t){e.logout((function(e){e||t.redirect("/login")}))})),e.exports=r},function(e,t){e.exports=require("postman-request")}]));