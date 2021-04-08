import React from 'react';

import './index.css';

export default class Wheel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectItem: null,
            /*segColors : [
              '#EE4040',
              '#F0CF50',
              '#815CD1',
              '#3DA5E0',
              '#34A24F',
              '#F9AA1F',
              '#EC3F3F',
              '#FF9000',
              '#F0CF50',
              '#815CD1',
              '#3DA5E0',
              '#34A24F',
              '#F9AA1F',
              '#EC3F3F',
              '#FF9000'
            ]*/
        };
        this.selectItem = this.selectItem.bind(this);
    }

    selectItem() {
        if(this.state.selectItem === null){
            const selectItem = Math.floor(Math.random() * this.props.items.length)
            if(this.props.onSelectItem){
                this.props.onSelectItem(selectItem);

            }
            this.setState({selectItem});
        } else {
            this.setState({selectItem:null});
            setTimeout(this.selectItem, 250);
        }
    }


    getColor() {
      // randomly generate rbg values for wheel sectors
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      return `rgba(${r},${g},${b},0.4)`;
    }

    render(){
        const { selectItem } = this.state;
        const { items} = this.props;
        
        const wheelVars = {
            '--nb-item': items.length,
            '--selected-item': selectItem
            //segColors : selectItem
        };

        const spinning = selectItem != null ? 'spinning' : '';

        return (
            <div className="wheel-container">
              <div className={`wheel ${spinning}`} style={wheelVars} onClick={this.selectItem}>
                {items.map((item, index) => (
                  <div className="wheel-item" key={index} style={{ '--item-nb': index }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          );
        }
      }