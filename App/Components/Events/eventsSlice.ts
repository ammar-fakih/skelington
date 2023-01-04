import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { eventTypeOptions } from '../../constants'

// Define a type for the slice state
interface EventsState {
  events: any[],
  eventsLoading: boolean,
  initialLoad: boolean,
  renderedEvents: any[],
  eventsError: string,
  unapprovedEvents: any[],
  typeCheckBoxes: string[]
}

// Define the initial state using that type
const initialState: EventsState = {
  events: [],
  eventsLoading: true,
  initialLoad: true,
  renderedEvents: [],
  eventsError: '',
  unapprovedEvents: [],
  typeCheckBoxes: eventTypeOptions
}

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer