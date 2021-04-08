import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Wheel from './wheel';

const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //inputSize : 0,
      //places : []
      //places : []
      values : [],
      rotate:0,

      result: null,
      spinning: false
    }
    //this.places = [1,3,3,3]
    //this.addPlace = this.addPlace.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  createUI() {
    
    return this.state.values.map((result,i) =>
       <div>
         <table>
           <tr>   
             <td><label className="label label-default">Price</label></td>
             <td>
               <input type="text" className="form-control form-control-sm" 
                maxLength={9} 
                placeholder="Price.."
                pattern="[0-9]*"
                value={result||''} onChange={this.handleChange.bind(this, i)}/>
              </td>
             <td> <button className="btn btn-danger btn-sm"
            value='remove' onClick={this.removeClick.bind(this, i)} >
            <i className="fa fa-minus" aria-hidden="true" />
         </button></td>
           </tr>
         </table>
       </div>
      )
  }
 

  /*display (values) {  
      return this.state.values.map((result,i) =>   
      //<label className="Selection" value={el||''} onChange={this.handleChange.bind(this,i)}/>  
      //<a value={el||'' onChange={this.handleChange.bind(this,i)}></a>  
        //<input type="label" className="Selection" value={result||''} onChange={this.handleChange.bind(this,i)}></input>
      //<label className="Selection" value={el||''} onChange={this.handleChange.bind(this,i)}></label>
        <li key={result}></li>
      )
  }*/

  handleChange (i, event){
    let values = [...this.state.values];
    if (rx_live.test(event.target.value)){  
       values[i] = event.target.value;
       this.setState({values});
  }
}


  addClick(){
    this.setState(prevState => ({ values : [...prevState.values, '']}))
  }

  removeClick(i){
    let values = [...this.state.values];
    values.splice(i,1);
    this.setState({ values });
  }

   
  /*renderInputs(values){
    const inputs=[];
    for(let i=0; i < values; i++){
      //inputs.push(<div><input type="text" name="quantity"/></div>)
      inputs.push(this.state.value.join(','));
    }
    return inputs;
  }*/

  /*renderOut (value){
    const outputs = [];
    for(let i = 1; i <= this.state.places; i++){
      outputs.push()   
      }
      return outputs;
 }*/
 
 
 spin = () => {

   let randomSpin = Math.floor(Math.random() * 900) + 500;

   this.setState({
     rotate : randomSpin,
     easeOut: 2,
     spinning: true
   });

   setTimeout(() => {
     this.getResult(randomSpin);
   }, 2000);
 }

  getResult = spin => {

    const { angle, top, offset, list } = this.state;
    let netRotation = ((spin % 360) * Math.PI) / 180; // RADIANS
    let travel = netRotation + offset;
    let count = top + 1;
    while (travel > 0) {
      travel = travel - angle;
      count--;
    }
    let result;
    if (count >= 0) {
      result = count;
    } else {
      result = list.length + count;
    }

    // set state variable to display result
    this.setState({
      net: netRotation,
      result: result
    });

  };

  reset = () => {
    // reset wheel and result
    this.setState({
      rotate: 0,
      easeOut: 0,
      result: null,
      spinning: false
    });
  };

  
  render() {

    //console.log(this.state.inputSize);
    
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
        <h1>Click the wheel to play spin to win....</h1>  
              <div className="containerApp">
                  <div className="leftApp">
                        {this.createUI()}                        
                        <button type="button" value="New Price" onClick={this.addClick.bind(this)} className="btn btn-primary text-center btn-sm">
                         <i className="fa fa-plus-circle" aria-hidden="true" />
                         </button><span> Click to add prices</span>  
                  </div>
                  <div className="rightApp">
                    <Wheel items={this.state.values}/>
                  </div>  
              
                  <div class="display">
                    <span id="readout">
                     Prices entered : {" "}
                    <span id="result"> 
                      {this.state.values.join(',')}
                    </span>       
                    </span>
                  </div>                                                      
              </div>      
        </form>
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);



//handleOnChange(value){
    //var place = this.state.places.slice();
   // place[value] = e.target.value;

    //this.setState({
    //  inputSize: value.target.value
   // });
  //}
//*********************** */
//handleSubmit(event) {
    // Contiune with button submit 
    //alert('A name was submitted: ' + this.state.inputSize);
    //event.preventDefault();
 // }
/**************************** */

//<div >
         // <input type="number" name="quantity" min="0" max="9999" onChange={(value)=>this.handleOnChange(value)}/>
         // <br/>
          //{this.renderInputs(this.state.inputSize)}
        //  <br/>
        //</div>
        //<div >
        // <button type="submit" onClick={this.handleSubmit}>Submit</button>
        // <br/>
         //</div>
        //<h1>Click the wheel to play spin to win.. ?</h1>

        //<Wheel items={this.renderInputs(this.state.inputSize)}/>