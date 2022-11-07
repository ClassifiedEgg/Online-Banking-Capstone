

import '../style/Login.css';
import {React, useState, useEffect} from 'react';
import validator from 'validator';
import pic from '../style/img_avatar2.png';
import { Alert } from '@mui/material';
const FormHeader = props => (
   <div>
   <div className='imgcontainer'>
    <img src={pic} alt="Avatar" className="avatar"></img>
    </div>
    <h2 id="headerTitle">{props.title}</h2>
    </div>
);

function Login()
{
    

    const [data,setData] = useState({
        email:"",
        password:""
      })
    const [message,setMessage]=useState("");
    let checkemail=''
    
      
    const {username,password} = data;
    let [users,setusers]=useState({});

      
      const changeHandler = e => {
        setData({...data,[e.target.name]:[e.target.value]});

      }
      
      const getUsers = async()=>{
        try {
            const response = await fetch("http://localhost:3000/users/") ;
            const jsonData = await response.json();
            /* console.log(jsonData); */
            localStorage.setItem("users",JSON.stringify(jsonData));
          } catch (error) {
            console.log(error.message);
          }
  }
    
    useEffect(() => {
        getUsers();
        const users_ls=JSON.parse(localStorage.getItem("users"));
        setusers(users_ls);   
      }, []);

        const submitHandler = e => {
        

        e.preventDefault();
        let email_str=data['email'][0];
        let password_str=data['password'][0];
        checkemail=(validator.isEmail(email_str))
        console.log("checkemail",checkemail);
        function checkemailpassofuser(obj)
        {
         let flag=0
         if(obj.email===email_str && obj.password===password_str)
         {
            flag=1
         }
         return flag
         
         
        }
        if(!checkemail)
        {
          alert("Please enter a valid Email")
            setMessage("Please enter a valid Email");
            
         
        }

        if(checkemail)
        {
          setMessage('');
          const result = users.filter(checkemailpassofuser);
          /* console.log("result",result); */
          if(result[0])
          {
          alert("Welcome" + " " +result[0].firstname)
         /*  console.log("Welcome"); */
          } 
          else
          {
          alert("Wrong credentials");
          /* console.log("Wrong credentials"); */
          }
        }
        }

    return(
      <div id="loginform">
        <FormHeader title="Login" />
        <div>
            <form onSubmit={submitHandler}>
            <div class="row">
            <label>Email</label>
            <input required type="text" name="email" placeholder="Enter your Email" value={data.email} onChange={changeHandler}/>
        </div>  
        <div class="row">
            <label>Password</label>
            <input required type="password" name="password" placeholder="Enter your Password" value={data.password} onChange={changeHandler}/>
        </div>  
        <div id="button" class="row">
            <button>Log In</button>
        
        </div>
            </form>

        </div>

        {!checkemail &&
        <div /* id="message" */>
        {message}
        </div>
        
      }
     
      <div className="container" style={{"backgroundColor":"#f1f1f1", "height" : "50px"}}>
        New User ? <a href="#">Register Here</a>
      </div>
        
       
      </div>
    )
  }
  
  export default Login;



