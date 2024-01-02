"use client";
import { useState } from "react";
import classes from "./Chessboard.module.css";
import { Board, ChessPiece } from "@/utils/Board";

export function Chessboard() {
 const [currentBoard, setCurrentBoard] = useState(new Board());

 return (
  <>
   <div className={classes.chessboardWrapper}>
    <div className={classes.chessboard}>
     {currentBoard.fields.map((boardRow, rowIndex) => {
      const isEven = rowIndex % 2 === 0;
      let light = !isEven;
      return boardRow.map((field, columnIndex) => {
       light = !light;

       return (
        <div
         className={[classes.field, light ? classes.light : classes.dark].join(
          " "
         )}
         key={`${rowIndex}_${columnIndex}`}
        ></div>
       );
      });
     })}
    </div>
   </div>
  </>
 );
}
