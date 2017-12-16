export default interface Transaction {
  /**
   * @default null
   */
  date: Date;
  /**
   * @default null
   */
  account: string;
  /**
   * @default null
   */
  amount: number;
  /**
   * @default null
   */
  category: string;
}