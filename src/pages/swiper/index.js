import React, { Component } from 'react';
import Swiper from '../../components/swiper';
import './style.scss';

const config_one = {autoplay: false,dots: true};
const config_two = {autoplay: true,dots: true,vertical:true};
const config_three = {autoplay: true,dots: true,vertical:true,effect:'fade'};
const config_four = {autoplay: true,dots: true,vertical:false,};
const swiper_data_one = [
    {
        url: '',
        name: '茄子'
    },
    {
        url: '',
        name: '叶子'
    },
    {
        url: '',
        name: '疯子'
    },
    {
        url: '',
        name: '傻子'
    },
]


export default class Banner extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
        <div className="swiper-one">
            <Swiper data={swiper_data_one} config={config_one} />
            <Swiper data={swiper_data_one} config={config_two} />
            <Swiper data={swiper_data_one} config={config_three} />
            <Swiper data={swiper_data_one} config={config_four} />
        </div>
    )
  }
}
