import * as types from "./mutations-type"

export const selectPlay =function({commit},{list,index}){
    commit(types.SET_PLAYING,true);
    commit(types.SET_FULL_SCREEN,true);
    commit(types.SET_PLAYLIST,list);
    commit(types.SET_SEQUENCE_LIST,list);
    commit(types.SET_CURRENT_INDEX,index)
}