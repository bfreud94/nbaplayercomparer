import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { connect } from 'react-redux';
import { getPlayers, addPlayer, removePlayer } from '../../actions/playerActions';
import PropTypes from 'prop-types';

class Datatable extends Component {

  componentDidMount()  {
    this.props.getPlayers();
  }

  getAddedPlayersNames()  {
    return this.props.addedPlayers.map((player) => player.name);
  }

  render()  {
    const selectRow = {
      mode: 'checkbox',
      selected: this.getAddedPlayersNames(),
      onSelect: (row, isSelect, rowIndex, e) => {
        if(!this.props.addedPlayers.includes(row))  {
          this.props.addPlayer(row);
        } else {
          this.props.removePlayer(row);
        }
      }
    };
    return (
        <BootstrapTable 
          data={this.props.players}
          bordered={false} striped condensed
          // eslint-disable-next-line
          options={ this.options, { noDataText: 'Loading...' } }
          selectRow={selectRow}
          pagination>
          <TableHeaderColumn dataField="name" isKey={ true } dataSort>Name</TableHeaderColumn>
          <TableHeaderColumn dataField="ppg" dataSort>PPG</TableHeaderColumn>
          <TableHeaderColumn dataField="rpg" dataSort>RPG</TableHeaderColumn>
          <TableHeaderColumn dataField="apg" dataSort>APG</TableHeaderColumn>
          <TableHeaderColumn dataField="spg" dataSort>SPG</TableHeaderColumn>
          <TableHeaderColumn dataField="bpg" dataSort>BPG</TableHeaderColumn>
        </BootstrapTable>
    );
  }
}

Datatable.propTypes = {
  getPlayers: PropTypes.func.isRequired,
  addPlayer: PropTypes.func.isRequired,
  removePlayer: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired,
  addedPlayers: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
   players: state.players.players,
   addedPlayers: state.players.addedPlayers
})

export default connect(mapStateToProps, { getPlayers, addPlayer, removePlayer })(Datatable);