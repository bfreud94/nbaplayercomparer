import React, { Component } from 'react';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

class Datatable extends Component {

  constructor(props)  {
    super(props);

    this.options = {
      defaultSortName: 'name',  // default sort column name
      defaultSortOrder: 'desc'  // default sort order
    };
  }



  componentDidMount()  {

  }

  render()  {
    return (
        <BootstrapTable 
          data={this.props.players}
          bordered={false} striped condensed 
          options={ this.options, { noDataText: 'Loading...' } }
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

export default Datatable;