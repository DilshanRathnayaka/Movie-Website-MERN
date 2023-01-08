import React,{useState}from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import "./CSS/Login.css"
import img1 from "../Images/best-fall-movies-1659459329.jpg"
import { useNavigate } from 'react-router';

function Login() {
    const [user, setUser] = useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate();
    
    const handlechange = (e) => {
        let name = e.target.name;
        let value = e.target.value

        setUser({ ...user, [name]: value })
    }


    const handlesubmit = async (e) => {
        e.preventDefault();
        const { username, password } = user;
        try {
            const res = await fetch('/api/Login/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username, password
                })
            });
            if (res.status === 401 || !res) {
                window.alert("Invalid Credentials")
            } else {
                navigate('/')
                window.location.reload();
                localStorage.setItem('username', username);
                
            }
        } catch (err) {
         
        }
    }

    return (
        <div id='form'>
            <div>
            <p className='p'>LOGIN HERE</p>
            <Form
               
                className="login-form"
                
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" value={user.username} onChange={handlechange} name="username"/>
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
                        name="password"
                        value={user.password} onChange={handlechange}
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox className='remember'>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={handlesubmit}>
                        Log in
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

export default Login