import React ,{ useState,useContext} from 'react';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_EMAIL,VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';

import './Auth.css';

const Auth=()=>{
    const auth=useContext(AuthContext);
    const [isLoginMode,setIsLogInMode]=useState(true);
    const [formState,inputHandler,setFormData]=useForm({
        email:{
            value:'',
            isValid:false
        },
        password:{
            value:'',
            isValid:false
        }
    },false)

    const switchModeHandler=()=>{
        if(!isLoginMode){
            setFormData({
                ...formState.inputs,
                name:undefined
            },formState.inputs.email.isValid && formState.inputs.password.isValid)
        }
        else{
            setFormData({
                ...formState.inputs,
                name:{
                    value:'',
                    isValid:false
                }
            },false);
        }
        setIsLogInMode(preMode=>!preMode);
    };

    const authSubmitHandler=(event)=>{
        event.preventDefault();
        auth.login();
    }

    return (
        <Card className="authentication">
            <h2>Login Required</h2>
            <hr />
            <form onSubmit={authSubmitHandler}>
            { !isLoginMode && <Input element="input" id="name" type="text" label="Your Name" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a name" onInput={inputHandler}>
            </Input>
            }
                <Input element="input" id="email" type="email" label="E-Mail" validators={[VALIDATOR_EMAIL()]} errorText="Please enter valid email address" onInput={inputHandler}></Input>

                <Input element="input" id="password" type="password" label="Password" validators={[VALIDATOR_MINLENGTH(8)]} errorText="Please enter valid password (atleast having 8 characters)" onInput={inputHandler}></Input>

                <Button type="submit" disabled={!formState.isValid}>{isLoginMode ? 'LOGIN' : 'SIGNUP'}</Button>
            </form>
            <Button inverse onClick={switchModeHandler}>
                SWITCH TO {isLoginMode? 'SIGNUP' : 'LOGIN'}
            </Button>
        </Card>
    );
}

export default Auth;