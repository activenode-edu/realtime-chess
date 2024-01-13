type ChessPieceKind = "pawn" | "queen" | "rook" | "bishop" | "king" | "knight";
type PlayerType = "light" | "dark";

class ChessPiece {
 constructor(public kind: ChessPieceKind, public player: PlayerType) {
  // doesnt need additional code here
 }
}

function dp(kind: ChessPieceKind = "pawn") {
 return new ChessPiece(kind, "dark");
}

function lp(kind: ChessPieceKind = "pawn") {
 return new ChessPiece(kind, "light");
}

export class Board {
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
  [dp(), dp(), dp(), dp(), dp(), dp(), dp(), dp()], //only pawns here
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
}
