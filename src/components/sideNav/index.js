import React, { Component, Fragment }  from 'react';
import { Link,NavLink } from "react-router-dom";
import chartData from '../../chartData/index';
import { mapKeys } from 'lodash';
import './style.scss';

class SideNav extends Component{
    constructor(props){
        super(props)
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
                                        <Link to={res.url}>{res.name}</Link>
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