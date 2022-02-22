import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import GameData from './GameData';
import Controller from './Controller';
import Field from './Field';
import Shop from './Shop';
import logo from './lib/logo.png'
import Objective from './Objective';

class App extends React.Component {

	interval: any;

	state = {
		m: 5,
		n: 5,
		shopState: [0, 0, 0],
		state: -1,		// state of game
		posX: [], // position x of hosts
		posY: [], // position y of hosts
		type: [], // type of hosts
		objective: -1, // number of viruses left
		objectiveMax: -1
	}

	componentDidMount() {
		this.fetch();
	}

	componentDidUpdate() {
		this.fetch();
		// this.input();
		this.send();
	}

	fetch = () => {
		Controller.getData().then(resp => {
			this.setState(resp.data)
		})
	}

	input = () => {

	}

	send = () => {

	}

	render(): React.ReactNode {
		return (
			<div>
				<div className='flex flex-col space-y-3'>
					<div className='flex justify-center my-5'>
						<img src={logo} style={{ height: 100 }} />
					</div>
					<div className='flex flex-row justify-center space-x-10'>
						<div>
							<Objective objective={this.state.objective} objectiveMax={this.state.objectiveMax} />
						</div>
						<div>
							<Field name="Jack" m={this.state.m} n={this.state.n} px={this.state.posX} py={this.state.posY} t={this.state.type} />
						</div>
						<div>
							<Shop isBuy={this.state.shopState} />
						</div>
					</div>

				</div>

			</div>

		)
	}
}

export default App;