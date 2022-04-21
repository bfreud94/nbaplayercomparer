import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { getPlayers, addPlayer, removePlayer } from '../../actions/playerActions'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css'

const Datatable = ({
    addPlayer,
    addedPlayers,
    removePlayer,
    getPlayers,
    players = []
}) => {
    useEffect(() => {
        getPlayers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [sortedRow, setSortedRow] = useState('name')

    const selectRow = (row) => addedPlayers.map((player) => player.name).includes(row.name) ? removePlayer(row) : addPlayer(row)

    const getAddedPlayersNames = () => addedPlayers.map((player) => player.name)

    const selectRowOptions = {
        mode: 'checkbox',
        selected: getAddedPlayersNames(),
        onSelect: (row, isSelect, rowIndex, e) => selectRow(row),
        onSelectAll: (row, isSelect, e) => (addedPlayers.length > 0 ? removePlayer(addedPlayers) : addPlayer(addedPlayers))
    }

    const sort = (a, b, order, sort) => {
        if (sortedRow !== sort) {
            setSortedRow(sort)
        }
        if (sort === 'name') return order === 'desc' ? (a[sort] > b[sort] ? 1 : -1) : (b[sort] > a[sort] ? 1 : -1)
        return order === 'desc' ? Number(a[sort]) - Number(b[sort]) : Number(b[sort]) - Number(a[sort])
    }

    const headerColumnStyle = (columnName) => {
        return {
            ...sortedRow === columnName && {
                backgroundColor: 'red'
            }
        }  
    }
    
    return (
        <BootstrapTable
            data={players}
            bordered={false} striped condensed
            options={{ noDataText: 'Loading...' }}
            selectRow={selectRowOptions}
            pagination
        >
            <TableHeaderColumn thStyle={headerColumnStyle('name')} isKey dataField='name'>Name</TableHeaderColumn>
            <TableHeaderColumn thStyle={headerColumnStyle('pts')} dataField='pts' dataSort sortFunc={(a, b, order) => sort(a, b, order, 'pts')}>PTS</TableHeaderColumn>
            <TableHeaderColumn thStyle={headerColumnStyle('reb')} dataField='reb' dataSort sortFunc={(a, b, order) => sort(a, b, order, 'reb')}>REB</TableHeaderColumn>
            <TableHeaderColumn thStyle={headerColumnStyle('ast')} dataField='ast' dataSort sortFunc={(a, b, order) => sort(a, b, order, 'ast')}>AST</TableHeaderColumn>
            <TableHeaderColumn thStyle={headerColumnStyle('stl')} dataField='stl' dataSort sortFunc={(a, b, order) => sort(a, b, order, 'stl')}>STL</TableHeaderColumn>
            <TableHeaderColumn thStyle={headerColumnStyle('blk')} dataField='blk' dataSort sortFunc={(a, b, order) => sort(a, b, order, 'blk')}>BLK</TableHeaderColumn>
        </BootstrapTable>
    )
}

Datatable.propTypes = {
    getPlayers: PropTypes.func.isRequired,
    addPlayer: PropTypes.func.isRequired,
    removePlayer: PropTypes.func.isRequired,
    addedPlayers: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    players: state.players.players,
    addedPlayers: state.players.addedPlayers
})

export default connect(mapStateToProps, { getPlayers, addPlayer, removePlayer })(Datatable)