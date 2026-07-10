const chatBody = document.getElementById("chat-body");
const optionsDiv = document.getElementById("chat-options");

let history = [];
let current = "start";

const chatbot = {

start:{
text:"Hello 👋 What do you need help with?",
options:[
{label:"Website Problem",next:"website"},
{label:"Login Problem",next:"login"},
{label:"Contact Support",next:"contact"}
]
},

website:{
text:"What website problem are you experiencing?",
options:[
{label:"Page not loading",next:"page"},
{label:"Design issue",next:"design"}
]
},

login:{
text:"Choose your login issue:",
options:[
{label:"Forgot Password",next:"reset"},
{label:"Cannot login",next:"cannot"}
]
},

page:{
text:"Try refreshing the page or clearing browser cache.",
options:[]
},

design:{
text:"Please send a screenshot to support.",
options:[]
},

reset:{
text:"Click 'Forgot Password' on the login page.",
options:[]
},

cannot:{
text:"Check your username or password.",
options:[]
},

contact:{
text:"You can contact support@example.com",
options:[]
}

};

function toggleChat(){

const chat = document.getElementById("chat-window");

if(chat.style.display==="flex")
chat.style.display="none";
else
chat.style.display="flex";
}

function botMessage(text){

const div=document.createElement("div");
div.className="bot";
div.innerText=text;

chatBody.appendChild(div);
chatBody.scrollTop=chatBody.scrollHeight;
}

function userMessage(text){

const div=document.createElement("div");
div.className="user";
div.innerText=text;

chatBody.appendChild(div);
chatBody.scrollTop=chatBody.scrollHeight;
}

function showOptions(node){

optionsDiv.innerHTML="";

node.options.forEach(opt=>{

const btn=document.createElement("button");
btn.className="option-btn";
btn.innerText=opt.label;

btn.onclick=()=>{
userMessage(opt.label);

history.push(current);

current=opt.next;

setTimeout(()=>{
loadNode(current);
},500);

};

optionsDiv.appendChild(btn);

});
}

function loadNode(key){

const node=chatbot[key];

botTyping(()=>{
botMessage(node.text);
showOptions(node);
});
}

function botTyping(callback){

const div=document.createElement("div");
div.className="bot";
div.innerText="Typing...";
chatBody.appendChild(div);

chatBody.scrollTop=chatBody.scrollHeight;

setTimeout(()=>{
div.remove();
callback();
},800);

}

function goBack(){

if(history.length===0) return;

current=history.pop();

chatBody.innerHTML="";
loadNode(current);
}

function restartChat(){

history=[];
current="start";

chatBody.innerHTML="";
loadNode("start");
}

loadNode("start");