export default interface IReplacerSlotQuestion {
  readonly question: string;
  readonly slot: string;
  readonly result?: (value: string) => string;
}
