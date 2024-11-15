import toast from "react-hot-toast";
import ThisTurn from "../logic/models/this-turn";
import axios from "axios";
import { changingTurn } from './../logic/events/change-turn';
export const toastStyle = (thisTurn: ThisTurn) => {
    return {
      style: {
        borderRadius: "10px",
        background: thisTurn._turnPlayer._name,
        color: thisTurn._opponentPlayer._name,
        border:
          thisTurn._turnPlayer._name === "White"
            ? "2px solid black"
            : "2px solid white",
      },
    };
  };

  export function toastMessage(messageJSON: string) {
    const { message, turn } = JSON.parse(messageJSON);
    changingTurn(turn);
    toast.success(message, toastStyle(turn));
  }
