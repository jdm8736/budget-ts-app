import * as React from 'react';
import { 
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker'

import Moment from 'react-moment';
import * as moment from 'moment';

import Transaction from '../TransactionInterface';

class TransactionDefault implements Transaction {
    date: Date = new Date('1/1/2018');
    account: string = 'Checking';
    amount: number = 0.0;
    category: string = 'Food';
}

interface Props {
    transactions: Transaction[];
}

interface TransactionsState {
    transactions: Transaction[];
    newTransaction: Transaction;
    columns: { key: string; display: string; type: string; }[];
}

class Transactions extends React.Component<Props, TransactionsState> {
    columns = [];

    constructor(props: Props) {
        super(props);

        this.state = { 
            transactions: props.transactions,
            newTransaction: new TransactionDefault(),
            columns: Object.keys(props.transactions[0]).map(key => {
                return {
                    key: key,
                    display: key.toUpperCase(),
                    type: key
                };
            })
        };
    }
    
    handleAddRow = () => {
        // TODO move all state manipulation into redux
        // this.props.dispatch({
        //     type: 
        // })

        // TODO move validation into a different method
        let newDate = this.state.newTransaction.date;
        if (!newDate || isNaN(newDate.getTime())) {
            alert('No valid date!')
            return 'Error!'
        }

        this.setState({
            transactions: [
                ...this.state.transactions,
                this.state.newTransaction
            ],
            newTransaction: new TransactionDefault()
        })
        return 'Success'
    }

    render() {
      return (
          <div>
              <Table>
                  <TableHeader displaySelectAll={false}>
                      <TableRow>                        
                          {this.state.columns.map((col: any) => (
                              <TableHeaderColumn key={col.key}>{col.display}</TableHeaderColumn>
                          ))}
                          <TableHeaderColumn />
                          <TableHeaderColumn />
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      <TableRow key={this.state.newTransaction.date.toString()}>
                        {this.state.columns.map((col: any) => {
                            if (col.type === 'date') {
                                return (
                                    <TableRowColumn>
                                        <DatePicker 
                                            onChange={(e, newVal) => {
                                                let newState = Object.assign({}, this.state.newTransaction);
                                                newState[col.type] = newVal;
                                                this.setState({ newTransaction: newState });
                                            }}
                                            formatDate={(date: object) => {
                                                return moment(date).format('MM/DD/YYYY');
                                            }}
                                            value={this.state.newTransaction[col.type]}
                                        />
                                    </TableRowColumn>
                                )
                            }
                            return <TableRowColumn key={col.key}>
                                        <TextField                                         
                                            hintText={col.display}
                                            value={this.state.newTransaction[col.type]}
                                            onChange={(e, newVal) => {
                                                let newState = Object.assign({}, this.state.newTransaction);
                                                newState[col.type] = newVal;
                                                this.setState({ newTransaction: newState });
                                            }}
                                        />
                            </TableRowColumn>
                            })
                        }
                        <TableRowColumn key="Add Button">
                            <FlatButton onClick={this.handleAddRow}>Add</FlatButton>    
                        </TableRowColumn>
                      </TableRow>
                      {this.state.transactions
                          .sort((txnA: Transaction, txnB: Transaction) => { 
                              return txnB.date.getTime() - txnA.date.getTime()
                            })
                          .map((txn: any) => (
                          <TableRow key={txn.date.toString()}>
                              {this.state.columns.map((col: any) => {
                                if (col.key === 'date') {
                                  return <TableRowColumn key={col.key}>
                                    <Moment format="MM/DD/YYYY">{txn[col.type]}</Moment>
                                   </TableRowColumn>    
                                } else {
                                  return <TableRowColumn key={col.key}>{txn[col.type]}</TableRowColumn>
                                }
                              })
                            }
                              <TableRowColumn />
                          </TableRow>
                      ))}                
                  </TableBody>
              </Table>
          </div>
      );
    }
}

export default Transactions;
