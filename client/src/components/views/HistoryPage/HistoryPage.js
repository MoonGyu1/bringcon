import React, {useState} from 'react'
import axios from "axios";
import {Col, Checkbox} from'antd'; 
import VerticalMenu from '../VerticalMenu/VerticalMenu';
// import {CaretRightOutlined} from '@ant-design/icons';
// import HistorySearchFeature from './HistorySearchFeature';
import './History.css';

function HistoryPage(props) {
    if(props.user.userData) {
        console.log(props.user.userData.history)
    }
    
    const [toggleState, setToggleState] = useState(1);
    const [open, setOpen] = useState(false);
 
    const handleClick = (item) => {
        const data = {product_id: item}
        //다운로드 할 product id를 백엔드로 보내줌
        axios.post('/api/product/download', data)
        .then(response => {
            if (response.data.success) {
                window.location.href = response.data.url;
                alert("파일이 다운로드되었습니다.")
            } else {
                alert("다운로드에 실패하였습니다.")
            }
        })
    }

    const toggleTab = (index) => {
        setToggleState(index);
      };

    const handleToggle = (index) => {
        console.log(index)
        setOpen(!open);
    }

    const getDateOfPurchase = (dateOfPurchase) => {
        let date = new Date(dateOfPurchase)
        
        const year = String(date.getFullYear())
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')

        date = `${year}.${month}.${day}`

        return date
    }

    return (
    <div id="body" style={{paddingTop: '50px', maxWidth: '100vw', margin: 'auto'}}>
        <Col style={{float: 'left', marginLeft: '84px', marginRight: 0}}>
            <VerticalMenu/>
        </Col>
        <Col style={{float: 'right', width: '1150px'}}>
            <div className="history-container">
                <div className="mypage-bloc-tabs">
                    <button className={toggleState === 1 ? "mypage-tabs active-tabs" : "mypage-tabs"}
                    onClick={() => toggleTab(1)}>
                        구매 내역
                    </button>
                    {/* <HistorySearchFeature/> */}
                </div>
                <div className="purchased-list">
                    <table style={{width: '900px', margin: 'auto'}}>
                        <thead style={{height: '68px'}}>
                            <tr>
                                <th className="history-checkall" colSpan='4'><Checkbox style={{marginRight: '5px', marginLeft: '10px'}}/>전체 선택</th>
                                <th><button style={{float:'right'}} className="single-download-button">선택 다운로드</button></th>
                            </tr>
                        </thead>
                        
                        {/* 주문 건당 토글바 */}
                        {props.user.userData && props.user.userData.history &&
                        props.user.userData.history.map((order, index) => (
                            <tbody key={index} style={{width: '900px', margin: 'auto'}} onClick={e => { e.preventDefault(); handleToggle(index)}}>
                           <tr className="toggle-box">
                            <td colSpan="5">
                            <div className="purchase-info">
                                {/* 결제 일시 */}
                                <span style={{float: 'left', paddingLeft: '15px'}}>{`${getDateOfPurchase(order.OrderInfo.dateOfPurchase)}`}</span>
                                
                                {/* 결제 수단 */}
                                <span style={{paddingLeft: '90px'}}>
                                  
                                    {(() => {
                                        // 카카오페이, 페이코 등으로 결제한 경우 (간편 결제)
                                        if(order.OrderInfo.embPgProvider) {
                                            return `간편결제 (${order.OrderInfo.embPgProvider})`
                                        } else {
                                            switch(order.OrderInfo.payMethod) {
                                                case "card":
                                                    return `카드결제 (${order.OrderInfo.cardName} ${order.OrderInfo.cardNumber})`

                                                case "trans":
                                                    return "실시간계좌이체"
                                            
                                                case "phone":
                                                    return "휴대폰결제"

                                                default:
                                                    return "결제완료"
                                        }}
                                    })()}
                                
                                </span>

                                {/* 결제 총금액 */}
                                <span style={{float: 'right', paddingRight: '15px'}}>{`${order.OrderInfo.amount.toLocaleString("ko-KR")}원`}</span>

                                <div className={`close ${open ? `block` : ''}`}>
                                

                                    {/* 주문 건당 상품 리스트 */}
                                {order.ProductInfo.map((product, index) => (
                                // <tbody style={{width: '900px', margin: 'auto'}}>
                        
                                                
                                                <tr className="purchased-row" key={index} style={{height: '120px'}}>
                                                <td style={{borderBottom: 'none'}}><Checkbox style={{marginLeft: '10px'}}/></td>  
                                                <td>
                                                    {/* 썸네일 이미지 */}
                                                    <img
                                                        style={{ width: "142px", height: "80px", borderRadius: "8px" }}
                                                        alt="product"
                                                        src={product.s3thumbnail}
                                                    />
                                                </td>
                                                <td>
                                                    {/* 상품 이름, 올린 사람 */}
                                                <div className="purchased-title">{product.title}</div>
                                                <div className="purchased-uploader">{product.writer}</div>
                                                </td>
                                                <td>
                                                    {/* 상품 가격 */}
                                                    <div className="purchased-price">{product.price}원</div>
                                                </td>
                                                <td>
                                                    {/* 다운로드, 재구매 버튼 */}
                                                    <button className="single-download-button" onClick={e => { e.preventDefault(); handleClick(product.id)} }>다운로드</button>
                                                    <br/>
                                                    <button className="rebuy-button">재구매</button>
                                                </td>
                                                </tr>
                                // </tbody>
                                ))}

                                </div>
                                </div>
                                </td>
                            </tr>
                            </tbody>
                        ))}
                    </table>     
                </div>
            </div>
        </Col>
    </div>
    )
}

export default HistoryPage

