import * as React from 'react';
import Transactions from '../Transactions';


// interface Transaction {
//   date: Date;
//   account: string;
//   amount: number;
//   category: string;
// }

// export interface Props {
//   transactions: Transaction[];
// }

class App extends React.Component<any> {  
  render() {
    return (
      <div>
        <h1>Budget App</h1>
          <Transactions transactions={this.props.transactions} />
      </div>
    );
  }
}

export default App;
