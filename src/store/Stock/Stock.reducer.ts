import { PayloadAction } from "@reduxjs/toolkit";
import { actions } from "./Stock.actions";

type Action = {
    type: keyof typeof actions
    payload?: PayloadAction // any
}

export default function mathReducer (state: number = 0, action: Action) {
    switch (action.type) {
        case actions.INCREMENT:
            return state + 1
        case actions.DECREMENT:
            return state - 1
        default:
            return state
    }
}