import { Gamelogic } from './gamelogic';

describe('Gamelogic', () => {
  it('Minimax Test: Depth of 7 with gamefield of [1,2,0,0,0,0,0,0,0] should return -10', () => {
    var gameField: Array<number> = [1,2,0,0,0,0,0,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 7, false, 1))
    .withContext('Depth of 7 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [1]')
    .toBe(-10)
  });
  it('Minimax Test: Depth of 7 with gamefield of [1,0,2,0,0,0,0,0,0] should return -10', () => {
    var gameField: Array<number> = [1,0,2,0,0,0,0,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 7, false, 1))
    .withContext('Depth of 7 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [2]')
    .toBe(-10)
  });
  it('Minimax Test: Depth of 7 with gamefield of [1,0,0,2,0,0,0,0,0] should return -10', () => {
    var gameField: Array<number> = [1,0,0,2,0,0,0,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 7, false, 1))
    .withContext('Depth of 7 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [3]')
    .toBe(-10)
  });
  it('Minimax Test: Depth of 7 with gamefield of [1,0,0,0,2,0,0,0,0] should return -10', () => {
    var gameField: Array<number> = [1,0,0,0,2,0,0,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 7, false, 1))
    .withContext('Depth of 7 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [4]')
    .toBe(0)
  });
  it('Minimax Test: Depth of 7 with gamefield of [1,0,0,0,0,2,0,0,0] should return -10', () => {
    var gameField: Array<number> = [1,0,0,0,0,2,0,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 7, false, 1))
    .withContext('Depth of 7 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [5]')
    .toBe(-10)
  });
  it('Minimax Test: Depth of 7 with gamefield of [1,0,0,0,0,0,2,0,0] should return -10', () => {
    var gameField: Array<number> = [1,0,0,0,0,0,2,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 7, false, 1))
    .withContext('Depth of 7 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [6]')
    .toBe(-10)
  });
  it('Minimax Test: Depth of 7 with gamefield of [1,0,0,0,0,0,0,2,0] should return -10', () => {
    var gameField: Array<number> = [1,0,0,0,0,0,0,2,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 7, false, 1))
    .withContext('Depth of 7 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [7]')
    .toBe(-10)
  });
  it('Minimax Test: Depth of 7 with gamefield of [1,0,0,0,0,0,0,0,2] should return -10', () => {
    var gameField: Array<number> = [1,0,0,0,0,0,0,0,2];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 7, false, 1))
    .withContext('Depth of 7 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [8]')
    .toBe(-10)
  });



  it('Minimax Test: Depth of 5 with gamefield of [1,2,0,0,0,0,0,0,0] should return -10', () => {
    var gameField: Array<number> = [1,2,0,0,0,0,0,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 5, false, 1))
    .withContext('Depth of 5 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [1]')
    .toBe(-10)
  });
  it('Minimax Test: Depth of 5 with gamefield of [1,0,2,0,0,0,0,0,0] should return -10', () => {
    var gameField: Array<number> = [1,0,2,0,0,0,0,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 5, false, 1))
    .withContext('Depth of 5 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [2]')
    .toBe(-10)
  });
  it('Minimax Test: Depth of 5 with gamefield of [1,0,0,2,0,0,0,0,0] should return -10', () => {
    var gameField: Array<number> = [1,0,0,2,0,0,0,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 5, false, 1))
    .withContext('Depth of 5 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [3]')
    .toBe(-10)
  });
  it('Minimax Test: Depth of 5 with gamefield of [1,0,0,0,2,0,0,0,0] should return -10', () => {
    var gameField: Array<number> = [1,0,0,0,2,0,0,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 5, false, 1))
    .withContext('Depth of 5 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [4]')
    .toBe(0)
  });
  it('Minimax Test: Depth of 5 with gamefield of [1,0,0,0,0,2,0,0,0] should return -10', () => {
    var gameField: Array<number> = [1,0,0,0,0,2,0,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 5, false, 1))
    .withContext('Depth of 5 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [5]')
    .toBe(-10)
  });
  it('Minimax Test: Depth of 5 with gamefield of [1,0,0,0,0,0,2,0,0] should return -10', () => {
    var gameField: Array<number> = [1,0,0,0,0,0,2,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 5, false, 1))
    .withContext('Depth of 5 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [6]')
    .toBe(-10)
  });
  it('Minimax Test: Depth of 5 with gamefield of [1,0,0,0,0,0,0,2,0] should return -10', () => {
    var gameField: Array<number> = [1,0,0,0,0,0,0,2,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 5, false, 1))
    .withContext('Depth of 5 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [7]')
    .toBe(-10)
  });
  it('Minimax Test: Depth of 5 with gamefield of [1,0,0,0,0,0,0,0,2] should return -10', () => {
    var gameField: Array<number> = [1,0,0,0,0,0,0,0,2];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 5, false, 1))
    .withContext('Depth of 5 with the board [1,0,0,0,0,0,0,0,0] evalutating array position [8]')
    .toBe(-10)
  });



  it('Minimax Test: Depth of 3 with gamefield of [1,2,0,0,0,0,0,0,0] should return 0', () => {
    var gameField: Array<number> = [1,2,0,0,0,0,0,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 3, false, 1))
    .withContext('I assume this is a message')
    .toBe(0)
  });
  it('Minimax Test: Depth of 3 with gamefield of [1,2,0,1,0,0,2,0,0] should return -10', () => {
    var gameField: Array<number> = [1,2,0,1,0,0,2,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 3, false, 1))
    .withContext('I assume this is a message')
    .toBe(-10)
  });



  it('Minimax Test: Depth of 1 with gamefield of [1,2,0,0,0,0,0,0,0] should return 0', () => {
    var gameField: Array<number> = [1,2,0,0,0,0,0,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 1, false, 1))
    .withContext('I assume this is a message')
    .toBe(0)
  });
  
  it('Minimax Test: Depth of 1 with gamefield of [1,2,0,1,0,0,2,0,0] should return 0', () => {
    var gameField: Array<number> = [1,2,0,1,0,0,2,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 1, false, 1))
    .withContext('I assume this is a message')
    .toBe(0)
  });
  it('Minimax Test: Depth of 1 with gamefield of [1,2,0,1,1,0,2,0,0] should return -10', () => {
    var gameField: Array<number> = [1,2,0,1,1,2,2,0,0];
    const test = new Gamelogic()
    expect(test.minimax(gameField, 1, false, 1))
    .withContext('I assume this is a message')
    .toBe(-10)
  });
});
