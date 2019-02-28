import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { Layout, Menu, Breadcrumb,Table,Row, Col } from "antd";
import {
    Player, ControlBar, PlaybackRateMenuButton
  } from 'video-react';
import "./style.scss";

class Video extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div style={{width:'90%',margin: '0 auto',paddingTop: '20px'}}>
                <Player
                    autoPlay
                    src="http://media.w3.org/2010/05/bunny/movie.mp4"
                >
                    <ControlBar autoHide={false}>
                        <PlaybackRateMenuButton
                            rates={[5, 3, 1.5, 1, 0.5, 0.1]}
                            order={7.1}
                        />
                    </ControlBar>
                </Player>
            </div>
        )
    }
}

export default Video