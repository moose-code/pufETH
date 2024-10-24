/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  PufferVaultV3,
  PufferVaultV3_Approval,
  PufferVaultV3_AssetsWithdrawnToday,
  PufferVaultV3_AuthorityUpdated,
  PufferVaultV3_ClaimedWithdrawals,
  PufferVaultV3_DailyWithdrawalLimitReset,
  PufferVaultV3_DailyWithdrawalLimitSet,
  PufferVaultV3_Deposit,
  PufferVaultV3_EIP712DomainChanged,
  PufferVaultV3_ExitFeeBasisPointsSet,
  PufferVaultV3_Initialized,
  PufferVaultV3_LidoWithdrawal,
  PufferVaultV3_RequestedWithdrawals,
  PufferVaultV3_Transfer,
  PufferVaultV3_TransferredETH,
  PufferVaultV3_UpdatedTotalRewardsAmount,
  PufferVaultV3_Upgraded,
  PufferVaultV3_Withdraw,
  User,
} from "generated";

PufferVaultV3.Approval.handler(async ({ event, context }) => {
  const entity: PufferVaultV3_Approval = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    owner: event.params.owner,
    spender: event.params.spender,
    value: event.params.value,
  };

  context.PufferVaultV3_Approval.set(entity);
});

PufferVaultV3.AssetsWithdrawnToday.handler(async ({ event, context }) => {
  const entity: PufferVaultV3_AssetsWithdrawnToday = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    withdrawalAmount: event.params.withdrawalAmount,
  };

  context.PufferVaultV3_AssetsWithdrawnToday.set(entity);
});

PufferVaultV3.AuthorityUpdated.handler(async ({ event, context }) => {
  const entity: PufferVaultV3_AuthorityUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    authority: event.params.authority,
  };

  context.PufferVaultV3_AuthorityUpdated.set(entity);
});

PufferVaultV3.ClaimedWithdrawals.handler(async ({ event, context }) => {
  const entity: PufferVaultV3_ClaimedWithdrawals = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    requestIds: event.params.requestIds,
  };

  context.PufferVaultV3_ClaimedWithdrawals.set(entity);
});

PufferVaultV3.DailyWithdrawalLimitReset.handler(async ({ event, context }) => {
  const entity: PufferVaultV3_DailyWithdrawalLimitReset = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
  };

  context.PufferVaultV3_DailyWithdrawalLimitReset.set(entity);
});

PufferVaultV3.DailyWithdrawalLimitSet.handler(async ({ event, context }) => {
  const entity: PufferVaultV3_DailyWithdrawalLimitSet = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    oldLimit: event.params.oldLimit,
    newLimit: event.params.newLimit,
  };

  context.PufferVaultV3_DailyWithdrawalLimitSet.set(entity);
});

PufferVaultV3.Deposit.handler(async ({ event, context }) => {
  const entity: PufferVaultV3_Deposit = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    sender: event.params.sender,
    owner: event.params.owner,
    assets: event.params.assets,
    shares: event.params.shares,
  };

  context.PufferVaultV3_Deposit.set(entity);
});

PufferVaultV3.EIP712DomainChanged.handler(async ({ event, context }) => {
  const entity: PufferVaultV3_EIP712DomainChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
  };

  context.PufferVaultV3_EIP712DomainChanged.set(entity);
});

PufferVaultV3.ExitFeeBasisPointsSet.handler(async ({ event, context }) => {
  const entity: PufferVaultV3_ExitFeeBasisPointsSet = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    previousFee: event.params.previousFee,
    newFee: event.params.newFee,
  };

  context.PufferVaultV3_ExitFeeBasisPointsSet.set(entity);
});

PufferVaultV3.Initialized.handler(async ({ event, context }) => {
  const entity: PufferVaultV3_Initialized = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    version: event.params.version,
  };

  context.PufferVaultV3_Initialized.set(entity);
});

PufferVaultV3.LidoWithdrawal.handler(async ({ event, context }) => {
  const entity: PufferVaultV3_LidoWithdrawal = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    expectedWithdrawal: event.params.expectedWithdrawal,
    actualWithdrawal: event.params.actualWithdrawal,
  };

  context.PufferVaultV3_LidoWithdrawal.set(entity);
});

PufferVaultV3.RequestedWithdrawals.handler(async ({ event, context }) => {
  const entity: PufferVaultV3_RequestedWithdrawals = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    requestIds: event.params.requestIds,
  };

  context.PufferVaultV3_RequestedWithdrawals.set(entity);
});

PufferVaultV3.Transfer.handlerWithLoader({
  loader: async ({ event, context }) => {
    const senderId = event.params.from;
    const receiverId = event.params.to;

    const [sender, receiver] = await Promise.all([
      context.User.get(senderId),
      context.User.get(receiverId),
    ]);

    return {
      sender: sender || { id: senderId, address: senderId, balance: BigInt(0) },
      receiver: receiver || {
        id: receiverId,
        address: receiverId,
        balance: BigInt(0),
      },
    };
  },
  handler: async ({ event, context, loaderReturn }) => {
    const { sender, receiver } = loaderReturn;
    const transferAmount = event.params.value;

    // Create and set the Transfer entity
    const transferEntity: PufferVaultV3_Transfer = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      from: event.params.from,
      to: event.params.to,
      value: transferAmount,
    };
    context.PufferVaultV3_Transfer.set(transferEntity);

    // Create new sender entity with updated balance
    const newSender: User = {
      ...sender,
      balance: sender.balance - transferAmount,
    };
    context.User.set(newSender);

    // Create new receiver entity with updated balance
    const newReceiver: User = {
      ...receiver,
      balance: receiver.balance + transferAmount,
    };
    context.User.set(newReceiver);
  },
});

PufferVaultV3.TransferredETH.handler(async ({ event, context }) => {
  const entity: PufferVaultV3_TransferredETH = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    to: event.params.to,
    amount: event.params.amount,
  };

  context.PufferVaultV3_TransferredETH.set(entity);
});

PufferVaultV3.UpdatedTotalRewardsAmount.handler(async ({ event, context }) => {
  const entity: PufferVaultV3_UpdatedTotalRewardsAmount = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    previousTotalRewardsAmount: event.params.previousTotalRewardsAmount,
    newTotalRewardsAmount: event.params.newTotalRewardsAmount,
    depositedETHAmount: event.params.depositedETHAmount,
  };

  context.PufferVaultV3_UpdatedTotalRewardsAmount.set(entity);
});

PufferVaultV3.Upgraded.handler(async ({ event, context }) => {
  const entity: PufferVaultV3_Upgraded = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    implementation: event.params.implementation,
  };

  context.PufferVaultV3_Upgraded.set(entity);
});

PufferVaultV3.Withdraw.handler(async ({ event, context }) => {
  const entity: PufferVaultV3_Withdraw = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    sender: event.params.sender,
    receiver: event.params.receiver,
    owner: event.params.owner,
    assets: event.params.assets,
    shares: event.params.shares,
  };

  context.PufferVaultV3_Withdraw.set(entity);
});
