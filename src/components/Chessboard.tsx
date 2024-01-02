"use client";
import { useState } from "react";
import classes from "./Chessboard.module.css";
import { Board, ChessPiece } from "@/utils/Board";
import {
 IconChess,
 IconChessBishopFilled,
 IconChessFilled,
 IconChessKingFilled,
 IconChessKnightFilled,
 IconChessQueenFilled,
 IconChessRookFilled,
} from "@tabler/icons-react";

export function Chessboard() {
 const [currentBoard, setCurrentBoard] = useState(new Board());
 const [visualTargetPositions, setVisualTargetPositions] = useState<
  Array<string>
 >([]);
 const [lastTouched, setLastTouched] = useState<[number, number] | null>(null);

 return (
  <>
   <div className={classes.statusbar}>Turn: {currentBoard.turn}</div>
   <div className={classes.chessboardWrapper}>
    <div className={classes.chessboard}>
     {currentBoard.fields.map((boardRow, rowIndex) => {
      const isEven = rowIndex % 2 === 0;
      let light = !isEven;
      return boardRow.map((field, columnIndex) => {
       light = !light;
       let highlightField = false;

       if (field !== 0 && field.player === currentBoard.turn) {
        highlightField = true;
       }

       const canMovePiece = highlightField;
       const isSelfATargetPosition = visualTargetPositions.includes(
        `${rowIndex}_${columnIndex}`
       );

       return (
        <div
         className={[
          classes.field,
          light ? classes.light : classes.dark,
          highlightField ? classes.highlightField : "",
          isSelfATargetPosition ? classes.highlightFieldAsTargetPos : "",
         ].join(" ")}
         key={`${rowIndex}_${columnIndex}`}
         onClick={() => {
          if (canMovePiece) {
           //  const newBoard = currentBoard.move();
           //  setCurrentBoard(newBoard);
           const potentialTargetPositions = (
            field as ChessPiece
           ).getMoveableFields([rowIndex, columnIndex]);

           setLastTouched([rowIndex, columnIndex]);
           setVisualTargetPositions(
            potentialTargetPositions.map((tuple) => `${tuple[0]}_${tuple[1]}`)
           );
           console.log({ potentialTargetPositions });
          } else if (isSelfATargetPosition) {
           const targetTuple: [number, number] = [rowIndex, columnIndex];
           setCurrentBoard(currentBoard.move(lastTouched!, targetTuple));
           setVisualTargetPositions([]);
           setLastTouched(null);
          }
         }}
        >
         {field !== 0 && (
          <div
           className={
            classes.chesspiece +
            " " +
            (field.player === "dark" ? classes.darkPlayer : classes.lightPlayer)
           }
          >
           {field.kind === "pawn" && <IconChessFilled />}
           {field.kind === "rook" && <IconChessRookFilled />}
           {field.kind === "knight" && <IconChessKnightFilled />}
           {field.kind === "bishop" && <IconChessBishopFilled />}
           {field.kind === "queen" && <IconChessQueenFilled />}
           {field.kind === "king" && <IconChessKingFilled />}
          </div>
         )}
        </div>
       );
      });
     })}
    </div>
   </div>
  </>
 );
}
