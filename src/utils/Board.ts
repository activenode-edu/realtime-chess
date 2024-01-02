type ChessPieceKind = "pawn" | "queen" | "rook" | "bishop" | "king" | "knight";
type Player = "light" | "dark";

function filterInvalidPositions(positions: Array<[number, number]>) {
 return positions.filter((position) => {
  const [rowIndex, colIndex] = position;
  if (rowIndex < 0 || colIndex < 0 || rowIndex > 7 || colIndex > 7) {
   return false;
  }
  return true;
 });
}

export class ChessPiece {
 hasBeenMoved = false;
 constructor(public kind: ChessPieceKind, public player: Player) {
  // no code needed
 }

 getMoveableFields(currentPosition: [number, number]) {
  const [rowIndex, colIndex] = currentPosition;
  let moveableTargetPositions: Array<[number, number]> = [];

  if (this.kind === "pawn") {
   if (this.player === "dark") {
    moveableTargetPositions.push([rowIndex + 1, colIndex]);

    if (this.hasBeenMoved === false) {
     moveableTargetPositions.push([rowIndex + 2, colIndex]);
    }
   } else {
    moveableTargetPositions.push([rowIndex - 1, colIndex]);

    if (this.hasBeenMoved === false) {
     moveableTargetPositions.push([rowIndex - 2, colIndex]);
    }
   }
  }

  return filterInvalidPositions(moveableTargetPositions);
 }
}

function dp(kind: ChessPieceKind = "pawn") {
 return new ChessPiece(kind, "dark");
}

function lp(kind: ChessPieceKind = "pawn") {
 return new ChessPiece(kind, "light");
}

function structuredFieldsClone(fields: Array<Array<ChessPiece | 0>>) {
 const cloneStep1 = structuredClone(fields);
 return cloneStep1.map((row) => {
  return row.map((field) => {
   if (field === 0) return 0;
   const piece = new ChessPiece(field.kind, field.player);
   piece.hasBeenMoved = field.hasBeenMoved;
   return piece;
  });
 });
}

export class Board {
 turn: Player = "light";
 fields: Array<Array<ChessPiece | 0>> = [
  [
   dp("rook"),
   dp("knight"),
   dp("bishop"),
   dp("queen"),
   dp("king"),
   dp("bishop"),
   dp("knight"),
   dp("rook"),
  ],
  [dp(), dp(), dp(), dp(), dp(), dp(), dp(), dp()],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [lp(), lp(), lp(), lp(), lp(), lp(), lp(), lp()],
  [
   lp("rook"),
   lp("knight"),
   lp("bishop"),
   lp("queen"),
   lp("king"),
   lp("bishop"),
   lp("knight"),
   lp("rook"),
  ],
 ];

 constructor(fields?: Array<Array<ChessPiece | 0>>) {
  if (fields) {
   this.fields = structuredFieldsClone(fields);
  }
 }

 move(fieldToMove: [number, number], targetField: [number, number]) {
  const newBoard = new Board(this.fields);
  newBoard.turn = this.turn === "light" ? "dark" : "light";

  const [targetRowIdx, targetColIdx] = targetField;
  const [sourceRowIdx, sourceColIdx] = fieldToMove;

  newBoard.fields[targetRowIdx][targetColIdx] =
   newBoard.fields[sourceRowIdx][sourceColIdx];

  newBoard.fields[sourceRowIdx][sourceColIdx] = 0;

  (newBoard.fields[targetRowIdx][targetColIdx] as ChessPiece).hasBeenMoved =
   true;

  return newBoard;
 }
}
