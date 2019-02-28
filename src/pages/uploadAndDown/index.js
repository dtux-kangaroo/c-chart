import React, { Component } from "react";
import { Divider } from "antd";
import moment from "moment";
import Uploader from '../../components/uploader'
import Downloader from '../../components/downloader'
import MapDrap from '../../components/mapDrap'
import './style.scss'
import apis from "../../constants/apis";

// import { ChinaMap2d } from 'easyv-components/src/components/chinaMap2d/index.jsx';
// import { config } from 'easyv-components/src/components/chinaMap2d/js/config';
// import childrenConfig from 'easyv-components/src/components/chinaMap2d/js/children';

moment.locale("zh-cn");

export default class UploadAndDown extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	componentDidMount() {
	}
	componentWillReceiveProps(nextProps) {

	}
	handleMapDrag = (resultPosition) =>{
		console.log(resultPosition,'resultPosition')
	}
	render() {
		return (
			<div className="content uploadAndDown">
				{/* <ChinaMap2d
					configuration={config.configuration}
					childrenConfig={childrenConfig}
				/> */}
				<Divider orientation="left">普通上传</Divider>
					<Uploader 
						name="file"
						title="普通上传"
						action={apis.saveTabelData}/>
				<Divider orientation="left">多文件上传</Divider>
					<Uploader 
						multiple={true}
						name="file"
						title="多文件上传"
						action="#"/>
				<Divider orientation="left">excel上传</Divider>
					<Uploader 
						accept=".xls,.xlsm,.xlsx"
						name="file"
						title="excel上传"
						action="#"/>
				<Divider orientation="left">图片上传(展示上传列表)</Divider>
					<Uploader 
						multiple={true}
						showUploadList={true}
						accept=".png,.jpg"
						name="file"
						title="图片上传"
						action="#"/>
				<Divider orientation="left">下载</Divider>
					<Downloader style={{marginRight:10}} />
					<Downloader renderNode='button' />
				<Divider orientation="left">导出</Divider>
					<Downloader 
						style={{marginRight:10}} 
						title='导出'
						exports={true}
						action="javascript:void(0)" />	
				<Divider orientation="left">地图</Divider>
					<MapDrap
						onDrag={this.handleMapDrag}
						 />
	   		</div>
		);
	}
}
