var form = {
  boxSizing: "border-box",


   boxShadow: "2px 2px 5px 1px rgba(0, 0, 0, 0.2)",

   borderRadius: "3px",
};


class ListPhong extends React.Component{
  constructor(props){
    super(props);
    this.state = {dulieu:[], visible:7};
    this.loadMore = this.loadMore.bind(this);
  }


  componentDidMount(){
    var that = this;
    axios.get('/data').then(function(res){
      console.log(res.data);
     that.setState({dulieu: res.data});
      console.log(that.state.dulieu[0]);
    });
  }

  loadMore(){
    this.setState({visible: this.state.visible + 4});
  }


  renderPhongTro(){
    return this.state.dulieu.slice(0, this.state.visible).map(function(phong){

      return (
        <div style={form} >
        <div className="thongtin" >
        <div class="img-hover-zoom img-hover-zoom--xyz">
        <img src= {phong.img.split(",")[0]} width="200px"/>
        </div>
        <div className="link1">
        <a href={"/detail/"+ phong.ID}><b>{phong.loai.toUpperCase()}</b></a>
        <span className="span1">{phong.diachi}</span>
        <img src="anh/dientich.png"  style={{height:"30px", width:"30px",marginTop: "5px"}}/> <small>{phong.dientich}m<sup>2</sup></small>
        {phong.wifi!=0&&<img src="anh/wifi.png"  style={{height:"30px", width:"30px", marginLeft:"10px",marginTop: "5px"}}/>}
        {phong.maylanh!=0&&<img src="anh/maylanh.png"  style={{height:"30px", width:"30px", marginLeft:"10px",marginTop: "5px"}}/>}
        <span className="span4" style={{color:"#BB0000", fontWeight:"700",fontSize:"16px",marginTop: "5px"}}>{phong.gia}</span>
        <span className="span2">Ngày đăng: 23/04/2019 | Số lượt xem: 100.</span>
        </div>
        </div>
        </div>

      );
    }
    );
  };



  render(){
    return(
      <div>{this.renderPhongTro()}
      <button onClick={this.loadMore} className="btn btn-primary " type="button">TẢI THÊM</button></div>
  );
  }
}

ReactDOM.render(<ListPhong/>, document.getElementById("danhsachphongtro"));


//https://stackoverflow.com/questions/52268567/sending-data-from-node-js-server-to-react-js-component
//https://www.guru99.com/node-js-mongodb.html
//https://blog.hellojs.org/fetching-api-data-with-react-js-460fe8bbf8f2
//https://stackoverflow.com/questions/41194866/how-to-set-state-of-response-from-axios-in-react
//https://stackoverflow.com/questions/34919111/how-to-debug-this-error-uncaught-in-promise-error-objects-are-not-valid-as-a
//loadmore:https://codepen.io/grantdotlocal/pen/zReNgE
