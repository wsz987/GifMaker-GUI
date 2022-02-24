import { eventBus } from '@/utils/eventBus'
import config from '@/config'
const Tip = (msg) => eventBus.$emit('tip', msg)
const state = () => ({
  actionTab: config.defaultTabAction,
  imgList: [],
  folderList: [],
  gifData: [],
  makeConfig: {},
  nowLoadFolder: null,
  savePath: '',
})
const getters = {
  actionTab: (state) => state.actionTab,
  imgList: (state) => state.imgList,
  folderList: (state) => state.folderList,
  gifData: (state) => state.gifData,
  nowLoadFolder: (state) => state.nowLoadFolder,
  savePath: (state) => state.savePath,
  makeConfig: (state) => state.makeConfig,
}

const mutations = {
  setImgList(state, imgList) {
    state.imgList.push(...imgList)
    // state.imgList = state.imgList.concat(imgList, imgList)
  },
  insertImgList(state, { index, data }) {
    state.imgList.splice(index, 0, ...data)
  },
  setActionTab(state, actionTab) {
    state.actionTab = actionTab
  },
  setFolderList(state, folderList) {
    state.folderList = folderList
  },
  setSavePath(state, savePath) {
    state.savePath = savePath
  },
  setGifData(state, gifData) {
    state.gifData = gifData
  },
  setNowLoadFolder(state, nowLoadFolder) {
    state.nowLoadFolder = nowLoadFolder
  },
  setMakeConfig(state, config) {
    for (let key of Object.keys(config)) {
      let item = config[key]
      if (item == 'True' || item == 'true') config[key] = true
      if (item == 'False' || item == 'false') config[key] = false
    }
    state.makeConfig = config
  },
  open_file(state, path) {
    $api.open_file(path)
  },
  open_folder(state, path) {
    $api.open_folder(path)
  },
  clearAllImg(state) {
    state.imgList = []
  },
  removeImg(state, item) {
    state.imgList.splice(state.imgList.indexOf(item), 1)
  },
  edit_gif_config(state, { data, config }) {
    if (!data) return
    state.imgList = data
    if (config) {
      for (let key of Object.keys(config)) {
        if (key == 'doneEvent' || key == 'savePath') continue
        state.makeConfig[key] = config[key]
      }
    }
    // log(state.make_config)
    setTimeout(() => (state.actionTab = 0), 500)
  },
  isExists(state, path) {
    const res = state.imgList.find((item) => item.path == path)
    if (!res) return false
    // state.imgList.push(res)
    // log('isExists _ m', res)
    return res
  },
}
const actions = {
  choiceImg({ state, commit }, index) {
    return new Promise((resolve, reject) => {
      $api.open_file_dialog().then((res) => {
        if (index >= 0) commit('insertImgList', { index, data: res })
        else commit('setImgList', res)
        resolve(true)
      })
    })
    // const paths = await $api.get_files_path()
    // paths.filter((path) => !commit('isExists', path))
    // log('isExists', res)
  },
  make({ state, commit }, config) {
    if (state.imgList.length == 0) return Tip('请选择图片！')
    return new Promise((resolve, reject) => {
      $api.make_gif(state.imgList, config).then((path) => {
        commit('setSavePath', path)
        resolve(true)
      })
    })
  },
  getFolderList({ commit }) {
    $api
      .getData_ctx('folder_list', 'list')
      .then((data) => commit('setFolderList', data))
  },
  add_folder({ dispatch }) {
    $api.add_folder().then((msg) => {
      msg && dispatch('getFolderList')
      msg && Tip(msg)
    })
  },
  del_folder({ dispatch }, path) {
    $api.del_folder(path).then((msg) => {
      msg && dispatch('getFolderList')
      msg && Tip(msg)
    })
  },
  load_config({ commit }, path, tip = true) {
    return new Promise((resolve, reject) => {
      $api.load_gif_config(path).then(({ msg, data }) => {
        commit('setGifData', data.reverse())
        resolve(true)
        tip && Tip(msg)
        commit('setNowLoadFolder', path)
        data.length !== 0 && setTimeout(() => commit('setActionTab', 1), 500)
      })
    })
  },
  del_gif_config({ state, dispatch }, item) {
    if (!state.nowLoadFolder) return Tip(msg)
    $api.del_gif_config(state.nowLoadFolder, item).then((msg) => {
      Tip(msg)
      msg && dispatch('load_config', state.nowLoadFolder, false)
    })
  },
  getMakeConfig({ commit }) {
    $api.getMakeConfig().then((data) => commit('setMakeConfig', data))
  },
}
export default { state, getters, mutations, actions }
