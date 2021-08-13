import React from "react";
import { withRouter } from "react-router-dom";
import LoginGoogle from "./sections/LoginGoogle";

function LoginPage() {
  return (
    //네브바가 내려와서 위에 문구가 안 보임. 수정필요
    <div>
      <h2>
        쾌적한 우주여행을 위해서는 활성화된 유튜브 채널이 필요합니다!
        <br />
        유튜브채널을 운영중인 구글 계정으로 로그인해주십시오!
      </h2>

      <LoginGoogle />
    </div>
  );
}

export default withRouter(LoginPage);
