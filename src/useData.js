// This file is automatically generated by Views and will be overwritten
// when the morpher runs. If you want to contribute to how it's generated, eg,
// improving the algorithms inside, etc, see this:
// https://github.com/viewstools/morph/blob/master/ensure-data.js
import get from 'lodash/get'
import produce from 'immer'
import set from 'lodash/set'
import React, { useContext, useEffect, useMemo, useReducer } from 'react'
import parseDate from 'date-fns/parse'
import parseISO from 'date-fns/parseISO'
import formatDate from 'date-fns/format'
import isValidDate from 'date-fns/isValid'

let identity = { in: i => i, out: i => i }

// show
let ItemContext = React.createContext({})
export let ItemProvider = ItemContext.Provider
export let useItem = (path = null, format = identity) => {
  let item = useContext(ItemContext)

  return useMemo(() => (
    path? format.in(get(item, path)) : item
  ), [item, path, format]) // eslint-ignore-line
  // ignore get
}

// capture
let captureItemReducer = produce((draft, action) => {
  switch (action.type) {
    case CAPTURE_SET_FIELD: {
      set(draft, action.key, action.value)
      break
    }

    case CAPTURE_RESET: {
      return action.state
    }

    default: {
      throw new Error(
        `Unknown action type "${action.type}" in update item reducer.`
      )
    }
  }
})
let CAPTURE_SET_FIELD = 'capture/SET_FIELD'
export let setField = (key, value) => ({
  type: CAPTURE_SET_FIELD,
  key,
  value,
})
let CAPTURE_RESET = 'capture/RESET'
export let reset = state => ({ type: CAPTURE_RESET, state })

let CaptureItemContext = React.createContext({})
export let CaptureItemProvider = CaptureItemContext.Provider
export let useCaptureItem = (path = null, format = identity) => {
  let captureItem = useContext(CaptureItemContext)

  return useMemo(() => {
    if (!path) return captureItem

    let [item, dispatch, onSubmit] = captureItem;

    return {
      onChange: value => dispatch(setField(path, format.out(value))),
      onSubmit,
      value: format.in(get(item, path)),
    }
  }, [captureItem, path, format])
}
export let useCaptureItemProvider = (item, onSubmit) => {
  let [state, dispatch] = useReducer(captureItemReducer, item)

  useEffect(() => {
    dispatch(reset(item))
  }, [item])

  return useMemo(() => [state, dispatch, onSubmit], [state, dispatch, onSubmit])
}

function formatDateInOut(rvalue, formatIn, formatOut, whenInvalid = '') {
  let value =
    formatIn === 'iso'
      ? parseISO(rvalue)
      : parseDate(rvalue, formatIn, new Date())
  return isValidDate(value) ? formatDate(value, formatOut) : whenInvalid
}

export let useMakeFormatDate = (formatIn, formatOut, whenInvalid) =>
  useMemo(() => ({
    in: value => formatDateInOut(value, formatIn, formatOut, whenInvalid),
    out: value => formatDateInOut(value, formatOut, formatIn, whenInvalid),
  }), []) // eslint-disable-line
  // ignore formatIn, formatouOut, whenInvalid
