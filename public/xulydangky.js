var form = {
  boxSizing: "border-box",
   width: "440px",
   margin: "100px auto 0",
   marginTop:"80px",
   boxShadow: "2px 2px 5px 1px rgba(0, 0, 0, 0.2)",
   paddingBottom: "40px",
   borderRadius: "3px",
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


class Register extends React.Component{
  render(){
    return(
      <div>
      <form style={form} action="/dangky" method="post">
    <center>
    <br/>
    <a id= "logo2" href="#trangchu" style={{color:"black", fontFamily:"Comic sans MS"}}><i>TÌMPHÒNGNHANH.vn</i><img src="folder/logo1.png" style={{height:"40px",width:"40px"}}/></a>
    <h2>Đăng ký</h2>
    <input style={input} placeholder="Tên tài khoản" type="text" required="" name="username"/><br/>
    <input style={input} placeholder="Mật khẩu" type="password" required="" name="password"/><br/>
    <input style={input} placeholder="Email" type="text" required="" name="Email"/><br/>
      <input style={input} placeholder="SĐT" type="text" required="" name="SDT"/><br/>
    <input style={{width:"300px"}} type="submit" className="btn btn-info" value="Đăng ký"/>
    </center>
  </form>
  </div>
    );
  }
};

var register = document.getElementById("register");
ReactDOM.render(<Register/>, register );
