"use client";
import { useState } from "react";
import classes from "./Chessboard.module.css";
import { Board } from "@/utils/board";
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

 return (
  <>
   <div className={classes.chessboardWrapper}>
    <div className={classes.chessboard}>
     {currentBoard.fields.map((boardRow, rowIndex) => {
      const isEven = rowIndex % 2 === 0;
      let light = !isEven;
      return boardRow.map((field /** 0 or ChessPiece **/, columnIndex) => {
       light = !light;

       return (
        <div
         className={
          classes.field + " " + (light ? classes.light : classes.dark)
         }
         key={`${rowIndex}_${columnIndex}`}
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
