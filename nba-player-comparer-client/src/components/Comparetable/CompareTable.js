import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css';

class CompareTable extends Component {
    render() {
        const { addedPlayers } = this.props;
        return (
            <BootstrapTable
                data={addedPlayers}
                bordered={false} striped condensed
                // eslint-disable-next-line
                options={ this.options, { noDataText: 'Loading...' } }>
                <TableHeaderColumn dataField="name" isKey dataSort>Name</TableHeaderColumn>
                <TableHeaderColumn dataField="pts" dataSort sortFunc={(a, b, order) => (order === 'desc' ? Number(a.pts) - Number(b.pts) : Number(b.pts) - Number(a.pts))}>PTS</TableHeaderColumn>
                <TableHeaderColumn dataField="reb" dataSort sortFunc={(a, b, order) => (order === 'desc' ? Number(a.reb) - Number(b.reb) : Number(b.reb) - Number(a.reb))}>REB</TableHeaderColumn>
                <TableHeaderColumn dataField="ast" dataSort sortFunc={(a, b, order) => (order === 'desc' ? Number(a.ast) - Number(b.ast) : Number(b.ast) - Number(a.ast))}>AST</TableHeaderColumn>
                <TableHeaderColumn dataField="stl" dataSort sortFunc={(a, b, order) => (order === 'desc' ? Number(a.stl) - Number(b.stl) : Number(b.stl) - Number(a.stl))}>STL</TableHeaderColumn>
                <TableHeaderColumn dataField="blk" dataSort sortFunc={(a, b, order) => (order === 'desc' ? Number(a.blk) - Number(b.blk) : Number(b.blk) - Number(a.blk))}>BLK</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}

CompareTable.propTypes = {
    addedPlayers: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    addedPlayers: state.players.addedPlayers
});

export default connect(mapStateToProps, {})(CompareTable);
