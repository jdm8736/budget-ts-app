import * as React from 'react';
import { 
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import { TRANSACTION_DEFAULTS } from './defaults';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

interface Transaction {
    date: Date;
    account: string;
    amount: number;
    category: string;
}

export interface Props {
    transactions: Transaction[];
}

class Transactions extends React.Component<any, any> {
    columns = [];

    constructor(props: Props) {
        super(props);

        this.state = { 
            transactions: props.transactions,
            newTransaction: TRANSACTION_DEFAULTS,
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
        //TODO fix this to user proper filtering
        let origTxn = this.state.newTransaction;
        let newTxnTransformed = Object.keys(this.state.newTransaction).map((key: string) => {
            return key === 'date' ? 
                new Date(origTxn[key])
                : origTxn[key];
        })
        this.setState({
            transactions: [
                ...this.state.transactions,
                newTxnTransformed
            ],
            newTransaction: TRANSACTION_DEFAULTS
        })
    }

    updateNewEntry = (newVal: any, which: any) => {
        let newState = Object.assign({}, this.state.newTransaction);
        newState[which] = newVal;
        this.setState({ newTransaction: newState });
    }  
  
    render() {
      return (
          <div>
              <form onSubmit={this.handleAddRow}>
                    {this.state.columns.map((col: any) => (
                        <TextField 
                            key={col.key}
                            hintText={col.display}
                            value={this.state.newTransaction[col.type]}
                            onChange={(e, newVal) => {
                                this.updateNewEntry(newVal, col.type)
                            }}
                        />
                    ))}
                    <FlatButton onClick={this.handleAddRow}>Add</FlatButton>                    
              </form>
              <Table>
                  <TableHeader displaySelectAll={false}>
                      <TableRow>                        
                          {this.state.columns.map((col: any) => (
                              <TableHeaderColumn key={col.key}>{col.display}</TableHeaderColumn>
                          ))}
                          <TableHeaderColumn />
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {this.state.transactions
                          .sort((txnA: any, txnB: any) => { return txnA.date < txnB.date })
                          .map((txn: any) => (
                          <TableRow key={txn.date.toString()}>
                              {this.state.columns.map((col: any) => (
                                  <TableRowColumn key={col.key}>{
                                    col.type === 'date' ? 
                                        txn[col.type].toString()
                                        : txn[col.type]}</TableRowColumn>
                              ))}
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
