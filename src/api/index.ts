import request from './request'

export default {
  oneSentence: async () => {
    const resp = await request.get('')
    return resp.hitokoto
  },
}
