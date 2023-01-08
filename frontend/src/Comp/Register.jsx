import React,{useState} from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import "./CSS/Register.css"
import img1 from "../Images/most-searched-movie.jpg"
import { useNavigate } from 'react-router';
function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        username:"",
        email:"",
        password:"",
    })

    const handleinput =(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setUser({...user,[name]:value});
    }
    const Handlesubmit =async(e)=>{
        e.preventDefault();
        const {username,email,password} = user;
        try{
            const res = await fetch('/api/Login/register',{
                method : "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    username,email,password
                })
            })
            if(res.status===400 || !res){
                window.alert("Email or Username Alredy Registered")
            }else{
                window.alert("Register Success!")
                navigate('/Login')
            }
        }catch(err){
                console.log(err);
        }
    }


  return (
    <div id='form'>
    <div>
    <p className='p'>REGISTER HERE</p>
    <Form
       
        className="login-form"
       
    >
      <Form.Item
            name="email"
            rules={[
                {
                    required: true,
                    message: 'Please input your Email!',
                },
            ]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" type='email' value={user.email} onChange={handleinput} name="email"/>
        </Form.Item>
        <Form.Item
            name="username"
            rules={[
                {
                    required: true,
                    message: 'Please input your Username!',
                },
            ]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" value={user.username} onChange={handleinput} name="username"/>
        </Form.Item>
        <Form.Item
            name="password"
            rules={[
                {
                    required: true,
                    message: 'Please input your Password!',
                },
            ]}
        >
            <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                value={user.password} onChange={handleinput} name="password"
            />
        </Form.Item>
        <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className='remember'>Remember me</Checkbox>
            </Form.Item>

        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={Handlesubmit}>
                REGISTER
            </Button>
            
        </Form.Item>
    </Form>
    </div>
    

    <dir>
        <img className='img' src={img1} alt="" />
    </dir>
</div>
  )
}

export default Register