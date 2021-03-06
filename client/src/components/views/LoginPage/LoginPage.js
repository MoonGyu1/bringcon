import React from "react";
import { withRouter } from "react-router-dom";
import {Col} from 'antd';
import LoginGoogle from "./sections/LoginGoogle";
import zzerby from '../LoginPage/sections/zzerby.svg';
import planet from '../LoginPage/sections/planet.svg';
import ufo from '../LoginPage/sections/ufo.svg';
import './sections/Login.css';
import mobile from '../Main/mobile.png';

function LoginPage() {
  return (
    <div>
    <div id="small-body">
        <img src={mobile} className="mobile"/>
    </div>
    <div id="body" style={{paddingTop: '100px', width: 'auto'}}>
      <div className="decorations">
        <img src={ufo} className="ufo"/>
      </div>
      <div className="login-form">
      <div className="login-announcement">
        <Col style={{float: 'left'}}>
        <img src={zzerby} className="zzerby"/>
        </Col>
        <Col style={{float: 'right', marginRight: '50px'}}>
        <p>원활한 우주여행을 위해<br/>구글 로그인을 해주세요!</p>
        <LoginGoogle />
        </Col>
      </div>
      </div>
      <div className="decorations">
        <img src={planet} className="planet"/>
      </div>
    </div>
    </div>
  );
}

export default withRouter(LoginPage);
