import assert from "assert";
import { 
  TestHelpers,
  PufferVaultV3_Approval
} from "generated";
const { MockDb, PufferVaultV3 } = TestHelpers;

describe("PufferVaultV3 contract Approval event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for PufferVaultV3 contract Approval event
  const event = PufferVaultV3.Approval.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("PufferVaultV3_Approval is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await PufferVaultV3.Approval.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualPufferVaultV3Approval = mockDbUpdated.entities.PufferVaultV3_Approval.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedPufferVaultV3Approval: PufferVaultV3_Approval = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      owner: event.params.owner,
      spender: event.params.spender,
      value: event.params.value,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualPufferVaultV3Approval, expectedPufferVaultV3Approval, "Actual PufferVaultV3Approval should be the same as the expectedPufferVaultV3Approval");
  });
});
