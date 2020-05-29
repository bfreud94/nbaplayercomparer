import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CompareTable extends Component {
    render()  {
        return (
            <BootstrapTable 
                data={this.props.addedPlayers}
                bordered={false} striped condensed
                // eslint-disable-next-line
                options={ this.options, { noDataText: 'Loading...' } }>
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

CompareTable.propTypes = {
    addedPlayers: PropTypes.array.isRequired
  }

const mapStateToProps = state => ({
    addedPlayers: state.players.addedPlayers
});
  
export default connect(mapStateToProps, {})(CompareTable);
