import * as React from 'react';
import Transactions from '../Transactions';
import Transaction from '../TransactionInterface';

type AppInterface = {
  /**
   * @default []
   */
  transactions: Transaction[];
}

class App extends React.Component<AppInterface, {}> {  
  /**
   *
   */
  constructor(props: AppInterface) {
    super(props);
  }
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
