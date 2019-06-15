var form = {
  boxSizing: "border-box",
   width: "440px",
   margin: "100px auto 0",
   boxShadow: "2px 2px 5px 1px rgba(0, 0, 0, 0.2)",
   paddingBottom: "40px",
   borderRadius: "3px",
  marginTop:"80px",
  backgroundColor:"white"

};
var input = {
  marginLeft:"0px",
  width: "300px",
  display: "block",
  border: "none",
  padding: "10px 0",
  borderBottom: "solid 1px #1abc9c",
  transition: "all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1)",
  background: "linear-gradient(to bottom, rgba(255, 255, 255, 0) 96%, #1abc9c 4%)",
  backgroundPosition: "-200px 0",
  backgroundSize: "200px 100%",
  backgroundRepeat: "no-repeat",
  color: "#0e6252"
};
class QuenMK extends React.Component{
  render(){
    return(
      <div>
      <form style={form} action="/quenmk" method = "post">
    <center>
    <br/>
    <a id= "logo2" href="#trangchu" style={{color:"black", fontFamily:"Comic sans MS"}}><i>TÌMPHÒNGNHANH.vn</i><img src="folder/logo1.png" style={{height:"40px",width:"40px"}}/></a>
    <h3>Tìm Lại Mật Khẩu</h3>
    <p>Vui lòng điền đầy đủ thông tin để nhận lại mật khẩu:</p>
    <input style={input} placeholder="Tên tài khoản" type="text" required="" name="username"/><br/>
    <input style={input} placeholder="Email" type="text" required="" name="Email"/><br/>
      <input style={input} placeholder="SĐT" type="text" required="" name="SDT"/><br/>
    <input style={{width:"300px"}} type="submit" className="btn btn-info" value="Gửi Yêu Cầu"/>
    </center>
  </form>
  </div>
    );
  }
};


var quenmk = document.getElementById("quenmk");
ReactDOM.render(<QuenMK/>, quenmk );
