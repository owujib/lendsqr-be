import Events from '.';
import AccountHooks from '../hooks/AccountHooks';

interface eventTypes {
  INIT_ACCOUNT: 'INIT_ACCOUNT';
}
class AccountEvents extends Events {
  public events: eventTypes;

  constructor() {
    super();

    this.events = {
      INIT_ACCOUNT: 'INIT_ACCOUNT',
    };

    this.on(this.events.INIT_ACCOUNT, AccountHooks.initAccount);
  }
}

export default new AccountEvents();
