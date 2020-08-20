import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { connect } from 'react-redux';
import { getPlayers, addPlayer, removePlayer } from '../../actions/playerActions';
import PropTypes from 'prop-types';

class Datatable extends Component {
    
    componentDidMount()  {
        if(this.props.players.length === 0) {
            this.props.getPlayers();
        }
    }
    
    getAddedPlayersNames()  {
        return this.props.addedPlayers.map((player) => player.name);
    }

    render()  {
        const { addPlayer, addedPlayers, removePlayer} = this.props;
        const selectRow = {
            mode: 'checkbox',
            selected: this.getAddedPlayersNames(),
            onSelect: (row, isSelect, rowIndex, e) => {
                addedPlayers.map((player) => player.name).includes(row.name) ? removePlayer(row) : addPlayer(row);
            },
            onSelectAll: (row, isSelect, e) => {
                addedPlayers.length > 0 ? removePlayer(addedPlayers) : addPlayer(addedPlayers);
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
          <TableHeaderColumn dataField="pts" dataSort sortFunc={(a, b, order) => order === 'desc' ? Number(a.pts) - Number(b.pts) : Number(b.pts) - Number(a.pts)}>PTS</TableHeaderColumn>
          <TableHeaderColumn dataField="reb" dataSort sortFunc={(a, b, order) => order === 'desc' ? Number(a.reb) - Number(b.reb) : Number(b.reb) - Number(a.reb)}>REB</TableHeaderColumn>
          <TableHeaderColumn dataField="ast" dataSort sortFunc={(a, b, order) => order === 'desc' ? Number(a.ast) - Number(b.ast) : Number(b.ast) - Number(a.ast)}>AST</TableHeaderColumn>
          <TableHeaderColumn dataField="stl" dataSort sortFunc={(a, b, order) => order === 'desc' ? Number(a.stl) - Number(b.stl) : Number(b.stl) - Number(a.stl)}>STL</TableHeaderColumn>
          <TableHeaderColumn dataField="blk" dataSort sortFunc={(a, b, order) => order === 'desc' ? Number(a.blk) - Number(b.blk) : Number(b.blk) - Number(a.blk)}>BLK</TableHeaderColumn>
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