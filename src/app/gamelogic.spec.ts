import { Gamelogic } from './gamelogic';

describe('Gamelogic', () => {
  // This test currently takes an average of 13-15 seconds to run, I want to try implementing AlphaBeta Pruning to see how much faster I can make this
  it('Minimax Test: Depth of 9 with gamefield of [0,0,0,0,0,0,0,0,0] should return 0', () => {
    var gameField: Array<number> = [0,0,0,0,0,0,0,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 0, 9, false, 1))
    .withContext('Depth of 9 with the board [0,0,0,0,0,0,0,0,0] should always evaulate as a draw (0)')
    .toBe(0)
  });



  it('Minimax Test: Depth of 7 with gamefield of [1,2,0,0,0,0,0,0,0] should return -1', () => {
    var gameField: Array<number> = [1,2,0,0,0,0,0,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 0, 7, false, 1))
    .withContext('Depth of 7 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [1]')
    .toBe(-1)
  });
  it('Minimax Test: Depth of 7 with gamefield of [1,0,2,0,0,0,0,0,0] should return -1', () => {
    var gameField: Array<number> = [1,0,2,0,0,0,0,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 0, 7, false, 1))
    .withContext('Depth of 7 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [2]')
    .toBe(-1)
  });
  it('Minimax Test: Depth of 7 with gamefield of [1,0,0,2,0,0,0,0,0] should return -1', () => {
    var gameField: Array<number> = [1,0,0,2,0,0,0,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 0, 7, false, 1))
    .withContext('Depth of 7 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [3]')
    .toBe(-1)
  });
  it('Minimax Test: Depth of 7 with gamefield of [1,0,0,0,2,0,0,0,0] should return -1', () => {
    var gameField: Array<number> = [1,0,0,0,2,0,0,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 0, 7, false, 1))
    .withContext('Depth of 7 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [4]')
    .toBe(0)
  });
  it('Minimax Test: Depth of 7 with gamefield of [1,0,0,0,0,2,0,0,0] should return -1', () => {
    var gameField: Array<number> = [1,0,0,0,0,2,0,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 0, 7, false, 1))
    .withContext('Depth of 7 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [5]')
    .toBe(-1)
  });
  it('Minimax Test: Depth of 7 with gamefield of [1,0,0,0,0,0,2,0,0] should return -1', () => {
    var gameField: Array<number> = [1,0,0,0,0,0,2,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 0, 7, false, 1))
    .withContext('Depth of 7 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [6]')
    .toBe(-1)
  });
  it('Minimax Test: Depth of 7 with gamefield of [1,0,0,0,0,0,0,2,0] should return -1', () => {
    var gameField: Array<number> = [1,0,0,0,0,0,0,2,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 0, 7, false, 1))
    .withContext('Depth of 7 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [7]')
    .toBe(-1)
  });
  it('Minimax Test: Depth of 7 with gamefield of [1,0,0,0,0,0,0,0,2] should return -1', () => {
    var gameField: Array<number> = [1,0,0,0,0,0,0,0,2];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 0, 7, false, 1))
    .withContext('Depth of 7 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [8]')
    .toBe(-1)
  });



  it('Minimax Test: Depth of 5 with gamefield of [1,2,0,0,0,0,0,0,0] should return -1', () => {
    var gameField: Array<number> = [1,2,0,0,0,0,0,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 0, 5, false, 1))
    .withContext('Depth of 5 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [1]')
    .toBe(-1)
  });
  it('Minimax Test: Depth of 5 with gamefield of [1,0,2,0,0,0,0,0,0] should return -1', () => {
    var gameField: Array<number> = [1,0,2,0,0,0,0,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 0, 5, false, 1))
    .withContext('Depth of 5 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [2]')
    .toBe(-1)
  });
  it('Minimax Test: Depth of 5 with gamefield of [1,0,0,2,0,0,0,0,0] should return -1', () => {
    var gameField: Array<number> = [1,0,0,2,0,0,0,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 0, 5, false, 1))
    .withContext('Depth of 5 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [3]')
    .toBe(-1)
  });
  it('Minimax Test: Depth of 5 with gamefield of [1,0,0,0,2,0,0,0,0] should return -1', () => {
    var gameField: Array<number> = [1,0,0,0,2,0,0,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 0, 5, false, 1))
    .withContext('Depth of 5 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [4]')
    .toBe(0)
  });
  it('Minimax Test: Depth of 5 with gamefield of [1,0,0,0,0,2,0,0,0] should return -1', () => {
    var gameField: Array<number> = [1,0,0,0,0,2,0,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 0, 5, false, 1))
    .withContext('Depth of 5 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [5]')
    .toBe(-1)
  });
  it('Minimax Test: Depth of 5 with gamefield of [1,0,0,0,0,0,2,0,0] should return -1', () => {
    var gameField: Array<number> = [1,0,0,0,0,0,2,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 0, 5, false, 1))
    .withContext('Depth of 5 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [6]')
    .toBe(-1)
  });
  it('Minimax Test: Depth of 5 with gamefield of [1,0,0,0,0,0,0,2,0] should return -1', () => {
    var gameField: Array<number> = [1,0,0,0,0,0,0,2,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 0, 5, false, 1))
    .withContext('Depth of 5 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [7]')
    .toBe(-1)
  });
  it('Minimax Test: Depth of 5 with gamefield of [1,0,0,0,0,0,0,0,2] should return -1', () => {
    var gameField: Array<number> = [1,0,0,0,0,0,0,0,2];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 0, 5, false, 1))
    .withContext('Depth of 5 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [8]')
    .toBe(-1)
  });



  it('Minimax Test: Depth of 3 with gamefield of [1,2,0,0,0,0,0,0,0] should return 0', () => {
    var gameField: Array<number> = [1,2,0,0,0,0,0,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 0, 3, false, 1))
    .withContext('I assume this is a message')
    .toBe(0)
  });
  it('Minimax Test: Depth of 3 with gamefield of [1,2,0,1,0,0,2,0,0] should return -1', () => {
    var gameField: Array<number> = [1,2,0,1,0,0,2,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 0, 3, false, 1))
    .withContext('I assume this is a message')
    .toBe(-1)
  });



  it('Minimax Test: Depth of 1 with gamefield of [1,2,0,0,0,0,0,0,0] should return 0', () => {
    var gameField: Array<number> = [1,2,0,0,0,0,0,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 0, 1, false, 1))
    .withContext('I assume this is a message')
    .toBe(0)
  });
  
  it('Minimax Test: Depth of 1 with gamefield of [1,2,0,1,0,0,2,0,0] should return 0', () => {
    var gameField: Array<number> = [1,2,0,1,0,0,2,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 0, 1, false, 1))
    .withContext('I assume this is a message')
    .toBe(0)
  });
  it('Minimax Test: Depth of 1 with gamefield of [1,2,0,1,1,0,2,0,0] should return -1', () => {
    var gameField: Array<number> = [1,2,0,1,1,2,2,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 0, 1, false, 1))
    .withContext('I assume this is a message')
    .toBe(-1)
  });
});
