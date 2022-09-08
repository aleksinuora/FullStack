import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  content: ''
}

const filterSlice = createSlice({
  name: 'filtering',
  initialState,
  reducers: {
    applyFilter(state, action) {
      const filterWord = action.payload
      return {
        content: filterWord
      }
    }
  }
})

export const { applyFilter } = filterSlice.actions
export default filterSlice.reducer