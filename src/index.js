import { createJSON, getAll, is, isValid } from "./blocks/general.js";
import { equal, hasKey, hasValue } from "./blocks/queries.js";
import { deleteKey, get, jsonLength, set } from "./blocks/strings.js";
import {
  arrayAnalysis,
  arrayConcat,
  arrayCreate,
  arrayDelete,
  arrayFilter,
  arrayFlat,
  arrayFrom,
  arrayFromTo,
  arrayGet,
  arrayInsert,
  arrayItemNumber,
  arrayJoin,
  arrayPush,
  arrayRemoveAll,
  arrayReverse,
  arraySet,
  arraySetLength,
  arraySort,
  length,
} from "./blocks/arrays.js";
import { vmGetList, vmSetList } from "./blocks/lists.js";
import {
  getListMenu,
  _fixValue,
  _hasOwn,
  _isValid,
  _lookupList,
  _validReturn,
} from "./methods/helpers.js";

// Triflare Extend inlines every handler into the generated class, so handlers
// cannot see module scope. Anything shared is reached through `this` and must
// therefore also be listed in `methods`.
export const blocks = {
  isValid,
  is,
  getAll,
  new: createJSON,
  hasKey,
  hasValue,
  equal,
  jsonLength,
  get,
  set,
  delete: deleteKey,
  length,
  arrayGet,
  arrayPush,
  arraySet,
  arrayInsert,
  arrayDelete,
  arrayRemoveAll,
  arrayItemNumber,
  arrayFrom,
  arrayFromTo,
  arrayReverse,
  arrayFlat,
  arrayConcat,
  arrayFilter,
  arraySetLength,
  arrayCreate,
  arrayJoin,
  arraySort,
  arrayAnalysis,
  vmGetList,
  vmSetList,
};

export const methods = {
  getListMenu,
  _hasOwn,
  _isValid,
  _lookupList,
  _validReturn,
  _fixValue,
};
