import React from "react";


import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Grid, Typography, Button, TextField } from '@mui/material';
import { withTheme } from "@mui/styles";
import { PouchDb } from "../Pouchdb";
import { textConst } from "./text";
import { Line } from 'react-chartjs-2';
import { Chart } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

/**
 * Компонент авторизации
 * @author EmotoyBunny
 */
class PouchDbComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			i: 0,
			j: 0,
			idArray: [],
			log: [],
			data: {},
			ownId: "",
		};
		this.logRes = [];
		this.countTest = 0;
		this.fullCount = 100000;
	}

	componentDidMount = () => {
		this.handleShowAll();
	};

	handleChange = (e, changeCallback) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	startTest = () => {
		console.log("Start");
		this.handleAddNotId();
	};

	showLog = () => {
		console.log(this.state.log);
	};


	handleAddNotId = () => {
		let { log, i } = this.state;
		const startAdd = new Date().getTime();
		let count = this.fullCount;

		if (i < count) {
			PouchDb.post({
				title: textConst.text,
			}).then((res) => {
				const endAdd = new Date().getTime();
				this.logRes.push({
					name: "add",
					index: this.logRes.length - 1,
					time: (endAdd - startAdd)
				});
				return res;
			}).then((res) => {
				const startTake = new Date().getTime();
				PouchDb.get(res.id).then((doc) => {
					const endTake = new Date().getTime();
					this.logRes.push({
						name: "take",
						index: this.logRes.length - 1,
						time: (endTake - startTake)
					});
					return doc;
				}).then((doc) => {
					const startEdit = new Date().getTime();
					PouchDb.put({
						_id: doc._id,
						_rev: doc._rev,
						title: textConst.text + "1",
					}).then(() => {
						const endEdit = new Date().getTime();
						this.logRes.push({
							name: "edit",
							index: this.logRes.length - 1,
							time: (endEdit - startEdit)
						});
						this.setState({ i: i + 1 }, () => {
							if (i % 10 === 0) {
								console.log(i);
							} else if (i === (count - 1)) {
								this.setState({ log: this.logRes });
								this.handleShowAll();
								console.log("Finish");
							}
							this.handleAddNotId();
						});
					}).catch(function (err) {
						console.log(err);
					});
				}).catch(function (err) {
					console.log(err);
				});
			}).catch(function (err) {
				console.log(err);
			});
		}
	};


