import React, { Component, Fragment }  from 'react';
import chartData from '../../mock';
import { mapKeys } from 'lodash';
import './style.scss';

class SideNav extends Component{
    constructor(props){
        super(props)
    }

    pageJump(url){
        self.location.href= `${window.location.origin}${url}`;
    }

    render(){
        const menus = Object.keys(chartData).map(key => {
            return {
              name: chartData[key].name,
              url: `/chart/${chartData[key].type}`
            }
        });
        
        return(
            <div className="component-sidebar">
                <div className="main-section">
                    <ul className="sidebar-ul">
                        {
                            menus.map((res,index) => {
                                return(
                                    <li className="sidebar-li" key={index}>
                                        <a href="javascript:void(0);" onClick={this.pageJump.bind(this,res.url)}>{res.name}</a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
export default SideNav