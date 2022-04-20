import React, { useEffect } from 'react'
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

    const getAddedPlayersNames = () => addedPlayers.map((player) => player.name)

    const selectRow = {
        mode: 'checkbox',
        selected: getAddedPlayersNames(),
        onSelect: (row, isSelect, rowIndex, e) => (addedPlayers.map((player) => player.name).includes(row.name) ? removePlayer(row) : addPlayer(row)),
        onSelectAll: (row, isSelect, e) => (addedPlayers.length > 0 ? removePlayer(addedPlayers) : addPlayer(addedPlayers))
    }

    return (
        <BootstrapTable
            data={players}
            bordered={false} striped condensed
            options={{ noDataText: 'Loading...' }}
            selectRow={selectRow}
            pagination
        >
            <TableHeaderColumn dataField='name' isKey dataSort>Name</TableHeaderColumn>
            <TableHeaderColumn dataField='pts' dataSort sortFunc={(a, b, order) => (order === 'desc' ? Number(a.pts) - Number(b.pts) : Number(b.pts) - Number(a.pts))}>PTS</TableHeaderColumn>
            <TableHeaderColumn dataField='reb' dataSort sortFunc={(a, b, order) => (order === 'desc' ? Number(a.reb) - Number(b.reb) : Number(b.reb) - Number(a.reb))}>REB</TableHeaderColumn>
            <TableHeaderColumn dataField='ast' dataSort sortFunc={(a, b, order) => (order === 'desc' ? Number(a.ast) - Number(b.ast) : Number(b.ast) - Number(a.ast))}>AST</TableHeaderColumn>
            <TableHeaderColumn dataField='stl' dataSort sortFunc={(a, b, order) => (order === 'desc' ? Number(a.stl) - Number(b.stl) : Number(b.stl) - Number(a.stl))}>STL</TableHeaderColumn>
            <TableHeaderColumn dataField='blk' dataSort sortFunc={(a, b, order) => (order === 'desc' ? Number(a.blk) - Number(b.blk) : Number(b.blk) - Number(a.blk))}>BLK</TableHeaderColumn>
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