// Генерация своего id
	handleAddId = () => {
		let idRes = this.state.ownId;
		if (idRes === "") {
			idRes = Math.floor(Math.random() * 1000);
		}
		PouchDb.put({
			_id: idRes,
			title: JSON.stringify({ param1: 10, param2: "asd" }),
			nameMethod: "nameMethod",
		}).then((response) => {
			console.log(response);
			this.handleShow(this.state.ownId);
			this.handleShowAll();
		}).catch(function (err) {
			console.log(err);
		});
	};


	handleShow = () => {
		PouchDb.get(this.state.ownId).catch(function (err) {
			console.log(err);
		});
	};


	handleDelete = () => {
		let { j, data } = this.state;
		if (data && data.rows.length > 0 && j < data.rows.length)
			PouchDb.get(this.state.idArray[j]).then((doc) => {
				return PouchDb.remove(doc).then(() => {
					this.setState({ j: j + 1 }, () => {
						if (j === data.rows.length - 1) {
							this.handleShowAll();
							console.log("deleteFinish");
						} else if (j % 1000 === 0) {
							console.log(j);
						}
						this.handleDelete();
					});
				});
			}).catch(function (err) {
				console.log(err);
			});
	};


	handleDeleteAll = () => {
		if (this.state.data && this.state.data.rows.length > 0) {
			console.log("deleteStart");
			for (let i = 0; i < this.state.data.rows.length; i++) {
				let { idArray } = this.state;
				idArray.push(this.state.data.rows[i].id);
				this.setState({ idArray: idArray });
			}
			this.handleDelete();
		} else {
			console.log("Элементов нет");
		}
	};

	handleEdit = () => {
		PouchDb.get(this.state.ownId).then((doc) => {
			return PouchDb.put({
				_id: this.state.ownId,
				_rev: doc._rev,
				title: JSON.stringify({ param1: "шо-то другое", param2: "asd" }),
				nameMethod: "nameMethodДругой",
			});
		}).then((response) => {
			console.log(response);
			this.handleShow(this.state.ownId);
		}).catch(function (err) {
			console.log(err);
		});
	};


	handleShowAll = () => {
		PouchDb.allDocs({
			include_docs: true,
			attachments: true
		}).then((result) => {
			console.log(result);
			this.setState({ data: result });
		}).catch(function (err) {
			console.log(err);
		});
	};

	getChartData = (type) => {
		let arrayData = [];
		if (this.state.log.length > 0) {
			this.state.log.map((item, index) => {
				if (item.name === type) {
					arrayData.push(item.time);
				}
			});
		}
		// else {
		// 	return { data: {labels: [], datasets: []}, options: {} };
		// }
		const data = {
			labels: arrayData.map((item, index) => {
				return index;
			}),
			datasets: [
				{
					label: type,
					showLine: true,
					data: arrayData,
					borderWidth: 2,
					borderColor: 'rgb(255, 99, 132)',
					backgroundColor: 'rgba(255, 99, 132, 0.5)',
				},
			],
			borderWidth: 1
		};

		const options = {
			responsive: true,
			type: 'line',
			animation: false,
			plugins: {
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: 'Chart.js Line Chart',
				},
			},
		};
		return { data, options };
	};

	getCharts = () => {
		if (this.state.log.length < this.fullCount) {
			return <div/>;
		}

		let dataAdd = this.getChartData("add");
		let dataEdit = this.getChartData("edit");
		let dataTake = this.getChartData("take");

		return <Grid xs={12} item container>
			<Grid xs={12} item>
				<Chart data={dataAdd.data} type={"line"} options={dataAdd.options} height={100}/>
			</Grid>
			<Grid xs={12} item>
				<Chart data={dataEdit.data} type={"line"} options={dataEdit.options} height={100}/>
			</Grid>
			<Grid xs={12} item>
				<Chart data={dataTake.data} type={"line"} options={dataTake.options} height={100}/>
			</Grid>
		</Grid>;
	};

	render() {
		return (
			<div
				style={{ width: "100%", position: "relative" }}>
				<form>
					<Grid container
								spacing={2}
								style={{
									width: "100%",
									paddingLeft: "10px",
									paddingRight: "10px"
								}}>
						<Grid xs={3} item>
							<Button
								onClick={this.startTest}
								style={{
									height: "50px",
									minWidth: "300px",
									maxWidth: "300px"
								}}
								fullWidth
								color={"secondary"}
								variant="contained"
							>
								<Typography sx={{
									fontSize: "20px",
									color: "#fff",
									textTransform: "none"
								}}>
									Запустить
								</Typography>
							</Button>
						</Grid>
						<Grid xs={3} item>
							<Button
								onClick={this.showLog}
								style={{
									height: "50px",
									minWidth: "300px",
									maxWidth: "300px"
								}}
								fullWidth
								color={"secondary"}
								variant="contained"
							>
								<Typography sx={{
									fontSize: "20px",
									color: "#fff",
									textTransform: "none"
								}}>
									Вывести результаты
								</Typography>
							</Button>
						</Grid>
						<Grid xs={3} item>
							<Button
								onClick={this.handleDeleteAll}
								style={{
									height: "50px",
									minWidth: "300px",
									maxWidth: "300px"
								}}
								fullWidth
								color={"secondary"}
								variant="contained"
							>
								<Typography sx={{
									fontSize: "20px",
									color: "#fff",
									textTransform: "none"
								}}>
									Удалить все элементы
								</Typography>
							</Button>
						</Grid>
						<Grid xs={3} item>
							<Typography sx={{
								fontSize: "20px",
								color: "#000",
								textTransform: "none"
							}}>
								{this.state.i} / {this.fullCount}
							</Typography>
						</Grid>
						{this.getCharts()}
					</Grid>
				</form>
			</div>);
	}
}

export { PouchDbComponent as PouchDbComponent };